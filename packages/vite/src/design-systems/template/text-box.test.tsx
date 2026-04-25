import { render } from '@testing-library/react';
import { describe, it } from 'vitest';
import { TextBox } from './index.js';

describe('TextBox', (): void => {
  it('should be a text box', (): void => {
    const { getByRole } = render(<TextBox label="Test text box" />);

    getByRole('textbox', { name: 'Test text box' });
  });

  it('should support multiline text boxes', (): void => {
    const { getByRole } = render(
      <TextBox label="Test multiline text box" multiline />,
    );

    getByRole('textbox', { name: 'Test multiline text box' });
  });
});
