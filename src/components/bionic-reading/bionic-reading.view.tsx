import type { ReactElement } from 'react';
import useBionicReading from '../../hooks/use-bionic-reading';
import BionicText from './components/bionic-text';

interface Props {
  readonly children: string;
}

export default function BionicReading({ children }: Props): ReactElement {
  const enabled: boolean = useBionicReading();

  if (enabled) {
    return <BionicText>{children}</BionicText>;
  }

  return <>{children}</>;
}
