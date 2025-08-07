import GameObject from './game-object.js';
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

interface Options {
  readonly entry?: string | undefined;
  readonly game: (this: GameObject) => void;
  readonly objects: Readonly<Record<string, StringifiableGameObject>>;
  readonly seed: number;
  readonly timestamp: number;
  readonly version?: number | undefined;
}

const UUID_CHARACTERS =
  '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
const VERSION = 1;

export default class Game {
  public static VERSION: number = VERSION;

  #entry: string;
  #objectFunctions: Readonly<Record<string, () => void>> = {};
  #objects: Readonly<Record<string, StringifiableGameObject>>;
  #render: Readonly<Record<string, () => void>> = {};
  #seed: number;
  #timestamp: number;

  public constructor({
    entry,
    game,
    objects,
    seed,
    timestamp,
    version = Game.VERSION,
  }: Options) {
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

    this.setObjectFunction(this.#entry, game, {});
  }

  public addChild<P>(
    parentId: string,
    key: string,
    objectFunction: (this: GameObject, props: P) => void,
    props: P,
  ): void {
    const parentObject: StringifiableGameObject = this.getObject(parentId);
    if (!Object.hasOwn(parentObject[ObjectKey.Children], key)) {
      const childId: string = this.createUuid();
      this.createObject(childId);
      this.setChild(parentId, key, childId);
    }

    const childId: string = this.getObjectChildId(parentId, key);
    this.setObjectFunction(childId, objectFunction, props);
  }

  private createObject(id: string): void {
    this.#objects = {
      ...this.#objects,
      [id]: {
        [ObjectKey.Children]: {},
        [ObjectKey.State]: {},
      },
    };
  }

  private createUuid(): string {
    return new Array(12)
      .fill(null)
      .map(this.getRandomUuidCharacter.bind(this))
      .join('');
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

  private setChild(parentId: string, key: string, childId: string): void {
    const parentObject: StringifiableGameObject = this.getObject(parentId);
    this.#objects = {
      ...this.#objects,
      [parentId]: {
        ...parentObject,
        [ObjectKey.Children]: {
          ...parentObject[ObjectKey.Children],
          [key]: childId,
        },
      },
    };
  }

  private setObjectFunction<P>(
    id: string,
    objectFunction: (this: GameObject, props: P) => void,
    props: P,
  ): void {
    this.#objectFunctions = {
      ...this.#objectFunctions,
      [id]: (): void => {
        objectFunction.call(new GameObject({ game: this, id }), props);
      },
    };
  }

  public setOptions({ entry, objects, seed, timestamp }: AsyncOptions): void {
    this.#entry = entry;
    this.#objects = objects;
    this.#seed = seed;
    this.#timestamp = timestamp;
  }

  public setRender(id: string, callback: () => void): void {
    this.#render = {
      ...this.#render,
      [id]: callback,
    };
  }

  public toJSON(): Omit<Options, 'game'> {
    return {
      entry: this.#entry,
      objects: this.#objects,
      seed: this.#seed,
      timestamp: this.#timestamp,
      version: Game.VERSION,
    };
  }
}
