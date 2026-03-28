import type { ReactNode } from 'react';

export interface ProductDetailLayoutProps {
  /** Product information, description, and purchase actions. */
  readonly children: ReactNode;
  /** Accessible label for the main content area. */
  readonly label: string;
  /** Media gallery section (images, video, etc.). */
  readonly media: ReactNode;
}
