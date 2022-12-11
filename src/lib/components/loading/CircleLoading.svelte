<svg width="49" height="48" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
  <path
    class="loading-circle"
    fill="none"
    stroke="grey"
    stroke-width="2"
    d="M23 0c0 12.7-10.3 23-23 23c-12.7 0-23-10.3-23-23c0-12.7 10.3-23 23-23c12.7 0 23 10.3 23 23"
    stroke-linecap="round"
    stroke-dashoffset="145"
    stroke-dasharray="145 145"
    stroke-linejoin="round"
    stroke-miterlimit="1"
    transform="translate(24,24) rotate(-35)"
    style="animation-delay: 100ms"></path>
</svg>

<style lang="scss" module="scoped">
  .loading-circle {
    -webkit-animation: drawCircle 1.5s linear both;
    animation: drawCircle 1.5s linear both;
    animation-iteration-count: infinite;
  }

  svg {
    animation: rotateCircle 1.5s linear both;
    animation-iteration-count: infinite;
  }

  @keyframes rotateCircle {
    0% {
      transform: rotate(0deg);
    }

    to {
      transform: rotate(360deg);
    }
  }

  @keyframes drawCircle {
    0% {
      stroke-dashoffset: 145px;
    }

    to {
      stroke-dashoffset: -145px;
    }
  }
</style>
