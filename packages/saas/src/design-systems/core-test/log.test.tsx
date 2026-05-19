import { describe, expect, it } from 'vitest';
import render from './render.js';
import importTestedDesignSystem from './import-tested-design-system.js';

const { Log } = await importTestedDesignSystem();

const mapElementToText = (element: Element): string | null => {
  return element.textContent;
};

describe('Log', (): void => {
  it('should expose a log live region', (): void => {
    const { getByRole, getRoleCount } = render(<Log>Test content</Log>);

    const log: HTMLElement = getByRole('log');
    expect(log).toHaveTextContent('Test content');
    expect(getRoleCount('log')).toBe(1);
  });

  it('should default to polite announcements', (): void => {
    const { getByRole } = render(<Log>Polite content</Log>);

    expect(getByRole('log')).toHaveAttribute('aria-live', 'polite');
  });

  it('should support silencing announcements', (): void => {
    const { getByRole } = render(<Log live="off">Archived content</Log>);

    expect(getByRole('log')).toHaveAttribute('aria-live', 'off');
  });

  it('should support assertive announcements', (): void => {
    const { getByRole } = render(<Log live="assertive">Urgent content</Log>);

    expect(getByRole('log')).toHaveAttribute('aria-live', 'assertive');
  });

  it('should expose entries in reading order', (): void => {
    const { getByRole } = render(
      <Log>
        <p>First event</p>
        <p>Second event</p>
        <p>Third event</p>
      </Log>,
    );

    const log: HTMLElement = getByRole('log');
    expect(Array.from(log.children).map(mapElementToText)).toStrictEqual([
      'First event',
      'Second event',
      'Third event',
    ]);
  });

  it('should add new entries to the end of the log', (): void => {
    const { getByRole, rerender } = render(
      <Log>
        <p>Connected</p>
        <p>Joined channel</p>
      </Log>,
    );

    const log: HTMLElement = getByRole('log');
    rerender(
      <Log>
        <p>Connected</p>
        <p>Joined channel</p>
        <p>Sent message</p>
      </Log>,
    );

    expect(Array.from(log.children).map(mapElementToText)).toStrictEqual([
      'Connected',
      'Joined channel',
      'Sent message',
    ]);
  });

  it('should allow old entries to disappear without changing the remaining order', (): void => {
    const { getByRole, rerender } = render(
      <Log>
        <p>Oldest event</p>
        <p>Middle event</p>
        <p>Newest event</p>
      </Log>,
    );

    const log: HTMLElement = getByRole('log');
    rerender(
      <Log>
        <p>Middle event</p>
        <p>Newest event</p>
      </Log>,
    );

    expect(Array.from(log.children).map(mapElementToText)).toStrictEqual([
      'Middle event',
      'Newest event',
    ]);
  });
});
