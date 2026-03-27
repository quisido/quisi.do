import { describe, expect, it } from 'vitest';
import {
  AssociationList,
  AssociationListItemKey,
  AssociationListItemValue,
} from './index.js';
import { render } from '@testing-library/react';

describe('AssociationListItemValue', (): void => {
  it('should be an association list item value', (): void => {
    const { getByRole } = render(
      <AssociationList>
        <AssociationListItemKey>key</AssociationListItemKey>
        <AssociationListItemValue>value</AssociationListItemValue>
      </AssociationList>,
    );
    expect(getByRole('associationlistitemvalue').textContent).toBe('value');
  });
});
