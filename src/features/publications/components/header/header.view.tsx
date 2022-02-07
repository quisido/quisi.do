import I18n from 'lazy-i18n';
import type { ReactElement } from 'react';
import Container from '../../../../components/container';
import Select from '../../../../components/select';
import type Sort from '../../constants/publications-sort';
import usePublicationsHeader from './header.hook';
// import styles from './header.module.scss';

interface Props {
  readonly onSortChange: (value: string | undefined) => void;
  readonly sort: Sort;
}

// const sortClassName: string = validateString(styles.sort);

export default function PublicationsHeader({
  onSortChange,
  sort,
}: Props): ReactElement {
  const { sortOptions } = usePublicationsHeader();

  return (
    <Container
      actions={
        <Select
          label={<I18n>Sort by</I18n>}
          onChange={onSortChange}
          options={sortOptions}
          value={sort}
        />
      }
      header={<I18n>Publications</I18n>}
    />
  );
}
