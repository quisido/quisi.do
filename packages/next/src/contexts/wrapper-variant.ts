import type { Context } from 'react';
import { createContext } from 'react';

const WrapperVariantContent: Context<'table' | 'wizard' | null | undefined> =
  createContext<'table' | 'wizard' | null | undefined>(null);

export default WrapperVariantContent;
