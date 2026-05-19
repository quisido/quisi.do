import mapNodeToString from './map-node-to-string.js';
import mapSourceLocationToString from './map-source-location-to-string.js';

export default class AuditDetailsTableHeadingsToRowReducer {
  #item = '';

  constructor(item) {
    this.#item = item;
  }

  #mapHeadingToValue = ({ key, valueType, ...heading }) => {
    switch (valueType) {
      case 'code':
      case 'text':
      case 'url':
        return this.#item[key];
      case 'node':
        return mapNodeToString(this.#item[key]);
      case 'source-location':
        return mapSourceLocationToString(this.#item[key]);
      default:
        throw new Error(`Unexpected heading value type: ${valueType}
With heading key: ${key}
With heading: ${JSON.stringify(heading)}
With item: ${JSON.stringify(this.#item)}`);
    }
  };

  run = (row, { key, ...heading }) => ({
    ...row,
    [key]: this.#mapHeadingToValue({
      ...heading,
      key,
    }),
  });
}
