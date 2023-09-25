import { render } from '@testing-library/react';
import type { UseAwsuiTableItemDescriptionProps } from '../../hooks/use-awsui-table-item-description.js';
import TestTable from '../components/test-table.js';
import type TestItem from '../types/test-item.js';

interface State {
  container: HTMLElement;
}

export default function renderTestTable(
  props: Omit<
    Partial<Omit<UseAwsuiTableItemDescriptionProps<TestItem>, 'items'>>,
    'ref'
  > &
    Pick<UseAwsuiTableItemDescriptionProps<TestItem>, 'items'>,
): State {
  const { container } = render(<TestTable {...props} />);

  return {
    container,
  };
}
