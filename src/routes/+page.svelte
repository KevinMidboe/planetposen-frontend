<script lang="ts">
  import PageMeta from '$lib/components/PageMeta.svelte';
  import FrontText from '$lib/components/FrontText.svelte';
  import FrontTextImage from '$lib/components/FrontTextImage.svelte';
  import FrontTextImageBubble from '$lib/components/FrontTextImageBubble.svelte';
  // import FrontProductGallery from '$lib/components/FrontProductGallery.svelte';
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

  // const galleryProducts: IProduct[] = [
  //   {
  //     description:
  //       " - 44'' Fabric by the Yard\n - 100% Cottton\n - Fabric Care: Machine Wash Normal, No Bleach, Tumble Dry Low\n - Printed in the USA from Imported Material.",
  //     image:
  //       'https://storage.googleapis.com/planetposen-images/2c47ed96b5e061d85f688849b998aa5e76c55c2a.jpg',
  //     name: 'Oversized Blue And Yellow Swirls',
  //     primary_color: '#E6E0DC',
  //     product_no: 11,
  //     subtext: ''
  //   },
  //   {
  //     description:
  //       "The power of cotton is an almighty force for kids attire. Our cotton spandex interlock is a thicker fabric that's durable and naturally comfortable. Plus with breathability and slight stretch, children's tops and dresses are free-moving during play time. Choose from various designs like this dinosaur patch pattern, and you have a loving sewing project for awesome practicality and personality.\n\n - Width: 57 Inches\n - Content: 98% Cotton 2% Spandex\n - Care: Machine wash gentle cold, nonchlorine bleach, line dry, cool iron.\n - Imported",
  //     image:
  //       'https://storage.googleapis.com/planetposen-images/838074447f08f03c4b75ac2030dcd01201c0656c.jpg',
  //     name: 'White Dinosaur Patches',
  //     primary_color: '#B1E0DC',
  //     product_no: 10,
  //     subtext: ''
  //   },
  //   {
  //     description:
  //       ' - Width: 43 inches\n - Content: 100% Cotton\n - Care: Machine wash normal cold, no bleach, tumble dry, do not iron\n - Imported',
  //     image:
  //       'https://storage.googleapis.com/planetposen-images/aef3eb500a6b12b896b7c567b85eded6301d5c4a.jpg',
  //     name: 'Dino Camping',
  //     primary_color: '#EBB4BB',
  //     product_no: 9,
  //     subtext: 'Snuggle Flannel Fabric'
  //   }
  // ];
</script>

<PageMeta title="Hjem" description="Planetposen hjemmeside" />
<section class="frontpage">
  <!-- {#each textImages as data}
    <TextImageParralax {data} />
  {/each} -->
  <FrontTextImage data="{textImages[0]}" />
  <FrontTextImage data="{textImages[1]}" />
  <!--  <FrontProductGallery
    products="{galleryProducts}"
    title="Nye julevarer tilgjengelig!"
    backgroundColor="#BCDEB7"
  /> -->
  <FrontTextImageBubble />
  <FrontTextImage data="{textImages[2]}" />

  <FrontText data="{textTitle[0]}" />

  <FrontTextImage data="{textImages[3]}" />
  <FrontTextImage data="{textImages[4]}" />

  <FrontText data="{textTitle[1]}" />
</section>

<style lang="scss" module="scoped">
  section {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 0.6;
  }
</style>
