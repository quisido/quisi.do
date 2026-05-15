import { describe, expect, it } from 'vitest';
import { createElement, type ReactElement, type ReactNode } from 'react';
import render from './render.js';
import importTestedDesignSystem from './import-tested-design-system.js';

const { Math } = await importTestedDesignSystem();

const QUADRATIC_FORMULA_TEX = String.raw`x=\frac{-b\pm\sqrt{b^2-4ac}}{2a}`;
const SPOKEN_QUADRATIC_FORMULA =
  'x equals negative b plus or minus the square root of b squared minus 4 a c, divided by 2 a';

const createMathElement = (
  type: string,
  children: ReactNode | readonly ReactNode[],
  props?: Record<string, string>,
): ReactElement => {
  if (Array.isArray(children)) {
    return createElement(type, props, ...(children as readonly ReactNode[]));
  }

  return createElement(type, props, children);
};

describe('Math', (): void => {
  it('should expose native MathML as math', (): void => {
    const { getByRole, getRoleCount } = render(
      <Math>
        {createMathElement('mrow', [
          createMathElement('mi', 'x'),
          createMathElement('mo', '='),
          createMathElement('mn', '2'),
        ])}
      </Math>,
    );

    const math: HTMLElement = getByRole('math');
    expect(math.namespaceURI).toBe('http://www.w3.org/1998/Math/MathML');
    expect(math).toHaveTextContent('x=2');
    expect(getRoleCount('math')).toBe(1);
  });

  it('should support embedded TeX annotations for polyfills', (): void => {
    const { getByRole } = render(
      <Math>
        {createMathElement('semantics', [
          createMathElement('mrow', [
            createMathElement('mi', 'x'),
            createMathElement('mo', '='),
            createMathElement('mfrac', [
              createMathElement('mrow', [
                createMathElement('mo', '-'),
                createMathElement('mi', 'b'),
                createMathElement('mo', '+-'),
                createMathElement('msqrt', [
                  createMathElement('msup', [
                    createMathElement('mi', 'b'),
                    createMathElement('mn', '2'),
                  ]),
                  createMathElement('mo', '-'),
                  createMathElement('mn', '4'),
                  createMathElement('mi', 'a'),
                  createMathElement('mi', 'c'),
                ]),
              ]),
              createMathElement('mrow', [
                createMathElement('mn', '2'),
                createMathElement('mi', 'a'),
              ]),
            ]),
          ]),
          createMathElement('annotation', QUADRATIC_FORMULA_TEX, {
            encoding: 'TeX',
          }),
        ])}
      </Math>,
    );

    const math: HTMLElement = getByRole('math');
    const annotation: Element | null = math.querySelector(
      'annotation[encoding="TeX"]',
    );
    expect(annotation).not.toBeNull();
    expect(annotation).toHaveTextContent(QUADRATIC_FORMULA_TEX);
  });

  it('should support textual representations such as TeX', (): void => {
    const { getByName } = render(
      <Math label="Quadratic formula">{QUADRATIC_FORMULA_TEX}</Math>,
    );

    const math: HTMLElement = getByName('math', 'Quadratic formula');
    expect(math).toHaveTextContent(QUADRATIC_FORMULA_TEX);
  });

  it('should support external labels for spoken math alternatives', (): void => {
    const { getByName } = render(
      <>
        <span id="spoken-quadratic-formula">{SPOKEN_QUADRATIC_FORMULA}</span>
        <Math labelledBy="spoken-quadratic-formula">
          {QUADRATIC_FORMULA_TEX}
        </Math>
      </>,
    );

    const math: HTMLElement = getByName('math', SPOKEN_QUADRATIC_FORMULA);
    expect(math).toHaveAttribute('aria-labelledby', 'spoken-quadratic-formula');
  });

  it('should support image fallbacks with text alternatives', (): void => {
    const { getByName } = render(
      <Math label={SPOKEN_QUADRATIC_FORMULA}>
        <img
          alt=""
          aria-hidden="true"
          src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw=="
        />
      </Math>,
    );

    const math: HTMLElement = getByName('math', SPOKEN_QUADRATIC_FORMULA);
    expect(math).toHaveAttribute('aria-label', SPOKEN_QUADRATIC_FORMULA);
    expect(math.querySelector('img')).toHaveAttribute('aria-hidden', 'true');
  });
});
