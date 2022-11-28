<script lang="ts">
  import type { PageData } from './$types';
  import ProductTile from '../ProductTile.svelte';
  import ProductVariationSelect from '$lib/components/ProductVariationSelect.svelte';
  import QuantitySelect from '$lib/components/QuantitySelect.svelte';
  import SizesSection from './SizesSection.svelte';
  import type IProduct from '$lib/interfaces/IProduct';
  import type IProductVariation from '$lib/interfaces/IProductVariation';
  import Button from '$lib/components/Button.svelte';

  export let data: PageData;
  const product = data.product as IProduct;
  import { addProductToCart } from '$lib/websocketCart';
  console.log('shop product:', product);

  function setSelectedVariation(event: CustomEvent) {
    selectedVariation = event.detail;
  }

  function addProductClicked() {
    cooldownInputs = true;
    addProductToCart(product.product_no, selectedVariation.sku_id, quantity);
    setTimeout(() => reset(), 2300);
  }

  function reset() {
    quantity = 1;
    cooldownInputs = false;
  }

  let cooldownInputs = false;
  let quantity = 1;
  let selectedVariation: IProductVariation;
  $: addProductButtonText = cooldownInputs
    ? `${quantity} produkt${quantity > 1 ? 'er' : ''} lagt til`
    : `Legg til ${quantity} i handlekurven`;
</script>

<div class="product-container">
  <ProductTile product="{product}" large="{true}" />

  <div class="details">
    <h2 class="name">{product.name}</h2>
    <p class="subtext">{product.subtext}</p>
    <p class="subtext">{product.description}</p>
    <p class="price">NOK {selectedVariation?.price} (Ink. Moms)</p>

    <ProductVariationSelect
      variations="{product.variations}"
      on:selected="{setSelectedVariation}"
    />

    <QuantitySelect bind:value="{quantity}" disabled="{cooldownInputs}" />

    <div class="button">
      <Button
        on:click="{() => addProductClicked()}"
        text="{addProductButtonText}"
        active="{cooldownInputs}"
      />
    </div>
  </div>
</div>
<SizesSection />

<style lang="scss" module="scoped">
  @import '../../../styles/media-queries.scss';
  // @import "../styles/global.scss";

  .product-container {
    display: grid;
    max-width: 1200px;
    margin: 2rem auto 4rem;

    grid-template-columns: 1fr;

    @include tablet {
      margin: 8rem auto 2rem;
      grid-template-columns: 1fr 1fr;
    }

    > * {
      margin: 1rem;
    }

    .details {
      .name {
        font-size: 2rem;
      }

      .price {
        margin-top: 3rem;
        font-size: 1.5rem;
      }

      p {
        font-size: 1.2rem;
      }

      .button {
        margin-top: 3rem;
      }

      @include desktop {
        margin-left: 4rem;
      }
    }
  }
</style>
