<section>
  <div class="text-part">
    <h2>Å stoppe tapet av biologisk mangfold globalt</h2>
    <p>
      En million arter av dyr, planter og sopp er nå truet med utryddelse. Biomangfold er viktig for
      alt liv på jorden fordi det bidrar til stabile økosystemer. Naturmangfoldet kan bevares
      gjennom mer kunnskap og vern.
    </p>
  </div>

  <div class="image-part">
    <div class="image-mask">
      <img src="https://i.imgur.com/WWbfhiZ.jpg" alt="bee inspection" />
    </div>
  </div>
</section>

<style lang="scss" module="scoped">
  @import '../../styles/media-queries.scss';

  section {
    display: grid;
    grid-template-columns: 1fr;
    align-items: center;
    width: 100%;
    margin: 40% 2rem;
    grid-template-columns: 1fr;

    @include tablet {
      grid-template-columns: 1fr 1fr;
      grid-gap: 10%;
      margin: 20% 2rem;

      .text-part {
        max-width: 480px;
        justify-self: end;

        h2 {
          font-size: 2.5rem;
          margin-bottom: 2.5rem;
        }
      }

      .image-part {
        width: 100%;
        justify-self: start !important;
        max-width: calc(100vw / 3) !important;
        max-height: calc(100vw / 3) !important;
      }
    }

    .text-part {
      text-align: center;
      padding: 0 1rem;

      h2 {
        font-size: 2.25rem;
        margin-bottom: 2.25rem;
      }

      p {
        font-size: 1.25rem;
      }
    }

    .image-part {
      position: relative;
      height: 80vw;
      max-width: 80vw;
      width: 100%;
      justify-self: center;

      .image-mask {
        background-image: url(data:image/gif;base64,R0lGODlhCAAFAPUAAHmAR4OKUIOJUo2SW46VWY+TYZeeYZecZJicaZyecZ6kZ5+ka6GobKGkcaOpcKKocqSpcaeqdqitdaSmeKanfqmueauueqqsfamufK2xfq2uhK2wgK+ygq6zgq+zha+0ha+1h7CzhbGyhrKzhrC0hLG1h7G3irK3igAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAAAAAAAIf8LSW1hZ2VNYWdpY2sOZ2FtbWE9MC45MDkwOTEALAAAAAAIAAUAAAYlQBPIExqJNJRTicTZXCaJTydjiTQQBUxFAlkcBoKHg6EwEAKAIAA7);

        background-size: cover;
        mask-repeat: no-repeat;
        mask-size: cover;
        mask-image: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjgwIiBoZWlnaHQ9IjY4MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNNjQzLjMzIDE3Ni43NzRjNDkuMjQyIDE0MC4zMiA2NC41MzQgMzM3LjI1NC01NS4yMTYgNDE4LjI4LTExOS43NDkgODEuMDI3LTM2MC4zNTMgMTAyLjk4NC00OTguNjE4LTQuODg4cy05NS4wODgtNDAwLjkyNS0xMi44Mi00ODMuOWM4Mi4yNjgtODIuOTc1IDI0NS4wOTQtNzUuNTQ0IDMyMy4zNS04Ni45OUM0NzguMjgzIDcuODMgNTk0LjA5IDM2LjQ1NCA2NDMuMzMgMTc2Ljc3NHoiLz48L3N2Zz4=');
        height: 100%;
        width: 100%;
        top: 0;
        left: 0;
        position: absolute;
      }

      img {
        height: 100%;
        object-fit: cover;
        width: 100%;
        left: 0;
        top: 0;
        position: absolute;
        max-width: 100%;
      }
    }
  }
</style>
