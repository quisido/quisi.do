import render from './render.js';
import type { ComponentType } from 'react';
import { describe, it } from 'vitest';
import type { RegionProps } from '../core/region-props.js';

export default function testRegion(Region: ComponentType<RegionProps>): void {
  describe('Region', (): void => {
    describe('label', (): void => {
      it('should be supported', (): void => {
        const { getByName } = render(
          <Region label="Test label">Test content</Region>,
        );
        getByName('region', 'Test label');
      });
    });

    describe('labelledBy', (): void => {
      it('should be supported', (): void => {
        const { getByName } = render(
          <>
            <span id="test-region-label-id">Test labelled by</span>
            <Region labelledBy="test-region-label-id">Test content</Region>,
          </>,
        );
        getByName('region', 'Test labelled by');
      });
    });

    describe('levels', (): void => {
      it('should default to 2', (): void => {
        const { getHeadingByLevel } = render(
          <Region label="Test level 12">Test content</Region>,
        );
        getHeadingByLevel('Test level 12', 2);
      });

      it('should increment children but not siblings', (): void => {
        const { getHeadingByLevel } = render(
          <>
            <Region label="Brother">
              <Region label="Niece">
                <Region label="Cousin">Test content</Region>
              </Region>
            </Region>
            <Region label="Sister">
              <Region label="Nephew">Test content</Region>
            </Region>
          </>,
        );
        getHeadingByLevel('Brother', 2);
        getHeadingByLevel('Sister', 2);
        getHeadingByLevel('Nephew', 3);
        getHeadingByLevel('Niece', 3);
        getHeadingByLevel('Cousin', 4);
      });

      it('should support levels >6', (): void => {
        const { getHeadingByLevel } = render(
          <Region label="Second">
            <Region label="Third">
              <Region label="Fourth">
                <Region label="Fifth">
                  <Region label="Sixth">
                    <Region label="Seventh">Test content</Region>
                  </Region>
                </Region>
              </Region>
            </Region>
          </Region>,
        );
        getHeadingByLevel('Second', 2);
        getHeadingByLevel('Third', 3);
        getHeadingByLevel('Fourth', 4);
        getHeadingByLevel('Fifth', 5);
        getHeadingByLevel('Sixth', 6);
        getHeadingByLevel('Seventh', 7);
      });
    });
  });
}
