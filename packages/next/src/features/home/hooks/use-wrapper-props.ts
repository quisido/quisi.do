import type { Props as WrapperProps } from '../../../components/wrapper';

export default function useHomeWrapperProps(): Omit<
  WrapperProps,
  'breadcrumbs' | 'children'
> {
  return {
    toolsHide: true,
  };
}
