import type { UseAwsuiTableItemDescriptionProps } from '../../hooks/use-awsui-table-item-description.js';
import TestAwsuiTableItemDescription from '../components/test-awsui-table-item-description.js';
import type TestItem from '../types/test-item.js';

export default function mapElementToProps(
  current: HTMLElement | null,
): UseAwsuiTableItemDescriptionProps<TestItem> {
  return {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    Component: TestAwsuiTableItemDescription,
    colSpan: 1,
    items: [{ value: 'value' }],
    ref: {
      current,
    },
  };
}
