import { render } from '@testing-library/react';
import { DatadogMaskUserInput } from '../..';

describe('DatadogMaskUserInput ', (): void => {
  it('should render a mask-user-input privacy class name and data attribute', (): void => {
    const { getByText } = render(
      <DatadogMaskUserInput>children</DatadogMaskUserInput>,
    );

    const element: HTMLElement = getByText('children');
    expect(element.getAttribute('data-dd-privacy')).toBe('mask-user-input');
    expect(element.classList).toContain('dd-privacy-mask-user-input');
  });
});
