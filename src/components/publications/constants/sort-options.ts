import { SelectProps } from '@awsui/components-react/select';
import Sort from '../constants/sort';
import SORT_BY_VIEWS_OPTION from '../constants/sort-by-views-option';
import SORT_BY_VIEWS_PER_DAY_OPTION from '../constants/sort-by-views-per-day-option';

const SORT_OPTIONS: SelectProps.Options = [
  {
    label: 'Publication date',
    value: Sort.PublicationDate,
  },
  {
    label: 'Reactions',
    value: Sort.Reactions,
  },
  {
    label: 'Reactions per day',
    value: Sort.ReactionsPerDay,
  },
  {
    label: 'Reactions per view',
    value: Sort.ReactionsPerView,
  },
  {
    label: 'Reading time',
    value: Sort.ReadingTime,
  },
  SORT_BY_VIEWS_OPTION,
  SORT_BY_VIEWS_PER_DAY_OPTION,
];

export default SORT_OPTIONS;
