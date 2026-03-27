import { describe, it } from 'vitest';
import {
  AssociationList,
  AssociationListItemKey,
  AssociationListItemValue,
} from './index.js';
import { render } from '@testing-library/react';

describe('AssociationList', (): void => {
  it('should be an association list', (): void => {
    const { getByRole } = render(
      <AssociationList>
        <AssociationListItemKey>key</AssociationListItemKey>
        <AssociationListItemValue>value</AssociationListItemValue>
      </AssociationList>,
    );
    getByRole('associationlist');
  });
});
