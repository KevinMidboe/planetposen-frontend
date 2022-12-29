<script lang="ts">
  import { fade, fly, slide } from 'svelte/transition';
  import type IOrderValidationError from '$lib/interfaces/IOrderValidationError';

  export let errors: string[] = [];
  let currentCard = 0;
  let debounce = false;
  const flyoutDuration = 425;

  function offsetTop(index: number) {
    const randomVal = Math.round(Math.random() * 20 * Math.random() > 0.5 ? 1 : -1);
    return `top: ${
      -7 * index
    }px; transform: translate(${randomVal}px,${randomVal}px) rotate(${randomVal}deg)`;
  }

  function dismiss(index: number) {
    debounce = true;
    errors = errors?.filter((m, i) => i !== index);
    setTimeout(() => (debounce = false), flyoutDuration);
  }
</script>

{#if errors && errors?.length > 0}
  <section style="position: relative;">
    {#each errors as error, index (`${index}-${error}`)}
      <p
        class="error-card"
        data-status="{index === currentCard ? 'current' : 'waiting'}"
        style="{offsetTop(index)}"
        in:slide
        out:fly="{{ y: 100, duration: flyoutDuration }}"
      >
        <button
          class="dismiss"
          on:click="{() => dismiss(index)}"
          on:keyup="{(e) => e.code === 'Enter' && debounce === false && dismiss(index)}">X</button
        >

        <span class="card_content">{error}</span>
        <span class="help"
          >Prøv igjen eller gi en lyd på <a class="link" href="mailto:kontakt@planetposen.no"
            >kontakt@planetposen.no</a
          > så tar vi kontakt med deg.</span
        >
      </p>
    {/each}
  </section>
{/if}

<style lang="scss">
  .error-card {
    position: absolute;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    box-sizing: border-box;
    touch-action: none;
    background-color: rgba(255, 0, 0, 0.6);
    color: var(--color-theme-1);
    font-size: 1.1rem;
    padding: 1rem 1.25rem;
    margin: 0.5rem 0;
    display: flex;
    flex-direction: column;
    border-radius: 4px;
    width: 100%;
    max-width: 550px;
    transition: all 0.6s ease;
    border: 1px solid firebrick;

    &[data-status='current'] {
      z-index: 2;
      // background-color: orange;
      background-color: #ff3333;
      border-color: transparent;
    }

    span {
      display: block;
      color: white;
      font-size: 1.2rem;
      padding: 0.4rem 0 0.4rem;
    }

    button.dismiss {
      position: absolute;
      top: 0.5rem;
      right: 1rem;
      font-size: 1.3rem;
      color: white;
      cursor: pointer;
      border: none;
      margin: 0;
      padding: 0;
      background: none;
    }

    .help {
      color: rgba(0, 0, 0, 0.7);
      font-size: 0.95rem;
      // margin-top: 1.2rem;
    }
  }
</style>
