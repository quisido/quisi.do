import {
  fireEvent,
  render as testingLibraryRender,
} from '@testing-library/react';
import { type ReactNode } from 'react';
import { expect } from 'vitest';
import noop from '../../utils/noop.js';
import RenderWrapper from './render-wrapper.js';
import createContainer from './create-container.js';
import { userEvent, type UserEvent } from '@testing-library/user-event';
import type { DesignSystemRole } from './roles.js';

export interface RenderTest {
  readonly clickButton: (name: string) => Promise<void>;
  readonly expectToHaveThrown: (message: RegExp | string) => void;
  readonly focus: (element: HTMLElement) => void;
  readonly getByDescription: (
    role: DesignSystemRole,
    description: string,
  ) => HTMLElement;
  readonly getByMaxValue: (
    role: DesignSystemRole,
    name: string,
    max: number,
  ) => HTMLElement;
  readonly getByMinValue: (
    role: DesignSystemRole,
    name: string,
    min: number,
  ) => HTMLElement;
  readonly getByName: (role: DesignSystemRole, name: string) => HTMLElement;
  readonly getByRole: (role: DesignSystemRole) => HTMLElement;
  readonly getByValue: (
    role: DesignSystemRole,
    name: string,
    value: number,
  ) => HTMLElement;
  readonly getHeadingByLevel: (name: string, level: number) => HTMLElement;
  readonly getOptionalByRole: (role: DesignSystemRole) => HTMLElement | null;
  readonly getRoleCount: (role: DesignSystemRole) => number;
  readonly rerender: (node: ReactNode) => void;
  readonly shiftTab: () => Promise<void>;
  readonly tab: () => Promise<void>;
}

export default function render(node: ReactNode): RenderTest {
  const container: HTMLDivElement = createContainer();
  window.document.body.appendChild(container);
  const user: UserEvent = userEvent.setup();

  /**
   * We have to explicitly provide a container if we want parallel tests to
   * not share the same one (`document.body`). Otherwise, `getBy*` queries will
   * fail when an element exists in a parallel test (e.g. a "Dismiss" button).
   */
  const { getByRole, getByTestId, queryAllByRole, rerender } =
    testingLibraryRender(node, {
      container,
      onCaughtError: noop,
      onRecoverableError: noop,
      reactStrictMode: true,
      wrapper: RenderWrapper,
    });

  return {
    async clickButton(name: string): Promise<void> {
      const button: HTMLElement = getByRole('button', { name });
      await user.click(button);
    },

    expectToHaveThrown(message: RegExp | string): void {
      const element: HTMLElement = getByTestId('error-boundary-error-message');
      expect(element).toHaveTextContent(message);
    },

    focus(element: HTMLElement): void {
      fireEvent.focus(element);
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

    getOptionalByRole(role: string): HTMLElement | null {
      const [element, ...elements] = queryAllByRole(role);
      if (elements.length > 0) {
        throw new Error(
          `Expected at most one element with role ${role}, but found ${elements.length + 1}.`,
        );
      }
      return element ?? null;
    },

    getRoleCount(role: string): number {
      return queryAllByRole(role).length;
    },

    rerender,

    async shiftTab(): Promise<void> {
      await user.tab({ shift: true });
    },

    async tab(): Promise<void> {
      await user.tab();
    },
  };
}
