import type IntercomFunction from '../types/intercom-function.js';

export default interface IntercomWindow extends Window {
  Intercom?: IntercomFunction;
  readonly intercomSettings?:
    | Record<string, number | string | undefined>
    | undefined;
}
