import render from './render.js';
import { describe, expect, it, vi } from 'vitest';
import importTestedDesignSystem from './import-tested-design-system.js';

const { Button, Link, Search, SearchBox } = await importTestedDesignSystem();

describe('Search', (): void => {
  it('should expose a search landmark', (): void => {
    const { getByRole, getRoleCount } = render(<Search>Test content</Search>);

    const search: HTMLElement = getByRole('search');
    expect(search.tagName).toBe('SEARCH');
    expect(search).toHaveTextContent('Test content');
    expect(getRoleCount('search')).toBe(1);
  });

  it('should contain controls and objects that combine into a search facility', (): void => {
    const handleChange = vi.fn();
    const handleClick = vi.fn();
    const { getByName, getByRole } = render(
      <Search>
        <SearchBox
          label="Search terms"
          onChange={handleChange}
          value="observability"
        />
        <Button onClick={handleClick}>Search</Button>
        <Link href="/search-help">Search help</Link>
      </Search>,
    );

    const search: HTMLElement = getByRole('search');
    const searchBox: HTMLElement = getByName('searchbox', 'Search terms');
    const button: HTMLElement = getByName('button', 'Search');
    const link: HTMLElement = getByName('link', 'Search help');

    expect(search).toContainElement(searchBox);
    expect(search).toContainElement(button);
    expect(search).toContainElement(link);
  });

  it('should preserve the reading order of the search facility', (): void => {
    const { getByRole } = render(
      <Search>
        <label>
          <span>Category</span>
          <select defaultValue="all">
            <option value="all">All results</option>
            <option value="docs">Documentation</option>
          </select>
        </label>
        <button type="button">Filter</button>
        <a href="/advanced-search">Advanced search</a>
      </Search>,
    );

    const search: HTMLElement = getByRole('search');
    expect(search).toHaveTextContent(
      'CategoryAll resultsDocumentationFilterAdvanced search',
    );
  });

  it('should allow multiple search landmarks', (): void => {
    const { getRoleCount } = render(
      <>
        <Search>
          <SearchBox label="Site search" onChange={vi.fn()} value="" />
        </Search>
        <Search>
          <SearchBox label="Documentation search" onChange={vi.fn()} value="" />
        </Search>
      </>,
    );

    expect(getRoleCount('search')).toBe(2);
  });

  it('should let keyboard navigation move through search controls', async (): Promise<void> => {
    const handleChange = vi.fn();
    const handleClick = vi.fn();
    const { click, getByName, getByRole, tab } = render(
      <>
        <button type="button">Before search</button>
        <Search>
          <SearchBox label="Query" onChange={handleChange} value="" />
          <Button onClick={handleClick}>Submit search</Button>
          <Link href="/search-tips">Search tips</Link>
        </Search>
      </>,
    );

    const search: HTMLElement = getByRole('search');
    const before: Element | null = search.previousElementSibling;
    const searchBox: HTMLElement = getByName('searchbox', 'Query');
    const button: HTMLElement = getByName('button', 'Submit search');
    const link: HTMLElement = getByName('link', 'Search tips');

    if (!(before instanceof HTMLElement)) {
      throw new Error('Expected search to follow a focusable element.');
    }

    await click(before);
    expect(before).toHaveFocus();
    await tab();
    expect(search).not.toHaveFocus();
    expect(searchBox).toHaveFocus();
    await tab();
    expect(button).toHaveFocus();
    await tab();
    expect(link).toHaveFocus();
  });
});
