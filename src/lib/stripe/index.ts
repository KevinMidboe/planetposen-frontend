import { buildApiUrl } from '$lib/utils/apiUrl';
import { loadStripe } from '@stripe/stripe-js/pure';
import type {
  ConfirmCardPaymentData,
  PaymentIntentResult,
  Stripe,
  StripeError
} from '@stripe/stripe-js';

let stripeInstance: Stripe;

class StripeUnableToAccepPaymentsError extends Error {
  constructor() {
    const message = 'Card failed to load or never got a client secret. Unable to accept payments';
    super(message);
  }
}

// class StripePaymentError extends Error {
//   code: string | undefined
//   type: string

//   constructor(error: StripeError) {
//     const message = error.message || 'Unexptected error from stripe';
//     super(message);

//     console.log('stripe error:', error);
//     this.code = error.code;
//     this.type = error.type;
//   }
// }

class StripeMissingPaymentIntent extends Error {
  constructor() {
    const message = 'Stripe responded without payment intent';
    super(message);
  }
}

// Calls backend for a client secret. order_id & customer_no
// is sent to attach to stripe payment intent
function clientSecret(order_id: string, customer_no: string): Promise<string> {
  const url = buildApiUrl('/api/v1/payment/stripe');
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ order_id, customer_no })
  };

  return fetch(url, options)
    .then((resp) => resp.json())
    .then((data) => data?.clientSecret);
}

// Creates stripe instance from package: @stripe/stripe-js
async function load(apiKey: string): Promise<Stripe | undefined> {
  if (stripeInstance) return stripeInstance;

  loadStripe.setLoadParameters({ advancedFraudSignals: false });
  const stripe: Stripe | null = await loadStripe(apiKey);
  if (!stripe) {
    console.error('Unable to load stripe payment');
    return;
  }

  stripeInstance = stripe;
  return stripe;
}

// Uses @stripe/stripe-js to make payment request from
// stripe Elements directly to Stripe. Server receives
// async webhook updates from Stripe.
function pay(secret: string, data: ConfirmCardPaymentData) {
  if (!clientSecret || !stripeInstance) {
    throw new StripeUnableToAccepPaymentsError();
  }

  return stripeInstance
    .confirmCardPayment(secret, data)
    .then((stripePaymentResponse: PaymentIntentResult) => {
      const { error, paymentIntent } = stripePaymentResponse;

      if (error) {
        throw error;
      } else if (paymentIntent) {
        console.log('payment intent from stripe:', paymentIntent);
        return paymentIntent.status === 'succeeded';
      }

      throw new StripeMissingPaymentIntent();
    });
}

export default {
  clientSecret,
  load,
  pay
};
