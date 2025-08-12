import ActionHandlers from './action-handlers.js';
import Children from './children.js';
import type GameObject from './game-object.js';
import noop from './noop.js';
import type { PartialReadonlyRecord } from './partial-readonly-record.js';
import type RenderProps from './render-props.js';
import RenderQueue from './render-queue.js';
import type { Stringifiable } from './stringifiable.js';

interface AsyncOptions {
  readonly children?:
    | PartialReadonlyRecord<string, PartialReadonlyRecord<string, string>>
    | undefined;
  readonly seed: number;
  readonly states?: PartialReadonlyRecord<string, Stringifiable> | undefined;
  readonly timestamp: number;
  readonly version?: number | undefined;
}

interface Options<Actions extends object> {
  readonly children?:
    | PartialReadonlyRecord<string, PartialReadonlyRecord<string, string>>
    | undefined;
  readonly game: (this: GameObject<Actions>) => void;
  readonly onRender?: ((id: string, props: RenderProps) => void) | undefined;
  readonly seed: number;
  readonly states?: PartialReadonlyRecord<string, Stringifiable> | undefined;
  readonly timestamp: number;
  readonly version?: number | undefined;
}

const ROOT_OBJECT_ID = '#';
const UUID_CHARACTERS =
  '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
const VERSION = 1;

export default class Game<Actions extends object> {
  public static VERSION: number = VERSION;

  readonly #actionHandlers = new ActionHandlers<Actions>();
  readonly #children: Children;
  readonly #components: Record<string, () => void> = {};
  readonly #render: Record<string, () => RenderProps> = {};
  #renderQueue = new RenderQueue();
  #seed: number;
  #states: Partial<Record<string, Stringifiable>>;
  #timestamp: number;

  public constructor({
    children,
    game,
    onRender,
    seed,
    states = {},
    timestamp,
    version = Game.VERSION,
  }: Options<Actions>) {
    if (version !== Game.VERSION) {
      throw new Error('Game versions are not yet backwards compatible.');
    }

    this.#children = new Children(children);
    this.#seed = seed;
    this.#states = states;
    this.#timestamp = timestamp;

    this.setComponent(ROOT_OBJECT_ID, game, {});
    if (typeof onRender !== 'undefined') {
      this.setRenderHandler(onRender);
    }
  }

  private createUuid(): string {
    return new Array(12)
      .fill(null)
      .map(this.getRandomUuidCharacter.bind(this))
      .join('');
  }

  public dispatch<K extends keyof Actions>(name: K, payload: Actions[K]): void {
    window.console.log(this, name, payload);
  }

  private getChildId(parentId: string, childKey: string): string {
    const childId: string | undefined = this.#children.getChildId(
      parentId,
      childKey,
    );

    if (typeof childId !== 'undefined') {
      return childId;
    }

    const newChildId: string = this.createUuid();
    this.#children.setChild(parentId, childKey, newChildId);
    return newChildId;
  }

  private getRandomCharacter(str: string): string {
    const charIndex: number = this.getRandomNumber(0, str.length - 1);
    const char: string | undefined = str[charIndex];
    if (typeof char === 'undefined') {
      throw new Error(
        `Character at index ${charIndex} not found in string "${str}".`,
      );
    }

    return char;
  }

  private getRandomNumber(min: number, max: number): number {
    this.#seed += max;
    return (this.#seed % (max - min + 1)) + min;
  }

  private getRandomUuidCharacter(): string {
    return this.getRandomCharacter(UUID_CHARACTERS);
  }

  private getState(objectId: string): Stringifiable | undefined {
    return this.#states[objectId];
  }

  private onAction<K extends keyof Actions>(
    name: K,
    handler: (payload: Actions[K]) => void,
  ): void {
    this.#actionHandlers.add(name, handler);
  }

  public render: VoidFunction = noop;

  private setChild<P extends object, S extends Stringifiable>(
    parentId: string,
    childKey: string,
    component: (this: GameObject<Actions, S>, props: P) => void,
    props: P,
  ): void {
    const childId: string = this.getChildId(parentId, childKey);
    this.setComponent(childId, component, props);
  }

  private setComponent<P extends object, S extends Stringifiable>(
    objectId: string,
    component: (this: GameObject<Actions, S>, props: P) => void,
    props: P,
  ): void {
    this.#components[objectId] = (): void => {
      component.call(
        {
          /**
           *   These methods are re-implemented instead of using
           * `.bind(this, id)`. This prevents the Game object (`this`) from
           * being accessible within a component.
           */
          onAction: <K extends keyof Actions>(
            name: K,
            callback: (payload: Actions[K]) => void,
          ): void => {
            this.onAction(name, callback);
          },
          render: (props: RenderProps): void => {
            this.#renderQueue.set(objectId, props);
          },
          setChild: <
            ChildProps extends object,
            ChildState extends Stringifiable,
          >(
            key: string,
            component: (
              this: GameObject<Actions, ChildState>,
              props: ChildProps,
            ) => void,
            props: ChildProps,
          ): void => {
            this.setChild(objectId, key, component, props);
          },
          setState: <K extends keyof S>(
            key: K,
            value: (oldValue: S[K]) => S[K],
          ): void => {
            this.setState(
              objectId,
              key,
              value(this.getState(objectId) as S[K]),
            );
          },
          state: this.getState(objectId),
        },
        props,
      );
    };
  }

  public setOptions({ children, seed, states, timestamp }: AsyncOptions): void {
    this.#children.set(children);
    this.#states = states ?? {};
    this.#seed = seed;
    this.#timestamp = timestamp;
  }

  public setRender(id: string, callback: () => RenderProps): void {
    this.#render[id] = callback;
  }

  private setRenderHandler(
    handler: (id: string, props: RenderProps) => void,
  ): void {
    this.render = (): void => {
      const entries: MapIterator<[string, RenderProps]> =
        this.#renderQueue.flush();
      for (const [id, props] of entries) {
        handler(id, props);
      }
    };
  }

  public setState(objectId: string, key: string, value: Stringifiable): void {
    this.getState(objectId).set(key, value);
  }

  public toJSON(): Omit<Options<Actions>, 'game' | 'onRender'> {
    return {
      children: this.#children.toJSON(),
      seed: this.#seed,
      states: this.#states,
      timestamp: this.#timestamp,
      version: Game.VERSION,
    };
  }
}
