/* eslint-disable no-magic-numbers */
import render from './render.js';
import type { ComponentType } from 'react';
import { describe, it } from 'vitest';
import type { RegionProps } from '../core/region-props.js';

export default function testRegion(Region: ComponentType<RegionProps>): void {
  describe('Region', (): void => {
    it('should support headings', (): void => {
      const { getByName } = render(
        <Region heading="Test heading">Test content</Region>,
      );
      getByName('region', 'Test heading');
    });

    it('should support labels', (): void => {
      const { getByName } = render(
        <Region label="Test label">Test content</Region>,
      );
      getByName('region', 'Test label');
    });

    it('should support external labels', (): void => {
      const { getByName } = render(
        <>
          <span id="test-region-label-id">Test labelled by</span>
          <Region labelledBy="test-region-label-id">Test content</Region>,
        </>,
      );
      getByName('region', 'Test labelled by');
    });

    describe('levels', (): void => {
      it('should default to 2', (): void => {
        const { getHeadingByLevel } = render(
          <Region heading="Test level 12">Test content</Region>,
        );
        getHeadingByLevel('Test level 12', 2);
      });

      it('should increment children but not siblings', (): void => {
        const { getHeadingByLevel } = render(
          <>
            <Region heading="Brother">
              <Region heading="Niece">
                <Region heading="Cousin">Test content</Region>
              </Region>
            </Region>
            <Region heading="Sister">
              <Region heading="Nephew">Test content</Region>
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
          <Region heading="Second">
            <Region heading="Third">
              <Region heading="Fourth">
                <Region heading="Fifth">
                  <Region heading="Sixth">
                    <Region heading="Seventh">Test content</Region>
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
