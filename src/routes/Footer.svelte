<script lang="ts">
  import LinkArrow from '$lib/components/LinkArrow.svelte';
  import { buildApiUrl } from '$lib/utils/apiUrl';

  export let isAdmin = false;

  function logout() {
    const url = buildApiUrl('/api/v1/logout');
    fetch(url, { method: 'POST' }).then((resp) => {
      resp.status === 200 && window.location.reload();
    });
  }
</script>

<footer>
  <section>
    <h1>Personvern og vilkår</h1>
    <ul>
      <li><LinkArrow /><a href="/terms-and-conditions">Betingelser og vilkår</a></li>
      <li><LinkArrow /><a href="/privacy-policy">Personvernerklæring</a></li>
      <li><LinkArrow /><a href="/cookies">Cookies</a></li>
      <li>
        <LinkArrow />
        {#if !isAdmin}
          <a href="/login">Logg på</a>
        {:else}
          <a href="/" on:click="{logout}">Logg ut</a>
        {/if}
      </li>
    </ul>
  </section>

  <section>
    <h1>Kontakt</h1>
    <ul>
      <li>Epost:&nbsp;<a class="link" href="mailto:post@planetposen.no">post@planetposen.no</a></li>

      <li>Org nummer: 994 749 765</li>

      <li>
        Kode:&nbsp;<a
          class="link"
          target="_blank"
          rel="noreferrer"
          href="https://github.com/search?q=user%3Akevinmidboe+sort%3Aupdated+planetposen&type=repositories"
          >github.com</a
        >
      </li>
    </ul>
  </section>
</footer>

<style lang="scss" module="scoped">
  @import '../styles/media-queries.scss';

  footer {
    background-color: var(--color-theme-1);
    color: white;
    padding: 4rem;

    display: flex;
    justify-content: space-around;

    section {
      width: 30%;
      padding: 2rem;
      padding-top: 0;
    }

    ul {
      list-style: none;
      padding-left: 0rem;

      li {
        font-size: 1.1rem;
        padding: 0.5rem 0;
        display: flex;
        align-items: center;

        a {
          --color-text: white;
          text-decoration: none;
          transition: all 0.3s ease;
          border-bottom: 2px solid var(--color-theme-1);

          &:hover {
            border-color: white;
          }
        }
      }
    }

    @include mobile {
      flex-direction: column;
      padding: 3rem 0.5rem;

      h1 {
        font-size: 1.8rem;
      }

      section {
        width: unset;
      }
    }
  }

  :global(footer ul li svg) {
    margin-right: 0.6rem;
  }
</style>
