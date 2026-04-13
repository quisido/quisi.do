import { render as testingLibraryRender } from '@testing-library/react';
import { type ReactNode } from 'react';
import ErrorBoundary from './error-boundary.js';
import { expect } from 'vitest';
import noop from '../../utils/noop.js';

export interface RenderTest {
  readonly expectToHaveThrown: (message: RegExp | string) => void;
  readonly getByDescription: (role: string, description: string) => HTMLElement;
  readonly getByMaxValue: (
    role: string,
    name: string,
    max: number,
  ) => HTMLElement;
  readonly getByMinValue: (
    role: string,
    name: string,
    min: number,
  ) => HTMLElement;
  readonly getByName: (role: string, name: string) => HTMLElement;
  readonly getByRole: (role: string) => HTMLElement;
  readonly getByValue: (
    role: string,
    name: string,
    value: number,
  ) => HTMLElement;
  readonly getHeadingByLevel: (name: string, level: number) => HTMLElement;
}

export default function render(node: ReactNode): RenderTest {
  const container: HTMLDivElement = window.document.createElement('div');
  container.setAttribute('focusable', 'true');
  container.setAttribute('tabindex', '-1');
  window.document.body.appendChild(container);

  /**
   *   We have to explicitly provide a container if we want parallel tests to
   * not share the same one (`document.body`). Otherwise, `getBy*` queries will
   * fail when an element exists in a parallel test (e.g. a "Dismiss" button).
   */
  const { getByRole, getByTestId } = testingLibraryRender(node, {
    container,
    onCaughtError: noop,
    onRecoverableError: noop,
    reactStrictMode: true,
    wrapper: ErrorBoundary,
  });

  return {
    expectToHaveThrown(message: RegExp | string): void {
      const element: HTMLElement = getByTestId('error-boundary-error-message');
      if (typeof message === 'string') {
        expect(element.textContent).toBe(message);
      } else {
        expect(element.textContent).toMatch(message);
      }
    },

    getByDescription(role: string, description: string): HTMLElement {
      return getByRole(role, { description });
    },

    getByMaxValue(role: string, name: string, max: number): HTMLElement {
      return getByRole(role, { name, value: { max } });
    },

    getByMinValue(role: string, name: string, min: number): HTMLElement {
      return getByRole(role, { name, value: { min } });
    },

    getByName(role: string, name: string): HTMLElement {
      return getByRole(role, { name });
    },

    getByRole,

    getByValue(role: string, name: string, value: number): HTMLElement {
      return getByRole(role, { name, value: { now: value } });
    },

    getHeadingByLevel(name: string, level: number): HTMLElement {
      return getByRole('heading', { level, name });
    },
  };
}
