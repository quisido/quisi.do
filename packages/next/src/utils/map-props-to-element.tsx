import type { Attributes, ComponentType, ReactElement } from "react";

export default function mapPropsToElement<P>(
  Component: ComponentType<P>
): (props: Attributes & P) => ReactElement {
  return function mapPropsToElementImpl(props: Attributes & P): ReactElement {
    return <Component {...props} />;
  }
}
