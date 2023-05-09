import type SetValue from '../../../types/set-value';
import mapElementToParentNode from '../utils/map-element-to-parent-node';

interface EventListeners {
  readonly error: Set<(error: unknown) => void>;
}

interface EventQueue {
  readonly error: [unknown][];
}

const EMPTY = 0;
const FIRST = 1;

export default class StyleSheetElementManager {
  private readonly _element: Element | ProcessingInstruction | undefined;

  private readonly _eventListeners: EventListeners = {
    error: new Set(),
  };

  private readonly _eventQueue: EventQueue = {
    error: [],
  };

  private readonly _parentNode: ParentNode | undefined;

  public constructor(
    getter: (
      styleSheetList: Readonly<StyleSheetList>,
    ) => Element | ProcessingInstruction,
  ) {
    try {
      this._element = getter(document.styleSheets);
      this._parentNode = mapElementToParentNode(this._element);
      this.unmount();
    } catch (err: unknown) {
      this.emit('error', err);
    }
  }

  public get element(): Element | ProcessingInstruction {
    if (typeof this._element === 'undefined') {
      throw new Error('Could not find the style sheet to manage.');
    }

    return this._element;
  }

  public get parentNode(): ParentNode {
    if (typeof this._parentNode === 'undefined') {
      throw new Error('Expected managed style sheet to have a parent node.');
    }

    return this._parentNode;
  }

  public addEventListener<T extends keyof EventListeners>(
    type: T,
    listener: SetValue<EventListeners[T]>,
  ): void {
    this._eventListeners[type].add(listener);

    if (this._eventListeners[type].size === FIRST) {
      while (this._eventQueue[type].length > EMPTY) {
        /* We use `as` below for two reasons:
         * 1) TypeScript cannot correctly infer that `[unknown]` satisfies
         *      `Parameters<ArrayItem<EventListeners[T]>>`.
         * 2) We know that `shift` is defined, because we have validated the
         *      array's length to be non-empty.
         */
        const args: Parameters<SetValue<EventListeners[T]>> = this._eventQueue[
          type
        ].shift() as Parameters<SetValue<EventListeners[T]>>;
        this.emit(type, ...args);
      }
    }
  }

  public mount(): void {
    try {
      this.parentNode.appendChild(this.element);
    } catch (err: unknown) {
      this.emit('error', err);
    }
  }

  public removeEventListener<T extends keyof EventListeners>(
    type: T,
    listener: SetValue<EventListeners[T]>,
  ): void {
    this._eventListeners[type].delete(listener);
  }

  public unmount(): void {
    try {
      this.parentNode.removeChild(this.element);
    } catch (err: unknown) {
      this.emit('error', err);
    }
  }

  private emit<T extends keyof EventListeners>(
    type: T,
    ...args: Parameters<SetValue<EventListeners[T]>>
  ): void {
    if (this._eventListeners[type].size === EMPTY) {
      this._eventQueue[type].push(args);
      return;
    }

    for (const handleEvent of this._eventListeners[type]) {
      // Fix: A spread argument must either have a tuple type or be passed to a
      //   rest parameter. ts(2556)
      // eslint-disable-next-line prefer-spread
      handleEvent.apply(null, args);
    }
  }
}
