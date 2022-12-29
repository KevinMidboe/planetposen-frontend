<script lang="ts">
  import type { IProduct } from '$lib/interfaces/IProduct';

  export let product: IProduct;
</script>

<a href="/shop/{product?.product_no}" class="product-tile">
  <div
    class="product"
    style="{`background-color: ${product?.primary_color || '#E6E0DC'}; color: ${
      product?.primary_color === '#231B1D' ? '#f3efeb' : '#37301e'
    }`}"
  >
    <h3>{product?.name}</h3>

    <div class="image-frame">
      <img src="{product?.image}" alt="{product?.name}" />
    </div>

    {#if product?.subtext?.length > 3}
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

      img {
        margin: 3rem 0;
        width: 66%;
        transition: all 0.6s ease;

        @include mobile {
          margin: 2rem 0;
          width: 90%;
        }
      }
    }
  }
</style>
