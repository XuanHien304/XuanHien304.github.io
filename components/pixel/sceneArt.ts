// Faint pixel-art horizons behind the journey character, one per level.
// Every scene is a 96 x 36 grid of art pixels drawn in a single theme colour;
// the ground (rows 34-35) is shared and drawn separately.

export type Rect = [x: number, y: number, w: number, h: number];

export interface Scene {
  // Solid shapes in the scenery colour.
  fill: Rect[];
  // Holes (windows, screens) punched back out in the page colour.
  cut?: Rect[];
}

export const SCENE_WIDTH = 96;
export const SCENE_HEIGHT = 36;
export const GROUND: Rect = [0, 34, SCENE_WIDTH, 2];

const GROUND_Y = 34;
// A shape standing on the ground: x, width, height.
const stand = (x: number, w: number, h: number): Rect => [x, GROUND_Y - h, w, h];

export const scenes: Record<string, Scene> = {
  // Ho Chi Minh City: lab bench with microscope and flasks, rooftops, a palm.
  student: {
    fill: [
      [6, 22, 34, 2], [8, 24, 2, 10], [36, 24, 2, 10],
      [10, 20, 6, 2], [13, 12, 2, 8], [12, 10, 5, 3], [11, 8, 3, 2],
      [24, 14, 2, 4], [23, 18, 4, 2], [22, 20, 6, 2],
      [30, 19, 8, 1], [31, 15, 1, 4], [33, 14, 1, 5], [35, 16, 1, 3],
      stand(50, 14, 10), [53, 20, 8, 4],
      stand(82, 12, 8),
      [72, 12, 2, 22], [66, 10, 14, 2], [68, 8, 10, 2], [64, 12, 4, 2], [78, 12, 4, 2],
    ],
  },
  // FPT Software: desks with monitors, a server rack, a plant.
  fpt: {
    fill: [
      [4, 24, 24, 2], [5, 26, 2, 8], [25, 26, 2, 8], [8, 14, 10, 8], [12, 22, 2, 2],
      [32, 24, 24, 2], [33, 26, 2, 8], [53, 26, 2, 8],
      [35, 15, 8, 7], [38, 22, 2, 2], [45, 15, 8, 7], [48, 22, 2, 2],
      stand(66, 12, 28),
      stand(84, 4, 8), [82, 20, 8, 6],
    ],
    cut: [
      [9, 15, 8, 6], [36, 16, 6, 5], [46, 16, 6, 5],
      [68, 9, 8, 2], [68, 13, 8, 2], [68, 17, 8, 2], [68, 21, 8, 2], [68, 25, 8, 2],
    ],
  },
  // Data Nest: a skyline whose buildings rise like a bar chart.
  datanest: {
    fill: [
      stand(4, 9, 8), stand(15, 9, 12), stand(26, 9, 11), stand(37, 9, 16),
      stand(48, 9, 20), stand(59, 9, 19), stand(70, 9, 25), stand(81, 9, 30),
      [85, 0, 1, 4],
    ],
    cut: [
      [41, 21, 1, 1], [44, 24, 1, 1], [52, 17, 1, 1], [55, 21, 1, 1],
      [74, 13, 1, 1], [77, 17, 1, 1], [74, 21, 1, 1], [84, 8, 1, 1], [87, 12, 1, 1], [84, 16, 1, 1],
    ],
  },
  // Birmingham: red-brick roofline, the clock tower, rain clouds.
  birmingham: {
    fill: [
      stand(0, 60, 12), [8, 20, 8, 2], [10, 18, 4, 2], [32, 20, 8, 2], [34, 18, 4, 2],
      stand(68, 8, 28), [67, 4, 10, 2], [70, 0, 4, 4],
      [10, 2, 14, 3], [12, 0, 8, 2], [38, 5, 16, 3], [41, 3, 9, 2],
      [13, 7, 1, 2], [18, 9, 1, 2], [22, 6, 1, 2], [41, 10, 1, 2], [46, 12, 1, 2], [51, 9, 1, 2],
      [82, 22, 10, 8], stand(86, 2, 4),
    ],
    cut: [
      [4, 25, 3, 5], [12, 25, 3, 5], [20, 25, 3, 5], [28, 25, 3, 5],
      [36, 25, 3, 5], [44, 25, 3, 5], [52, 25, 3, 5],
      [70, 9, 4, 4],
    ],
  },
  // GE Vernova: wind turbines on rolling hills, a pylon.
  gevernova: {
    fill: [
      [0, 30, 40, 4], [6, 28, 26, 2], [12, 26, 14, 2], [50, 30, 46, 4], [58, 28, 30, 2],
      [20, 10, 2, 24], [19, 8, 4, 3], [20, 0, 2, 8], [14, 11, 5, 2], [10, 13, 4, 2], [23, 11, 5, 2], [27, 13, 4, 2],
      [48, 16, 2, 18], [47, 14, 4, 3], [48, 8, 2, 6], [43, 16, 4, 1], [40, 17, 3, 1], [51, 16, 4, 1], [55, 17, 3, 1],
      [76, 22, 1, 12], [75, 20, 3, 2], [76, 16, 1, 4], [72, 21, 3, 1], [78, 21, 3, 1],
      [88, 12, 2, 22], [84, 14, 10, 1], [85, 18, 8, 1],
    ],
  },
  // Off the clock: park trees, pull-up bars, a bench.
  offline: {
    fill: [
      [4, 10, 14, 10], [6, 8, 10, 2], [10, 20, 2, 14],
      [34, 12, 2, 22], [52, 12, 2, 22], [34, 12, 20, 1], [52, 20, 14, 1], [64, 20, 2, 14],
      [70, 28, 14, 2], [71, 30, 2, 4], [81, 30, 2, 4],
      [86, 10, 10, 10], [88, 8, 6, 2], [90, 20, 2, 14],
    ],
  },
};
