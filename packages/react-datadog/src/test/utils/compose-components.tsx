import type { ComponentType, PropsWithChildren, ReactElement } from 'react';

const FIRST = 0;
const SINGLE = 1;

export default function composeComponents(
  ...components: readonly [
    ComponentType<PropsWithChildren>,
    ...ComponentType<PropsWithChildren>[],
  ]
): ComponentType<PropsWithChildren> {
  if (components.length === SINGLE) {
    return components[FIRST];
  }

  const [Parent, Child, ...remainingComponents] = components;
  return composeComponents(
    function ComposedComponent({
      children,
    }: Readonly<PropsWithChildren>): ReactElement {
      return (
        <Parent>
          <Child>{children}</Child>
        </Parent>
      );
    },
    ...remainingComponents,
  );
}
