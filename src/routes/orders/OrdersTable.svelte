<script lang="ts">
  import { goto } from '$app/navigation';
  import Badge from '$lib/components/Badge.svelte';
  import type { IOrderSummary } from '$lib/interfaces/IOrder';

  export let orders: Array<IOrderSummary>;

  function navigate(order: IOrderSummary) {
    goto(`/orders/${order.order_id}`);
  }
</script>

{#if orders?.length}
  <table>
    <thead>
      <tr>
        <th>Amount</th>
        <th>Status</th>
        <th>Order ID</th>
        <th>Customer</th>
        <th>Date</th>
        <th>Receipt</th>
      </tr>
    </thead>

    <tbody>
      {#each orders as order}
        <tr on:click="{() => navigate(order)}">
          <td>NOK {order.order_sum}</td>

          <td>
            <Badge title="{order.status}" type="{order?.status?.type}" />
          </td>

          <td>{order.order_id}</td>
          <td>{order.first_name} {order.last_name}</td>
          <td
            >{order?.created
              ? new Intl.DateTimeFormat('nb-NO', { dateStyle: 'short', timeStyle: 'short' }).format(
                  new Date(order.created)
                )
              : ''}</td
          >
          <td>
            <a href="receipt/{order.order_id}?email={order.email}">🧾</a>
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
{:else}
  <span>no orders</span>
{/if}

<style lang="scss" module="scoped">
  @import '../../styles/media-queries.scss';

  h2 {
    // text-decoration: underline;
    font-size: 1.2rem;

    .section-count {
      background-color: rgba(0,0,0,0.15);
      padding: 0.3rem 0.4rem;
      margin-left: 0.5rem;
      border-radius: 0.5rem;
      font-size: 1rem;
    }
  }

  table {
    width: 100%;
    border-collapse: collapse;

    thead {
      tr th {
        text-align: left;
      }

      tr {
        border-bottom: 1px solid lightgrey;
      }
    }

    td {
      white-space: nowrap;
    }

    tbody {
      a {
        font-size: inherit;
      }

      tr {
        border-bottom: 1px solid lightgrey;

        td {
          margin: 0.5rem 0;
        }

        &:hover {
          cursor: pointer;
          background-color: #f6f8fa;
        }
      }
    }

    @include mobile {
      tr > *:first-child {
        display: none;
      }
    }
  }
</style>
