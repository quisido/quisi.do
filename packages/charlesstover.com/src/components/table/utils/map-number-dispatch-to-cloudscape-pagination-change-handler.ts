import type { NonCancelableCustomEvent } from '@cloudscape-design/components/interfaces';
import type { PaginationProps } from '@cloudscape-design/components/pagination';
import type CloudscapePaginationChangeHandler from '../types/cloudscape-pagination-change-handler';

export default function mapNumberDispatchToCloudscapePaginationChangeHandler(
  dispatch: (n: number) => void,
): CloudscapePaginationChangeHandler {
  return function handlePaginationChange(
    e: Readonly<
      NonCancelableCustomEvent<Readonly<PaginationProps.ChangeDetail>>
    >,
  ): void {
    dispatch(e.detail.currentPageIndex);
  };
}
