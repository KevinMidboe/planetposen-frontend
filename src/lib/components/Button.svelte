<script lang="ts">
  export let text = 'Bestill';
  export let type: string | null = null;
  export let active = false;
</script>

<button on:click type="{type}" class="{active ? 'active' : null}">{text}</button>

<style lang="scss" module="scoped">
  button {
    webkit-font-smoothing: antialiased;
    align-items: flex-start;
    display: block;
    appearance: auto;
    background-clip: border-box;
    background-color: var(--color-theme-1);
    border: 2px solid var(--color-theme-1);
    color: white;
    cursor: pointer;
    display: block;
    font-size: 18px;
    font-weight: 500;
    height: 48px;
    letter-spacing: 1.2px;
    line-height: 14px;
    margin: 0;

    min-width: 140px;
    padding: 10px 30px;
    text-align: center;
    transition: all 0.3s ease;

    &:hover,
    &.active {
      padding: 12px 32px;
      transform: translateX(-2px);
      background-color: white;
      color: var(--color-theme-1);
      border-color: var(--color-theme-1);
    }
  }
</style>
