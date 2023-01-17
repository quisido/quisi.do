import { render } from '@testing-library/react';
import { DatadogHidden } from '../..';

describe('DatadogHidden ', (): void => {
  it('should render a hidden privacy class name and data attribute', (): void => {
    const { getByText } = render(<DatadogHidden>children</DatadogHidden>);

    const element: HTMLElement = getByText('children');
    expect(element.getAttribute('data-dd-privacy')).toBe('hidden');
    expect(element.classList).toContain('dd-privacy-hidden');
  });
});
