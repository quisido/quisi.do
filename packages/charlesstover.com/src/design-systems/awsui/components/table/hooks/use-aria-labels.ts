import type { TableProps } from '@awsui/components-react/table';
import type { TranslateFunction } from 'lazy-i18n';
import { useTranslate } from 'lazy-i18n';
import { useMemo } from 'react';

const SINGLE = 1;

export default function useAwsuiTableAriaLabels<
  Item,
>(): TableProps.AriaLabels<Item> {
  // Contexts
  const translate: TranslateFunction = useTranslate();

  return useMemo(
    (): TableProps.AriaLabels<Item> => ({
      allItemsSelectionLabel: ({
        selectedItems,
      }: TableProps.SelectionState<Item>): string => {
        const count: number = selectedItems.length;
        if (count === SINGLE) {
          return translate('1 item selected') ?? '1 item selected';
        }

        return (
          translate('$n items selected', {
            n: count,
          }) ?? `${count} items selected`
        );
      },

      itemSelectionLabel: (
        { selectedItems }: TableProps.SelectionState<Item>,
        item: Item,
      ): string => {
        const isSelected: boolean = selectedItems.includes(item);
        if (isSelected) {
          return translate('Item is selected.') ?? 'Item is selected.';
        }

        return translate('Item is not selected.') ?? 'Item is not selected.';
      },
    }),
    [translate],
  );
}
