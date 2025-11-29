import { type ApiV2, type FSApi } from '@fullstory/snippet';
import { createContext, type Context } from 'react';

const FullstoryContext: Context<ApiV2 | null>
 = createContext<FSApi | null>(null);

export default FullstoryContext;
