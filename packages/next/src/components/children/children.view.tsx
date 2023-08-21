import type { PropsWithChildren, ReactElement } from 'react';

/**
 * `Children` is a component that only renders its children. It is the no-op of
 *    components. This is useful when mapping higher-order components to
 *   `ReactNode`s.
 *
 * Example:
 *   If you have a `prop: ReactNode` and want that `ReactNode` to be affected
 *   by a HOC, you can use
 *
 *   const Parent = withHOC(Children);
 *   <Parent>{prop}</Parent>
 */

export default function Children({
  children,
}: Readonly<PropsWithChildren>): ReactElement {
  return <>{children}</>;
}
