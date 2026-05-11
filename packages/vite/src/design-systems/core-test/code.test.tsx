import { describe, expect, it } from 'vitest';
import render from './render.js';
import importTestedDesignSystem from './import-tested-design-system.js';

const { Code } = await importTestedDesignSystem();

describe('Code', (): void => {
  it('should expose a code fragment through the code role', (): void => {
    const source = 'const value = 1;';
    const { getByRole, getRoleCount } = render(<Code>{source}</Code>);

    const code: HTMLElement = getByRole('code');
    expect(getRoleCount('code')).toBe(1);
    expect(code).toHaveTextContent(source);
  });

  it('should not be focusable', (): void => {
    const { focus, getByRole } = render(<Code>const value = 1;</Code>);
    const code: HTMLElement = getByRole('code');
    focus(code);
    expect(code).not.toHaveFocus();
  });

  it('should preserve nested content inside the code fragment', (): void => {
    const { getByRole, getRoleCount } = render(
      <Code>
        <span>npm</span> run test
      </Code>,
    );

    const code: HTMLElement = getByRole('code');
    expect(getRoleCount('code')).toBe(1);
    expect(code).toHaveTextContent('npm run test');
  });

  it('should preserve punctuation-heavy code for full punctuation verbosity', (): void => {
    const source =
      "const slug = input?.trim().replace(/[\\s-]+/g, '-');\n" +
      "return items.map((item) => item.id - 1).join(', ');";
    const { getByRole } = render(<Code>{source}</Code>);

    const code: HTMLElement = getByRole('code');
    expect(code.textContent).toBe(source);
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
