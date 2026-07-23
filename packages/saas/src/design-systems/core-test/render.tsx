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
  /** clicks on an element */
  readonly click: (element: HTMLElement) => Promise<void>;
  /** clicks on the button with the given accessible name */
  readonly clickButton: (name: string) => Promise<void>;
  /** presses the Enter key */
  readonly enter: () => Promise<void>;
  /** asserts that an error was thrown */
  readonly expectToHaveThrown: (message: RegExp | string) => void;
  /** focuses an element */
  readonly focus: (element: HTMLElement) => void;
  /** returns the element with the given alternative text */
  readonly getByAltText: (text: string) => HTMLElement;
  /** returns the element with the given role and description */
  readonly getByDescription: (
    role: DesignSystemRole,
    description: string,
  ) => HTMLElement;
  /**
   * returns the element with the given role, accessible name, and maximum value
   */
  readonly getByMaxValue: (
    role: DesignSystemRole,
    name: string,
    max: number,
  ) => HTMLElement;
  /**
   * returns the element with the given role, accessible name, and minimum value
   */
  readonly getByMinValue: (
    role: DesignSystemRole,
    name: string,
    min: number,
  ) => HTMLElement;
  /** returns the element with the given role and accessible name */
  readonly getByName: (role: DesignSystemRole, name: string) => HTMLElement;
  /**
   * `getByRole` returns the element with the given role.
   * Only use this for elements that would not benefit from having an accessible
   * name; otherwise, use `getByName`.
   */
  readonly getByRole: (role: DesignSystemRole) => HTMLElement;
  /** returns the element with the given role, accessible name, and value */
  readonly getByValue: (
    role: DesignSystemRole,
    name: string,
    value: number,
  ) => HTMLElement;
  /** returns the heading element with the given accessible name and level */
  readonly getHeadingByLevel: (name: string, level: number) => HTMLElement;
  /**
   * `getOptionalByRole` returns the element with the given role if it exists;
   * otherwise, it returns `null`.
   */
  readonly getOptionalByRole: (role: DesignSystemRole) => HTMLElement | null;
  /** returns how many elements have the given role */
  readonly getRoleCount: (role: DesignSystemRole) => number;
  /** rerenders with the given React node */
  readonly rerender: (node: ReactNode) => void;
  /** presses the Tab key while holding the Shift key */
  readonly shiftTab: () => Promise<void>;
  /** presses the Space key */
  readonly space: () => Promise<void>;
  /** presses the Tab key */
  readonly tab: () => Promise<void>;
  /**
   * `type` emits a user typing event containing the given text to the given
   * element.
   */
  readonly type: (element: HTMLElement, text: string) => Promise<void>;
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
  const { getByAltText, getByRole, getByTestId, queryAllByRole, rerender } =
    testingLibraryRender(node, {
      container,
      onCaughtError: noop,
      onRecoverableError: noop,
      reactStrictMode: true,
      wrapper: RenderWrapper,
    });

  return {
    click: async (element: HTMLElement): Promise<void> => {
      await user.click(element);
    },

    clickButton: async (name: string): Promise<void> => {
      const button: HTMLElement = getByRole('button', { name });
      await user.click(button);
    },

    enter: async (): Promise<void> => {
      await user.keyboard('{Enter}');
    },

    expectToHaveThrown: (message: RegExp | string): void => {
      const element: HTMLElement = getByTestId('error-boundary-error-message');
      expect(element).toHaveTextContent(message);
    },

    focus: (element: HTMLElement): void => {
      fireEvent.focus(element);
    },

    getByAltText: (text: string): HTMLElement => {
      return getByAltText(text, { exact: true });
    },

    getByDescription: (role: string, description: string): HTMLElement => {
      return getByRole(role, { description });
    },

    getByMaxValue: (role: string, name: string, max: number): HTMLElement => {
      return getByRole(role, { name, value: { max } });
    },

    getByMinValue: (role: string, name: string, min: number): HTMLElement => {
      return getByRole(role, { name, value: { min } });
    },

    getByName: (role: string, name: string): HTMLElement => {
      return getByRole(role, { name });
    },

    getByRole,

    getByValue: (role: string, name: string, value: number): HTMLElement => {
      return getByRole(role, { name, value: { now: value } });
    },

    getHeadingByLevel: (name: string, level: number): HTMLElement => {
      return getByRole('heading', { level, name });
    },

    getOptionalByRole: (role: string): HTMLElement | null => {
      const [element, ...elements] = queryAllByRole(role);
      if (elements.length > 0) {
        throw new Error(
          `Expected at most one element with role ${role}, but found ${elements.length + 1}.`,
        );
      }
      return element ?? null;
    },

    getRoleCount: (role: string): number => {
      return queryAllByRole(role).length;
    },

    rerender,

    shiftTab: async (): Promise<void> => {
      await user.tab({ shift: true });
    },

    space: async (): Promise<void> => {
      await user.keyboard('[Space]');
    },

    tab: async (): Promise<void> => {
      await user.tab();
    },

    type: async (element: HTMLElement, text: string): Promise<void> => {
      await user.type(element, text);
    },
  };
}
