import { Table } from 'console-table-printer';
import HeadingsToRowReducer from './audit-details-table-headings-to-row-reducer.js';
import mapHeadingToColumn from './map-audit-details-table-heading-to-column.js';

export default class AuditDetailsTable {
  #headings = [];
  #items = [];

  constructor({ headings, items }) {
    this.#headings = headings;
    this.#items = items;
  }

  #mapItemToRow = item => {
    const reduceHeadingsToRow = new HeadingsToRowReducer(item).run;
    return this.#headings.reduce(reduceHeadingsToRow, {});
  };

  toString() {
    const table = new Table({
      columns: this.#headings.map(mapHeadingToColumn),
      rows: this.#items.map(this.#mapItemToRow),
    });
    return table.render();
  }
}
