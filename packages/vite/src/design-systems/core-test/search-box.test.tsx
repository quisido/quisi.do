import render from './render.js';
import { describe, expect, it, vi } from 'vitest';
import { fireEvent } from '@testing-library/react';
import importTestedDesignSystem from './import-tested-design-system.js';

const { Search, SearchBox } = await importTestedDesignSystem();

describe('SearchBox', (): void => {
  it('should expose a named search criteria textbox', (): void => {
    const handleChange = vi.fn();
    const { getByName, getRoleCount } = render(
      <SearchBox label="Test search box" onChange={handleChange} value="" />,
    );

    const searchBox: HTMLElement = getByName('searchbox', 'Test search box');
    expect(searchBox.tagName).toBe('INPUT');
    expect(searchBox).toHaveAttribute('type', 'search');
    expect(searchBox).toHaveValue('');
    expect(getRoleCount('searchbox')).toBe(1);
  });

  it('should emit search criteria changes', (): void => {
    const handleChange = vi.fn();
    const { getByName } = render(
      <SearchBox label="Query" onChange={handleChange} value="" />,
    );

    fireEvent.change(getByName('searchbox', 'Query'), {
      target: { value: 'observability' },
    });

    expect(handleChange).toHaveBeenCalledExactlyOnceWith('observability');
  });

  it('should update its displayed criteria from its controlled value', (): void => {
    const handleChange = vi.fn();
    const { getByName, rerender } = render(
      <SearchBox label="Controlled query" onChange={handleChange} value="" />,
    );

    const searchBox: HTMLElement = getByName(
      'searchbox',
      'Controlled query',
    );

    rerender(
      <SearchBox
        label="Controlled query"
        onChange={handleChange}
        value="browser"
      />,
    );

    expect(searchBox).toHaveValue('browser');
  });

  it('should support disabled state', (): void => {
    const handleChange = vi.fn();
    const { getByName } = render(
      <SearchBox disabled label="Disabled query" onChange={handleChange} value="" />,
    );

    const searchBox: HTMLElement = getByName('searchbox', 'Disabled query');
    expect(searchBox).toBeDisabled();
    expect(searchBox).toHaveAttribute('aria-disabled', 'true');
  });

  it('should support read-only state', (): void => {
    const handleChange = vi.fn();
    const { getByName } = render(
      <SearchBox
        label="Read-only query"
        onChange={handleChange}
        readOnly
        value="fixed"
      />,
    );

    const searchBox: HTMLElement = getByName('searchbox', 'Read-only query');
    expect(searchBox).toHaveAttribute('readonly');
    expect(searchBox).toHaveAttribute('aria-readonly', 'true');
    expect(searchBox).toHaveValue('fixed');
  });

  it('should support required state', (): void => {
    const handleChange = vi.fn();
    const { getByName } = render(
      <SearchBox label="Required query" onChange={handleChange} required value="" />,
    );

    const searchBox: HTMLElement = getByName('searchbox', 'Required query');
    expect(searchBox).toBeRequired();
    expect(searchBox).toHaveAttribute('aria-required', 'true');
  });

  it('should work as the criteria field in a search landmark', (): void => {
    const handleChange = vi.fn();
    const { getByName, getByRole } = render(
      <Search>
        <SearchBox label="Site search" onChange={handleChange} value="" />
      </Search>,
    );

    const search: HTMLElement = getByRole('search');
    const searchBox: HTMLElement = getByName('searchbox', 'Site search');
    expect(search).toContainElement(searchBox);
  });
});
