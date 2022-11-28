<script lang="ts">
  import FrontText from '$lib/components/FrontText.svelte';
  import FrontTextImage from '$lib/components/FrontTextImage.svelte';
  import FrontTextImageBubble from '$lib/components/FrontTextImageBubble.svelte';
  import type IFrontTextImage from '$lib/interfaces/IFrontTextImage';
  import type IFrontText from '$lib/interfaces/IFrontText';

  const textImages: Array<IFrontTextImage> = [
    {
      title: 'Our story',
      text: 'The new fabulous museum at Kistefos, designed by world renowned architect Bjarke Ingels Group, BIG, opened Wednesday September 18th, 2019. The building has been named the top architectural museum project in the world to open in 2019, by both the Daily Telegraph and Bloomberg.',
      image:
        'https://kistefos.imgix.net/copyright_laurianghinitoiu_kistefosmuseum-4-of-17-7898.jpg?auto=compress%2Cformat&bg=%23FFFFFF&crop=focalpoint&fit=crop&fm=jpg&fp-x=0.5&fp-y=0.5&h=894&q=90&w=1300&s=6d142e2c43fff947bb5335cd53a566d6'
    },
    {
      title: 'Paper waste and the planet',
      text: "As the 50th artwork to be included in the park, a site-specific new commission by French artist Pierre Huyghe (b. 1962, Paris) was opened on the 12th of June. The vast permanent work will be the artist's largest site-specific work to date and the most ambitious to ever be conceived for Kistefos.",
      imageRight: true,
      image:
        'https://kistefos.imgix.net/Pierre-kistefos-5_0717.jpg?auto=compress%2Cformat&bg=%23FFFFFF&crop=focalpoint&fit=crop&fm=jpg&fp-x=0.5&fp-y=0.5&h=894&q=90&w=1300&s=dc5feb98f29a39ea145a739397c42b29'
    },
    {
      title: 'Our goal',
      text: 'The scenic sculpture park has an impressive collection of works by internationally renowned contemporary artists including Anish Kapoor, Jeppe Hein, Tony Cragg, Olafur Eliasson, Fernando Bottero and Elmgreen & Dragset. The sculpture park focus is sight specific and international contemporary works of art and is available all year.',
      image:
        'https://kistefos.imgix.net/Kistefos-EA-Marc-Quinn-All-of-Nature-Flows-Through-Us-0003.jpg?auto=compress%2Cformat&bg=%23FFFFFF&crop=focalpoint&fit=crop&fm=jpg&fp-x=0.5&fp-y=0.5&h=1333&q=90&w=1000&s=c65dada7d2f21cca29f3c758ddf5f81d'
    },
    {
      title: 'About us',
      text: 'The scenic sculpture park has an impressive collection of works by internationally renowned contemporary artists including Anish Kapoor, Jeppe Hein, Tony Cragg, Olafur Eliasson, Fernando Bottero and Elmgreen & Dragset. The sculpture park focus is sight specific and international contemporary works of art and is available all year.',
      imageRight: true,
      image: 'https://i.imgur.com/WWbfhiZ.jpg'
    },
    {
      title: 'Sculpture park of international standing',
      text: 'The scenic sculpture park has an impressive collection of works by internationally renowned contemporary artists including Anish Kapoor, Jeppe Hein, Tony Cragg, Olafur Eliasson, Fernando Bottero and Elmgreen & Dragset. The sculpture park focus is sight specific and international contemporary works of art and is available all year.',
      imageRight: false,
      image: 'https://i.imgur.com/ISCKKAq.jpg'
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

<svelte:head>
  <title>Home</title>
  <meta name="description" content="Svelte demo app" />
</svelte:head>

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
