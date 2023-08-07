import type { NonCancelableCustomEvent } from '@cloudscape-design/components/interfaces';
import type { SelectProps } from '@cloudscape-design/components/select';

type ReadonlyCloudscapeDesignSelectChangeEvent = Readonly<
  NonCancelableCustomEvent<
    Readonly<SelectProps.ChangeDetail> & {
      readonly selectedOption: Readonly<SelectProps.Option>;
    }
  >
>;

export type { ReadonlyCloudscapeDesignSelectChangeEvent as default };
