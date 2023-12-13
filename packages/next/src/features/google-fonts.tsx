/* eslint-disable @typescript-eslint/no-magic-numbers */
import type { ReactElement } from 'react';

interface GoogleFont {
  readonly weights: readonly number[];
}

enum Weight {
  Bold = 700,
  Normal = 400,
}

const GOOGLE_FONTS: Record<string, GoogleFont> = {
  'Noto Sans': {
    weights: [Weight.Normal, Weight.Bold],
  },
  'Noto Sans Display': {
    weights: [Weight.Bold],
  },
};

const mapGoogleFontEntryToFamily = ([family, { weights }]: [
  string,
  GoogleFont,
]): string => `${family}:wght@${weights.join(';')}`;

export default function GoogleFonts(): ReactElement {
  const params: URLSearchParams = new URLSearchParams();
  params.set('display', 'swap');
  for (const entry of Object.entries(GOOGLE_FONTS)) {
    const family: string = mapGoogleFontEntryToFamily(entry);
    params.set('family', family);
  }

  return (
    <link
      href={`https://fonts.googleapis.com/css2?${params.toString()}`}
      rel="stylesheet"
    />
  );
}
