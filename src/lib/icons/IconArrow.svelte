<script lang="ts">
  import { goto } from '$app/navigation';

  export let pointLeft = false;
  let defaultRoute = '/shop';

  function navigateBack() {
    window.history.length > 1 ? window.history.back() : goto(defaultRoute);
  }
</script>

<svg
  tabindex="0"
  role="button"
  aria-roledescription="navigate back"
  on:click="{navigateBack}"
  on:keypress="{(e) => e.code === 'Enter' && navigateBack()}"
  style="{pointLeft ? 'transform: rotateZ(180deg)' : ''}"
  class="navigate-back"
  width="30"
  height="25.2"
  viewBox="0 0 20 17"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    fill-rule="evenodd"
    clip-rule="evenodd"
    d="M11.5437 16.5L9.88125 14.8284L14.9875 9.69403H0.5L0.5 7.30597L14.9875 7.30597L9.88125 2.17164L11.5437 0.5L19.5 8.5L11.5437 16.5Z"
    fill="var(--color-theme-1)"></path>
</svg>

<style lang="scss">
  .navigate-back {
    cursor: pointer;
    transition: all 0.3s ease;
    scale: 0.95;

    &:hover {
      scale: 1;
    }
  }
</style>
