<script lang="ts">
  import CircleLoading from './CircleLoading.svelte';
  import CircleCheckmark from './CircleCheckmark.svelte';
  import CircleWarning from './CircleWarning.svelte';
  import CircleError from './CircleError.svelte';

  export let promise: Promise<any>;
</script>

{#await promise}
  <CircleLoading />
{:then}
  <CircleCheckmark />
{:catch type}
  {#if type === 'warning'}
    <CircleWarning />
  {:else if type === 'error'}
    <CircleError />
  {:else}
    <CircleError />
  {/if}
{/await}
