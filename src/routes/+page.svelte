<script lang="ts">
  import PageMeta from '$lib/components/PageMeta.svelte';
  import FrontText from '$lib/components/FrontText.svelte';
  import FrontTextImage from '$lib/components/FrontTextImage.svelte';
  import FrontTextImageBubble from '$lib/components/FrontTextImageBubble.svelte';
  import FrontProductGallery from '$lib/components/FrontProductGallery.svelte';
  import type IFrontTextImage from '$lib/interfaces/IFrontTextImage';
  import type { IProduct } from '$lib/interfaces/IProduct';
  import type IFrontText from '$lib/interfaces/IFrontText';

  const textImages: Array<IFrontTextImage> = [
    {
      title: 'Vårt oppdrag',
      text: 'The new fabulous museum at Kistefos, designed by world renowned architect Bjarke Ingels Group, BIG, opened Wednesday September 18th, 2019. The building has been named the top architectural museum project in the world to open in 2019, by both the Daily Telegraph and Bloomberg.',
      image: 'https://storage.googleapis.com/planetposen-images/front-kf-1.jpg'
    },
    {
      title: 'Paper waste and the planet',
      text: "As the 50th artwork to be included in the park, a site-specific new commission by French artist Pierre Huyghe (b. 1962, Paris) was opened on the 12th of June. The vast permanent work will be the artist's largest site-specific work to date and the most ambitious to ever be conceived for Kistefos.",
      imageRight: true,
      image: 'https://storage.googleapis.com/planetposen-images/front-kf-2.jpg'
    },
    {
      title: 'Our goal',
      text: 'The scenic sculpture park has an impressive collection of works by internationally renowned contemporary artists including Anish Kapoor, Jeppe Hein, Tony Cragg, Olafur Eliasson, Fernando Bottero and Elmgreen & Dragset. The sculpture park focus is sight specific and international contemporary works of art and is available all year.',
      image: 'https://storage.googleapis.com/planetposen-images/front-kf-3.jpg'
    },
    {
      title: 'About us',
      text: 'The scenic sculpture park has an impressive collection of works by internationally renowned contemporary artists including Anish Kapoor, Jeppe Hein, Tony Cragg, Olafur Eliasson, Fernando Bottero and Elmgreen & Dragset. The sculpture park focus is sight specific and international contemporary works of art and is available all year.',
      imageRight: true,
      image: 'https://storage.googleapis.com/planetposen-images/front-bee-1.jpg'
    },
    {
      title: 'Sculpture park of international standing',
      text: 'The scenic sculpture park has an impressive collection of works by internationally renowned contemporary artists including Anish Kapoor, Jeppe Hein, Tony Cragg, Olafur Eliasson, Fernando Bottero and Elmgreen & Dragset. The sculpture park focus is sight specific and international contemporary works of art and is available all year.',
      imageRight: false,
      image: 'https://storage.googleapis.com/planetposen-images/front-bee-2.jpg'
    }
  ];

  const textTitle: Array<IFrontText> = [
    {
      title: 'Katy Vandekerckhove:',
      text: 'Kistefos was really a jewel on earth with high level art in fantastic surroundings',
      color: '#27615d'
    },
    {
      title: 'Katy Vandekerckhove:',
      text: 'Kistefos was really a jewel on earth with high level art in fantastic surroundings',
      color: 'orange'
    }
  ];
</script>

<PageMeta title="Planetposen" description="Planetposen hjemmeside" />
<section class="frontpage">
  <!-- {#each textImages as data}
    <TextImageParralax {data} />
  {/each} -->
  <FrontTextImage data="{textImages[0]}" />
  <FrontTextImage data="{textImages[1]}" />
  <FrontTextImageBubble />
  <FrontTextImage data="{textImages[2]}" />

  <FrontText data="{textTitle[0]}" />

  <FrontTextImage data="{textImages[3]}" />
  <FrontTextImage data="{textImages[4]}" />

  <FrontText data="{textTitle[1]}" />
</section>

<style lang="scss" module="scoped">
  section {
    // position: absolute;
    // left: 0;
    // width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 0.6;
  }
</style>
