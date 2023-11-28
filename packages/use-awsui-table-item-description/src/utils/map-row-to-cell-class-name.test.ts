/// <reference types="jest" />
import mapRowToCellClassName from './map-row-to-cell-class-name.js';

describe('mapRowToCellClassName', (): void => {
  it('should return null if no cells exist', (): void => {
    const tr: HTMLTableRowElement = document.createElement('tr');
    expect(mapRowToCellClassName(tr)).toBeNull();
  });
});
