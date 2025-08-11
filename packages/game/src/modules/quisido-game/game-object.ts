import type RenderProps from './render-props.js';

export default interface GameObject<Actions extends object> {
  readonly addChild: <P>(
    key: string,
    component: (this: GameObject<Actions>, props: P) => void,
    props: P,
  ) => void;
  readonly onAction: <K extends keyof Actions>(
    name: K,
    handler: (payload: Actions[K]) => void,
  ) => void;
  readonly render: (callback: () => RenderProps) => void;
}
