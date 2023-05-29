import type { NonCancelableCustomEvent } from '@awsui/components-react/interfaces';
import type { SelectProps } from '@awsui/components-react/select';

type ReadonlyAwsuiSelectChangeEvent = Readonly<
  NonCancelableCustomEvent<
    Readonly<SelectProps.ChangeDetail> & {
      readonly selectedOption: Readonly<SelectProps.Option>;
    }
  >
>;

export default ReadonlyAwsuiSelectChangeEvent;
