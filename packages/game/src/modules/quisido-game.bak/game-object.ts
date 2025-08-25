import type RenderProps from './render-props.js';
import type { StringifiableRecord } from './stringifiable.js';

export default interface GameObject<
  Actions extends object = object,
  State extends StringifiableRecord = StringifiableRecord,
> {
  readonly onAction: <K extends keyof Actions>(
    name: K,
    handler: (payload: Actions[K]) => void,
  ) => void;
  readonly render: (props: RenderProps) => void;
  readonly setChild: <P extends object, S extends StringifiableRecord>(
    key: string,
    component: (this: GameObject<Actions, S>, props: P) => void,
    props: P,
  ) => void;
  readonly setState: <K extends keyof State>(
    key: K,
    value: (oldValue: State[K] | undefined) => State[K],
  ) => void;
  readonly state: Partial<State> | undefined;
}
