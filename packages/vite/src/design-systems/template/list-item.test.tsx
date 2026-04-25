import { describe, it } from 'vitest';
import { List, ListItem } from './index.js';
import { render } from '@testing-library/react';

describe('ListItem', (): void => {
  it('should be a list item', (): void => {
    const { getByRole } = render(
      <List>
        <ListItem>Test list item</ListItem>
      </List>,
    );

    // List items apparently don't have accessible names.
    getByRole('listitem');
  });
});
