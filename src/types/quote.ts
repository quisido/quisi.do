import { ReactNode } from 'react';

export default interface Quote {
  author: string;
  company?: string;
  image?: string;
  quote: ReactNode;
  title?: string;
}
