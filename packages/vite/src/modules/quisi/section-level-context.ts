import { createContext, type Context } from 'react';
import { type HeadingLevel } from './heading-level.js';

const DEFAULT_HEADING_LEVEL = 2;

const SectionLevelContext: Context<HeadingLevel> = createContext<HeadingLevel>(DEFAULT_HEADING_LEVEL);

export default SectionLevelContext;
