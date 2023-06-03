<script lang="ts">
  import PageMeta from '$lib/components/PageMeta.svelte';
  import FrontText from '$lib/components/FrontText.svelte';
  import FrontTextImage from '$lib/components/FrontTextImage.svelte';
  import FrontTextImageBubble from '$lib/components/FrontTextImageBubble.svelte';
  // import FrontProductGallery from '$lib/components/FrontProductGallery.svelte';
  import type IFrontTextImage from '$lib/interfaces/IFrontTextImage';
  // import type { IProduct } from '$lib/interfaces/IProduct';
  import type IFrontText from '$lib/interfaces/IFrontText';

  const textImages: Array<IFrontTextImage> = [
    {
      title: 'Our story',
      text: 'I started making fabric gift bags as a way to combat the wastefulness of traditional paper packaging. As a lifelong crafter and DIY enthusiast, I wanted to create a product that was both beautiful and sustainable. After experimenting with different materials and designs, I landed on the perfect formula for a reusable fabric gift bag that was both eco-friendly and functional.',
      image: 'https://storage.googleapis.com/planetposen-images/front-kf-1.jpg'
    },
    {
      title: 'Eco-Friendly Materials',
      text: 'Our bags are made from organic cotton or recycled fabric, both of which are sustainably sourced and responsibly produced. By choosing to use our bags instead of disposable paper or plastic packaging, you are making a positive impact on the environment and reducing your carbon footprint.',
      imageRight: true,
      // image: 'https://storage.googleapis.com/planetposen-images/front-kf-2.jpg'
      image: 'https://storage.googleapis.com/planetposen-images/bags_backyard-upscaled-2.jpeg'
    },
    {
      title: 'Gift Ideas',
      text: "Whether you're looking for a birthday present, a wedding gift, or a holiday surprise, our fabric gift bags are the perfect way to add a personal touch to any occasion. Use our bags to wrap a variety of gifts, from jewelry and accessories to small electronics and gadgets. Not sure where to start? Check out our gallery for inspiration!",
      image: 'https://storage.googleapis.com/planetposen-images/front-kf-3.jpg'
    },
    {
      title: 'About us',
      text: 'The scenic sculpture park has an impressive collection of works by internationally renowned contemporary artists including Anish Kapoor, Jeppe Hein, Tony Cragg, Olafur Eliasson, Fernando Bottero and Elmgreen & Dragset. The sculpture park focus is sight specific and international contemporary works of art and is available all year.',
      imageRight: true,
      image: 'https://storage.googleapis.com/planetposen-images/front-bee-1.jpg'
    },
    {
      title: 'Gift Ideas',
      text: '',
      imageRight: false,
      image: 'https://storage.googleapis.com/planetposen-images/front-bee-2.jpg'
    }
  ];

  const textTitle: Array<IFrontText> = [
    {
      title: 'Katy Vandekerckhove:',
      text: 'Give a gift that keeps on giving - our fabric gift bags are reusable, eco-friendly, and stylish.',
      color: '#27615d'
    },
    {
      title: 'Katy Vandekerckhove:',
      text: 'Wrap it up in style and sustainability with planetposen fabric gift bags.',
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

  <!--
  <FrontTextImage data="{textImages[4]}" />
  -->

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
