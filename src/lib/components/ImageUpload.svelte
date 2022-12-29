<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import Button from './Button.svelte';
  import Loading from './loading/index.svelte';

  const dispatch = createEventDispatcher();

  let dragOver = false;
  let fileInput: HTMLInputElement;

  /* eslint-disable @typescript-eslint/no-explicit-any */
  let resolveUploadPromise: (value: any) => void;
  let rejectUploadPromise: (resason: any | null) => void;
  let uploadPromise: Promise<any> | null;
  /* eslint-enable @typescript-eslint/no-explicit-any */

  async function uploadImages() {
    const { files } = fileInput;
    if (!files) return;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      await uploadImage(file);
    }

    setTimeout(() => resetUploadInput, 3000);
  }

  function resetUploadInput() {
    fileInput.value = '';
    uploadPromise = null;
  }

  async function uploadImage(file: File) {
    console.log('uploading file:', file);

    const formData = new FormData();
    formData.append('file', file);

    let url = '/api/v1/images';
    if (window?.location?.href?.includes('localhost')) {
      url = 'http://localhost:8001' + url;
    }

    const options = {
      method: 'POST',
      body: formData
    };

    startImageUploadLoader();
    // return

    try {
      const imageUploadResponse = await fetch(url, options).then((resp) => resp.json());
      console.log('response from image upload:', imageUploadResponse);
      resolveUploadPromise(true);

      const { remote_url } = imageUploadResponse;
      if (remote_url) dispatch('added', remote_url);
    } catch (error) {
      console.log('Unexpected error from upload:', error);
      rejectUploadPromise(error);
    }
  }

  function startImageUploadLoader() {
    uploadPromise = new Promise((resolve, reject) => {
      resolveUploadPromise = resolve;
      rejectUploadPromise = reject;
    });
  }

  function onFileSelected(event: Event) {
    let target = event.target as HTMLInputElement;
    if (!target) return;

    let file = target.files?.[0];
    if (!file) return;
    fileInput.files = target.files;
    // uploadImage(file)
  }

  function onFileDrop(event: DragEvent) {
    const files: FileList | undefined = event?.dataTransfer?.files;
    if (files) {
      fileInput.files = files;
    }
  }

  $: hasFiles = (fileInput?.files && fileInput?.files?.length > 0) || false;
</script>

<div
  id="drop_zone"
  class="{dragOver ? 'highlighted' : ''}"
  on:click="{() => fileInput.click()}"
  on:keypress="{(e) => e.code === 'Enter' && fileInput.click()}"
  on:drop|preventDefault="{onFileDrop}"
  on:dragover|preventDefault="{() => (dragOver = true)}"
  on:dragenter|preventDefault="{() => (dragOver = true)}"
  on:dragleave|preventDefault="{() => (dragOver = false)}"
  on:drop|preventDefault="{() => (dragOver = false)}"
>
  {#if !dragOver}
    <p>Click or drag images <i>here</i> to upload</p>
  {:else}
    <p>Drop image(s) to add to uploads</p>
  {/if}
</div>
<input
  bind:this="{fileInput}"
  type="file"
  accept=".jpg, .jpeg, .png"
  on:change="{onFileSelected}"
  multiple
/>

{#if hasFiles}
  <span>Files found to upload:</span>

  <div class="thumbnails">
    {#each fileInput.files || [] as file, index}
      <img
        src="{window.URL.createObjectURL(file)}"
        alt="{`Upload asset thumbnail number ${index + 1}`}"
      />
    {/each}
  </div>

  <div class="upload">
    <Button text="upload" on:click="{uploadImages}" />

    {#if uploadPromise}
      <Loading promise="{uploadPromise}" />
    {/if}
  </div>
{/if}

<style lang="scss">
  input {
    display: none;
  }

  #drop_zone {
    margin: 1rem 0;
    padding: 0 1rem;
    border: 2px dashed rgba(0, 0, 0, 0.4);
    width: 300px;
    text-align: center;
    cursor: pointer;

    p {
      margin: 0.75rem 0;
    }
    &.highlighted {
      color: darkslategray;
      background-color: rgb(215, 247, 194);
      border-color: rgb(0, 105, 8);
    }
  }

  .upload {
    display: flex;
    justify-content: space-between;
    margin-top: 1rem;
  }

  .thumbnails {
    display: flex;
    flex-wrap: wrap;

    img {
      width: 80px;
      margin: 0 0.5rem 0.5rem 0;
      border-radius: 4px;
    }
  }
</style>
