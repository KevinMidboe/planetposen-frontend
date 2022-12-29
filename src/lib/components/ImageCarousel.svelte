<script lang="ts">
  import { fade } from 'svelte/transition';
  import type { IProduct, IImage } from '$lib/interfaces/IProduct';
  import { onMount } from 'svelte';

  export let product: IProduct;

  function start(event: MouseEvent | TouchEvent) {
    isDown = true;
    imageFrameElement.classList.add('active');
    startX = event.pageX - imageFrameElement.offsetLeft;
    scrollLeft = imageFrameElement.scrollLeft;
    imageFrameElement.style.cursor = 'grabbing';
  }

  function end() {
    isDown = false;
    imageFrameElement.style.cursor = 'pointer';
  }

  function move(event: MouseEvent | TouchEvent) {
    if (!isDown) return; // stop the fn from running
    // event.preventDefault();

    const x = event.pageX - imageFrameElement.offsetLeft;
    const walk = (x - startX) * 2;
    imageFrameElement.scrollLeft = scrollLeft - walk;
  }

  function scrollToIndex(index = selected) {
    selected = index;

    const image = imageFrameElement.children[selected] as HTMLImageElement;
    const imageWidth = image.getBoundingClientRect()?.width;
    imageFrameElement.scrollTo({
      left: imageWidth * selected,
      behavior: 'smooth'
    });

    updateHeight();
  }

  function updateHeight() {
    const image = imageFrameElement.children[selected] as HTMLImageElement;
    const imageHeight = image.getBoundingClientRect()?.height;
    imageFrameElement.style.maxHeight = `${imageHeight}px`;
  }

  let images: IImage[] = product?.images || [];
  let selected = 0;
  let isDown = false;
  let startX = 0;
  let scrollLeft = 0;
  let imageFrameElement: HTMLElement;
  let productStyles = `background-color: ${product?.primary_color || '#E6E0DC'};
color: ${product?.primary_color === '#231B1D' ? '#f3efeb' : '#37301e'}`;

  let observer: IntersectionObserver;

  onMount(() => {
    updateHeight();

    imageFrameElement.addEventListener('mousedown', start);
    imageFrameElement.addEventListener('mouseleave', end);
    imageFrameElement.addEventListener('mouseup', end);
    imageFrameElement.addEventListener('mousemove', move);

    //   touchEvents

    imageFrameElement.addEventListener('touchstart', start);
    imageFrameElement.addEventListener('touchend', end);
    imageFrameElement.addEventListener('touchcancel', end);
    imageFrameElement.addEventListener('touchmove', move);

    if (typeof IntersectionObserver !== 'undefined') {
      const rootMargin = '0px -20% 0px -20%';

      observer = new IntersectionObserver(
        (entries) => {
          if (entries[0]?.isIntersecting) {
            const target = entries[0]?.target as HTMLElement;
            const targetIndex = Number(target?.dataset?.index);
            if (isNaN(targetIndex)) return;

            selected = targetIndex;
            updateHeight();
          }
        },
        {
          root: imageFrameElement,
          rootMargin
        }
      );
    }

    const imageChildren = imageFrameElement.children;
    for (let i = 0; i < imageChildren.length; i++) {
      observer.observe(imageChildren[i]);
    }
  });
</script>

{#if images?.length > 0}
  <div class="carousel" in:fade="{{ duration: 400 }}">
    <div bind:this="{imageFrameElement}" class="image-frame" style="{productStyles}">
      {#each images as { image_id, url }, index (image_id)}
        <div class="image-wrapper" data-index="{index}">
          <img src="{url}" alt="" draggable="false" />
        </div>
      {/each}
    </div>

    {#if images?.length > 1}
      <div class="thumbnails">
        {#each images as image, index}
          <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
          <img
            class="{index === selected ? 'selected' : ''}"
            on:click="{() => scrollToIndex(index)}"
            on:keypress="{(e) => e.code === 'Enter' && scrollToIndex(index)}"
            tabindex="0"
            src="{image.url}"
            alt="{`Clickable product image thumbnail number ${index + 1}`}"
          />
        {/each}
      </div>
    {/if}
  </div>
{/if}

<style lang="scss">
  @import '../../styles/media-queries.scss';

  .image-frame {
    overflow-x: scroll;
    overflow-y: hidden;
    scroll-behavior: smooth;
    scroll-snap-type: x mandatory;
    position: relative;
    place-items: center;
    margin: 1.5rem;
    padding: 2.5rem 1.5rem;
    background-color: #e6e0dc;
    color: #37301e;
    transition: all 0.3s ease-in-out;
    cursor: pointer;
    white-space: nowrap;
    gap: 3rem;
    max-height: 100px;
    -ms-overflow-style: none; /* Internet Explorer 10+ */
    scrollbar-width: none; /* Firefox */
    -webkit-user-select: none;
    user-select: none;

    .image-wrapper {
      display: inline-block;
      // background-color: red;
      padding: 0.5rem;
      min-width: 90%;

      &:first-of-type {
        margin-left: 1rem;
      }
      &:last-of-type {
        margin-right: 1rem;
      }
    }

    img {
      transition: all 0.3s ease-in-out;
      scroll-snap-align: center;
      vertical-align: top;
      width: 100%;
      transform: scale(0.98);
    }

    &:hover {
      margin: 1rem;
      padding: 3rem 2rem;

      img {
        transform: scale(1);
        box-shadow: 3px 3px 13px 3px rgba(0, 0, 0, 0.2);
      }
    }

    &::-webkit-scrollbar {
      display: none; /* Safari and Chrome */
    }
  }

  .thumbnails {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;

    img {
      width: 4rem;
      height: 4rem;
      margin: 0 0.5rem;
      cursor: pointer;
      border: 2px solid transparent;
      transition: all 0.4s ease-in-out;
      object-fit: cover;

      &.selected {
        border-color: black;
      }

      &:not(&.selected) {
        filter: grayscale(90%);
      }
    }
  }
</style>
