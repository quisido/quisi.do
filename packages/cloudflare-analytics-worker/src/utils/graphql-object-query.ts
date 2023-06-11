import flatten from './flatten';
import indent from './indent';
import isString from './is-string';

type Entry<T = unknown> = readonly [string, T];

const ARRAY_INDEX_OFFSET = 1;
const EMPTY_ARRAY: readonly never[] = Object.freeze([]);

export default class GraphQLObjectQuery {
  private readonly _obj: object;

  public constructor(obj: object) {
    this._obj = obj;
  }

  private mapEntryToLines = ([key, value]: Entry): readonly string[] => {
    // true
    if (value === true) {
      return [key];
    }

    // false
    if (value === false) {
      return [];
    }

    if (typeof value === 'object') {
      // null
      if (value === null) {
        return [];
      }

      // function
      if (
        '__params' in value &&
        typeof value.__params === 'object' &&
        value.__params !== null
      ) {
        if ('__name' in value && typeof value.__name === 'string') {
          const { __name, __params, ...values } = value;
          const lines: readonly string[] = this.mapObjectToLines(values);
          const params: readonly string[] = this.mapParametersToLines(__params);
          return [`${key}: ${__name}(`, ...params, ') {', ...lines, '}'];
        }

        const { __params, ...values } = value;
        const lines: readonly string[] = this.mapObjectToLines(values);
        const params: readonly string[] = this.mapParametersToLines(__params);
        return [`${key}(`, ...params, ') {', ...lines, '}'];
      }

      // record
      const lines: readonly string[] = this.mapObjectToLines(value);
      return [`${key} {`, ...lines, '}'];
    }

    if (typeof value === 'string') {
      return [`${key}: ${value}`];
    }

    throw new Error(`Unexpected value type: ${typeof value}`);
  };

  private mapParameterEntryToLines = (
    [key, value]: Entry,
    index: number,
    entries: readonly Entry[],
  ): readonly string[] => {
    const isLastEntry: boolean = index === entries.length - ARRAY_INDEX_OFFSET;
    const trail: string = isLastEntry ? '' : ',';

    if (typeof value === 'boolean') {
      return [`${key}: ${value}${trail}`];
    }

    if (typeof value === 'number') {
      return [`${key}: ${value}${trail}`];
    }

    if (typeof value === 'object') {
      // null
      if (value === null) {
        return [`${key}: null${trail}`];
      }

      // array
      if (Array.isArray(value) && value.every(isString)) {
        return [`${key}: [`, ...value.map(indent), `]${trail}`];
      }

      return [`${key}: {`, ...this.mapParametersToLines(value), `}${trail}`];
    }

    if (typeof value === 'string') {
      if (value.startsWith('$')) {
        return [`${key}: ${value}${trail}`];
      }
      return [`${key}: "${value}"${trail}`];
    }

    throw new Error(`Unexpected parameter type: ${typeof value}`);
  };

  private mapParametersToLines = (obj: object): readonly string[] => {
    const entries: readonly [string, unknown][] = Object.entries(obj);
    return entries
      .map(this.mapParameterEntryToLines)
      .reduce(flatten, EMPTY_ARRAY)
      .map(indent);
  };

  private mapObjectToLines = (obj: object): readonly string[] => {
    const entries: readonly [string, unknown][] = Object.entries(obj);
    return entries
      .map(this.mapEntryToLines)
      .reduce(flatten, EMPTY_ARRAY)
      .map(indent);
  };

  public toString = (): string =>
    ['{', ...this.mapObjectToLines(this._obj), '}'].join('\n');
}
