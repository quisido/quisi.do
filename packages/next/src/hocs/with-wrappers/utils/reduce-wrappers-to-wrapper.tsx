import type { ComponentType, PropsWithChildren, ReactElement } from 'react';

export default function reduceWrappersToWrapper(
  Previous: ComponentType<Required<PropsWithChildren>>,
  Next: ComponentType<Required<PropsWithChildren>>,
): ComponentType<Required<PropsWithChildren>> {
  return function Wrapper({
    children,
  }: Readonly<Required<PropsWithChildren>>): ReactElement {
    return (
      <Previous>
        <Next>{children}</Next>
      </Previous>
    );
  };
}
