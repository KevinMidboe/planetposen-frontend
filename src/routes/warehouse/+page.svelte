<script lang="ts">
  import { goto } from '$app/navigation';
  import ProductList from './WarehouseProductList.svelte';
  import type IProduct from '$lib/interfaces/IProduct';
  import Button from '$lib/components/Button.svelte';
  import type { PageData } from './$types';

  export let data: PageData;
  const products = data.products as Array<IProduct>;

  async function createProduct() {
    let url = '/api/product';
    if (window.location.href.includes('localhost')) {
      url = 'http://localhost:30010'.concat(url);
    }

    fetch(url, { method: 'POST' })
      .then((resp) => resp.json())
      .then((response) => {
        console.log('response::', response);
        const { product } = response;
        goto(`/warehouse/${product.product_no} `);
      });
  }
  console.log('warehouse:', products);
</script>

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
