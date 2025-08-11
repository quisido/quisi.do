import ActionHandlers from './action-handlers.js';
import type GameObject from './game-object.js';
import noop from './noop.js';
import type RenderProps from './render-props.js';
import RenderQueue from './render-queue.js';
import {
  ObjectKey,
  type StringifiableGameObject,
} from './stringifiable-game-object.js';

interface AsyncOptions {
  readonly entry: string;
  readonly objects: Readonly<Record<string, StringifiableGameObject>>;
  readonly seed: number;
  readonly timestamp: number;
}

interface Options<Actions extends object> {
  readonly entry?: string | undefined;
  readonly game: (this: GameObject<Actions>) => void;
  readonly objects: Readonly<Record<string, StringifiableGameObject>>;
  readonly onRender?: ((id: string, props: RenderProps) => void) | undefined;
  readonly seed: number;
  readonly timestamp: number;
  readonly version?: number | undefined;
}

const UUID_CHARACTERS =
  '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
const VERSION = 1;

export default class Game<Actions extends object> {
  public static VERSION: number = VERSION;

  readonly #actionHandlers = new ActionHandlers<Actions>();
  readonly #components: Record<string, () => void> = {};
  #entry: string;
  readonly #objects: Record<string, StringifiableGameObject>;
  readonly #render: Record<string, () => RenderProps> = {};
  #renderQueue = new RenderQueue();
  #seed: number;
  #timestamp: number;

  public constructor({
    entry,
    game,
    objects,
    onRender,
    seed,
    timestamp,
    version = Game.VERSION,
  }: Options<Actions>) {
    if (version !== Game.VERSION) {
      throw new Error('Game versions are not yet backwards compatible.');
    }

    this.#objects = objects;
    this.#seed = seed;
    this.#timestamp = timestamp;

    if (typeof entry === 'undefined') {
      const uuid: string = this.createUuid();
      this.#entry = uuid;
      this.createObject(uuid);
    } else {
      this.#entry = entry;
    }

    this.setComponent(this.#entry, game, {});
    if (typeof onRender !== 'undefined') {
      this.setRenderHandler(onRender);
    }
  }

  public addChild<P>(
    parentId: string,
    key: string,
    component: (this: GameObject<Actions>, props: P) => void,
    props: P,
  ): void {
    const parentObject: StringifiableGameObject = this.getObject(parentId);
    if (!Object.hasOwn(parentObject[ObjectKey.Children], key)) {
      const childId: string = this.createUuid();
      this.createObject(childId);
      this.setChild(parentId, key, childId);
    }

    const childId: string = this.getObjectChildId(parentId, key);
    this.setComponent(childId, component, props);
  }

  private createObject(id: string): void {
    this.#objects[id] = {
      [ObjectKey.Children]: {},
      [ObjectKey.State]: {},
    };
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

  private getObject(id: string): StringifiableGameObject {
    const object: StringifiableGameObject | undefined = this.#objects[id];
    if (typeof object === 'undefined') {
      throw new Error(`Could not find object "${id}".`);
    }
    return object;
  }

  private getObjectChildId(parentId: string, key: string): string {
    const object: StringifiableGameObject = this.getObject(parentId);
    const childId: string | undefined = object[ObjectKey.Children][key];
    if (typeof childId === 'undefined') {
      throw new Error(`Child "${key}" not found in object "${parentId}".`);
    }
    return childId;
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

  private onAction<K extends keyof Actions>(
    name: K,
    handler: (payload: Actions[K]) => void,
  ): void {
    this.#actionHandlers.add(name, handler);
  }

  public render: VoidFunction = noop;

  private setChild(parentId: string, key: string, childId: string): void {
    const parentObject = this.#objects[parentId];
    if (typeof parentObject === 'undefined') {
      throw new Error(
        `Child "${key}" could not be set on missing parent "${parentId}"`,
      );
    }

    parentObject[ObjectKey.Children][key] = childId;
  }

  private setComponent<P>(
    id: string,
    component: (this: GameObject<Actions>, props: P) => void,
    props: P,
  ): void {
    this.#components[id] = (): void => {
      component.call(
        {
          addChild: <P>(
            key: string,
            component: (this: GameObject<Actions>, props: P) => void,
            props: P,
          ): void => {
            this.addChild(id, key, component, props);
          },
          onAction: this.onAction.bind(this),
          render: (callback: () => RenderProps): void => {
            this.#render[id] = callback;
          },
        },
        props,
      );
    };
  }

  public setOptions({ entry, objects, seed, timestamp }: AsyncOptions): void {
    this.#entry = entry;
    Object.assign(this.#objects, objects);
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

  public toJSON(): Omit<Options<Actions>, 'game' | 'onRender'> {
    return {
      entry: this.#entry,
      objects: this.#objects,
      seed: this.#seed,
      timestamp: this.#timestamp,
      version: Game.VERSION,
    };
  }
}
