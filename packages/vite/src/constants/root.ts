import { createRoot, type Root } from 'react-dom/client';

const getRoot = (): Root => {
  const container: HTMLElement | null = window.document.getElementById('root');
  if (container === null) {
    throw new Error('Expected a root element.');
  }
  return createRoot(container);
};

export const ROOT: Root = getRoot();
