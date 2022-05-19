import type { NonCancelableCustomEvent } from '@awsui/components-react/interfaces';
import type { PaginationProps } from '@awsui/components-react/pagination';

// eslint-disable-next-line @typescript-eslint/no-type-alias
type AwsuiPaginationChangeHandler = (
  event: Readonly<
    NonCancelableCustomEvent<Readonly<PaginationProps.ChangeDetail>>
  >,
) => void;

export default AwsuiPaginationChangeHandler;
