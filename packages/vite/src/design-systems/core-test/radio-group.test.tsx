import render from './render.js';
import { describe, expect, it, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import importTestedDesignSystem from './import-tested-design-system.js';

const { RadioGroup } = await importTestedDesignSystem();

const handleTestChange = vi.fn();

describe('RadioGroup', (): void => {
  describe('label', (): void => {
    it('should be supported', (): void => {
      const { getByName } = render(
        <RadioGroup label="Label" onChange={handleTestChange} radios={[]} />,
      );
      getByName('radiogroup', 'Label');
    });
  });

  describe('labelledBy', (): void => {
    it('should be supported', (): void => {
      const { getByName } = render(
        <>
          <span id="test-radio-group-labelled-by-id">Labelled by</span>
          <RadioGroup
            labelledBy="test-radio-group-labelled-by-id"
            onChange={handleTestChange}
            radios={[]}
          />
        </>,
      );
      getByName('radiogroup', 'Labelled by');
    });
  });

  describe('owns', (): void => {
    it('should support strings', (): void => {
      const { getByName } = render(
        <RadioGroup
          label="Owns"
          onChange={handleTestChange}
          owns="first second"
          radios={[]}
        />,
      );
      const radioGroup: HTMLElement = getByName('radiogroup', 'Owns');
      expect(radioGroup).toHaveAttribute('aria-owns', 'first second');
    });

    it('should support arrays', (): void => {
      const { getByName } = render(
        <RadioGroup
          label="Owns"
          onChange={handleTestChange}
          owns={['first', 'second']}
          radios={[]}
        />,
      );
      const radioGroup: HTMLElement = getByName('radiogroup', 'Owns');
      expect(radioGroup).toHaveAttribute('aria-owns', 'first second');
    });

    it('should support sets', (): void => {
      const { getByName } = render(
        <RadioGroup
          label="Owns"
          onChange={handleTestChange}
          owns={new Set(['first', 'second'])}
          radios={[]}
        />,
      );
      const radioGroup: HTMLElement = getByName('radiogroup', 'Owns');
      expect(radioGroup).toHaveAttribute('aria-owns', 'first second');
    });
  });

  describe('radios', (): void => {
    it('should be supported', async (): Promise<void> => {
      const { getByName } = render(
        <RadioGroup
          label="Radios"
          onChange={handleTestChange}
          radios={[
            {
              key: 1,
              label: 'First',
              value: 'apple',
            },
            {
              key: 2,
              label: 'Second',
              value: 'banana',
            },
          ]}
          value="apple"
        />,
      );

      const first: HTMLElement = getByName('radio', 'First');
      expect(first).toBeChecked();
      expect(first).toHaveAttribute('aria-checked', 'true');
      expect(first).toHaveAttribute('aria-posinset', '1');
      expect(first).toHaveAttribute('aria-setsize', '2');

      const second: HTMLElement = getByName('radio', 'Second');
      expect(second).not.toBeChecked();
      expect(second).toHaveAttribute('aria-checked', 'false');
      expect(second).toHaveAttribute('aria-posinset', '2');
      expect(second).toHaveAttribute('aria-setsize', '2');

      await userEvent.click(second);
      expect(handleTestChange).toHaveBeenCalledExactlyOnceWith('banana');
    });
  });

  /**
   * TODO: "Authors MUST manage focus on this container role."
   * @see {@link https://w3c.github.io/aria/#managingfocus_authors}
   */

  // TODO: If a caption exists, it must be the first non-generic descendant.
});
