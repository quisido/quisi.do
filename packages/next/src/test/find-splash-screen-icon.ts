interface Icon {
  readonly sizes: string;
  readonly type: string;
}

const BASE = 10;
const SPLASH_SCREEN_ICON_SIZE = 512;

export default function findSplashScreenIcon({ sizes, type }: Icon): boolean {
  const [, widthStr, heightStr] = sizes.match(/^(\d+)x(\d+)$/u)!;
  const height: number = parseInt(heightStr!, BASE);
  const width: number = parseInt(widthStr!, BASE);

  return (
    height >= SPLASH_SCREEN_ICON_SIZE &&
    width >= SPLASH_SCREEN_ICON_SIZE &&
    type === 'image/png'
  );
}
