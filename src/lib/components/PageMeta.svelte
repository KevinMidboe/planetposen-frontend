<script lang="ts">
  export let title: string;
  export let description: string | undefined;
</script>

<svelte:head>
  <title>{title} | planetposen</title>
  <meta name="description" content="{description}" />
</svelte:head>
