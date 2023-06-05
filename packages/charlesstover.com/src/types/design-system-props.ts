import DesignSystemPropsRecord from './design-system-props-record';

type DesignSystemProps<
  Card extends object = object,
  Row extends object = object,
> = {
  [Type in keyof DesignSystemPropsRecord<Card, Row>]: {
    readonly props: DesignSystemPropsRecord<Card, Row>[Type];
    readonly type: Type;
  };
}[keyof DesignSystemPropsRecord<Card, Row>];

export type { DesignSystemProps as default };
