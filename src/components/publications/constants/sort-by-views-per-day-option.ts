import { SelectProps } from '@awsui/components-react/select';
import Sort from '../constants/sort';

const SORT_BY_VIEWS_PER_DAY_OPTION: SelectProps.Option = {
  label: 'Views per day',
  value: Sort.ViewsPerDay,
};

export default SORT_BY_VIEWS_PER_DAY_OPTION;
