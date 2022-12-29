<script lang="ts">
  import { page } from '$app/stores';

  console.log('page data:', $page.error);

  $: parsedApiResponse = JSON.stringify($page.error?.apiResponse || {}, null, 4);
</script>

<h1>Oisann! Klarte ikke hente order</h1>

<p>
  Det du søkte etter fantes ikke her. Om du tror dette er en feil, ta kontakt <a
    class="link"
    href="mailto:support@planetposen.no">support@planetposen.no</a
  > for spørsmål.
</p>
<div class="error">
  <span>Internal error message:</span>
  <pre>
    <code>{parsedApiResponse}</code>
  </pre>
</div>

<style lang="scss">
  .error {
    margin-top: 4rem;

    span {
      display: inline-block;
      font-size: 1.4rem;
      text-decoration: none;
      transition: all 0.3s ease;
      border-bottom: 2px solid var(--color-theme-1);
    }

    code {
      display: block;
      font-size: 1rem;
    }
  }
</style>
