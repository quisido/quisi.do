const FULL_HD_HEIGHT = 1080;
const FULL_HD_WIDTH = 1920;
const FULLSCREEN_HEIGHT = 768;
const FULLSCREEN_WIDTH = 1024;
// Const MOBILE_HEIGHT = 667;
// Const MOBILE_WIDTH = 375;
const UHD_HEIGHT = 2160;
const UHD_WIDTH = 3840;
const UHD2_HEIGHT = 4320;
const UHD2_WIDTH = 7680;
const WIDESCREEN_HD_HEIGHT = 720;
const WIDESCREEN_HD_WIDTH = 1280;

const FULL_HD: readonly [number, number] = [FULL_HD_WIDTH, FULL_HD_HEIGHT];
// Const MOBILE: readonly [number, number] = [MOBILE_WIDTH, MOBILE_HEIGHT];
const UHD: readonly [number, number] = [UHD_WIDTH, UHD_HEIGHT];
const UHD2: readonly [number, number] = [UHD2_WIDTH, UHD2_HEIGHT];

const FULLSCREEN: readonly [number, number] = [
  FULLSCREEN_WIDTH,
  FULLSCREEN_HEIGHT,
];

const WIDESCREEN_HD: readonly [number, number] = [
  WIDESCREEN_HD_WIDTH,
  WIDESCREEN_HD_HEIGHT,
];

const VIEWPORTS: readonly (readonly [number, number])[] = [
  FULL_HD,
  FULLSCREEN,
  // MOBILE,
  UHD,
  UHD2,
  WIDESCREEN_HD,
];

export default VIEWPORTS;
