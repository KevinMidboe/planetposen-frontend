<script lang="ts">
  import QuantitySelect from '$lib/components/QuantitySelect.svelte';

  import { cart, subTotal } from '$lib/cartStore';
  import { decrementProductInCart, incrementProductInCart } from '$lib/websocketCart';

  const shippingPrice = 75;
  $: totalPrice = $subTotal + shippingPrice;

  function lineItemClass(id: number) {
    return `lineitem-${id}`;
  }
</script>

<div style="border: 2px solid black">
  <table class="order-summary">
    <thead style="border-bottom: 2px solid black;">
      <tr>
        <th>Varenavn</th>
        <th>Antall</th>
        <th>Pris</th>
      </tr>
    </thead>

    <tbody>
      {#if $cart.length}
        {#each $cart as cartItem}
          <tr id="{lineItemClass(cartItem.lineitem_id)}">
            <td>
              <div class="line-order">
                <a href="/shop/{cartItem.product_no}"><span>{cartItem.name}</span></a>
                <span class="subtext">Størrelse: {cartItem.size}</span>
              </div>
            </td>
            <td>
              <QuantitySelect
                bind:value="{cartItem.quantity}"
                hideButtons="{true}"
                on:decrement="{() => decrementProductInCart(cartItem.lineitem_id)}"
                on:increment="{() => incrementProductInCart(cartItem.lineitem_id)}"
              />
            </td>
            <td>Nok {cartItem.quantity * cartItem.price}</td>
          </tr>
        {/each}
      {:else}
        <tr class="no-products">
          <td>(ingen produkter)</td>
          <td>0</td>
          <td>Nok 0</td>
        </tr>
      {/if}

      <tr style="border-bottom-color: rgba(0,0,0,0.15)">
        <td>Totalsum:</td>
        <td></td>
        <td>Nok {$subTotal}</td>
      </tr>

      <tr style="border-bottom-color: rgba(0,0,0,0.15)">
        <td>Frakt:</td>
        <td></td>
        <td>Nok {shippingPrice}</td>
      </tr>

      <tr style="font-weight: 600">
        <td>Pris:</td>
        <td></td>
        <td>Nok {totalPrice}</td>
      </tr>
    </tbody>
  </table>
</div>

<!-- <slot name="express-checkout-buttons" /> -->
<style lang="scss" module="scoped">
  table.order-summary {
    width: 100%;
    border-collapse: collapse;

    thead {
      th {
        padding: 1rem 0.5rem;
        min-width: 50px;
        font-size: 1.3rem;
        text-align: left;
        font-weight: 500;
      }
    }

    th:nth-of-type(2),
    td:nth-of-type(2) {
      width: 10%;
    }

    th:last-of-type,
    td:last-of-type {
      width: 30%;
      padding-left: 1rem;
    }

    tr.no-products {
      color: rgba(0, 0, 0, 0.5);
    }

    tr:not(:last-of-type) {
      border-bottom: 2px solid black;
    }

    td {
      padding: 1rem 0.5rem;
      min-width: 50px;
      font-size: 1.1rem;
      text-align: left;

      &:nth-of-type(2) {
        border-left: none;
        border-right: none;
      }

      &:first-of-type {
        border-right: none;
      }

      &:last-of-type {
        border-left: none;
      }
    }

    .line-order {
      padding: 9px 12px;
      font-weight: 400;
      text-align: left;
      vertical-align: top;

      .subtext {
        color: #999;
        display: block;
      }
    }
  }
</style>
