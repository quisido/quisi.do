import {
  CategoryScale,
  Chart,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  type ChartDataset,
} from 'chart.js';
import { useLayoutEffect, useMemo, type ReactElement } from 'react';
import { Line } from 'react-chartjs-2';
import validateString from '../../../utils/validate-string.js';
import styles from './line-chart.module.scss';

interface Props {
  readonly data: Readonly<Record<string, readonly number[]>>;
  readonly title: string;
  readonly xLabels: readonly string[];
}

const CLASS_NAME: string = validateString(styles['chart']);
const MAX_HUE = 360;

const getColors = (count: number): readonly string[] => {
  const colors: string[] = [];
  for (let index = 0; index < count; index++) {
    colors.push(`hsl(${(index / count) * MAX_HUE}, 100%, 50%)`);
  }
  return colors;
};

const mapDataToDatasets = (
  data: Readonly<Record<string, readonly number[]>>,
): readonly ChartDataset<'line'>[] => {
  const entries = Object.entries(data);
  const colors: readonly string[] = getColors(entries.length);
  const mapEntryToDataset = (
    [label, values]: readonly [string, readonly number[]],
    index: number,
  ): ChartDataset<'line'> => ({
    backgroundColor: colors[index],
    data: [...values],
    fill: false,
    label,
    tension: 0.5,
  });

  return entries.map(mapEntryToDataset);
};

export default function LineChart({
  data,
  title,
  xLabels,
}: Props): ReactElement {
  // States
  const datasets = useMemo(
    (): readonly ChartDataset<'line'>[] => mapDataToDatasets(data),
    [data],
  );

  // Effects
  useLayoutEffect((): void => {
    Chart.register(
      CategoryScale,
      LineElement,
      Legend,
      LinearScale,
      PointElement,
      Title,
      Tooltip,
    );
  }, []);

  return (
    <Line
      className={CLASS_NAME}
      data={{
        datasets: [...datasets],
        labels: [...xLabels],
      }}
      options={{
        // Normalized: true,
        responsive: true,

        plugins: {
          legend: {
            position: 'top',

            labels: {
              borderRadius: 1,
              boxHeight: 3,
              boxWidth: 3,
              padding: 20,
              useBorderRadius: true,
            },
          },
          title: {
            display: true,
            text: title,

            padding: {
              bottom: -10,
              top: 5,
            },
          },
          tooltip: {
            displayColors: true,
            intersect: false,
            position: 'nearest',
            xAlign: 'center',
            yAlign: 'center',
          },
        },
      }}
    />
  );
}
