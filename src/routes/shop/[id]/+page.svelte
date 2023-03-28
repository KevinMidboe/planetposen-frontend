<script lang="ts">
  import ProductVariationSelect from '$lib/components/ProductVariationSelect.svelte';
  import QuantitySelect from '$lib/components/QuantitySelect.svelte';
  import SizesSection from './SizesSection.svelte';
  import Button from '$lib/components/Button.svelte';
  import PageMeta from '$lib/components/PageMeta.svelte';
  import ImageCarousel from '$lib/components/ImageCarousel.svelte';
  import IconArrow from '$lib/icons/IconArrow.svelte';
  import type { PageData } from './$types';
  import type { IProduct, IVariation } from '$lib/interfaces/IProduct';

  export let data: PageData;
  const product = data.product as IProduct;
  import { addProductToCart } from '$lib/websocketCart';

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

  function defaultVariation() {
    return product.variations?.find((variation) => variation.default_price);
  }

  let cooldownInputs = false;
  let quantity = 1;
  let selectedVariation: IVariation | undefined = defaultVariation();
  let pageTitle = `Nettbutikk - ${product.name}`;

  $: addProductButtonText = cooldownInputs
    ? `${quantity} produkt${quantity > 1 ? 'er' : ''} lagt til`
    : `Legg til ${quantity} i handlekurven`;
</script>

<PageMeta title="{pageTitle}" description="{product.description}" />

<IconArrow pointLeft="{true}" />
<div class="product-container">
  <ImageCarousel product="{product}" />

  <div class="details">
    <h2 class="name">{product.name}</h2>
    <p>{product.subtext}</p>
    <p class="description">{product.description}</p>
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

{#if data?.jsonld}
  {@html data.jsonld}
{/if}

<style lang="scss" module="scoped">
  @import '../../../styles/media-queries.scss';

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
        font-size: 2em;
      }

      .description {
        white-space: pre-line;
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
