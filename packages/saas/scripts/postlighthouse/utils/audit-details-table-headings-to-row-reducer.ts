import { isRecord } from 'fmrs';
import { type default as AuditDetails } from 'lighthouse/types/lhr/audit-details.js';
import mapNodeToString from './map-node-to-string.js';
import mapSourceLocationToString from './map-source-location-to-string.js';

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

const mapMultiValueToString = (value: unknown): string => {
  if (!Array.isArray(value)) {
    return mapTableValueToString(value);
  }

  return value.map((item) => {
    if (isNodeValue(item)) {
      return mapNodeToString(item);
    }

    if (isSourceLocationValue(item)) {
      return mapSourceLocationToString(item);
    }

    return mapTableValueToString(item);
  }).join(', ');
};

export default class AuditDetailsTableHeadingsToRowReducer {
  #item: AuditDetails.TableItem;

  constructor(item: AuditDetails.TableItem) {
    this.#item = item;
  }

  #mapHeadingToValue = ({
    key,
    valueType,
  }: AuditDetails.TableColumnHeading): string => {
    if (key === null) {
      return '';
    }

    const value = this.#item[key];

    switch (valueType) {
      case 'bytes':
      case 'code':
      case 'link':
      case 'ms':
      case 'numeric':
      case 'text':
      case 'thumbnail':
      case 'timespanMs':
      case 'url':
        return mapTableValueToString(value);
      case 'multi':
        return mapMultiValueToString(value);
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
        return mapTableValueToString(value);
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
