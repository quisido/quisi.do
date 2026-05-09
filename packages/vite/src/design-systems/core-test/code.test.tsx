import { describe, expect, it } from 'vitest';
import render from './render.js';
import importTestedDesignSystem from './import-tested-design-system.js';

const { Code } = await importTestedDesignSystem();

describe('Code', (): void => {
  it('should not be focusable', (): void => {
    const { focus, getByRole } = render(<Code>const value = 1;</Code>);
    const code: HTMLElement = getByRole('code');
    focus(code);
    expect(code).not.toHaveFocus();
  });

  it('should preserve nested code content', (): void => {
    const { getByRole } = render(
      <Code>
        <span>npm</span> run test
      </Code>,
    );

    const code: HTMLElement = getByRole('code');
    expect(code).toHaveTextContent('npm run test');
  });

  it('should preserve punctuation-heavy code text', (): void => {
    const text = 'const value = items?.map((item) => item - 1) ?? [];';
    const { getByRole } = render(<Code>{text}</Code>);

    const code: HTMLElement = getByRole('code');
    expect(code.textContent).toBe(text);
  });

  it('should support descriptions', (): void => {
    const { getByDescription } = render(
      <>
        <span id="test-code-description">Code description</span>
        <Code describedBy="test-code-description">Described code</Code>
      </>,
    );

    getByDescription('code', 'Code description');
  });
});
