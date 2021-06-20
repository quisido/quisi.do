import { ReactNode } from 'react';

export default interface Quote {
  age?: number;
  author: string;
  company?: string;
  gender?: 'female' | 'male' | 'neutral';
  image?: string;
  quote: ReactNode;
  title?: string;
}
