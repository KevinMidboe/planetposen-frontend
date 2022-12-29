<script lang="ts">
  import { goto } from '$app/navigation';
  import ProductList from './WarehouseProductList.svelte';
  import Button from '$lib/components/Button.svelte';
  import PageMeta from '$lib/components/PageMeta.svelte';
  import { buildApiUrl } from '$lib/utils/apiUrl';
  import type { IProduct } from '$lib/interfaces/IProduct';
  import type { PageData } from './$types';

  export let data: PageData;
  const products = data.products as Array<IProduct>;

  async function createProduct() {
    const url = buildApiUrl('/api/v1/product');
    fetch(url, { method: 'POST' })
      .then((resp) => resp.json())
      .then((response) => {
        const { product } = response;
        goto(`/warehouse/${product?.product_no} `);
      });
  }
  console.log('warehouse:', products);
</script>

<PageMeta title="Warehouse" description="View and edit products in warehouse/stock" />
<div class="warehouse-page">
  <h1>Warehouse</h1>

  <section class="content">
    <h2>Your products</h2>

    <ProductList products="{products}" />
  </section>

  <Button text="Add" on:click="{createProduct}" />
</div>

<style lang="scss">
  :global(.warehouse-page button) {
    margin-top: 2rem;
    margin-left: auto;
  }
</style>
