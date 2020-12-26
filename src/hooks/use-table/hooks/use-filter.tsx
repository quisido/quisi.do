import { TableProps } from '@awsui/components-react/table';
import TextFilter, {
  TextFilterProps,
} from '@awsui/components-react/text-filter';
import { useMemo } from 'react';

export default function useFilter(
  props: TextFilterProps,
): TableProps['filter'] {
  return useMemo((): TableProps['filter'] => {
    return <TextFilter {...props} />;
  }, [props]);
}
