<script lang="ts">
  import { subTotal } from '$lib/cartStore';
</script>

<div class="total">
  <table class="total-line-table">
    <caption class="visually-hidden">Cost summary</caption>
    <thead>
      <tr>
        <th scope="col"><span class="visually-hidden">Description</span></th>
        <th scope="col"><span class="visually-hidden">Price</span></th>
      </tr>
    </thead>
    <tbody class="total-line-table__tbody">
      <tr class="total-line total-line--subtotal">
        <th class="total-line__name" scope="row">Subtotal</th>
        <td class="total-line__price">
          <span
            class="order-summary__emphasis skeleton-while-loading"
            data-checkout-subtotal-price-target="4000"
          >
            Nok { $subTotal }
          </span>
        </td>
      </tr>

      <tr class="total-line total-line--shipping">
        <th class="total-line__name" scope="row">
          <span> Shipping </span>
        </th>
        <td class="total-line__price">
          <span
            class="skeleton-while-loading order-summary__small-text"
            data-checkout-total-shipping-target="0"
          >
            <!-- Calculated at next step -->
            Nok 75
          </span>
        </td>
      </tr>

      <tr class="total-line total-line--taxes hidden" data-checkout-taxes="">
        <th class="total-line__name" scope="row">Estimated taxes</th>
        <td class="total-line__price">
          <span
            class="order-summary__emphasis skeleton-while-loading"
            data-checkout-total-taxes-target="0">$0.00</span
          >
        </td>
      </tr>
    </tbody>

    <tfoot class="total-line-table__footer">
      <tr class="total-line">
        <th class="name payment-due-label" scope="row">
          <span class="payment-due-label__total">Total</span>
        </th>
        <td class="price payment-due" data-presentment-currency="NOK">
          <span class="payment-due__currency remove-while-loading">Nok</span>
          <span
            class="price skeleton-while-loading--lg"
            data-checkout-payment-due-target="4000"
          >
            { ($subTotal + 75) }
          </span>
        </td>
      </tr>
    </tfoot>
  </table>
</div>

<style lang="scss">
  .total {
    border-top: 1px solid rgba(172, 172, 172, 0.34);
  }

  table {
    width: 100%;

    td,
    th {
      padding-top: 0.5rem;
      vertical-align: middle;

      &:first-child {
        padding-left: 0;
        text-align: left;
      }
    }

    tr {
      border-collapse: collapse;
      border-spacing: 0;
    }

    th {
      font-weight: normal;
    }

    .total-line {
      &:first-child th,
      &:first-child td {
        padding-top: 0;
      }

      td:last-child,
      th:last-child {
        text-align: right;
        padding-left: 0.875rem;
      }

      &__name {
        font-size: 0.875rem;
        color: #787878;
      }
      &__price {
        font-size: 0.875rem;
        font-weight: 400;
        line-height: 1.2;
        padding-left: 1.5rem;
        white-space: nowrap;
      }
    }

    tfoot {
      .name, .price {
        padding-top: 3em !important;
        position: relative;
        color: #313131;
      }

      .name::before, .price::before {
        content: '';
        position: absolute;
        top: 1.5em;
        left: 0;
        width: 100%;
        height: 1px;
        background-color: rgba(172,172,172,0.34);
      }
    }
  }
</style>
