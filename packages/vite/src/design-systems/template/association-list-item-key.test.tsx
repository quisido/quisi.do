import { describe, expect, it } from 'vitest';
import {
  AssociationList,
  AssociationListItemKey,
  AssociationListItemValue,
} from './index.js';
import { render } from '@testing-library/react';

describe('AssociationListItemKey', (): void => {
  it('should be an association list item key', (): void => {
    const { getByRole } = render(
      <AssociationList>
        <AssociationListItemKey>key</AssociationListItemKey>
        <AssociationListItemValue>value</AssociationListItemValue>
      </AssociationList>,
    );
    expect(getByRole('associationlistitemkey').textContent).toBe('key');
  });
});
