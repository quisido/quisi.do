import { type NonCancelableCustomEvent } from '@awsui/components-react/interfaces';
import { type PaginationProps } from '@awsui/components-react/pagination';

type AwsuiPaginationChangeHandler = (
  event: Readonly<
    NonCancelableCustomEvent<Readonly<PaginationProps.ChangeDetail>>
  >,
) => void;

export type { AwsuiPaginationChangeHandler as default };
