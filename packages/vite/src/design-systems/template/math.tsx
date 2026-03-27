import type { ReactElement, ReactNode } from 'react';

export interface MathProps {
  readonly children: ReactNode;
  readonly label: string;
}

/**
 *   The `Math` component marks content in an accessible format such as MathML,
 * or with another type of textual representation such as TeX or LaTeX, which
 * can be converted to an accessible format by native browser implementations or
 * a polyfill library.
 *   While it is not ideal to use an image of a mathematical expression, there
 * exists a significant amount of legacy content where images are used to
 * represent mathematical expressions. Authors _should_ ensure that images of
 * math are labeled by text that describes the mathematical expression as it
 * might be spoken.
 */
export default function Math({ children, label }: MathProps): ReactElement {
  return (
    <div aria-label={label} role="math">
      {children}
    </div>
  );
}
