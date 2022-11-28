<script lang="ts">
  import { goto } from '$app/navigation';
  import { browser } from '$app/environment';
  import { fly } from 'svelte/transition';
  import {
    removeProductFromCart,
    decrementProductInCart,
    incrementProductInCart
  } from '$lib/websocketCart';
  import { cart, isOpen, subTotal } from '$lib/cartStore';
  import IconTrashcan from '$lib/icons/IconTrashcan.svelte';
  import QuantitySelect from '$lib/components/QuantitySelect.svelte';
  import Button from '$lib/components/Button.svelte';
  import { onDestroy } from 'svelte';
  import type { Unsubscriber } from 'svelte/store';

  let cartHeight = 0;
  let isOpenSubscription: Unsubscriber;

  if (browser) {
    cartHeight = -1 * (window?.visualViewport?.height || 0);
  }

  function updateQuantityLineItem(id: number, event: Event) {
    console.log('todo update quantity by input', id, event);
  }

  function toggleNoScrollBody() {
    if (!browser) return;

    if ($isOpen === true && !document.body.classList.contains('no-scroll')) {
      document.body.classList.add('no-scroll');
    } else if ($isOpen === false && document.body.classList.contains('no-scroll')) {
      document.body.classList.remove('no-scroll');
    }
  }

  isOpenSubscription = isOpen.subscribe(() => toggleNoScrollBody());
  onDestroy(() => isOpenSubscription());
</script>

{#if $isOpen}
  <section class="{`cart ${isOpen && 'show'}`}" transition:fly="{{ y: cartHeight, duration: 800 }}">
    <div class="cart-container">
      <div class="products">
        <h2>Cart</h2>

        {#if $cart?.length > 0}
          <ul>
            {#each $cart as cartItem}
              <li class="cart-item">
                <div class="cart-item--left">
                  <img src="{cartItem.image}" alt="Product" />
                </div>

                <div class="cart-item--right">
                  <div class="cart-item--text">
                    {cartItem.name}, {cartItem.size}
                    <div class="subtotal">Nok {cartItem.price * cartItem.quantity}.00</div>
                  </div>

                  <div class="actions">
                    <QuantitySelect
                      on:decrement="{() => decrementProductInCart(cartItem.lineitem_id)}"
                      on:increment="{() => incrementProductInCart(cartItem.lineitem_id)}"
                      on:change="{(event) =>
                        updateQuantityLineItem(cartItem.lineitem_id, event?.detail)}"
                      value="{cartItem.quantity}"
                      small="{true}"
                    />

                    <div class="cart-item--trash">
                      <IconTrashcan
                        on:click="{() => removeProductFromCart(cartItem.lineitem_id)}"
                      />
                    </div>
                  </div>
                </div>
              </li>
            {/each}
          </ul>
        {:else}
          <h4>(empty)</h4>
        {/if}
      </div>

      {#if $cart?.length > 0}
        <div class="cart-summary">
          <h2>Summary</h2>

          <p>Subtotal: Nok {$subTotal}</p>

          <Button text="Gå til kassen" on:click="{() => goto('/checkout')}" />
        </div>
      {/if}
    </div>
  </section>
{/if}

<style lang="scss" module="scoped">
  @import '../styles/media-queries.scss';

  // move inside cart container
  h2 {
    font-size: 1.5rem;
    font-weight: 400;
    background-color: var(--background);
    margin: 0;
    padding: 1rem 0;
    padding-top: 5rem;
    z-index: 2;
  }

  .products {
    width: 70%;
    margin-right: 5%;
    float: left;
    position: relative;

    &::before {
      content: '';
      position: absolute;
      right: 0;
      top: 10%;
      height: 80%;
      z-index: 1;
      width: 1px;
      background-color: black;
    }
  }

  .cart-summary {
    width: 25%;
    float: left;
    margin-bottom: 3rem;

    p {
      margin: 1.5rem 0;
    }
  }

  @media (max-width: 600px) {
    .products,
    .cart-summary {
      width: 100%;

      &::before {
        width: 90%;
        left: 5%;
        height: 1px;
        top: unset;
        bottom: 0;
      }
    }
  }

  .cart {
    visibility: hidden;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 9;
    position: fixed;
    top: 0;
    bottom: 0;
    width: 100vw; /* viewport width */
    width: -webkit-fill-available; /* viewport width */
    // height: fit-content;
    height: -webkit-fill-available;
    overflow-y: scroll;
    overflow-x: hidden;
    backface-visibility: hidden;
    background-color: var(--background);
    color: #231f20;
    // margin: 48px 0 30px 0;
    margin: 0;
    margin-bottom: 3rem;
    transition: all 0.3s ease;

    &.show {
      visibility: visible;
      backface-visibility: visible;
    }

    @include desktop {
      height: fit-content;

      .cart-container {
        height: fit-content;
      }
    }
  }

  .cart-container {
    display: block;
    max-width: 2200px;
    padding: 0 1rem;
    margin: 0 auto;
    height: 100%;

    @include tablet {
      padding: 1.5rem 2.875rem;
    }
  }

  ul {
    margin-left: 0;
    padding-left: 0;
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    list-style: none;
  }

  .cart-item {
    // display: grid;
    // grid-template-columns: 1fr 1fr;
    margin-bottom: 1.5rem;
    width: 100%;
    display: flex;

    @include tablet {
      width: 50%;
    }

    @media (min-width: 1500px) {
      width: 33%;
    }

    &--left {
      min-width: 85px;
      width: 85px;
      margin-right: 1.5rem;

      img {
        width: 100%;
        border: 1px solid var(--background);
        border-radius: 0.4rem;
      }
    }

    &--right {
      position: relative;
      width: 100%;
    }

    &--text {
      margin-top: -0.25em;
      margin-bottom: 1em;
      font-size: 1rem;
      line-height: 1.25rem;
    }

    &--trash {
      display: inline-block;
      width: 1.75rem;
      // position: absolute;
      margin-left: 1rem;
      // bottom: 6px;

      @include mobile {
        bottom: 0px;
        right: 1rem;
      }
    }

    .actions {
      display: flex;
      flex-wrap: nowrap;
      justify-content: space-between;

      @media (min-width: 600px) {
        justify-content: flex-start;
      }
    }
  }

  :global(.cart-item--trash svg) {
    fill: grey;

    &:hover {
      cursor: pointer;
      fill: black;
    }
  }
</style>
