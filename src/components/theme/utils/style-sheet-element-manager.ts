import type SetValue from '../../../types/set-value';
import MISSING_MANAGED_STYLE_SHEET_ERROR from '../constants/missing-managed-style-sheet-error';
import MISSING_MANAGED_STYLE_SHEET_PARENT_NODE_ERROR from '../constants/missing-managed-style-sheet-parent-node-error';
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

  public mount(): void {
    if (typeof this._parentNode === 'undefined') {
      this.emit('error', MISSING_MANAGED_STYLE_SHEET_PARENT_NODE_ERROR);
      return;
    }

    if (typeof this._element === 'undefined') {
      this.emit('error', MISSING_MANAGED_STYLE_SHEET_ERROR);
      return;
    }

    this._parentNode.appendChild(this._element);
  }

  public removeEventListener<T extends keyof EventListeners>(
    type: T,
    listener: SetValue<EventListeners[T]>,
  ): void {
    this._eventListeners[type].delete(listener);
  }

  public unmount(): void {
    if (typeof this._parentNode === 'undefined') {
      this.emit('error', MISSING_MANAGED_STYLE_SHEET_PARENT_NODE_ERROR);
      return;
    }

    if (typeof this._element === 'undefined') {
      this.emit('error', MISSING_MANAGED_STYLE_SHEET_ERROR);
      return;
    }

    this._parentNode.removeChild(this._element);
  }
}
