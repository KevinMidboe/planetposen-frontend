<script lang="ts">
  import Time from '$lib/components/Time.svelte';
  import ImageUpload from '$lib/components/ImageUpload.svelte';
  import { buildApiUrl } from '$lib/utils/apiUrl';
  import type { IProduct } from '$lib/interfaces/IProduct';

  export let product: IProduct;
  export let edit: boolean;

  async function addImage(event: CustomEvent) {
    const imageUrl = event.detail;
    const url = buildApiUrl(`/api/v1/product/${product.product_no}/image`);
    const options = {
      method: 'POST',
      body: JSON.stringify({
        url: imageUrl
      }),
      headers: { 'Content-Type': 'application/json' }
    };

    const resp = await fetch(url, options);
    const { images } = await resp.json();

    product.images = images;
  }

  async function deleteImage(image_id: number) {
    const url = buildApiUrl(`/api/v1/product/${product.product_no}/image/${image_id}`);
    const resp = await fetch(url, { method: 'DELETE' });
    const { images } = await resp.json();

    console.log('received images from DELETE:', images);
    product.images = images;

    console.log('product.images:', product.images);
  }

  function setDefault(image_id: number) {
    if (!product.images) return;

    const url = buildApiUrl(`/api/v1/product/${product.product_no}/image/${image_id}/default`);
    fetch(url, { method: 'POST' })
      .then((resp) => resp.json())
      .then((response) => (product.images = response?.images));
  }
</script>

<div class="details row">
  <div class="left">
    <ul class="property-list">
      <li>
        <span class="label">Name</span>
        {#if !edit}
          <span>{product.name}</span>
        {:else}
          <input name="name" class="wide" id="name" bind:value="{product.name}" />
        {/if}
      </li>

      <li>
        <span class="label">Created</span>
        <Time time="{product.created}" />
      </li>

      <li>
        <span class="label">Updated</span>
        <Time time="{product.updated}" />
      </li>

      <li>
        <label for="subtext" class="label">Subtext</label>
        {#if !edit}
          <span>{product.subtext || '(empty)'}</span>
        {:else}
          <input name="subtext" id="subtext" bind:value="{product.subtext}" />
        {/if}
      </li>

      <li>
        <label for="description" class="label">Description</label>
        {#if !edit}
          <span class="description">{product.description || '(empty)'}</span>
        {:else}
          <textarea
            rows="6"
            class="wide description"
            name="description"
            id="description"
            bind:value="{product.description}"></textarea>
        {/if}
      </li>

      <li>
        <label for="primary_color" class="label">Primary color</label>
        {#if !edit}
          <span>{product.primary_color || '(empty)'}</span>
        {:else}
          <input
            type="color"
            name="primary_color"
            id="primary_color"
            bind:value="{product.primary_color}"
          />
        {/if}
        {#if product.primary_color}
          <div class="color-box" style="{`--color: ${product.primary_color}`}"></div>
        {/if}
      </li>

      <li>
        <span class="label">Feature list</span>
        <span class="empty">(empty)</span>
      </li>
    </ul>
  </div>

  <div class="right">
    <span class="label">Images</span>
    <div class="images-and-upload">
      <div class="images">
        {#each product?.images || [] as { url, default_image, image_id } (image_id)}
          <div class="img" on:drop="{() => setDefault(image_id)}" on:dragover|preventDefault>
            <img src="{url}" alt="Product" />
            <button class="delete" on:click="{() => deleteImage(image_id)}">❌</button>
            {#if default_image}
              <button class="default_image" draggable="true">🟣</button>
            {/if}
          </div>
        {/each}
      </div>

      <ImageUpload on:added="{addImage}" />
    </div>
  </div>
</div>

<style lang="scss">
  @import '../../../styles/media-queries.scss';

  .details {
    display: flex;

    .left {
      width: 50%;
      display: flex;
      flex-direction: column;
    }

    input {
      margin: -2px 0 -2px -2px;
      padding: 0;
    }

    .wide {
      width: 100%;
      width: -webkit-fill-available;
      margin-right: 0.5rem;
    }

    span.description {
      white-space: pre-line;
    }

    textarea.description {
      height: auto;
    }

    .right {
      width: 50%;
      display: flex;

      @include mobile {
        flex-direction: column;
      }

      span {
        padding: 0.4rem 0;
        margin-right: 1.5rem;
      }

      .images-and-upload {
        display: flex;
        flex-direction: column;
      }

      .images .img {
        position: relative;
        display: inline-block;
        width: 110px;
        border-radius: 4px;
        margin: 0 0.4rem 0.4rem 0;

        img {
          width: inherit;
        }
      }

      button {
        position: absolute;
        top: 0;
        border: none;
        background-color: transparent;
        cursor: pointer;
        margin: 0;
        padding: 0.25rem;
      }
      .delete {
        right: 0;
      }
      .default_image {
        cursor: move;
        left: 0;
      }
    }

    @include mobile {
      flex-direction: column;

      .left,
      .right {
        width: 100%;
      }

      .right {
        margin-top: 2rem;
      }
    }

    ul.property-list {
      list-style: none;
      padding-left: 0;
      margin-top: 0;

      li {
        padding: 0.4rem 0;
        display: flex;
        align-items: center;
      }

      li span:first-of-type, li label:first-of-type {
        display: inline-block;
        margin-bottom: auto;
        min-width: 30%;
      }

      .color-box {
        margin-left: 1rem;
        display: inline-block;
        background-color: var(--color);
        width: 20px;
        height: 20px;
        border-radius: 4px;
      }
    }
  }
</style>
