import type { TableProps } from '@awsui/components-react/table';
import type { ReactElement } from 'react';
import type TestItem from '../types/test-item.js';

const TEST_COLUMN_DEFINITIONS: TableProps.ColumnDefinition<TestItem>[] = [
  {
    header: 'test header',
    cell({ value }: TestItem): ReactElement {
      return <>{value}</>;
    },
  },
];

export default TEST_COLUMN_DEFINITIONS;
