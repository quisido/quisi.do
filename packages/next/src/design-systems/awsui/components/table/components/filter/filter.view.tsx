import  { type NonCancelableEventHandler } from '@awsui/components-react/internal/events';
import TextFilter, type { TextFilterProps } from '@awsui/components-react/text-filter';
import  { type ReactElement } from 'react';
import withRequiredProps from '../../../../../../hocs/with-required-props';
import useAwsuiTableFilter from './filter.hook';

interface Props {
  readonly children?: string | undefined;
  readonly onChange: NonCancelableEventHandler<TextFilterProps.ChangeDetail>;
  readonly placeholder?: string | undefined;
  readonly rowsCount: number;
}

function AwsuiTableFilter({
  children = '',
  placeholder,
  onChange,
  rowsCount,
}: Props): ReactElement | null {
  const { countText, filteringPlaceholder } = useAwsuiTableFilter({
    placeholder,
    rowsCount,
  });

  const optionalProps: Pick<TextFilterProps, 'filteringAriaLabel'> = {};
  if (typeof placeholder !== 'undefined') {
    optionalProps.filteringAriaLabel = placeholder;
  }

  return (
    <TextFilter
      countText={countText}
      filteringPlaceholder={filteringPlaceholder}
      filteringText={children}
      onChange={onChange}
      {...optionalProps}
    />
  );
}

export default withRequiredProps(['onChange'], AwsuiTableFilter);
