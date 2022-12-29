<script lang="ts">
  import { count, toggleCart, isOpen } from '../cartStore';
  import IconCart from '../icons/IconCart.svelte';

  $: openClass = $isOpen ? 'open' : '';
</script>

<div
  id="cart"
  class="{openClass}"
  on:click="{() => toggleCart()}"
  on:keypress="{(e) => e.code === 'Enter' && toggleCart()}"
  tabindex="0"
>
  {#if $count > 0}
    <span>{$count}</span>
  {/if}

  <IconCart />
</div>

<style lang="scss" module="scoped">
  #cart {
    padding: 0.3rem 0.6rem;
    display: grid;
    place-items: center;
    // background-color: #E6E0DC;
    color: #18332f;
    // border: 1px solid rgba(0,0,0,0.1);
    z-index: 99;
    transition: all 0.25s ease;

    &:hover,
    &.open {
      cursor: pointer;
      background-color: #18332f;
      color: #e6e0dc;
      border: 1px solid rgba(0, 0, 0, 0.1);
    }

    display: flex;
    align-items: center;
    border-radius: 6px;
    margin-right: 0.5rem;
    border: 1px solid transparent;

    span {
      margin-right: 0.75rem;
      font-size: 1rem;
      margin-top: -3px;
    }
  }

  :global(#cart svg) {
    max-width: 20px;
    width: 20px;
    fill: #18332f;
    transition: fill 0.25s ease;
  }
  :global(#cart:hover svg, #cart.open svg) {
    fill: #e6e0dc;
  }
</style>
