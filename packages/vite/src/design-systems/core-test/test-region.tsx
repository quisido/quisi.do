import { render } from '@testing-library/react';
import type { ComponentType } from 'react';
import { describe, it } from 'vitest';
import type { RegionProps } from '../core/region-props.js';

export default function testRegion(Region: ComponentType<RegionProps>): void {
  describe('Region', (): void => {
    it('should support headings', (): void => {
      const { getByRole } = render(
        <Region heading="Test heading">Test content</Region>,
      );
      getByRole('region', { name: 'Test heading' });
    });

    it('should support labels', (): void => {
      const { getByRole } = render(
        <Region label="Test label">Test content</Region>,
      );
      getByRole('region', { name: 'Test label' });
    });

    it('should support external labels', (): void => {
      const { getByRole } = render(
        <>
          <span id="test-id">Test labelled by</span>
          <Region labelledBy="test-id">Test content</Region>,
        </>,
      );
      getByRole('region', { name: 'Test labelled by' });
    });

    describe('levels', (): void => {
      it('should default to 2', (): void => {
        const { getByRole } = render(
          <Region heading="Test level 12">Test content</Region>,
        );
        getByRole('heading', { level: 2, name: 'Test level 12' });
      });

      it('should increment children but not siblings', (): void => {
        const { getByRole } = render(
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
        getByRole('heading', { level: 2, name: 'Brother' });
        getByRole('heading', { level: 2, name: 'Sister' });
        getByRole('heading', { level: 3, name: 'Nephew' });
        getByRole('heading', { level: 3, name: 'Niece' });
        getByRole('heading', { level: 4, name: 'Cousin' });
      });

      it('should support levels >6', (): void => {
        const { getByRole } = render(
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
        getByRole('heading', { level: 2, name: 'Second' });
        getByRole('heading', { level: 3, name: 'Third' });
        getByRole('heading', { level: 4, name: 'Fourth' });
        getByRole('heading', { level: 5, name: 'Fifth' });
        getByRole('heading', { level: 6, name: 'Sixth' });
        getByRole('heading', { level: 7, name: 'Seventh' });
      });
    });
  });
}
