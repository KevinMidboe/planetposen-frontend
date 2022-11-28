<script lang="ts">
  import type { IShipping } from '$lib/interfaces/IOrder';

  export let shipping: IShipping;
</script>

{#if shipping}
  <section>
    <h2>Tracking</h2>
    <ul class="property-list">
      <li>
        <span class="label">Tracking code</span>
        <span>{shipping.tracking_code}</span>
      </li>

      <li>
        <span class="label">Tracking company</span>
        <span>{shipping.company}</span>
      </li>

      <li>
        <span class="label">Link</span>
        <span
          ><a href="{shipping.tracking_link}" target="_blank" rel="noopener noreferrer"
            >{shipping.tracking_link}</a
          ></span
        >
      </li>
    </ul>
  </section>
{/if}

<style lang="scss">
  @import './styles-order-page.scss';
</style>
