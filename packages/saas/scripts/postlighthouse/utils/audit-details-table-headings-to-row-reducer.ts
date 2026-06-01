import { type default as AuditDetails } from 'lighthouse/types/lhr/audit-details.js';
import mapNodeToString from './map-node-to-string.js';
import mapSourceLocationToString from './map-source-location-to-string.js';

const isRecord = (value: unknown): value is Record<string, unknown> => {
  return typeof value === 'object' && value !== null;
};

const isNodeValue = (value: unknown): value is AuditDetails.NodeValue => {
  return isRecord(value) && value['type'] === 'node';
};

const isSourceLocationValue = (
  value: unknown,
): value is AuditDetails.SourceLocationValue => {
  return isRecord(value) && value['type'] === 'source-location';
};

const mapTableValueToString = (value: unknown): string => {
  if (value === undefined) {
    return '';
  }

  if (typeof value === 'string') {
    return value;
  }

  if (typeof value === 'number' || typeof value === 'boolean') {
    return value.toString();
  }

  if (isRecord(value) && typeof value['value'] === 'string') {
    return value['value'];
  }

  return JSON.stringify(value);
};

export default class AuditDetailsTableHeadingsToRowReducer {
  #item: AuditDetails.TableItem;

  constructor(item: AuditDetails.TableItem) {
    this.#item = item;
  }

  #mapHeadingToValue = ({
    key,
    valueType,
    ...heading
  }: AuditDetails.TableColumnHeading): string => {
    if (key === null) {
      return '';
    }

    const value = this.#item[key];

    switch (valueType) {
      case 'code':
      case 'text':
      case 'url':
        return mapTableValueToString(value);
      case 'node':
        if (isNodeValue(value)) {
          return mapNodeToString(value);
        }

        return '';
      case 'source-location':
        if (isSourceLocationValue(value)) {
          return mapSourceLocationToString(value);
        }

        return '';
      default:
        throw new Error(`Unexpected heading value type: ${valueType}
With heading key: ${key}
With heading: ${JSON.stringify(heading)}
With item: ${JSON.stringify(this.#item)}`);
    }
  };

  run = (
    row: Record<string, string>,
    { key, ...heading }: AuditDetails.TableColumnHeading,
  ): Record<string, string> => {
    if (key === null) {
      return row;
    }

    return {
      ...row,
      [key]: this.#mapHeadingToValue({
        ...heading,
        key,
      }),
    };
  };
}
