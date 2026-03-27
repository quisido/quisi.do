import { describe, expect, it } from 'vitest';
import { List, ListItem } from './index.js';
import { render } from '@testing-library/react';

describe('List', (): void => {
  it('should default to unordered', (): void => {
    const { getByRole } = render(
      <List label="unordered list">
        <ListItem>Test unordered list item</ListItem>
      </List>,
    );
    expect(getByRole('list', { name: 'unordered list' })).toBeInstanceOf(
      HTMLUListElement,
    );
  });

  it('should support ordered', (): void => {
    const { getByRole } = render(
      <List label="ordered list" ordered>
        <ListItem>Test ordered list item</ListItem>
      </List>,
    );
    expect(getByRole('list', { name: 'ordered list' })).toBeInstanceOf(
      HTMLOListElement,
    );
  });
});
