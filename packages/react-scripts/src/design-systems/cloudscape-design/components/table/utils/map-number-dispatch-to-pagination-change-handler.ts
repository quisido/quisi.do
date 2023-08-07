import type { NonCancelableCustomEvent } from '@cloudscape-design/components/interfaces';
import type { PaginationProps } from '@cloudscape-design/components/pagination';
import type PaginationChangeHandler from '../types/pagination-change-handler';

export default function mapNumberDispatchToCloudscapePaginationChangeHandler(
  dispatch: (n: number) => void,
): PaginationChangeHandler {
  return function handlePaginationChange(
    e: Readonly<
      NonCancelableCustomEvent<Readonly<PaginationProps.ChangeDetail>>
    >,
  ): void {
    dispatch(e.detail.currentPageIndex);
  };
}
