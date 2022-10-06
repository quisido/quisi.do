/* eslint-disable @typescript-eslint/no-type-alias */
import type { NonCancelableCustomEvent } from '@awsui/components-react/interfaces';
import type { SelectProps } from '@awsui/components-react/select';

type ReadonlySelectChangeEvent = Readonly<
  NonCancelableCustomEvent<
    Readonly<SelectProps.ChangeDetail> & {
      readonly selectedOption: Readonly<SelectProps.Option>;
    }
  >
>;

export default ReadonlySelectChangeEvent;
