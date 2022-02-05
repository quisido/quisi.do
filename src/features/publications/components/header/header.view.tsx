import FormField from '@awsui/components-react/form-field';
import Header from '@awsui/components-react/header';
import type { SelectProps } from '@awsui/components-react/select';
import Select from '@awsui/components-react/select';
import I18n from 'lazy-i18n';
import type { ReactElement } from 'react';
import type ReadonlySelectChangeEvent from '../../../../types/readonly-select-change-event';
import filterByDefined from '../../../../utils/filter-by-defined';
import validateString from '../../../../utils/validate-string';
import type Sort from '../../constants/publications-sort';
import usePublicationsHeader from './header.hook';
import styles from './header.module.scss';

interface Props {
  readonly onSortChange: (event: ReadonlySelectChangeEvent) => void;
  readonly sort: Sort;
}

const sortClassName: string = validateString(styles.sort);

export default function PublicationsHeader({
  onSortChange,
  sort,
}: Props): ReactElement {
  const { selectedSortOption, sortOptions, sortPlaceholder } =
    usePublicationsHeader({ sort });

  // Workaround until AWS UI supports TypeScript 4.4 exact optional properties.
  // https://github.com/aws/awsui-documentation/issues/14
  const optionalSelectProps: Pick<SelectProps, 'placeholder'> = {};
  if (filterByDefined(sortPlaceholder)) {
    optionalSelectProps.placeholder = sortPlaceholder;
  }

  return (
    <Header
      actions={
        <FormField
          className={sortClassName}
          label={<I18n>Sort by</I18n>}
          stretch
        >
          <Select
            onChange={onSortChange}
            options={sortOptions}
            selectedOption={selectedSortOption}
            {...optionalSelectProps}
          />
        </FormField>
      }
    >
      <I18n>Publications</I18n>
    </Header>
  );
}
