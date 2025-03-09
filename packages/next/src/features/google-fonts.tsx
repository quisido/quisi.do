import { type ReactElement } from 'react';
import GoogleFonts from '../components/google-fonts.js';
import { FontWeight } from '../constants/font-weight.js';

const NORMAL_BOLD: readonly FontWeight[] = [FontWeight.Normal, FontWeight.Bold];

export default function GoogleFontsFeature(): ReactElement {
  return (
    <GoogleFonts
      Cairo_Play={NORMAL_BOLD}
      Merienda={NORMAL_BOLD}
      Noto_Color_Emoji={FontWeight.Normal}
      Noto_Sans={NORMAL_BOLD}
      Noto_Sans_Display={FontWeight.Bold}
      Pangolin={FontWeight.Normal}
      Protest_Revolution={FontWeight.Normal}
    />
  );
}
