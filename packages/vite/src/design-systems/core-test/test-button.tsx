import { render } from '@testing-library/react';
import { userEvent, type UserEvent } from '@testing-library/user-event';
import type { ComponentType } from 'react';
import { describe, expect, it, vi } from 'vitest';
import type { ButtonProps } from '../core/button-props.js';

const handleTestClick = vi.fn();
const USER: UserEvent = userEvent.setup();

export default function testButton(Button: ComponentType<ButtonProps>): void {
  describe('Button', (): void => {
    it('should support click events', async (): Promise<void> => {
      const { getByRole } = render(
        <Button onClick={handleTestClick}>Test button</Button>,
      );
      const button = getByRole('button', { name: 'Test button' });
      await USER.click(button);
      expect(handleTestClick).toHaveBeenCalledTimes(1);
    });
  });
}
