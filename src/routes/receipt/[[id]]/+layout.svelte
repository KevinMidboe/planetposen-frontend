<script lang="ts">
  import PoolInitiatedOrder from './PoolInitiatedOrder.svelte';
  import ReceiptNotFound from './ReceiptNotFound.svelte';
  import BadgeType from '$lib/interfaces/BadgeType';

  import type { PageData } from './$types';
  import PageMeta from '$lib/components/PageMeta.svelte';

  export let data: PageData;
  let orderStatus: BadgeType = BadgeType.NOT_FOUND;

  if (data?.order) {
    orderStatus = data.order?.status;
  }

  const id = data?.id as string;
</script>

<PageMeta title="Kvittering" description="Søk og finn din ordre kvittering" />

{#if orderStatus === BadgeType.NOT_FOUND}
  <ReceiptNotFound id="{id}" />
{:else if orderStatus === BadgeType.INITIATED}
  <PoolInitiatedOrder />
{:else}
  <slot />
{/if}
