<script lang="ts">
  export let time: Date | string | undefined;

  let dateLocaleString: string;
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'short',
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    timeZone: 'Europe/Oslo'
  };

  if (time) {
    dateLocaleString = new Date(time).toLocaleString('no-NB', options);
  }
</script>

{#if dateLocaleString}
  <span>{dateLocaleString}</span>
{:else}
  <span>(no date found)</span>
{/if}
