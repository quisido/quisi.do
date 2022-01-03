import type { NonCancelableCustomEvent } from '@awsui/components-react/interfaces';
import type { TextFilterProps } from '@awsui/components-react/text-filter';

export default function mapStringDispatchToTextFilterChangeHandler(
  dispatch: (str: string) => void,
): (
  e: Readonly<NonCancelableCustomEvent<Readonly<TextFilterProps.ChangeDetail>>>,
) => void {
  return function handleTextFilterChange(
    e: Readonly<
      NonCancelableCustomEvent<Readonly<TextFilterProps.ChangeDetail>>
    >,
  ): void {
    dispatch(e.detail.filteringText);
  };
}
