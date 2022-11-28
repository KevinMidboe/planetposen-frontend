<script lang="ts">
  import { page } from '$app/stores';
  // import logo from '$lib/images/svelte-logo.svg';
  // import logo from '$lib/assets/planetposen-logo.png';

  import Cart from '$lib/components/Cart.svelte';

  interface IHeaderLinks {
    path: string;
    name: string;
  }

  export let isAdmin = false;

  let genPopHeaderLinks: Array<IHeaderLinks> = [
    {
      path: '/shop',
      name: 'Nettbutikk'
    },
    {
      path: '/checkout',
      name: 'kasse'
    }
  ];

  const adminHeaderLinks: Array<IHeaderLinks> = genPopHeaderLinks.concat([
    {
      path: '/warehouse',
      name: 'warehouse'
    },
    {
      path: '/orders',
      name: 'Ordre'
    },
    {
      path: '/receipt',
      name: 'Kvittering'
    }
  ]);

  $: headerLinks = !isAdmin ? genPopHeaderLinks : adminHeaderLinks;
</script>

<header>
  <div class="corner">
    <a href="/">
      <!-- <img src={logo} alt="Planetposen logo" /> -->
      <!-- <img src="/planetposen-logo.png" alt="Planetposen logo" /> -->
      🌍
    </a>
  </div>

  <nav>
    <ul>
      <li aria-current="{$page.url.pathname === '/' ? 'page' : undefined}">
        <a href="/">Hjem</a>
      </li>

      {#each headerLinks as link}
        <li aria-current="{$page.url.pathname.startsWith(link.path) ? 'page' : undefined}">
          <a href="{link.path}">{link.name}</a>
        </li>
      {/each}
    </ul>
  </nav>

  <div>
    <Cart />
  </div>
</header>

<style lang="scss">
  header {
    position: sticky;
    top: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 99;
    overflow-x: scroll;
    // background-color: var(--background);
    background-color: white;
    border-bottom: 2px solid rgba(24, 51, 47, 0.4);
  }

  .corner {
    width: 3em;
    height: 3em;
  }

  .corner a {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    font-size: 1.8rem;
  }

  .corner img {
    width: 2em;
    height: 2em;
    object-fit: contain;
  }

  nav {
    display: flex;
    justify-content: center;
    align-items: center;
    /*--background: rgba(255, 255, 255, 0.7);*/
  }

  ul {
    position: relative;
    padding: 0;
    margin: 0;
    height: 2em;
    display: flex;
    justify-content: center;
    align-items: center;
    list-style: none;
    background-size: contain;
  }

  li {
    position: relative;
    height: 100%;
  }

  li[aria-current='page'] a {
    font-weight: 600;
  }

  // li[aria-current='page']::after, li:hover::after {
  // 	content: '';
  // 	width: 90%;
  // 	height: 2px;
  // 	position: absolute;
  // 	bottom: 0;
  // 	margin-left: 5%;
  // 	background-color: var(--color-text);
  // }

  nav a {
    display: flex;
    height: 100%;
    align-items: center;
    padding: 0 0.5rem;
    color: var(--color-text);
    font-weight: 500;
    font-size: 0.95rem;
    text-transform: uppercase;
    letter-spacing: 1.2px;
    text-decoration: none;
    transition: all 0.2s linear;
  }

  // a:hover {
  // 	color: var(--color-theme-1);
  // }
</style>
