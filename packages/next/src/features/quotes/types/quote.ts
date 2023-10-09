import { type StaticImageData } from 'next/image.js';
import { type ReactNode } from 'react';

export default interface Quote {
  readonly age?: number | undefined;
  readonly author: string;
  readonly company?: string | undefined;
  readonly gender?: 'female' | 'male' | 'neutral' | undefined;
  readonly image?: StaticImageData | undefined;
  readonly quote: ReactNode;
  readonly title?: string | undefined;
}
