import I18n from 'lazy-i18n';
import { type ReactElement } from 'react';
import Header from '../../../../components/header.js';
import Select from '../../../../components/select.js';
import type Sort from '../../constants/publications-sort.js';
import usePublicationsHeader from './header.hook.js';

interface Props {
  readonly onSortChange: (value: string | undefined) => void;
  readonly sort: Sort;
}

export default function PublicationsHeader({
  onSortChange,
  sort,
}: Props): ReactElement {
  const { sortOptions } = usePublicationsHeader();

  return (
    <Header
      actions={
        <Select
          label={<I18n>Sort by</I18n>}
          labelDirection="row"
          onChange={onSortChange}
          options={sortOptions}
          value={sort}
        />
      }
    >
      <I18n>Publications</I18n>
    </Header>
  );
}
