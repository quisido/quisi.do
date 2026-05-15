import { fireEvent } from '@testing-library/react';
import render from './render.js';
import { describe, expect, it } from 'vitest';
import importTestedDesignSystem from './import-tested-design-system.js';

const { Tooltip } = await importTestedDesignSystem();

const expectToReferenceTooltip = (
  described: HTMLElement,
  tooltip: HTMLElement,
): void => {
  const describedBy: string | null = described.getAttribute('aria-describedby');

  if (describedBy === null) {
    throw new Error('Expected element to have aria-describedby.');
  }

  expect(describedBy.split(/\s+/u)).toContain(tooltip.id);
};

describe('Tooltip', (): void => {
  it('should expose contextual popup text as a tooltip', (): void => {
    const { getByRole, getRoleCount } = render(
      <>
        <button id="test-tooltip-for-id">Test button</button>
        <Tooltip htmlFor="test-tooltip-for-id">Test tooltip</Tooltip>
      </>,
    );

    const tooltip: HTMLElement = getByRole('tooltip');
    expect(tooltip).toHaveTextContent('Test tooltip');
    expect(tooltip).toHaveAttribute('id');
    expect(getRoleCount('tooltip')).toBe(1);
  });

  it('should describe the owning element before the tooltip is displayed', (): void => {
    const { getByDescription, getByRole } = render(
      <>
        <button id="test-described-button-id">Test button</button>
        <Tooltip htmlFor="test-described-button-id">Helpful context</Tooltip>
      </>,
    );

    const button: HTMLElement = getByDescription('button', 'Helpful context');
    const tooltip: HTMLElement = getByRole('tooltip');

    expectToReferenceTooltip(button, tooltip);
  });

  it('should keep the tooltip description available when the owner receives focus', (): void => {
    const { getByDescription, getByRole } = render(
      <>
        <button id="test-focused-button-id">Focus target</button>
        <Tooltip htmlFor="test-focused-button-id">Focus context</Tooltip>
      </>,
    );

    const button: HTMLElement = getByDescription('button', 'Focus context');
    const tooltip: HTMLElement = getByRole('tooltip');

    button.focus();

    expect(button).toHaveFocus();
    expectToReferenceTooltip(button, tooltip);
  });

  it('should keep the tooltip description available when the owner is hovered', (): void => {
    const { getByDescription, getByRole } = render(
      <>
        <button id="test-hovered-button-id">Hover target</button>
        <Tooltip htmlFor="test-hovered-button-id">Hover context</Tooltip>
      </>,
    );

    const button: HTMLElement = getByDescription('button', 'Hover context');
    const tooltip: HTMLElement = getByRole('tooltip');

    fireEvent.mouseOver(button);

    expectToReferenceTooltip(button, tooltip);
  });

  it('should describe only the element referenced by htmlFor', (): void => {
    const { getByDescription, getByName, getRoleCount } = render(
      <>
        <button id="test-copy-button-id">Copy</button>
        <Tooltip htmlFor="test-copy-button-id">Copy selection</Tooltip>
        <button id="test-paste-button-id">Paste</button>
        <Tooltip htmlFor="test-paste-button-id">Paste clipboard</Tooltip>
      </>,
    );

    const copy: HTMLElement = getByDescription('button', 'Copy selection');
    const paste: HTMLElement = getByDescription('button', 'Paste clipboard');

    expect(copy).toBe(getByName('button', 'Copy'));
    expect(paste).toBe(getByName('button', 'Paste'));
    expect(copy).not.toHaveAttribute(
      'aria-describedby',
      paste.getAttribute('aria-describedby'),
    );
    expect(getRoleCount('tooltip')).toBe(2);
  });

  it('should restore the previous description when removed', (): void => {
    const { getByName, rerender } = render(
      <>
        <span id="test-original-description-id">Original description</span>
        <button
          aria-describedby="test-original-description-id"
          id="test-restored-button-id"
          type="button"
        >
          Restore
        </button>
        <Tooltip htmlFor="test-restored-button-id">Temporary context</Tooltip>
      </>,
    );

    const button: HTMLElement = getByName('button', 'Restore');
    expect(button).not.toHaveAttribute(
      'aria-describedby',
      'test-original-description-id',
    );

    rerender(
      <>
        <span id="test-original-description-id">Original description</span>
        <button
          aria-describedby="test-original-description-id"
          id="test-restored-button-id"
          type="button"
        >
          Restore
        </button>
      </>,
    );

    expect(button).toHaveAttribute(
      'aria-describedby',
      'test-original-description-id',
    );
  });

  it('should throw when not describing an element', (): void => {
    const { expectToHaveThrown } = render(
      <Tooltip htmlFor="non-existent-id">Test tooltip</Tooltip>,
    );
    expectToHaveThrown('A tooltip must describe an element.');
  });
});
