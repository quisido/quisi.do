import type { SelectProps } from '@awsui/components-react/select';
import type { TranslateFunction } from 'lazy-i18n';
import { useTranslate } from 'lazy-i18n';
import { useMemo } from 'react';
import type Sort from './constants/publications-sort';
import useSortOptions from './publications.header.hook.sort-options';

interface Props {
  readonly sort: Sort;
}

interface State {
  readonly selectedSortOption: Readonly<SelectProps.Option>;
  readonly sortOptions: SelectProps.Options;
  readonly sortPlaceholder: string | undefined;
}

export default function usePublicationsHeader({ sort }: Props): State {
  // Contexts
  const translate: TranslateFunction = useTranslate();

  // States
  const sortOptions: SelectProps.Options = useSortOptions();

  return {
    sortOptions,
    sortPlaceholder: translate('Sort by'),

    selectedSortOption: useMemo((): SelectProps.Option => {
      const findSelectedSortOption = ({
        value,
      }: Readonly<SelectProps.Option>): boolean => value === sort;

      // Since `sort` is a Sort enum value and all Sort enum values have a sort
      //   option, we can assert that we found this sort option.
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      return sortOptions.find(findSelectedSortOption) as SelectProps.Option;
    }, [sort, sortOptions]),
  };
}
