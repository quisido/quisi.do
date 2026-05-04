import type { ReactNode } from 'react';

// A required React node is a React node that actually renders to the DOM.
export type RequiredReactNode = Exclude<ReactNode, boolean | null | undefined>;
