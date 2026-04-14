import render from './render.js';
import { type ComponentType } from 'react';
import { describe, expect, it } from 'vitest';
import type { ProgressBarProps } from '../core/progress-bar-props.js';

export default function testProgressBar(
  ProgressBar: ComponentType<ProgressBarProps>,
): void {
  describe('progress bar', (): void => {
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
        const { getByDescription } = render(
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

        const described: HTMLElement = getByDescription(
          'region',
          'Descriptive progress bar',
        );

        expect(described).toHaveAttribute('aria-busy', 'true');
      });
    });

    describe('max', (): void => {
      it('should default to 100', (): void => {
        const { getByMaxValue } = render(
          <ProgressBar busy label="Default max" />,
        );
        getByMaxValue('progressbar', 'Default max', 100);
      });

      it('should be supported', (): void => {
        const { getByMaxValue } = render(
          <ProgressBar busy label="Max" max={50} />,
        );
        getByMaxValue('progressbar', 'Max', 50);
      });
    });

    describe('min', (): void => {
      it('should default to 0', (): void => {
        const { getByMinValue } = render(
          <ProgressBar busy label="Default min" />,
        );
        getByMinValue('progressbar', 'Default min', 0);
      });

      it('should be supported', (): void => {
        const { getByMinValue } = render(
          <ProgressBar busy label="Min" min={10} />,
        );
        getByMinValue('progressbar', 'Min', 10);
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

        getByValue('progressbar', 'Value', 50);
      });
    });
  });
}
