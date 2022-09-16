import { render } from '@testing-library/react';
import DatadogPrivacy from '.';

describe('DatadogPrivacy', (): void => {
  it('should render a privacy class name and data attribute', (): void => {
    const { getByText } = render(
      <DatadogPrivacy level="allow">children</DatadogPrivacy>,
    );

    const element: HTMLElement = getByText('children');
    expect(element.getAttribute('data-dd-privacy')).toBe('allow');
    expect(element.classList).toContain('dd-privacy-allow');
  });
});
