/**
 *   Since `Instance` is `unknown` in `react-reconciler`, we cannot use
 * `implements Instance`.
 *   A class can only implement an object type or intersection of object types
 * with statically known members. ts(2422)
 */

import type { OpaqueHandle } from 'react-reconciler';
import type QuisidoHostContext from './quisido-host-context.js';

interface Options<Props, Type> {
  readonly hostContext: QuisidoHostContext;
  readonly internalHandle: OpaqueHandle;
  readonly props: Props;
  readonly rootContainer: HTMLCanvasElement;
  readonly type: Type;
}

export default class QuisidoInstance<Props, Type> {
  readonly #hostContext: QuisidoHostContext;
  readonly #internalHandle: OpaqueHandle;
  readonly #props: Props;
  readonly #rootContainer: HTMLCanvasElement;
  readonly #type: Type;

  public constructor({
    hostContext,
    internalHandle,
    props,
    rootContainer,
    type,
  }: Options<Props, Type>) {
    this.#hostContext = hostContext;
    this.#internalHandle = internalHandle;
    this.#props = props;
    this.#rootContainer = rootContainer;
    this.#type = type;
  }
}
