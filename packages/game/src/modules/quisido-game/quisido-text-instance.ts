/**
 *   Since `TextInstance` is `unknown` in `react-reconciler`, we cannot use
 * `implements TextInstance`.
 *   A class can only implement an object type or intersection of object types
 * with statically known members. ts(2422)
 */

import type { OpaqueHandle } from 'react-reconciler';
import type QuisidoHostContext from './quisido-host-context.js';

interface Options {
  readonly hostContext: QuisidoHostContext;
  readonly internalHandle: OpaqueHandle;
  readonly rootContainer: HTMLCanvasElement;
  readonly text: string;
}

export default class QuisidoTextInstance {
  readonly #hostContext: QuisidoHostContext;
  readonly #internalHandle: OpaqueHandle;
  readonly #rootContainer: HTMLCanvasElement;
  readonly #text: string;

  public constructor({
    hostContext,
    internalHandle,
    rootContainer,
    text,
  }: Options) {
    this.#hostContext = hostContext;
    this.#internalHandle = internalHandle;
    this.#rootContainer = rootContainer;
    this.#text = text;
  }
}
