import { render } from '@testing-library/react';
import { DatadogAllow } from '../..';

describe('DatadogAllow ', (): void => {
  it('should render an allow privacy class name and data attribute', (): void => {
    const { getByText } = render(<DatadogAllow>children</DatadogAllow>);

    const element: HTMLElement = getByText('children');
    expect(element.getAttribute('data-dd-privacy')).toBe('allow');
    expect(element.classList).toContain('dd-privacy-allow');
  });
});
