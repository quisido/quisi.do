import type IntercomFunction from '../types/intercom-function';

export default interface IntercomWindow extends Window {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  Intercom?: IntercomFunction;
  readonly intercomSettings?:
    | Record<string, number | string | undefined>
    | undefined;
}
