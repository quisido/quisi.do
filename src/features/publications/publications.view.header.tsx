import FormField from '@awsui/components-react/form-field';
import Header from '@awsui/components-react/header';
import type { SelectProps } from '@awsui/components-react/select';
import Select from '@awsui/components-react/select';
import I18n from 'lazy-i18n';
import type { ReactElement } from 'react';
import type Sort from './publications.constant.sort';
import usePublicationsHeader from './publications.hook.header';
import styles from './publications.view.header.module.scss';

interface Props {
  readonly onSortChange: SelectProps['onChange'];
  readonly sort: Sort;
}

export default function PublicationsHeader({
  onSortChange,
  sort,
}: Props): ReactElement {
  const { selectedSortOption, sortOptions, sortPlaceholder } =
    usePublicationsHeader({ sort });

  return (
    <Header
      actions={
        <FormField className={styles.sort} label={<I18n>Sort by</I18n>} stretch>
          <Select
            onChange={onSortChange}
            options={sortOptions}
            placeholder={sortPlaceholder}
            selectedOption={selectedSortOption}
          />
        </FormField>
      }
    >
      <I18n>Publications</I18n>
    </Header>
  );
}
