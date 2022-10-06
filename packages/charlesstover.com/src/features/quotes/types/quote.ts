import type { ReactNode } from 'react';

export default interface Quote extends Record<string, unknown> {
  readonly age?: number | undefined;
  readonly author: string;
  readonly company?: string | undefined;
  readonly gender?: 'female' | 'male' | 'neutral' | undefined;
  readonly image?: string | undefined;
  readonly quote: ReactNode;
  readonly title?: string | undefined;
}
