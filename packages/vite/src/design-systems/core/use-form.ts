import type { ReactNode } from 'react';
import useElementId from '../../hooks/use-element-id.js';
import useHeadingOrLabel from './use-heading-or-label.js';
import useHeadingLevel from './use-heading-level.js';

interface Props {
  readonly heading: ReactNode | undefined;
  readonly label: string | undefined;
  readonly labelledBy: string | undefined;
}

interface State {
  readonly headingId: string;
  readonly headingLevel: number;
  readonly labelledBy: string | undefined;
}

export default function useForm({ heading, label, labelledBy }: Props): State {
  const headingId: string = useElementId();

  return {
    headingId,
    headingLevel: useHeadingLevel(),
    labelledBy: useHeadingOrLabel({ heading, headingId, label, labelledBy }),
  };
}
