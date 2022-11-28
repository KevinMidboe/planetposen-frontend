<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();

  function increment() {
    if (value >= Number(input?.max)) return;
    value = value + 1;
    dispatch('increment');
  }

  function decrement() {
    if (value <= 1) return;

    value = value - 1;
    dispatch('decrement');
  }

  export let value: number;
  export let disabled = false;
  export let hideButtons = false;
  export let small = false;
  let max = 50;
  let input: HTMLInputElement;
</script>

<div
  class="{`quantity-picker ${hideButtons ? 'hide-buttons' : null} ${small ? 'small' : null} ${
    disabled ? 'disabled' : null
  }`}"
>
  <span class="button" on:click="{decrement}">-</span>
  <input
    bind:this="{input}"
    type="number"
    bind:value="{value}"
    on:input
    disabled="{disabled}"
    min="1"
    max="{max}"
  />
  <span class="button" on:click="{increment}">+</span>
</div>

<style lang="scss" module="scoped">
  @import '../../styles/media-queries.scss';

  .quantity-picker {
    display: inline-flex;
    flex-direction: row;
    align-items: center;
    width: max-content;
    height: 2.5rem;
    border: 2px solid grey;
    font-size: 1.5rem;

    &.disabled {
      pointer-events: none;
    }

    @include mobile {
      height: 2.5rem;
      font-size: 1.2rem;
      line-height: 0;

      .button {
        width: 1rem;
        height: 1rem;
      }
    }

    &.hide-buttons {
      @include mobile {
        .button {
          display: none !important;
        }
      }
    }

    @include mobile {
      &.small {
        height: 1.75rem;

        .button {
          width: 1.75rem;
          height: 1.75rem;
          font-size: 1.2rem;
        }

        input {
          font-size: 1rem;
          padding: 0;
        }
      }
    }

    .button {
      width: 2.5rem;
      height: 2.5rem;
      border: unset;
      padding: 0;
      display: flex;
      justify-content: center;
      cursor: pointer;
      -webkit-user-select: none;
      user-select: none;
      align-items: center;
      touch-action: manipulation;

      &:hover {
        border: 2px solid #000;
        margin-left: -2px;
        margin-right: -2px;
      }
    }
  }

  input {
    max-width: 1.5rem;
    text-align: center;
    -webkit-appearance: none;
    border: none;
    padding: 0 0.5rem;
    font-size: 1.1rem;
    background-color: inherit;

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    /* Firefox */
    &[type='number'] {
      -moz-appearance: textfield;
    }
  }
</style>
