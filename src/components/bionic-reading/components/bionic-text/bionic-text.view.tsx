import type { ReactElement } from 'react';
import useBionicText from './bionic-text.hook';

interface Props {
  readonly children: string;
}

export default function BionicText({ children }: Props): ReactElement {
  const bionicChildren: readonly (ReactElement | string)[] =
    useBionicText(children);

  return <>{bionicChildren}</>;
}
