import type IOrderValidationError from '../interfaces/IOrderValidationError';
import type { IOrderCreateUnsuccessfullResponse } from '../interfaces/ApiResponse';

export class OrderSubmitUnsuccessfullError extends Error {
  success: boolean;
  validationErrors: IOrderValidationError[];

  constructor(orderResponse: IOrderCreateUnsuccessfullResponse) {
    const message = 'Error from submitting order!';
    super(message);

    this.success = orderResponse.success;
    this.validationErrors = orderResponse.validationErrors;
  }
}
