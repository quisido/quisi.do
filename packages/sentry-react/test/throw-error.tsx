import type { ReactElement } from 'react';

export default function ThrowError(): ReactElement {
  throw new Error('test error message');
}
