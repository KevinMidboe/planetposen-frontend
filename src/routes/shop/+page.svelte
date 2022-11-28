<script lang="ts">
  import type { PageData } from './$types';
  import ProductTile from './ProductTile.svelte';
  import type IProduct from '$lib/interfaces/IProduct';

  export let data: PageData;
  const products = data.products as Array<IProduct>;
</script>

<div class="page">
  <h1>Nettbutikk</h1>

  <section class="content tiles-container">
    {#each products as product}
      <ProductTile product="{product}" />
    {/each}
  </section>
</div>

<style lang="scss" module="scoped">
  @import '../../styles/media-queries.scss';

  .tiles-container {
    display: grid;
    grid-template-columns: 1fr;
    max-width: 2000px;
    margin: 0 auto;

    @include mobile {
      grid-template-columns: 1fr;
    }

    @include tablet {
      grid-template-columns: 1fr 1fr;
    }

    @include desktop {
      grid-template-columns: 1fr 1fr 1fr;
    }
  }
</style>
