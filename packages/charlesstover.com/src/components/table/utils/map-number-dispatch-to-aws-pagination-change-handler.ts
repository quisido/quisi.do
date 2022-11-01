import type { NonCancelableCustomEvent } from '@awsui/components-react/interfaces';
import type { PaginationProps } from '@awsui/components-react/pagination';
import type AwsuiPaginationChangeHandler from '../types/awsui-pagination-change-handler';

export default function mapNumberDispatchToAwsPaginationChangeHandler(
  dispatch: (n: number) => void,
): AwsuiPaginationChangeHandler {
  return function handlePaginationChange(
    e: Readonly<
      NonCancelableCustomEvent<Readonly<PaginationProps.ChangeDetail>>
    >,
  ): void {
    dispatch(e.detail.currentPageIndex);
  };
}
