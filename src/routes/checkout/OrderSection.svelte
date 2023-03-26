<script lang="ts">
  import OrderTotalSection from './OrderTotalSection.svelte';
  import QuantitySelect from '$lib/components/QuantitySelect.svelte';

  import { cart, subTotal } from '$lib/cartStore';
  import { decrementProductInCart, incrementProductInCart } from '$lib/websocketCart';

  const shippingPrice = 75;
  $: totalPrice = $subTotal + shippingPrice;

  function lineItemClass(id: number) {
    return `lineitem-${id}`;
  }
</script>

<div class="order-summary">
  <table class="product-table">
    <caption class="visually-hidden"> Shopping cart </caption>
    <thead class="product-table__header">
      <tr>
        <th scope="col"><span class="visually-hidden">Product image</span></th>
        <th scope="col"><span class="visually-hidden">Description</span></th>
        <th scope="col"><span class="visually-hidden">Quantity</span></th>
        <th scope="col"><span class="visually-hidden">Price</span></th>
      </tr>
    </thead>

    <tbody data-order-summary-section="line-items">
      {#each $cart as cartItem}
        <tr
          class="product"
          data-product-id="6718367989809"
          data-variant-id="39715003924529"
          data-product-type=""
          data-customer-ready-visible=""
        >
          <td class="product__image">
            <div class="product-thumbnail">
              <div class="product-thumbnail__wrapper">
                <img
                  alt="Black Googly Eye Puff Print Logo Tee - XS"
                  class="product-thumbnail__image"
                  src="{cartItem.image}"
                  data-src="//cdn.shopify.com/s/files/1/0023/3789/8540/products/20220718_A24_GooglyEye_Tee_Black_15991x1gray_small.jpg?v=1659020903"
                />
              </div>
              <span class="product-thumbnail__quantity" aria-hidden="true">{cartItem.quantity}</span
              >
            </div>
          </td>
          <th class="product__description" scope="row">
            <span class="product__description__name order-summary__emphasis">{cartItem.name}</span>
            <span class="product__description__variant order-summary__small-text"
              >{cartItem.size}</span
            >
          </th>
          <td class="product__quantity">
            <span class="visually-hidden"> 1 </span>
          </td>
          <td class="product__price">
            <p class="order-summary__emphasis skeleton-while-loading">
              NOK {cartItem.quantity * cartItem.price}
            </p>
          </td>
        </tr>
        <tr class="spacer"></tr>
      {/each}
    </tbody>
  </table>

  <OrderTotalSection />
</div>

<style lang="scss" module="scoped">
  table,
  tr,
  td,
  th {
    border-collapse: collapse;
    border-spacing: 0;
  }

  .order-summary {
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  :global(.visually-hidden) {
    border: 0;
    clip: rect(0, 0, 0, 0);
    clip: rect(0 0 0 0);
    width: 2px;
    height: 2px;
    margin: -2px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    white-space: nowrap;
  }

  :global(.hidden) {
    display: none;
  }

  .product-table {
    margin-top: 0.75em;
    margin-bottom: 1.5em;
    position: relative;
    z-index: 1;

    &__header th {
      padding-top: 0;
      padding-bottom: 0;
      white-space: nowrap;
      font-weight: 500;
      color: #333333;
    }

    .spacer {
      height: 0.7rem;
    }

    .product {
      &__image {
        .product-thumbnail {
          width: 4.6em;
          height: 4.6em;
          border-radius: 8px;
          background: #fff;
          position: relative;

          &__wrapper {
            width: 100%;
            height: 100%;
            position: relative;
            overflow: hidden;
            border-radius: 8px;
            z-index: 1;
          }

          &__image {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            max-width: 100%;
            max-height: 100%;
            width: 100%;
            margin: auto;
          }

          &__quantity {
            font-size: 0.8571428571em;
            font-weight: 500;
            line-height: 1.75em;
            white-space: nowrap;
            text-align: center;
            border-radius: 1.75em;
            background-color: rgba(114, 114, 114, 0.9);
            background-color: rgb(24, 51, 47, 0.9);
            color: #fff;
            -webkit-box-sizing: border-box;
            box-sizing: border-box;
            min-width: 1.75em;
            height: 1.75em;
            padding: 0 0.5833333333em;
            position: absolute;
            right: -0.75em;
            top: -0.75em;
            z-index: 3;
          }
        }
      }

      &__quantity {
      }

      &__description {
        text-align: left;
        width: 100%;
        padding-top: 0.8rem;
        vertical-align: top;
        padding-bottom: 0;
        padding-left: 1rem;

        &__name {
          display: block;
          color: #787878;
          width: 1em;
          min-width: 100%;
          font-weight: 500;
        }

        &__variant {
          display: block;
          font-size: 0.85rem;
          color: #6e6e6e;
        }
      }

      &__price {
        font-size: 0.875rem;
        line-height: 1.2;
        vertical-align: top;
        text-align: right;
        padding-top: 0.69rem;
        padding-right: 0.5rem;
        white-space: nowrap;
      }
    }
  }
</style>
