<script lang="ts">
  import ProductTile from './ProductTile.svelte';
  import Button from './Button.svelte';
  import type { IProduct } from '$lib/interfaces/IProduct';
  import LinkArrow from './LinkArrow.svelte';

  export let products: IProduct[];
  export let title: string;
  export let textColor: string = 'black';
  export let backgroundColor: string = 'white';

  let galleryStyles = `background-color: ${backgroundColor}; color: ${textColor}`;
</script>

<div class="product-gallery" style="{galleryStyles}">
  <h1>{title}</h1>

  {#each products as product}
    <ProductTile product="{product}" />
  {/each}

  <footer>
    <a href="/shop" class="link">Utforsk webshopen<LinkArrow /></a>
  </footer>
</div>

<style lang="scss">
  @import '../../styles/media-queries.scss';

  h1 {
    font-size: 3rem;
    padding: 3rem;
    padding-right: 1rem;
  }

  .product-gallery {
    display: grid;
    grid-template-columns: 1fr;
    width: calc(100% - 2rem);
    padding: 3rem 1rem;
    margin: 4rem auto;
    box-shadow: 0px -1px 30px 2px rgba(181, 196, 174) inset;
    -webkit-box-shadow: 0px -1px 30px 2px rgba(181, 196, 174) inset;
    -moz-box-shadow: 0px -1px 30px 2px rgba(181, 196, 174) inset;

    footer {
      grid-column: 1/-1;
      justify-content: center;
      display: flex;
      font-size: 2rem;
    }

    @include mobile {
      grid-template-columns: 1fr 1fr;
    }

    @include tablet {
      grid-template-columns: 1fr 1fr;
    }

    @include desktop {
      grid-template-columns: 1fr 1fr 1fr 1fr;
    }
  }
</style>
