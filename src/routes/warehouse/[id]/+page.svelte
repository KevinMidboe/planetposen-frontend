<script lang="ts">
  import PricingSection from './PricingSection.svelte';
  import DetailsSection from './DetailsSection.svelte';
  import Button from '$lib/components/Button.svelte';
  import { buildApiUrl } from '$lib/utils/apiUrl';
  import type { PageServerData } from './$types';
  import type { IProduct } from '$lib/interfaces/IProduct';
  import type IProductVariation from '$lib/interfaces/IProductVariation';

  export let data: PageServerData;
  let product = data.product as IProduct;
  let logs = data.logs;
  let form: HTMLFormElement;
  let edit = false;

  function saveProduct(event: SubmitEvent) {
    const formData = new FormData(event.target as HTMLFormElement);
    const productUpdate = {
      name: formData.get('name'),
      subtext: formData.get('subtext'),
      description: formData.get('description'),
      primary_color: formData.get('primary_color')
    } as IProduct;

    const url = buildApiUrl(`/api/v1/product/${product.product_no}`);
    const options = {
      method: 'PUT',
      body: JSON.stringify(productUpdate),
      headers: { 'Content-Type': 'application/json' }
    };

    fetch(url, options)
      .then((resp) => resp.json())
      .then((response) => (product = response?.product || product));
    edit = false;
  }

  function sumVariations(variations: IProductVariation[] | undefined) {
    if (!variations) return 0;

    let sum = 0;
    variations.forEach((variation: IProductVariation) => (sum += variation.stock));
    return sum;
  }

  $: totalVariations = sumVariations(product.variations);
  $: displayImage =
    product?.images?.find((image) => image?.default_image)?.url || product?.images?.[0]?.url || '';
</script>

<h1>Product details</h1>
<form bind:this="{form}" on:submit|preventDefault="{saveProduct}">
  <div class="info row">
    <img src="{displayImage}" alt="Product" />
    <div class="name-and-price">
      <p>{product.name}</p>
      <p>Left in stock: {totalVariations}</p>
    </div>
  </div>

  <div class="row edit-button">
    {#if !edit}
      <Button text="Edit" on:click="{() => (edit = !edit)}" />
    {:else}
      <Button type="submit" text="Save" />
    {/if}
  </div>

  <h2>Details</h2>
  <DetailsSection bind:product="{product}" edit="{edit}" />
</form>

<h2>Variations</h2>
<PricingSection bind:product="{product}" />

<h2>Metadata</h2>
<div>
  <p class="empty">No metadata</p>
</div>

<h2>Audit log</h2>
<div>
  {#if logs?.length > 0}
    <pre class="audit-logs">
      {#each logs as log}
        <code>{log?.changed_fields}</code>
      {/each}
    </pre>
  {:else}
    <p class="empty">No logs</p>
  {/if}
</div>

<style lang="scss">
  @import '../../../styles/media-queries.scss';

  h1 {
    word-break: break-all;
  }

  .row {
    display: flex;
    width: 100%;
  }

  h2 {
    width: 100%;
    font-size: 1.5rem;
    border-bottom: 1px solid rgba(0, 0, 0, 0.3);
  }

  .info {
    align-items: center;

    img {
      width: 4rem;
      border-radius: 6px;
    }

    .name-and-price > p {
      margin: 0.5rem 0 0.5rem 2rem;

      &:first-of-type {
        font-size: 1.5rem;
      }

      &:nth-of-type(2) {
        opacity: 0.6;
      }
    }
  }

  .edit-button {
    margin-top: 1rem;

    @include tablet {
      justify-content: end;
      margin-top: -3rem;
    }
  }

  pre.audit-logs {
    display: flex;
    flex-direction: column;
  }

  .label,
  .empty {
    color: grey;
  }
</style>
