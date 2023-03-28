<script lang="ts">
  import Button from '$lib/components/Button.svelte';
  import Input from '$lib/components/Input.svelte';
  import { buildApiUrl } from '$lib/utils/apiUrl';

  let username: string;
  let password: string;
  let displayMessage: string | null;

  function postLogin(event: SubmitEvent) {
    displayMessage = null;
    const formData = new FormData(event.target as HTMLFormElement);
    const data = {};
    formData.forEach((value, key) => (data[key] = value));

    const options = {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const url = buildApiUrl('/api/v1/login');
    fetch(url, options)
      .then((resp) => {
        const { status } = resp;
        if (!(status === 403 || status === 200)) throw resp;
        return resp.json();
      })
      .then((response) => {
        const { message, success } = response;

        if (message) {
          displayMessage = message;
        }

        success && setTimeout(() => window.location.reload(), 1000);
      });
  }
</script>

<section>
  <h1>Logg på</h1>

  <form on:submit|preventDefault="{postLogin}">
    <Input id="username" bind:value="{username}" label="Brukernavn" autocapitalize="none" />
    <Input id="password" bind:value="{password}" label="Passord" type="password" />

    <div class="signin-button">
      <Button type="submit" text="Logg på" />
    </div>

    {#if displayMessage}
      <div class="display-message">
        <p>{displayMessage}</p>
      </div>
    {/if}
  </form>
</section>

<style lang="scss" module="scoped">
  @import '../../styles/media-queries.scss';

  section {
    max-width: 600px;
    margin: auto;

    @include desktop {
      margin: 20% auto;
    }
  }
  .signin-button {
    margin-top: 2rem;
  }

  .display-message {
    border: 2px dashed var(----color-theme-1);
    margin: 1rem 0;
    padding: 0.2rem 1rem;
  }
</style>
