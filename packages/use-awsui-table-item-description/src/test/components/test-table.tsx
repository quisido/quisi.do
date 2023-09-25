import Table from '@awsui/components-react/table';
import type { ComponentType, MutableRefObject, ReactElement } from 'react';
import { useRef } from 'react';
import type { UseAwsuiTableItemDescriptionProps } from '../../hooks/use-awsui-table-item-description.js';
import useAwsuiTableItemDescription from '../../hooks/use-awsui-table-item-description.js';
import TEST_COLUMN_DEFINITIONS from '../constants/test-column-definitions.js';
import type TestItem from '../types/test-item.js';

export default function TestTable({
  // eslint-disable-next-line @typescript-eslint/naming-convention
  Component,
  items,
  onRowClick,
}: Omit<
  Partial<Omit<UseAwsuiTableItemDescriptionProps<TestItem>, 'items'>>,
  'ref'
> &
  Pick<UseAwsuiTableItemDescriptionProps<TestItem>, 'items'>): ReactElement {
  const ref: MutableRefObject<HTMLElement | null> = useRef(null);

  // eslint-disable-next-line @typescript-eslint/naming-convention
  const Portal: ComponentType<Record<string, never>> =
    useAwsuiTableItemDescription({
      // eslint-disable-next-line @typescript-eslint/naming-convention
      Component,
      colSpan: 1,
      items,
      onRowClick,
      ref,
    });

  return (
    <span ref={ref}>
      <Table columnDefinitions={TEST_COLUMN_DEFINITIONS} items={items} />
      <Portal />
    </span>
  );
}
