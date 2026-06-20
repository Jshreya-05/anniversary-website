// Constellation star positions — naturally scattered, not grid-aligned
// x/y are percentages; brightness 0–1; size in px

export const constellationStars = [
  { id: 0, x: 6, y: 32, size: 10, brightness: 0.6, year: 2002 },
  { id: 1, x: 15, y: 18, size: 16, brightness: 0.95, year: 2003 },
  { id: 2, x: 18, y: 48, size: 12, brightness: 0.7, year: 2004 },
  { id: 3, x: 28, y: 28, size: 14, brightness: 0.85, year: 2005 },
  { id: 4, x: 32, y: 64, size: 18, brightness: 1.0, year: 2006 },
  { id: 5, x: 38, y: 15, size: 11, brightness: 0.5, year: 2007 },
  { id: 6, x: 44, y: 45, size: 15, brightness: 0.8, year: 2008 },
  { id: 7, x: 48, y: 76, size: 9, brightness: 0.4, year: 2009 },
  { id: 8, x: 54, y: 22, size: 17, brightness: 1.0, year: 2010 },
  { id: 9, x: 58, y: 56, size: 11, brightness: 0.65, year: 2011 },
  { id: 10, x: 64, y: 14, size: 15, brightness: 0.9, year: 2012 },
  { id: 11, x: 68, y: 72, size: 13, brightness: 0.75, year: 2013 },
  { id: 12, x: 74, y: 38, size: 16, brightness: 0.95, year: 2014 },
  { id: 13, x: 78, y: 52, size: 10, brightness: 0.55, year: 2015 },
  { id: 14, x: 84, y: 20, size: 14, brightness: 0.82, year: 2016 },
  { id: 15, x: 88, y: 64, size: 17, brightness: 1.0, year: 2017 },
  { id: 16, x: 92, y: 30, size: 12, brightness: 0.7, year: 2018 },
  { id: 17, x: 95, y: 78, size: 9, brightness: 0.45, year: 2019 },
  { id: 18, x: 22, y: 84, size: 13, brightness: 0.8, year: 2020 },
  { id: 19, x: 40, y: 90, size: 14, brightness: 0.75, year: 2021 },
  { id: 20, x: 60, y: 88, size: 11, brightness: 0.6, year: 2022 },
  { id: 21, x: 78, y: 86, size: 15, brightness: 0.85, year: 2023 },
  { id: 22, x: 86, y: 92, size: 12, brightness: 0.5, year: 2024 },
  { id: 23, x: 50, y: 35, size: 22, brightness: 1.0, year: 2025 },
];

// Pairs of star ids to draw constellation lines between
export const constellationLines = [
  // Cluster A (Left)
  [0, 1], [1, 3], [3, 5], [3, 2], [2, 4], [4, 18], [18, 19],
  // Cluster B (Middle)
  [10, 8], [8, 23], [23, 6], [6, 9], [9, 11], [11, 7], [7, 19], [11, 20],
  // Cluster C (Right)
  [14, 12], [12, 13], [13, 15], [15, 16], [16, 17], [17, 22], [22, 21], [21, 20]
];
