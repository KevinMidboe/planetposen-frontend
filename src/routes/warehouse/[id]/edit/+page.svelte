<script lang="ts">
  import Input from '$lib/components/Input.svelte';
  import type { IProduct } from '$lib/interfaces/IProduct';
  import type { PageServerData } from './$types';

  export let data: PageServerData;
  const product = data.product as IProduct;
</script>

<h1>Attribute edit product</h1>
<div class="edit-product-page">
  <div>
    <h2>Product attributes</h2>
    <Input label="Name" value="{product.name}" required="{false}" />
    <Input label="Description" value="{product.description || ''}" required="{false}" />
    <Input label="Subtext" value="{product.subtext || ''}" required="{false}" />
    <Input label="Color" value="{product.primary_color || ''}" required="{false}" />
  </div>

  <div>
    <h2>Images</h2>
    <img src="{product.image}" />
  </div>

  <div class="variations">
    <h2>Variations</h2>

    {#if product?.variations?.length}
      {#each product.variations as variation}
        <span>{variation.size}</span>
        <span>{variation.price}</span>
        <span>{variation.stock}</span>
        <span>{variation.default_price}</span>
        <p></p>
        <hr />
      {/each}
    {/if}
  </div>

  <div>
    <h2>Add variations</h2>
    <label for="variations">Set/size</label>
    <select name="variations">
      <option>Set</option>
      <option>Large</option>
      <option>Medium</option>
      <option>Small</option>
      <option>Wine</option>
    </select>

    <Input label="Price" type="number" />
    <Input label="Stock" type="number" />
    <input type="checkbox" checked />
  </div>
</div>

<style lang="scss">
  @import '../../../../styles/media-queries.scss';

  :global(.edit-product-page label:not(:first-of-type)) {
    margin-top: 1.5rem;
  }

  :global(.edit-product-page label span) {
    font-size: 1rem !important;
  }

  // :global(.edit-product-page label input) {
  //   border-radius: 3.5px !important;
  // }

  h2 {
    font-size: 1.7rem;
  }

  .edit-product-page {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 2rem;

    @include mobile {
      grid-template-columns: 1fr;
    }

    img {
      max-width: 150px;
      border-radius: 6px;
    }
  }

  .variations {
    label {
      display: flex;
      flex-direction: column;
    }
  }
</style>
