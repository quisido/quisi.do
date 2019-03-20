import { Table } from 'console-table-printer';
import HeadingsToRowReducer from './audit-details-table-headings-to-row-reducer.js';
import mapHeadingToColumn from './map-audit-details-table-heading-to-column.js';

export default class AuditDetailsTable {
  constructor({ headings, items }) {
    this._headings = headings;
    this._items = items;
  }

  _mapItemToRow = item => {
    const reduceHeadingsToRow = new HeadingsToRowReducer(item).run;
    return this._headings.reduce(reduceHeadingsToRow, {});
  };

  toString() {
    const table = new Table({
      columns: this._headings.map(mapHeadingToColumn),
      rows: this._items.map(this._mapItemToRow),
    });
    return table.render();
  }
}
