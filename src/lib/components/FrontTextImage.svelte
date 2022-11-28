<script lang="ts">
  import type IFrontTextImage from '$lib/interfaces/IFrontTextImage';
  export let data: IFrontTextImage;
</script>

<div class="parallax-container">
  <div class="image-layout" style="{data?.imageRight && 'order: 1'}">
    <img src="{data?.image}" alt="mushroom" />
  </div>

  <div class="text-container">
    <h2>{data?.title}</h2>

    <span>{data?.text}</span>
  </div>
</div>

<style lang="scss">
  @import '../../styles/media-queries.scss';

  .parallax-container {
    align-items: center;
    box-sizing: border-box;
    display: grid;
    width: 100%;
    height: fit-content;
    // height: 75vh;
    min-height: 800px;

    place-items: center;
    grid-template-columns: 1fr;

    @include desktop {
      grid-template-columns: repeat(2, 1fr);
      padding: 0 2rem;
    }
  }

  .image-layout {
    position: relative;

    img {
      width: 100%;
    }
  }

  .text-container {
    -webkit-box-flex: 0;
    box-sizing: border-box;
    color: rgb(0, 0, 0);
    display: block;
    flex-basis: 75%;
    flex-grow: 0;
    flex-shrink: 0;
    font-size: 23px;
    font-weight: 400;
    line-height: 31.999903px;
    padding-left: 1rem;

    h2 {
      font-size: 3rem;
      line-height: 1;
      font-weight: 500;
    }

    span {
      margin-top: 1.2rem;
    }

    @include desktop {
      margin-left: 99.3125px;
      width: 595.875px;
      max-width: 75%;
      padding-left: 24px;
      padding-right: 24px;
    }
  }
</style>
