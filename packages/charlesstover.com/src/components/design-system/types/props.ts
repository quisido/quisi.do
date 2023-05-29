import { ComponentType } from 'react';
import DesignSystemPropsRecord from '../../../types/design-system-props-record';

interface DesignSystemComponentProps<
  Card extends object,
  Row extends object,
  Type extends keyof DesignSystemPropsRecord<Card, Row>,
> {
  readonly Fallback?:
    | ComponentType<DesignSystemPropsRecord<Card, Row>[Type]>
    | undefined;
  readonly props: DesignSystemPropsRecord<Card, Row>[Type];
  readonly type: Type;
}

type Props<Card extends object, Row extends object> = {
  [Type in keyof DesignSystemPropsRecord<
    Card,
    Row
  >]: DesignSystemComponentProps<Card, Row, Type>;
}[keyof DesignSystemPropsRecord<Card, Row>];

export default Props;
