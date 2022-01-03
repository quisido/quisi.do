import type { NonCancelableCustomEvent } from '@awsui/components-react/interfaces';
import type { PaginationProps } from '@awsui/components-react/pagination';

export default function mapNumberDispatchToPaginationChangeHandler(
  dispatch: (n: number) => void,
): (
  e: Readonly<NonCancelableCustomEvent<Readonly<PaginationProps.ChangeDetail>>>,
) => void {
  return function handlePaginationChange(
    e: Readonly<
      NonCancelableCustomEvent<Readonly<PaginationProps.ChangeDetail>>
    >,
  ): void {
    dispatch(e.detail.currentPageIndex);
  };
}
