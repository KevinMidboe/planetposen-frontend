<script lang="ts">
  import type IFrontText from '$lib/interfaces/IFrontText';
  export let data: IFrontText;
</script>

<div class="text-container">
  <blockquote style="{`color: ${data.color || 'black'}`}">
    <p class="title">{data.title}</p>
    <p class="text">{data.text}</p>
  </blockquote>
</div>

<style lang="scss" module="scoped">
  @import '../../styles/media-queries.scss';

  .text-container {
    position: relative;

    blockquote {
      max-width: 75%;
      margin: 12.5%;
      padding: 2rem;
      display: flex;
      flex-direction: column;
      justify-content: center;

      @include mobile {
        margin: 10% 0;
      }

      .title {
        text-align: center;
        font-size: 1.3rem;
        margin-bottom: 1.5rem;

        @include desktop {
          font-size: 2rem;
        }
      }

      .text {
        text-align: center;
        font-size: 2rem;
        margin-top: 0;

        @include desktop {
          font-size: 4rem;
        }

        &::before {
          content: '\201C';
          position: relative;
          left: 0;
          display: inline;
        }

        &::after {
          content: '\201D';
          position: absolute;
        }
      }
    }
  }
</style>
