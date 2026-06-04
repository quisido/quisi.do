import { Table } from 'console-table-printer';
import HeadingsToRowReducer from './audit-details-table-headings-to-row-reducer.js';
import mapHeadingToColumn from './map-audit-details-table-heading-to-column.js';
import type { AuditDetails } from './audit-details.js';

export default class AuditDetailsTable {
  #headings: AuditDetails.TableColumnHeading[] = [];
  #items: AuditDetails.TableItem[] = [];

  constructor({ headings, items }: AuditDetails.Table) {
    this.#headings = headings;
    this.#items = items;
  }

  #mapItemToRow = (item: AuditDetails.TableItem): Record<string, string> => {
    const reduceHeadingsToRow = new HeadingsToRowReducer(item).run;
    return this.#headings.reduce(reduceHeadingsToRow, {});
  };

  toString(): string {
    const table = new Table({
      columns: this.#headings.map(mapHeadingToColumn),
      rows: this.#items.map(this.#mapItemToRow),
    });
    return table.render();
  }
}
