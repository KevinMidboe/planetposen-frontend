<script lang="ts">
  import PricingSection from './PricingSection.svelte';
  import DetailsSection from './DetailsSection.svelte';
  import Button from '$lib/components/Button.svelte';
  import type { PageServerData } from './$types';
  import type IProduct from '$lib/interfaces/IProduct';

  export let data: PageServerData;
  const product = data.product as IProduct;
  let edit = false;

  function save() {
    console.log('savvvving');
    edit = false;
  }
</script>

<h1>Product details</h1>
<div class="info row">
  <img src="{product.image}" alt="Product" />
  <div class="name-and-price">
    <p>{product.name}</p>
    <p>NOK {product.price}</p>
  </div>

  <div class="edit-button">
    {#if !edit}
      <Button text="Edit" on:click="{() => (edit = !edit)}" />
    {:else}
      <Button text="Save" on:click="{save}" />
    {/if}
  </div>
</div>

<h2>Details</h2>
<DetailsSection product="{product}" edit="{edit}" />

<h2>Variations</h2>
<PricingSection product="{product}" />

<h2>Metadata</h2>
<div>
  <p class="empty">No metadata</p>
</div>

<h2>Audit log</h2>
<div>
  <p class="empty">No logs</p>
</div>

<style lang="scss">
  @import '../../../styles/media-queries.scss';

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

    .edit-button {
      margin-left: auto;
    }

    img {
      width: 64px;
      height: 64px;
      border-radius: 6px;
    }

    .name-and-price > p {
      margin: 0.5rem 0 0.5rem 2rem;

      &:nth-of-type(2) {
        opacity: 0.6;
      }
    }
  }

  .label,
  .empty {
    color: grey;
  }
</style>
