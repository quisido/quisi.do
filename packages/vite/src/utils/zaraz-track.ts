import type { Dimensions } from '../types/dimensions.js';

interface Zaraz {
  readonly track: (
    eventName: string,
    eventProperties?: Record<
      string,
      boolean | number | string | null | undefined
    >,
  ) => void;
}

interface ZarazWindow extends Window {
  readonly zaraz: Zaraz;
}

const hasZaraz = (wndw: Window): wndw is ZarazWindow => 'zaraz' in wndw;

export default function zarazTrack(
  name: string,
  dimensions: Readonly<Dimensions>,
): void {
  if (!hasZaraz(window)) {
    return;
  }

  window.zaraz.track(name, dimensions);
}
