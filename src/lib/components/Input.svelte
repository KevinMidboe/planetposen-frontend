<script lang="ts">
  export let id: string | null = null;
  export let label: string;
  export let value: string | number;
  export let type = 'text';
  export let name: string | null = null;
  export let required = true;
  export let autocomplete: string | null = null;
  export let autocapitalize: string | null = null;

  function typeAction(node: HTMLInputElement) {
    node.type = type;
  }
</script>

<label id="{id}" class="{required ? 'required' : null}">
  <span>{label}</span>
  <input
    bind:value="{value}"
    name="{name || id}"
    use:typeAction
    required="{required}"
    autocomplete="{autocomplete}"
    autocapitalize="{autocapitalize}"
    enterkeyhint="next"
  />
</label>

<style lang="scss" module="scoped">
  label {
    display: flex;
    flex-direction: column;

    span {
      margin-left: 2px;
      font-size: 1.3rem;
    }

    &.required span::after {
      content: '*';
      color: #e02b27;
      font-size: 1rem;
      margin-left: 0.3rem;
    }
  }

  input {
    border: 2px solid grey;
    border-radius: 0px;
    padding: 0.5rem;
    font-size: 1rem;
    box-sizing: border-box;
    width: 100%;

    &:active,
    &:focus,
    &:valid {
      border-color: var(--text-color);
    }
  }
</style>
