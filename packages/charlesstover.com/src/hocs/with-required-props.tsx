import type { ComponentType, ReactElement } from 'react';
import type Optional from '../types/optional';

export default function withRequiredProps<
  Props extends object,
  K extends keyof Props,
>(
  requiredProps: readonly K[],
  Component: ComponentType<Props>,
): ComponentType<Omit<Props, K> & Optional<Pick<Props, K>>> {
  return function RequiredPropsComponent(
    props: Readonly<Omit<Props, K> & Optional<Pick<Props, K>>>,
  ): ReactElement | null {
    for (const prop of requiredProps) {
      const { [prop]: value } = props;
      if (typeof value === 'undefined') {
        return null;
      }
    }

    // 'Readonly<Omit<Props, K> & Optional<Pick<Props, K>>>' is assignable to
    //   the constraint of type 'Props', but 'Props' could be instantiated with
    //   a different subtype of constraint 'object'.
    return <Component {...(props as Props)} />;
  };
}
