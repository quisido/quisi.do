import type { ComponentType } from 'react';
import { describe, expect, it, vi } from 'vitest';
import type { LinkProps } from '../core/link-props.js';
import render from './render.js';
import { userEvent } from '@testing-library/user-event';

const handleTestClick = vi.fn();

export default function testLink(Link: ComponentType<LinkProps>): void {
  describe('Link', (): void => {
    it('must be focusable', async (): Promise<void> => {
      const { getByName } = render(
        <Link href="https://quisido.dev/vitest" onClick={handleTestClick}>
          Keyboard test
        </Link>,
      );

      const link: HTMLElement = getByName('link', 'Keyboard test');
      link.focus();
      expect(link).toHaveFocus();
      await userEvent.keyboard('{Enter}');
      expect(handleTestClick).toHaveBeenCalledExactlyOnceWith();
    });

    it('should support relative links', (): void => {
      const { getByName } = render(<Link href="/vitest">Relative test</Link>);
      getByName('link', 'Relative test');
    });
  });
}
