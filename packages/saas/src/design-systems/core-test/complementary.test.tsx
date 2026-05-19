import { describe, expect, it } from 'vitest';
import render from './render.js';
import importTestedDesignSystem from './import-tested-design-system.js';

const { Complementary, Document, Main } = await importTestedDesignSystem();

describe('Complementary', (): void => {
  it('should be a navigable landmark', (): void => {
    const { getByRole } = render(<Complementary>Test content</Complementary>);

    const complementary: HTMLElement = getByRole('complementary');
    expect(complementary).toHaveTextContent('Test content');
  });

  it('should complement sibling main content', (): void => {
    const { getByRole } = render(
      <Document>
        <Main>Primary portal story</Main>
        <Complementary>Current weather and show times</Complementary>
      </Document>,
    );

    const main: HTMLElement = getByRole('main');
    const complementary: HTMLElement = getByRole('complementary');
    expect(main).toHaveTextContent('Primary portal story');
    expect(main).not.toContainElement(complementary);
    expect(complementary.parentElement).toBe(main.parentElement);
  });

  it('should complement main content as a direct descendant', (): void => {
    const { getByRole } = render(
      <Document>
        <Main>
          Primary portal story
          <Complementary>Related articles</Complementary>
        </Main>
      </Document>,
    );

    const main: HTMLElement = getByRole('main');
    const complementary: HTMLElement = getByRole('complementary');
    expect(main).toContainElement(complementary);
    expect(complementary.parentElement).toBe(main);
  });

  it('should preserve meaningful complementary content', (): void => {
    const { getByRole } = render(
      <Complementary>
        <h2>Stocks to watch</h2>
        <ul>
          <li>Quisido Futures</li>
          <li>Browser Runtime Index</li>
        </ul>
      </Complementary>,
    );

    const complementary: HTMLElement = getByRole('complementary');
    expect(complementary).toHaveTextContent('Stocks to watch');
    expect(complementary).toHaveTextContent('Quisido Futures');
    expect(complementary).toHaveTextContent('Browser Runtime Index');
  });
});
