<script lang="ts">
  import type { IProduct, IVariation } from '$lib/interfaces/IProduct';
  import Button from '$lib/components/Button.svelte';
  import Badge from '$lib/components/Badge.svelte';
  import BadgeType from '$lib/interfaces/BadgeType';
  import { buildApiUrl } from '$lib/utils/apiUrl';

  export let product: IProduct;
  let table: HTMLElement;
  let editingVariationIndex = -1;

  interface ISkuResponse {
    skus: IVariation[];
    success: boolean;
  }

  const setEditIndex = (index: number, event: MouseEvent) => {
    if (!table.contains(event.target as Node)) {
      console.log('outside?', index);
      // editingVariationIndex = -1;
    } else {
      console.log('inside');
    }
    editingVariationIndex = index;
  };
  const resetEditingIndex = () => (editingVariationIndex = -1);
  const updateProductsVariations = (response: ISkuResponse) => {
    product.variations = response?.skus || [];
    editingVariationIndex = product.variations.length - 1;
  };

  function setDefault(variation: IVariation) {
    if (!product.variations) return;

    const url = buildApiUrl(
      `/api/v1/product/${product.product_no}/sku/${variation.sku_id}/default`
    );
    fetch(url, { method: 'POST' })
      .then((resp) => resp.json())
      .then((response) => (product.variations = response?.skus));
  }

  function addSkuVariation() {
    const url = buildApiUrl(`/api/v1/product/${product.product_no}/sku`);
    fetch(url, { method: 'POST' })
      .then((resp) => resp.json())
      .then(updateProductsVariations);
  }

  function saveSkuVariation(variation: IVariation) {
    const url = buildApiUrl(`/api/v1/product/${product.product_no}/sku/${variation?.sku_id}`);
    const { stock, size, price } = variation;
    const options = {
      method: 'PUT',
      body: JSON.stringify({ stock, price, size }),
      headers: {
        'Content-Type': 'application/json'
      }
    };

    fetch(url, options)
      .then((resp) => resp.json())
      .then(updateProductsVariations)
      .then(() => resetEditingIndex());
  }

  function deleteVariation(variation: IVariation) {
    const url = buildApiUrl(`/api/v1/product/${product.product_no}/sku/${variation?.sku_id}`);
    fetch(url, { method: 'DELETE' })
      .then((resp) => resp.json())
      .then(updateProductsVariations)
      .then(() => resetEditingIndex());
  }
</script>

<table class="pricing" bind:this="{table}">
  <thead>
    <tr>
      <th>Price</th>
      <th>Stock</th>
      <th>Type/size</th>
      {#if editingVariationIndex >= 0}
        <th class="cta">Save</th>
        <th class="cta">Delete</th>
      {:else}
        <th class="cta"></th>
        <th class="cta"></th>
      {/if}
    </tr>
  </thead>

  <tbody>
    {#if product?.variations?.length}
      {#each product?.variations as variation, index}
        <tr
          class="edit"
          on:click="{(event) => setEditIndex(index, event)}"
          on:drop="{() => setDefault(variation)}"
          on:dragover|preventDefault
        >
          <td>
            {#if editingVariationIndex !== index}
              <span>Nok {variation.price}</span>
            {:else}
              <span>Nok <input type="number" bind:value="{variation.price}" /></span>
            {/if}

            {#if variation.default_price}
              <div draggable="true">
                <Badge title="Default price" type="{BadgeType.PENDING}" icon="" />
              </div>
            {/if}
          </td>
          {#if editingVariationIndex !== index}
            <td>{variation.stock}</td>
            <td>{variation.size}</td>
            <td></td>
            <td></td>
          {:else}
            <td><input type="number" bind:value="{variation.stock}" /></td>
            <td><input bind:value="{variation.size}" /></td>
            <td class="cta">
              <button on:click="{() => saveSkuVariation(variation)}">💾</button>
            </td>
            <td class="cta">
              <button on:click="{() => deleteVariation(variation)}">🗑️</button>
            </td>
          {/if}
        </tr>
      {/each}
    {/if}
  </tbody>
</table>

<Button text="add new" on:click="{addSkuVariation}" />

<style lang="scss" module="scoped">
  @import '../../../styles/media-queries.scss';

  table.pricing {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 1.85rem;

    thead th {
      text-align: left;
      font-weight: 500;

      &:not(&:first-of-type) {
        width: 10%;
      }
    }

    .cta {
      width: 45px !important;
      text-align: center;
    }

    [draggable='true'] {
      cursor: move;
    }

    tbody {
      td {
        min-height: 2rem;
      }

      tr:hover {
        cursor: pointer;
        background-color: #f6f8fa;
      }

      tr:not(.edit) {
        td {
          padding-right: 3rem;
        }

        &:hover > td:first-of-type {
          position: relative;

          &::before {
            content: '✏️';
            position: absolute;
            left: -1.5rem;
            top: 0.5rem;
            font-size: 1rem;
          }
        }
      }

      button {
        -webkit-appearance: none;
        background-color: transparent;
        border: unset;
        cursor: pointer;
      }

      input {
        max-width: 4rem;
        padding: 0;
        margin: 0;
      }

      td:first-of-type {
        display: flex;
        align-items: center;

        span {
          margin-right: 1rem;
        }
      }
    }

    td {
      white-space: nowrap;
      -webkit-user-select: none;
      user-select: none;
    }
  }
</style>
