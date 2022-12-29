<script lang="ts">
  import { goto } from '$app/navigation';
  import type { IProduct } from '$lib/interfaces/IProduct';

  export let products: Array<IProduct>;

  function navigate(product: IProduct) {
    goto(`/warehouse/${product.product_no}`);
  }
</script>

<table>
  <thead>
    <tr>
      <th class="image-column"></th>
      <th>Name</th>
      <th class="stock-column">In-Stock</th>
      <th class="date-column">created</th>
      <th class="date-column">updated</th>
    </tr>
  </thead>

  <tbody>
    {#each products as product}
      <tr on:click="{() => navigate(product)}">
        <td class="image-column">
          <img src="{product.image}" alt="{product.name}" />
        </td>

        <td class="name-and-price">
          <p><a href="/warehouse/{product.product_no}">{product.name}</a></p>
          <p>{product?.variation_count} variation(s)</p>
        </td>

        <td class="stock-column">{product?.sum_stock}</td>

        <td class="date-column">
          {new Intl.DateTimeFormat('nb-NO', { dateStyle: 'short', timeStyle: 'short' }).format(
            new Date(product.created || 0)
          )}
        </td>

        <td class="date-column">
          {new Intl.DateTimeFormat('nb-NO', { dateStyle: 'short', timeStyle: 'short' }).format(
            new Date(product.updated || 0)
          )}
        </td>
      </tr>
    {/each}
  </tbody>
</table>

<style lang="scss">
  @import '../../styles/media-queries.scss';

  table {
    width: 100%;
    border-collapse: collapse;

    thead {
      tr th {
        text-align: left;
        text-transform: uppercase;
        font-size: 0.8rem;
        font-weight: 500;
      }

      tr {
        border-bottom: 1px solid rgba(0, 0, 0, 0.05);
      }
    }

    .stock-column {
      width: 80px;
      max-width: 80px;
      text-align: center;
    }

    .date-column {
      width: 150px;
      max-width: 150px;
    }

    .image-column {
      width: 4rem;
      max-width: 4rem;

      @include desktop {
        margin: 0 0.5rem;
      }
    }

    .name-and-price > p {
      margin: 0.5rem 0;

      &:not(:nth-of-type(1)) {
        opacity: 0.6;
      }
    }

    td,
    th {
      padding: 0.4rem 0.6rem;
    }

    tbody {
      a {
        font-size: inherit;
      }

      img {
        width: 4rem;
        border-radius: 0.4rem;
      }

      tr {
        border-bottom: 1px solid rgba(0, 0, 0, 0.05);
        cursor: pointer;

        &:hover {
          background-color: #f6f8fa;
        }
      }
    }

    @include mobile {
      tr > *:last-child,
      tr > :nth-child(4) {
        display: none;
      }
    }
  }
</style>
