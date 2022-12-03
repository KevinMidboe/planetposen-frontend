<script lang="ts">
  export let title: string;
  export let description: string | undefined;
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="description" content="{description}" />
</svelte:head>
