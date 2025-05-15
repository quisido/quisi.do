import type ClarityApi from '../types/clarity-api.js';

declare global {
  interface Window {
    clarity: ClarityApi;
  }
}

window.clarity = Object.assign(
  function clarity(): void {
    window.clarity.q.push(arguments);
  },
  { q: [] },
) satisfies ClarityApi;
