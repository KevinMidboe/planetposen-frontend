<script lang="ts">
  import type IProduct from '$lib/interfaces/IProduct';

  export let product: IProduct;
  export let edit: boolean;
</script>

<div class="details row">
  <div class="left">
    <ul class="property-list">
      <li>
        <span class="label">Name</span>
        {#if !edit}
          <span>{product.name}</span>
        {:else}
          <input bind:value="{product.name}" />
        {/if}
      </li>

      <li>
        <span class="label">Created</span>
        <span>{product.created}</span>
      </li>

      <li>
        <span class="label">Subtext</span>
        {#if !edit}
          <span>{product.subtext || '(empty)'}</span>
        {:else}
          <input bind:value="{product.subtext}" />
        {/if}
      </li>

      <li>
        <span class="label">Description</span>
        {#if !edit}
          <span>{product.description || '(empty)'}</span>
        {:else}
          <input class="wide" bind:value="{product.description}" />
        {/if}
      </li>

      <li>
        <span class="label">Primary color</span>
        {#if !edit}
          <span>{product.primary_color || '(empty)'}</span>
        {:else}
          <input bind:value="{product.primary_color}" />
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
    <span class="label">Image</span>
    <img src="{product.image}" alt="Product" />
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
      margin: 0;
      padding: 0;

      &.wide {
        width: -webkit-fill-available;
      }
    }

    .right {
      width: 50%;
      display: flex;

      span {
        padding: 0.4rem 0;
        margin-right: 1.5rem;
      }

      img {
        width: 110px;
        height: 110px;
        border-radius: 4px;
        margin-top: 0.4rem;
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

      li span:first-of-type {
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
