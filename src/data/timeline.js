import { images } from './images';

const PLACEHOLDER = (text) =>
  `https://placehold.co/800x600/FDE2E4/C9842A?text=${encodeURIComponent(text)}`;

export const timelineData = [
  {
    year: '2002',
    title: 'Wedding Day',
    description:
      'On 21 June 2002, two hearts became one. Aai and Baba began their beautiful journey of love, promising to walk together through every season of life.',
    image: images.wedding.main,
    emoji: '💍',
  },
  {
    year: '2006',
    title: 'Shreya Arrives',
    description:
      'On 5 April 2006, our family grew with the arrival of little Shreya. Aai and Baba became parents, and their love found a new home in her smile.',
    image: PLACEHOLDER('Shreya Arrives 2006'),
    emoji: '👧',
  },
  {
    year: '2010',
    title: 'Family Grows Stronger',
    description:
      'Four years of laughter, late-night lullabies, and endless love. The bond between Aai, Baba, and Shreya grew deeper with every shared moment.',
    image: PLACEHOLDER('Family Grows Stronger'),
    emoji: '❤️',
  },
  {
    year: '2016',
    title: 'Swanand Arrives',
    description:
      'On 20 April 2016, our little prince Swanand joined the family. The house filled with new joy, and Aai and Baba\'s hearts doubled in size.',
    image: PLACEHOLDER('Swanand Arrives 2016'),
    emoji: '👦',
  },
  {
    year: '2020',
    title: 'Together Through Every Challenge',
    description:
      'When the world stood still, Aai and Baba stood tall. They shielded us with love, turned our home into a sanctuary, and showed us what strength truly means.',
    image: images.recent.recent1,
    emoji: '🤝',
  },
  {
    year: '2026',
    title: '24 Years of Togetherness',
    description:
      'Twenty-four years of love, sacrifice, laughter, and memories. Today we celebrate not just an anniversary, but a lifetime of beautiful togetherness.',
    image: images.recent.recent2,
    emoji: '🎉',
  },
];
