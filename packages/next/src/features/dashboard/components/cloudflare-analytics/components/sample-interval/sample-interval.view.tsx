import { type ReactElement } from 'react';
import mapSampleIntervalToRate from '../../map-sample-interval-to-rate';

interface Props {
  readonly children: number;
}

export default function SampleInterval({ children }: Props): ReactElement {
  const rate: number = mapSampleIntervalToRate(children);

  return <>{rate}% sample rate</>;
}
