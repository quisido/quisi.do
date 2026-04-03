import { describe, expect, it, vi } from 'vitest';
import { Button } from './index.js';
import { render } from '@testing-library/react';
import { userEvent, type UserEvent } from '@testing-library/user-event';

const handleTestClick = vi.fn();
const USER: UserEvent = userEvent.setup();

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
