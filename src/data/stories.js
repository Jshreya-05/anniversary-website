import { images } from './images';

export const storyCategories = [
  {
    id: 'recent',
    name: 'Recent Memories',
    stories: [
      { image: images.wedding.memory1, caption: 'Our beautiful family of four — the greatest blessing of our 24-year journey ❤️' },
      { image: images.wedding.memory2, caption: 'Celebrating love, laughter, and togetherness every single day ✨' },
      { image: images.wedding.memory3, caption: 'Late night adventures and making beautiful memories together 🛶' },
      { image: images.wedding.memory4, caption: 'Our home is where our hearts are, filled with love and warmth 🏡' },
    ],
  },
  {
    id: 'childhood',
    name: 'Childhood Memories',
    stories: [
      { image: images.childhood.shreyaBaby, caption: 'Baby Shreya — our first miracle in a little saree 👧' },
      { image: images.childhood.shreyaChild, caption: 'Shreya growing up into a beautiful young woman ✨' },
      { image: images.childhood.swanandBaby, caption: 'Baby Swanand — our little sunshine in a festive outfit 👦' },
      { image: images.childhood.swanandChild, caption: 'Swanand growing up, full of joy and curiosity 🌊' },
    ],
  },
  {
    id: 'trips',
    name: 'Family Trips',
    stories: [
      { image: images.trips.trip1, caption: 'Adventures that became our favourite stories' },
      { image: images.trips.trip2, caption: 'New places, same beautiful family' },
      { image: images.trips.trip3, caption: 'Collecting memories, one trip at a time' },
      { image: images.trips.trip4, caption: 'Together is our favourite place to be' },
    ],
  },
];

export const polaroidAlbums = [
  {
    id: 'wedding',
    title: 'Wedding Album',
    photos: [
      { image: images.wedding.main, caption: 'Forever begins here' },
      { image: images.wedding.couple, caption: 'Made for each other' },
      { image: images.wedding.rings, caption: 'Two rings, one love' },
    ],
  },
  {
    id: 'childhood',
    title: 'Childhood Album',
    photos: [
      { image: images.childhood.shreyaBaby, caption: 'Hello world — Baby Shreya' },
      { image: images.childhood.swanandBaby, caption: 'Hello world — Baby Swanand' },
      { image: images.childhood.shreyaChild, caption: 'Growing up beautifully' },
    ],
  },
  {
    id: 'trips',
    title: 'Family Trips',
    photos: [
      { image: images.trips.trip1, caption: 'Wanderlust & family' },
      { image: images.trips.trip2, caption: 'Sunset memories' },
      { image: images.trips.trip3, caption: 'Adventure awaits' },
      { image: images.trips.trip4, caption: 'Together is our favourite place to be' },
    ],
  },
];
