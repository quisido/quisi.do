import { userEvent } from '@testing-library/user-event';
import type { ComponentType } from 'react';
import { describe, expect, it, vi } from 'vitest';
import type { ButtonProps } from '../core/button-props.js';
import render from './render.js';

const handleTestClick = vi.fn();

export default function testButton(Button: ComponentType<ButtonProps>): void {
  describe('Button', (): void => {
    it('should support click events', async (): Promise<void> => {
      const { getByName } = render(
        <Button onClick={handleTestClick}>Test button</Button>,
      );

      const button: HTMLElement = getByName('button', 'Test button');
      await userEvent.click(button);
      expect(handleTestClick).toHaveBeenCalledTimes(1);
    });
  });
}
