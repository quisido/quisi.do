import { type NonCancelableCustomEvent } from '@awsui/components-react/interfaces';
import { type PaginationProps } from '@awsui/components-react/pagination';
import type PaginationChangeHandler from '../types/pagination-change-handler';

export default function mapNumberDispatchToAwsuiPaginationChangeHandler(
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
