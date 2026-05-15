import { describe, expect, it } from 'vitest';
import render from './render.js';
import importTestedDesignSystem from './import-tested-design-system.js';

const { Paragraph } = await importTestedDesignSystem();

describe('Paragraph', (): void => {
  it('should be a paragraph', (): void => {
    const { getByRole } = render(<Paragraph>Test paragraph</Paragraph>);
    const paragraph: HTMLElement = getByRole('paragraph');
    expect(paragraph).toHaveTextContent('Test paragraph');
  });
});
