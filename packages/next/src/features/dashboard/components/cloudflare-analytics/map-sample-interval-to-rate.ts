import round from '../../../../utils/round';

const DECIMALS = 2;
const PERCENT = 100;
const SAMPLE_SIZE = 1;

export default function mapSampleIntervalToRate(interval: number): number {
  return round((SAMPLE_SIZE / interval) * PERCENT, DECIMALS);
}
