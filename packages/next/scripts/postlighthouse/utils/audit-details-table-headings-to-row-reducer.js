import mapNodeToString from './map-node-to-string.js';
import mapSourceLocationToString from './map-source-location-to-string.js';

export default class AuditDetailsTableHeadingsToRowReducer {
  constructor(item) {
    this._item = item;
  }

  _mapHeadingToValue = ({ valueType, key, ...heading }) => {
    switch (valueType) {
      case 'code':
      case 'text':
      case 'url':
        return this._item[key];
      case 'node':
        return mapNodeToString(this._item[key]);
      case 'source-location':
        return mapSourceLocationToString(this._item[key]);
      default:
        throw new Error(`Unexpected heading value type: ${valueType}
With heading key: ${key}
With heading: ${JSON.stringify(heading)}
With item: ${JSON.stringify(this._item)}`);
    }
  };

  run = (row, { key, ...heading }) => ({
    ...row,
    [key]: this._mapHeadingToValue({
      ...heading,
      key,
    }),
  });
}
