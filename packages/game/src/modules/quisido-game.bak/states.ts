import { mapMapToRecord } from 'fmrs';
import type { PartialReadonlyRecord } from './partial-readonly-record.js';
import type { Stringifiable } from './stringifiable.js';

export default class States {
  #map = new Map<string, Partial<Record<string, Stringifiable>>>();

  public constructor(
    states:
      | PartialReadonlyRecord<
          string,
          PartialReadonlyRecord<string, Stringifiable>
        >
      | undefined,
  ) {
    this.set(states);
  }

  public getStates(
    objectId: string,
  ): PartialReadonlyRecord<string, Stringifiable> | undefined {
    return this.#map.get(objectId);
  }

  public getValue(
    objectId: string,
    stateKey: string,
  ): Stringifiable | undefined {
    const states: PartialReadonlyRecord<string, Stringifiable> | undefined =
      this.getStates(objectId);
    if (typeof states === 'undefined') {
      return;
    }

    return states[stateKey];
  }

  public set(
    states:
      | PartialReadonlyRecord<
          string,
          PartialReadonlyRecord<string, Stringifiable>
        >
      | undefined,
  ): void {
    this.#map.clear();

    if (typeof states === 'undefined') {
      return;
    }

    for (const [id, objectStates] of Object.entries(states)) {
      if (typeof objectStates === 'undefined') {
        continue;
      }

      this.#map.set(id, objectStates);
    }
  }

  public setValue(objectId: string, key: string, value: Stringifiable): void {
    const states: Partial<Record<string, Stringifiable>> | undefined =
      this.#map.get(objectId);

    if (typeof states === 'undefined') {
      this.#map.set(objectId, { [key]: value });
      return;
    }

    states[key] = value;
  }

  public toJSON(): PartialReadonlyRecord<
    string,
    PartialReadonlyRecord<string, Stringifiable>
  > {
    return mapMapToRecord(this.#map);
  }
}
