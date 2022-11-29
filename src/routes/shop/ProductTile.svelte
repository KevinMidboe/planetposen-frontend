<script lang="ts">
  import type { IProduct } from '$lib/interfaces/IProduct';

  export let product: IProduct;
  export let large = false;
</script>

<a href="/shop/{product?.product_no}" class="product-tile">
  <div
    class="product"
    style="{`background-color: ${product?.primary_color || '#E6E0DC'}; color: ${
      product?.primary_color === '#231B1D' ? '#f3efeb' : '#37301e'
    }`}"
  >
    {#if !large}
      <h3>{product?.name}</h3>
    {/if}

    <div class="{`image-frame ${large ? 'large' : null}`}">
      <img src="{product?.image}" alt="{product?.name}" />
    </div>

    {#if !large}
    <p class="subtext">{product?.subtext}</p>
    {/if}
  </div>
</a>

<style lang="scss" module="scoped">
  @import '../../styles/media-queries.scss';

  :global(a.product-tile) {
    text-decoration: none !important;
    transform: none !important;
  }

  .product {
    margin: 1.5rem;
    padding: 1.5rem;
    background-color: #e6e0dc;
    color: #37301e;
    cursor: pointer;
    transition: all 0.4s ease;

    &:hover {
      margin: 1rem;
      padding: 2rem;

      img {
        transform: scale(1.02);
        box-shadow: 3px 3px 13px 3px rgba(0, 0, 0, 0.2);
      }
    }

    h3 {
      margin: 0.5rem 0;
      font-size: 22px;
      max-width: 75%;
      font-weight: normal;

      margin-bottom: auto;
      letter-spacing: 0.2px;
    }

    .subtext {
      text-transform: uppercase;
      margin: 0.5rem 0;
      font-size: 0.9rem;
      max-width: 75%;
    }

    .image-frame {
      display: grid;
      place-items: center;

      &.large img {
        width: 90%;
      }

      img {
        margin: 3rem 0;
        width: 66%;
        transition: all 0.6s ease;

        @include mobile {
          width: 75%;
        }
      }
    }

    // TODO grid view on mobile
    // @include mobile {
    //   margin: 0.5rem;
    //   padding: 0.5rem;

    //   h3 {
    //     margin: 0;
    //   }

    //   .image-frame img {
    //     width: 82%;
    //     margin: 1rem 0;
    //   }
    // }
  }
</style>
