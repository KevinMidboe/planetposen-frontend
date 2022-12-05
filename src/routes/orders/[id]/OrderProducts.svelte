<script lang="ts">
  import type { ILineItem } from '$lib/interfaces/IOrder';

  export let lineItems: Array<ILineItem>;
</script>

<h2>Products</h2>

<table>
  <thead>
    <tr>
      <th class="image-column"></th>
      <th>Name</th>
      <th>Type</th>
      <th>Quantity</th>
      <th>Total</th>
    </tr>
  </thead>

  <tbody>
    {#each lineItems as product}
      <tr>
        <td class="image-column">
          <img src="{product.image}" alt="{product.name}" />
        </td>

        <td>
          <p>{product.name}</p>
        </td>

        <td>{product.size}</td>

        <td>{product.quantity}</td>

        <td>Nok {product.price * product.quantity}</td>
      </tr>
    {/each}
  </tbody>
</table>

<style lang="scss">
  @import '../../../styles/media-queries.scss';

  h2 {
    width: 100%;
    font-size: 1.5rem;
    border-bottom: 1px solid rgba(0, 0, 0, 0.3);
  }

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

    .image-column {
      width: 4rem;
      max-width: 4rem;
      margin: 0 0.5rem;
    }

    td,
    th {
      white-space: nowrap;
      padding: 0.4rem 0.6rem;
    }

    tbody {
      img {
        width: 4rem;
        height: 4rem;
        border-radius: 0.4rem;
      }

      .image-column {
        display: grid;
        place-items: center;
      }

      tr {
        border-bottom: 1px solid rgba(0, 0, 0, 0.05);

        &:hover {
          background-color: #f6f8fa;
        }
      }
    }

    @include mobile {
      tr > *:first-child {
        display: none;
      }
    }

    // @include mobile {
    //   tr > *:last-child, tr > :nth-child(4) {
    //     display: none;
    //   }
    // }
  }
</style>
