<script lang="ts">
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';
  import CircleLoading from '$lib/components/loading/CircleLoading.svelte';
  import { buildApiUrl } from '$lib/utils/apiUrl';
  import type { PageServerData } from './$types';

  const { data } = $page;
  const id = data?.id as string;

  let maxPoolTime: Date = new Date();
  maxPoolTime.setSeconds(maxPoolTime.getSeconds() + 15);

  if (!id) {
    console.log('no id found after all:(');
  }

  function redirect() {
    const url = `/receipt/${id}`;
    window.location.href = url;
    goto(url);
  }

  function checkOrder() {
    const url = buildApiUrl(`/api/v1/order/${id}`);
    return fetch(url)
      .then((resp) => resp.json())
      .then((response) => {
        response?.order?.status !== 'INITIATED' ? redirect() : null;
      });
  }

  function pool() {
    if (new Date() < maxPoolTime) {
      setTimeout(() => checkOrder().then(() => pool()), 1500);
      return;
    }
  }

  onMount(pool);
</script>

<section class="order-confirmation">
  <CircleLoading />

  <h1>Bestillingen din behandles</h1>

  <div class="order-description">
    <p>Vent noen sekunder mens betalingen din blir godkjent</p>
  </div>
</section>

<style lang="scss">
  @import './styles-receipt-page.scss';

  h1 {
    text-align: center;
  }
</style>
