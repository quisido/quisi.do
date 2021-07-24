import type { ReactNode } from 'react';

export default interface Quote {
  readonly age?: number;
  readonly author: string;
  readonly company?: string;
  readonly gender?: 'female' | 'male' | 'neutral';
  readonly image?: string;
  readonly quote: ReactNode;
  readonly title?: string;
}
