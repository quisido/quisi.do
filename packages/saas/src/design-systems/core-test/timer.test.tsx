import render from './render.js';
import { describe, expect, it } from 'vitest';
import importTestedDesignSystem from './import-tested-design-system.js';

const { Timer } = await importTestedDesignSystem();

describe('Timer', (): void => {
  it('should expose a numerical counter as timer text', (): void => {
    const { getByRole, getRoleCount } = render(<Timer>00:00</Timer>);

    const timer: HTMLElement = getByRole('timer');
    expect(timer).toHaveTextContent('00:00');
    expect(getRoleCount('timer')).toBe(1);
  });

  it('should use its text contents as the current elapsed time measurement', (): void => {
    const { getByRole, rerender } = render(<Timer>00:00 elapsed</Timer>);

    const timer: HTMLElement = getByRole('timer');

    rerender(<Timer>00:01 elapsed</Timer>);
    expect(timer).toHaveTextContent('00:01 elapsed');

    rerender(<Timer>00:02 elapsed</Timer>);
    expect(timer).toHaveTextContent('00:02 elapsed');
  });

  it('should use its text contents as the current remaining time measurement', (): void => {
    const { getByRole, rerender } = render(<Timer>3 seconds remaining</Timer>);

    const timer: HTMLElement = getByRole('timer');

    rerender(<Timer>2 seconds remaining</Timer>);
    expect(timer).toHaveTextContent('2 seconds remaining');

    rerender(<Timer>1 second remaining</Timer>);
    expect(timer).toHaveTextContent('1 second remaining');
  });

  it('should allow non-machine-parsable visible time text', (): void => {
    const { getByRole } = render(
      <Timer>about 1 minute and 30 seconds remaining</Timer>,
    );

    const timer: HTMLElement = getByRole('timer');
    expect(timer).toHaveTextContent('about 1 minute and 30 seconds remaining');
    expect(timer).not.toHaveAttribute('aria-valuenow');
    expect(timer).not.toHaveAttribute('aria-valuetext');
    expect(timer).not.toHaveAttribute('aria-valuemin');
    expect(timer).not.toHaveAttribute('aria-valuemax');
  });

  it('should preserve its text contents while paused', (): void => {
    const { getByRole, rerender } = render(<Timer>00:10 paused</Timer>);

    const timer: HTMLElement = getByRole('timer');

    rerender(<Timer>00:10 paused</Timer>);
    expect(timer).toHaveTextContent('00:10 paused');
  });

  it('should preserve its text contents after reaching an end point', (): void => {
    const { getByRole, rerender } = render(<Timer>00:00 remaining</Timer>);

    const timer: HTMLElement = getByRole('timer');

    rerender(<Timer>00:00 remaining</Timer>);
    expect(timer).toHaveTextContent('00:00 remaining');
  });
});
