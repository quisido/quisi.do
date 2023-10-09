import { type NonCancelableCustomEvent } from '@cloudscape-design/components/interfaces';
import { type PaginationProps } from '@cloudscape-design/components/pagination';

type CloudscapePaginationChangeHandler = (
  event: Readonly<
    NonCancelableCustomEvent<Readonly<PaginationProps.ChangeDetail>>
  >,
) => void;

export type { CloudscapePaginationChangeHandler as default };
