import { userEvent } from 'vitest/browser';
import { describe, expect, it, vi } from 'vitest';
import render from './render.js';
import importTestedDesignSystem from './import-tested-design-system.js';

const { Link, RadioGroup } = await importTestedDesignSystem();

describe('RadioGroup', (): void => {
  describe('label', (): void => {
    it('should provide a visible accessible name', (): void => {
      const handleChange = vi.fn();
      const { getByName } = render(
        <RadioGroup
          label="Shipping speed"
          onChange={handleChange}
          radios={[]}
        />,
      );

      const radioGroup: HTMLElement = getByName('radiogroup', 'Shipping speed');
      const labelId: string | null = radioGroup.getAttribute('aria-labelledby');

      if (labelId === null) {
        throw new Error('Expected radio group to reference a visible label.');
      }

      expect(window.document.getElementById(labelId)).toHaveTextContent(
        'Shipping speed',
      );
      expect(radioGroup).not.toHaveAttribute('aria-label');
    });
  });

  describe('labelledBy', (): void => {
    it('should reference an external visible label', (): void => {
      const handleChange = vi.fn();
      const { getByName } = render(
        <>
          <span id="test-radio-group-labelled-by-id">Payment method</span>
          <RadioGroup
            labelledBy="test-radio-group-labelled-by-id"
            onChange={handleChange}
            radios={[]}
          />
        </>,
      );

      const radioGroup: HTMLElement = getByName('radiogroup', 'Payment method');
      expect(radioGroup).toHaveAttribute(
        'aria-labelledby',
        'test-radio-group-labelled-by-id',
      );
    });
  });

  describe('owns', (): void => {
    it('should support strings', (): void => {
      const handleChange = vi.fn();
      const { getByName } = render(
        <RadioGroup
          label="Owned radios"
          onChange={handleChange}
          owns="first second"
          radios={[]}
        />,
      );
      const radioGroup: HTMLElement = getByName('radiogroup', 'Owned radios');
      expect(radioGroup).toHaveAttribute('aria-owns', 'first second');
    });

    it('should support arrays', (): void => {
      const handleChange = vi.fn();
      const { getByName } = render(
        <RadioGroup
          label="Owned radios"
          onChange={handleChange}
          owns={['first', 'second']}
          radios={[]}
        />,
      );
      const radioGroup: HTMLElement = getByName('radiogroup', 'Owned radios');
      expect(radioGroup).toHaveAttribute('aria-owns', 'first second');
    });

    it('should support sets', (): void => {
      const handleChange = vi.fn();
      const { getByName } = render(
        <RadioGroup
          label="Owned radios"
          onChange={handleChange}
          owns={new Set(['first', 'second'])}
          radios={[]}
        />,
      );
      const radioGroup: HTMLElement = getByName('radiogroup', 'Owned radios');
      expect(radioGroup).toHaveAttribute('aria-owns', 'first second');
    });

    it('should use aria-owns when radios are not DOM children', (): void => {
      const handleChange = vi.fn();
      const { getByName } = render(
        <>
          <input
            aria-checked="false"
            aria-label="Externally owned"
            id="external-radio"
            role="radio"
            type="radio"
          />
          <RadioGroup
            label="Mixed ownership"
            onChange={handleChange}
            owns="external-radio"
            radios={[{ key: 'internal', label: 'Internal', value: 'internal' }]}
          />
        </>,
      );

      const radioGroup: HTMLElement = getByName(
        'radiogroup',
        'Mixed ownership',
      );
      const internal: HTMLElement = getByName('radio', 'Internal');
      const external: HTMLElement = getByName('radio', 'Externally owned');

      expect(radioGroup).toHaveAttribute('aria-owns', 'external-radio');
      expect(radioGroup).toContainElement(internal);
      expect(radioGroup).not.toContainElement(external);
      expect(internal).toHaveAttribute('aria-setsize', '2');
      expect(internal).not.toHaveAttribute('aria-posinset');
    });
  });

  describe('radios', (): void => {
    it('should group radio buttons as DOM children', (): void => {
      const handleChange = vi.fn();
      const { getByName, getRoleCount } = render(
        <RadioGroup
          label="Fruit"
          onChange={handleChange}
          radios={[
            { key: 'apple', label: 'Apple', value: 'apple' },
            { key: 'banana', label: 'Banana', value: 'banana' },
          ]}
          value="apple"
        />,
      );

      const radioGroup: HTMLElement = getByName('radiogroup', 'Fruit');
      const apple: HTMLElement = getByName('radio', 'Apple');
      const banana: HTMLElement = getByName('radio', 'Banana');

      expect(radioGroup).toContainElement(apple);
      expect(radioGroup).toContainElement(banana);
      expect(getRoleCount('radio')).toBe(2);
      expect(apple).toHaveAttribute('name', radioGroup.id);
      expect(banana).toHaveAttribute('name', radioGroup.id);
    });

    it('should expose exactly one checked radio at a time', async (): Promise<void> => {
      const handleChange = vi.fn();
      const { click, getByName, rerender } = render(
        <RadioGroup
          label="Fruit"
          onChange={handleChange}
          radios={[
            { key: 'apple', label: 'Apple', value: 'apple' },
            { key: 'banana', label: 'Banana', value: 'banana' },
          ]}
          value="apple"
        />,
      );

      const apple: HTMLElement = getByName('radio', 'Apple');
      const banana: HTMLElement = getByName('radio', 'Banana');
      expect(apple).toBeChecked();
      expect(apple).toHaveAttribute('aria-checked', 'true');
      expect(banana).not.toBeChecked();
      expect(banana).toHaveAttribute('aria-checked', 'false');

      await click(banana);
      expect(handleChange).toHaveBeenCalledExactlyOnceWith('banana');

      rerender(
        <RadioGroup
          label="Fruit"
          onChange={handleChange}
          radios={[
            { key: 'apple', label: 'Apple', value: 'apple' },
            { key: 'banana', label: 'Banana', value: 'banana' },
          ]}
          value="banana"
        />,
      );

      expect(apple).not.toBeChecked();
      expect(apple).toHaveAttribute('aria-checked', 'false');
      expect(banana).toBeChecked();
      expect(banana).toHaveAttribute('aria-checked', 'true');
    });

    it('should expose radio set metadata', (): void => {
      const handleChange = vi.fn();
      const { getByName } = render(
        <RadioGroup
          label="Fruit"
          onChange={handleChange}
          radios={[
            { key: 'apple', label: 'Apple', value: 'apple' },
            { key: 'banana', label: 'Banana', value: 'banana' },
          ]}
          value="apple"
        />,
      );

      const apple: HTMLElement = getByName('radio', 'Apple');
      const banana: HTMLElement = getByName('radio', 'Banana');

      expect(apple).toHaveAttribute('aria-posinset', '1');
      expect(apple).toHaveAttribute('aria-setsize', '2');
      expect(banana).toHaveAttribute('aria-posinset', '2');
      expect(banana).toHaveAttribute('aria-setsize', '2');
    });

    it('should support explicit position metadata when external ownership prevents inference', (): void => {
      const handleChange = vi.fn();
      const { getByName } = render(
        <RadioGroup
          label="Mixed positions"
          onChange={handleChange}
          owns="external-radio"
          radios={[
            {
              key: 'internal',
              label: 'Internal',
              positionInSet: 2,
              value: 'internal',
            },
          ]}
        />,
      );

      const internal: HTMLElement = getByName('radio', 'Internal');
      expect(internal).toHaveAttribute('aria-posinset', '2');
      expect(internal).toHaveAttribute('aria-setsize', '2');
    });
  });

  it('should support read-only state', async (): Promise<void> => {
    const handleChange = vi.fn();
    const { click, getByName } = render(
      <RadioGroup
        label="Read only"
        onChange={handleChange}
        radios={[{ key: 'locked', label: 'Locked', value: 'locked' }]}
        readOnly
      />,
    );

    const radioGroup: HTMLElement = getByName('radiogroup', 'Read only');
    const radio: HTMLElement = getByName('radio', 'Locked');

    expect(radioGroup).toHaveAttribute('aria-readonly', 'true');
    expect(radio).toHaveAttribute('aria-readonly', 'true');
    await click(radio);
    expect(handleChange).not.toHaveBeenCalled();
  });

  it('should support required state', (): void => {
    const handleChange = vi.fn();
    const { getByName } = render(
      <RadioGroup
        label="Required"
        onChange={handleChange}
        radios={[{ key: 'required', label: 'Required option', value: 'value' }]}
        required
      />,
    );

    const radioGroup: HTMLElement = getByName('radiogroup', 'Required');
    const radio: HTMLElement = getByName('radio', 'Required option');

    expect(radioGroup).toHaveAttribute('aria-required', 'true');
    expect(radio).toHaveAttribute('aria-required', 'true');
    expect(radio).toBeRequired();
  });

  it('should move focus and selection between radios with arrow keys', async (): Promise<void> => {
    const handleChange = vi.fn();
    const { getByName, tab } = render(
      <RadioGroup
        label="Arrow keys"
        onChange={handleChange}
        radios={[
          { key: 'first', label: 'First', value: 'first' },
          { key: 'second', label: 'Second', value: 'second' },
        ]}
        value="first"
      />,
    );

    const first: HTMLElement = getByName('radio', 'First');
    const second: HTMLElement = getByName('radio', 'Second');

    await tab();
    expect(first).toHaveFocus();
    await userEvent.keyboard('{ArrowDown}');
    expect(second).toHaveFocus();
    expect(handleChange).toHaveBeenCalledExactlyOnceWith('second');
  });

  it('should allow non-radio supplemental content inside the group', (): void => {
    const handleChange = vi.fn();
    const { getByName, getRoleCount } = render(
      <RadioGroup
        label="Plan"
        onChange={handleChange}
        radios={[
          { key: 'basic', label: 'Basic', value: 'basic' },
          { key: 'advanced', label: 'Advanced', value: 'advanced' },
        ]}
      >
        <p>Advanced enables usage alerts.</p>
        <Link href="/plans">Compare plans</Link>
      </RadioGroup>,
    );

    const radioGroup: HTMLElement = getByName('radiogroup', 'Plan');
    const link: HTMLElement = getByName('link', 'Compare plans');

    expect(radioGroup).toHaveTextContent('Advanced enables usage alerts.');
    expect(radioGroup).toContainElement(link);
    expect(getRoleCount('radio')).toBe(2);
  });
});
