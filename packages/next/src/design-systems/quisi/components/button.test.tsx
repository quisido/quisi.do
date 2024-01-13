import { render } from '@testing-library/react';
import Button from './button.js';

describe('Button', (): void => {
  it('should have a matching background and outline color', (): void => {
    const { baseElement } = render(
      <Button feature="test" variant="primary">
        test children
      </Button>,
    );

    const backgroundColor: string =
      baseElement.style.getPropertyValue('background-color');
    const outlineColor: string =
      baseElement.style.getPropertyValue('outline-color');
    expect(backgroundColor).toBe(outlineColor);
  });
});
