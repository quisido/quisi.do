import type { ComponentType, FunctionComponent, ReactElement } from 'react';
import isUndefined from '../utils/is-undefined';

/*
AWSUI does not mount renderer methods (e.g. CardDefinition's `content` and
  `header`) with JSX, e.g. `<Content {...item} />` or `<Header {...item} />`.
  Instead, it calls the renderer as a function: `<>{content(item)}</>`. As a
  result, we experience two problems with setting the renderer property to its
  component directly.
1. Class components are not supported since they cannot be called.
2. The function invocation does not instantiate local hook state.

This function generates a renderer function that can be passed to the `content`
  and `header` methods, mounting their respective components as JSX, and
  resolving the above two issues.
*/

export default function mapComponentToRenderer<
  Props extends Record<string, unknown>,
>(
  Component: ComponentType<Props> | undefined,
): FunctionComponent<Props> | undefined {
  if (isUndefined(Component)) {
    return;
  }

  return function render(props: Readonly<Props>): ReactElement {
    return <Component {...props} />;
  };
}
