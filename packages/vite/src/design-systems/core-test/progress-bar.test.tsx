import render from './render.js';
import { describe, expect, it } from 'vitest';
import importTestedDesignSystem from './import-tested-design-system.js';

const { ProgressBar } = await importTestedDesignSystem();

describe('ProgressBar', (): void => {
  it('should expose the progress status for a long-running task', (): void => {
    const { getByName, getRoleCount } = render(
      <ProgressBar busy label="Uploading files" value={25} />,
    );

    const progressBar: HTMLElement = getByName(
      'progressbar',
      'Uploading files',
    );
    expect(progressBar.tagName).toBe('PROGRESS');
    expect(progressBar).toHaveAttribute('aria-readonly', 'true');
    expect(progressBar).toHaveAttribute('aria-valuenow', '25');
    expect(getRoleCount('progressbar')).toBe(1);
    expect(getRoleCount('meter')).toBe(0);
  });

  describe('describes', (): void => {
    it('should enforce described element validity', (): void => {
      const { expectToHaveThrown } = render(
        <ProgressBar
          busy
          describes="test-non-existent-id"
          label="Invalid progress bar"
        />,
      );

      expectToHaveThrown(
        /^Progress bar \(#[\d\w-]+\) cannot describe missing element \(#test-non-existent-id\)\.$/u,
      );
    });

    it('should set the busy/described-by relationship', (): void => {
      const { getByDescription, getByName } = render(
        <>
          <div id="test-described-id" role="region">
            Described
          </div>
          <ProgressBar
            busy
            describes="test-described-id"
            label="Descriptive progress bar"
          />
        </>,
      );

      const progressBar: HTMLElement = getByName(
        'progressbar',
        'Descriptive progress bar',
      );
      const described: HTMLElement = getByDescription(
        'region',
        'Descriptive progress bar',
      );

      expect(described).toHaveAttribute('aria-busy', 'true');
      expect(described).toHaveAttribute('aria-describedby', progressBar.id);
    });

    it('should mark the described region as no longer busy when loading finishes', (): void => {
      const { getByDescription, rerender } = render(
        <>
          <div id="test-finished-region-id" role="region">
            Finished region
          </div>
          <ProgressBar
            busy
            describes="test-finished-region-id"
            label="Loading finished region"
            value={50}
          />
        </>,
      );

      const described: HTMLElement = getByDescription(
        'region',
        'Loading finished region',
      );

      rerender(
        <>
          <div id="test-finished-region-id" role="region">
            Finished region
          </div>
          <ProgressBar
            busy={false}
            describes="test-finished-region-id"
            label="Loading finished region"
            value={100}
          />
        </>,
      );

      expect(described).toHaveAttribute('aria-busy', 'false');
    });
  });

  describe('max', (): void => {
    it('should default to 100', (): void => {
      const { getByMaxValue } = render(
        <ProgressBar busy label="Default max" />,
      );

      const progressBar: HTMLElement = getByMaxValue(
        'progressbar',
        'Default max',
        100,
      );
      expect(progressBar).toHaveAttribute('aria-valuemax', '100');
      expect(progressBar).toHaveAttribute('max', '100');
    });

    it('should be supported', (): void => {
      const { getByMaxValue } = render(
        <ProgressBar busy label="Max" max={50} />,
      );

      const progressBar: HTMLElement = getByMaxValue(
        'progressbar',
        'Max',
        50,
      );
      expect(progressBar).toHaveAttribute('aria-valuemax', '50');
      expect(progressBar).toHaveAttribute('max', '50');
    });

    it('should reject values above the computed maximum', (): void => {
      const { expectToHaveThrown } = render(
        <ProgressBar busy label="Too high" max={10} value={11} />,
      );

      expectToHaveThrown(
        "A progress bar's value cannot be greater than its maximum: 11 > 10",
      );
    });
  });

  describe('min', (): void => {
    it('should default to 0', (): void => {
      const { getByMinValue } = render(
        <ProgressBar busy label="Default min" />,
      );

      const progressBar: HTMLElement = getByMinValue(
        'progressbar',
        'Default min',
        0,
      );
      expect(progressBar).toHaveAttribute('aria-valuemin', '0');
    });

    it('should be supported', (): void => {
      const { getByMinValue } = render(
        <ProgressBar busy label="Min" min={10} />,
      );

      const progressBar: HTMLElement = getByMinValue(
        'progressbar',
        'Min',
        10,
      );
      expect(progressBar).toHaveAttribute('aria-valuemin', '10');
    });

    it('should reject values below the computed minimum', (): void => {
      const { expectToHaveThrown } = render(
        <ProgressBar busy label="Too low" min={10} value={9} />,
      );

      expectToHaveThrown(
        "A progress bar's value cannot be less than its minimum: 9 < 10",
      );
    });
  });

  describe('value', (): void => {
    it('should not have a value when indeterminate', (): void => {
      const { getByName } = render(
        <ProgressBar busy label="Default value" />,
      );

      const progressBar: HTMLElement = getByName(
        'progressbar',
        'Default value',
      );

      expect(progressBar).not.toHaveAttribute('aria-valuenow');
    });

    it('should be supported', (): void => {
      const { getByValue } = render(
        <ProgressBar busy label="Value" value={50} />,
      );

      const progressBar: HTMLElement = getByValue('progressbar', 'Value', 50);
      expect(progressBar).toHaveAttribute('aria-valuenow', '50');
    });

    it('should update when visual progress changes', (): void => {
      const { getByName, rerender } = render(
        <ProgressBar busy label="Updating value" value={20} />,
      );

      const progressBar: HTMLElement = getByName(
        'progressbar',
        'Updating value',
      );

      rerender(<ProgressBar busy label="Updating value" value={70} />);

      expect(progressBar).toHaveAttribute('aria-valuenow', '70');
    });

    it('should support value text when the numeric percent needs explanation', (): void => {
      const { getByName } = render(
        <ProgressBar
          busy
          label="Importing contacts"
          value={50}
          valueText="Step 2 of 4"
        />,
      );

      expect(getByName('progressbar', 'Importing contacts')).toHaveAttribute(
        'aria-valuetext',
        'Step 2 of 4',
      );
    });
  });
});
