import type { ChangeEvent, ReactElement } from 'react';
import render from './render.js';
import { describe, expect, it, vi } from 'vitest';
import noop from '../../utils/noop.js';
import { userEvent } from '@testing-library/user-event';
import importTestedDesignSystem from './import-tested-design-system.js';

const ScriptSubmittedSelect = (): ReactElement => {
  const handleChange = (event: ChangeEvent<HTMLSelectElement>): void => {
    event.currentTarget.form?.requestSubmit();
  };

  return (
    <label>
      <span>Delivery cadence</span>
      <select
        aria-describedby="delivery-cadence-submit-notice"
        defaultValue="weekly"
        onChange={handleChange}
      >
        <option value="weekly">Weekly</option>
        <option value="daily">Daily</option>
      </select>
    </label>
  );
};

const { Button, Form, Link, Region, Search, SearchBox, TextBox } =
  await importTestedDesignSystem();

describe('Form', (): void => {
  it('should be a named native form landmark', (): void => {
    const { getByName } = render(
      <Form heading="Account details" onSubmit={noop}>
        Test content
      </Form>,
    );

    const form: HTMLElement = getByName('form', 'Account details');
    expect(form.tagName).toBe('FORM');
    expect(form).toHaveTextContent('Test content');
  });

  describe('heading', (): void => {
    it('should provide a visible accessible label', (): void => {
      const { getByName, getHeadingByLevel } = render(
        <Form heading="Test heading" onSubmit={noop}>
          Test content
        </Form>,
      );

      const form: HTMLElement = getByName('form', 'Test heading');
      const heading: HTMLElement = getHeadingByLevel('Test heading', 1);

      expect(form).toHaveAttribute('aria-labelledby', heading.id);
      expect(form).not.toHaveAttribute('aria-label');
    });

    it('should increment', (): void => {
      const { getHeadingByLevel } = render(
        <Form heading="Test form heading" onSubmit={noop}>
          <Region heading="Test region heading">Test content</Region>
        </Form>,
      );

      getHeadingByLevel('Test form heading', 1);
      getHeadingByLevel('Test region heading', 2);
    });
  });

  it('should support labels without visible headings', (): void => {
    const { getByName, getRoleCount } = render(
      <Form label="Payment method" onSubmit={noop}>
        Test content
      </Form>,
    );

    const form: HTMLElement = getByName('form', 'Payment method');
    expect(form).toHaveAttribute('aria-label', 'Payment method');
    expect(form).not.toHaveAttribute('aria-labelledby');
    expect(getRoleCount('heading')).toBe(0);
  });

  it('should support external labels', (): void => {
    const { getByName } = render(
      <>
        <span id="test-form-label-id">Test labelled by</span>
        <Form labelledBy="test-form-label-id" onSubmit={noop}>
          Test content
        </Form>
      </>,
    );

    const form: HTMLElement = getByName('form', 'Test labelled by');
    expect(form).toHaveAttribute('aria-labelledby', 'test-form-label-id');
    expect(form).not.toHaveAttribute('aria-label');
  });

  it('should contain form controls, scripted controls, and hyperlinks', (): void => {
    const { getByName } = render(
      <Form heading="Mixed controls" onSubmit={noop}>
        <TextBox label="Email address" onChange={vi.fn()} value="" />
        <Button onClick={vi.fn()}>Validate</Button>
        <Link href="/privacy">Privacy notice</Link>
      </Form>,
    );

    const form: HTMLElement = getByName('form', 'Mixed controls');
    expect(form).toContainElement(getByName('textbox', 'Email address'));
    expect(form).toContainElement(getByName('button', 'Validate'));
    expect(form).toContainElement(getByName('link', 'Privacy notice'));
  });

  it('should submit with native submit controls', async (): Promise<void> => {
    const handleSubmit = vi.fn();
    const { click, getByName } = render(
      <Form heading="Submittable form" onSubmit={handleSubmit}>
        <button type="submit">Submit form</button>
      </Form>,
    );

    await click(getByName('button', 'Submit form'));
    expect(handleSubmit).toHaveBeenCalledExactlyOnceWith();
  });

  it('should not submit when a scripted control is activated', async (): Promise<void> => {
    const handleClick = vi.fn();
    const handleSubmit = vi.fn();
    const { click, getByName } = render(
      <Form heading="Scripted controls" onSubmit={handleSubmit}>
        <Button onClick={handleClick}>Preview</Button>
      </Form>,
    );

    await click(getByName('button', 'Preview'));
    expect(handleClick).toHaveBeenCalledExactlyOnceWith();
    expect(handleSubmit).not.toHaveBeenCalled();
  });

  it('should support scripted submissions with advance notification', async (): Promise<void> => {
    const handleSubmit = vi.fn();
    const { getByDescription, getByName } = render(
      <Form heading="Notification settings" onSubmit={handleSubmit}>
        <p id="delivery-cadence-submit-notice">
          Changing delivery cadence submits this form.
        </p>
        <ScriptSubmittedSelect />
      </Form>,
    );

    const select: HTMLElement = getByDescription(
      'combobox',
      'Changing delivery cadence submits this form.',
    );
    expect(getByName('form', 'Notification settings')).toContainElement(select);

    await userEvent.selectOptions(select, 'daily');
    expect(handleSubmit).toHaveBeenCalledExactlyOnceWith();
  });

  it('should leave search criteria to search landmarks', (): void => {
    const { getByName, getByRole, getOptionalByRole } = render(
      <Search>
        <SearchBox label="Search criteria" onChange={vi.fn()} value="" />
      </Search>,
    );

    getByRole('search');
    getByName('searchbox', 'Search criteria');
    expect(getOptionalByRole('form')).toBeNull();
  });
});
