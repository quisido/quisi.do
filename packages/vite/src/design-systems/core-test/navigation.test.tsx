import { describe, expect, it } from 'vitest';
import render from './render.js';
import importTestedDesignSystem from './import-tested-design-system.js';

const { Link, Navigation } = await importTestedDesignSystem();

describe('Navigation', (): void => {
  it('should expose a named navigation landmark', (): void => {
    const { getByName, getRoleCount } = render(
      <Navigation label="Primary navigation">
        <Link href="/dashboard">Dashboard</Link>
      </Navigation>,
    );

    const navigation: HTMLElement = getByName(
      'navigation',
      'Primary navigation',
    );
    expect(navigation.tagName).toBe('NAV');
    expect(navigation).toHaveAttribute('aria-label', 'Primary navigation');
    expect(getRoleCount('navigation')).toBe(1);
  });

  it('should contain links for navigating the document or related documents', (): void => {
    const { getByName, getRoleCount } = render(
      <Navigation label="Documentation">
        <Link href="#overview">Overview</Link>
        <Link href="/docs/api">API reference</Link>
        <Link href="https://quisido.dev/support">Support</Link>
      </Navigation>,
    );

    const navigation: HTMLElement = getByName('navigation', 'Documentation');
    expect(navigation).toContainElement(getByName('link', 'Overview'));
    expect(navigation).toContainElement(getByName('link', 'API reference'));
    expect(navigation).toContainElement(getByName('link', 'Support'));
    expect(getRoleCount('link')).toBe(3);
  });

  it('should preserve the reading order of navigational links', (): void => {
    const { getByName } = render(
      <Navigation label="Section navigation">
        <Link href="#intro">Intro</Link>
        <Link href="#setup">Setup</Link>
        <Link href="#deploy">Deploy</Link>
      </Navigation>,
    );

    const navigation: HTMLElement = getByName(
      'navigation',
      'Section navigation',
    );
    const links: readonly string[] = Array.from(
      navigation.querySelectorAll('a'),
      (link: HTMLAnchorElement): string => link.textContent ?? '',
    );

    expect(links).toStrictEqual(['Intro', 'Setup', 'Deploy']);
  });

  it('should allow multiple navigation landmarks when they have distinct names', (): void => {
    const { getByName, getRoleCount } = render(
      <>
        <Navigation label="Primary">
          <Link href="/home">Home</Link>
        </Navigation>
        <Navigation label="Footer">
          <Link href="/privacy">Privacy</Link>
        </Navigation>
      </>,
    );

    expect(getByName('navigation', 'Primary')).toHaveTextContent('Home');
    expect(getByName('navigation', 'Footer')).toHaveTextContent('Privacy');
    expect(getRoleCount('navigation')).toBe(2);
  });

  it('should let keyboard navigation move to contained links', async (): Promise<void> => {
    const { click, getByName, tab } = render(
      <>
        <button type="button">Before navigation</button>
        <Navigation label="Keyboard navigation">
          <Link href="/first">First link</Link>
          <Link href="/second">Second link</Link>
        </Navigation>
      </>,
    );

    const navigation: HTMLElement = getByName(
      'navigation',
      'Keyboard navigation',
    );
    const before: Element | null = navigation.previousElementSibling;
    const first: HTMLElement = getByName('link', 'First link');
    const second: HTMLElement = getByName('link', 'Second link');

    if (!(before instanceof HTMLElement)) {
      throw new Error('Expected navigation to follow a focusable element.');
    }

    await click(before);
    expect(before).toHaveFocus();
    await tab();
    expect(navigation).not.toHaveFocus();
    expect(first).toHaveFocus();
    await tab();
    expect(second).toHaveFocus();
  });
});
