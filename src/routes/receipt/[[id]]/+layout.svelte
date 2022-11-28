<script lang="ts">
  import ReceiptNotFound from './ReceiptNotFound.svelte';
  import type { PageData } from './$types';

  export let data: PageData;
  const isValidReceipt = data.isValidReceipt as boolean;
  const id = data.id as string;
</script>

{#if isValidReceipt}
  <slot />
{:else}
  <ReceiptNotFound id="{id}" />
{/if}
