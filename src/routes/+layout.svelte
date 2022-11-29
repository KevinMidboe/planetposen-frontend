<script lang="ts">
  import { onMount } from 'svelte';
  import { beforeNavigate } from '$app/navigation';
  import Header from './Header.svelte';
  import Footer from './Footer.svelte';
  import CartModal from './CartModal.svelte';
  import { closeCart } from '$lib/cartStore';
  import { getCookie } from '$lib/utils/cookie';
  import requestSessionCookie from '$lib/utils/requestSessionCookie';
  import { connectToCart, reconnectIfCartWSClosed } from '$lib/websocketCart';
  import './styles.css';

  let isAdmin = false;

  beforeNavigate(() => {
    closeCart();
    reconnectIfCartWSClosed();
    isAdmin = getCookie('admin') === 'true';
  });

  onMount(() => {
    isAdmin = getCookie('admin') === 'true';
    requestSessionCookie();
    connectToCart();
  });
</script>

<div class="app">
  <Header isAdmin="{isAdmin}" />

  <CartModal />

  <main>
    <slot />
  </main>

  <Footer isAdmin="{isAdmin}" />
</div>

<style lang="scss">
  @import '../styles/media-queries.scss';

  .app {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  :global(main:has(.frontpage)) {
    max-width: unset !important;
    padding: 0 !important;
  }

  main {
    flex: 1;
    padding: 1rem;
    width: 100%;
    min-height: 95vh;
    max-width: 1500px;
    margin: 0 auto;
    box-sizing: border-box;

    @include mobile {
      min-height: 90vh;
      padding: 1rem 0.75rem;
    }
  }
</style>
