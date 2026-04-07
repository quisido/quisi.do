import { render } from '@testing-library/react';
import { userEvent, type UserEvent } from '@testing-library/user-event';
import type { ComponentType } from 'react';
import { describe, expect, it, vi } from 'vitest';
import type { LinkProps } from '../core/link-props.js';

const USER: UserEvent = userEvent.setup();

const handleTestClick = vi.fn();

export default function testLink(Link: ComponentType<LinkProps>): void {
  describe('Link', (): void => {
    it('must support keyboard navigation and activation', async (): Promise<void> => {
      const { getByRole } = render(
        <Link href="https://quisido.dev/vitest" onClick={handleTestClick}>
          Keyboard test
        </Link>,
      );

      const link: HTMLElement = getByRole('link', { name: 'Keyboard test' });
      await USER.tab();
      expect(window.document.activeElement).toBe(link);
      await USER.keyboard('[Enter]');
      expect(handleTestClick).toHaveBeenCalledExactlyOnceWith();
    });

    it('should support relative links', (): void => {
      const { getByRole } = render(<Link href="/vitest">Relative test</Link>);
      getByRole('link', { name: 'Relative test' });
    });
  });
}
