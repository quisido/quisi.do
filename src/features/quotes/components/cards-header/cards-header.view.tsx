import type { ReactElement } from 'react';
import Checkbox from '../../../../components/checkbox';

interface Props {
  readonly bionicReadingEnabled: boolean;
  readonly onBionicReadingToggle: (value: boolean) => void;
}

export default function CardsHeader({
  bionicReadingEnabled,
  onBionicReadingToggle,
}: Props): ReactElement {
  return (
    <Checkbox checked={bionicReadingEnabled} onChange={onBionicReadingToggle}>
      Enable Bionic Reading
    </Checkbox>
  );
}
