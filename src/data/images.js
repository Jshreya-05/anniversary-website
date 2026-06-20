// ============================================================
// CENTRAL IMAGE DATA — Replace paths with your own photos
// Place images in: public/assets/images/{category}/
// ============================================================

const PLACEHOLDER = (w, h, text) =>
  `https://placehold.co/${w}x${h}/FDE2E4/C9842A?text=${encodeURIComponent(text)}`;

export const images = {
  hero: {
    main: '/assets/images/hero/hero_main.png',
  },

  wedding: {
    main: PLACEHOLDER(800, 600, 'Wedding Day 2002'),
    couple: PLACEHOLDER(600, 800, 'Wedding Couple'),
    ceremony: PLACEHOLDER(800, 600, 'Ceremony'),
    reception: PLACEHOLDER(800, 600, 'Reception'),
    rings: PLACEHOLDER(600, 600, 'Rings'),
    memory1: '/assets/images/wedding/wedding_memory_1.jpg',
    memory2: '/assets/images/wedding/wedding_memory_2.jpg',
    memory3: '/assets/images/wedding/wedding_memory_3.jpg',
    memory4: '/assets/images/wedding/wedding_memory_4.jpg',
  },

  childhood: {
    shreyaBaby: '/assets/images/childhood/childhood_memory_1.jpg',
    shreyaChild: '/assets/images/childhood/childhood_memory_2.jpg',
    swanandBaby: '/assets/images/childhood/childhood_memory_3.jpg',
    swanandChild: '/assets/images/childhood/childhood_memory_4.jpg',
    familyKids: PLACEHOLDER(800, 600, 'Kids Together'),
  },

  trips: {
    trip1: '/assets/images/trips/trips_memory_1.jpg',
    trip2: '/assets/images/trips/trips_memory_2.jpg',
    trip3: '/assets/images/trips/trips_memory_3.jpg',
    trip4: '/assets/images/trips/trips_memory_4.jpg',
  },


  festivals: {
    diwali: PLACEHOLDER(600, 600, 'Diwali'),
    holi: PLACEHOLDER(600, 600, 'Holi'),
    ganesh: PLACEHOLDER(600, 600, 'Ganesh Chaturthi'),
    newYear: PLACEHOLDER(600, 600, 'New Year'),
  },

  recent: {
    recent1: PLACEHOLDER(800, 600, 'Recent Memory 1'),
    recent2: PLACEHOLDER(800, 600, 'Recent Memory 2'),
    recent3: PLACEHOLDER(800, 600, 'Recent Memory 3'),
    recent4: PLACEHOLDER(800, 600, 'Recent Memory 4'),
  },

  thenVsNow: {
    then: '/assets/images/thenVsNow/then.png',
    now: '/assets/images/thenVsNow/now.png',
  },

  family: {
    aai: PLACEHOLDER(400, 400, 'Aai'),
    baba: PLACEHOLDER(400, 400, 'Baba'),
    shreya: PLACEHOLDER(400, 400, 'Shreya'),
    swanand: PLACEHOLDER(400, 400, 'Swanand'),
  },
};

export default images;
