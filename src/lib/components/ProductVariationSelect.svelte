<script lang="ts">
  import { createEventDispatcher, onMount } from 'svelte';
  import type IProductVariation from '$lib/interfaces/IProductVariation';

  const dispatch = createEventDispatcher();

  export let variations: IProductVariation[];
  let selectedVariation: IProductVariation;

  function defaultVariationIndex(variations: IProductVariation[]) {
    return variations.findIndex((variation) => variation?.default_price || false);
  }

  function emitSelectedVariation(_selectedVariation: IProductVariation) {
    selectedVariation = _selectedVariation;
    dispatch('selected', _selectedVariation);
  }

  onMount(() => {
    if (!variations) return;

    const defaultVariation = variations[defaultVariationIndex(variations) || 0];
    emitSelectedVariation(defaultVariation);
  });
</script>

<ul class="product-variations">
  {#each variations as variation}
    <li
      class="{`variation ${variation.sku_id === selectedVariation?.sku_id && 'selected'}`}"
      on:click="{() => emitSelectedVariation(variation)}"
    >
      <span>Størrelse: {variation.size}</span>
      <span>NOK {variation.price}</span>
    </li>
  {/each}
</ul>

<style lang="scss">
  ul.product-variations {
    list-style-type: none;
    padding-left: 0;

    max-width: 400px;

    li.variation {
      padding: 1rem 1rem;
      margin: 0.5rem 0;
      border: 2px solid rgba(0, 0, 0, 0.3);
      display: flex;
      justify-content: space-between;
      transition: all 0.15s ease;

      &:hover {
        cursor: pointer;
        border: 2px solid rgba(0, 0, 0, 0.6);
      }

      &.selected {
        border-color: black;
      }
    }
  }
</style>
