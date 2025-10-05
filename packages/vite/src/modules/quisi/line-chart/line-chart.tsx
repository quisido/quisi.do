import {
  CategoryScale,
  Chart,
  type ChartDataset,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js';
import {
  type ReactElement,
  type RefObject,
  useLayoutEffect,
  useMemo,
  useRef,
} from 'react';
import { Line } from 'react-chartjs-2';
import useWindow from '../../../hooks/use-window.js';
import validateString from '../../../utils/validate-string.js';
import mapWindowToFontSize from '../map-window-to-font-size.js';
import styles from './line-chart.module.scss';

interface Props {
  readonly data: Readonly<Record<string, readonly number[]>>;
  readonly title: string;
  readonly xLabels: readonly string[];
}

const CLASS_NAME: string = validateString(styles['chart']);
const MAX_HUE = 360;
const NONE = 0;

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

const setChartHeight = (chart: Chart<'line'>, height: number): void => {
  chart.resize(chart.width, height);
};

// eslint-disable-next-line max-lines-per-function
export default function LineChart({
  data,
  title,
  xLabels,
}: Props): ReactElement {
  // Contexts
  const window: Window | null = useWindow();

  // States
  const datasets = useMemo(
    (): readonly ChartDataset<'line'>[] => mapDataToDatasets(data),
    [data],
  );

  const lineRef: RefObject<Chart<'line'> | null> = useRef(null);

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

  // Makes the chart height a multiple of 1rem.
  useLayoutEffect((): VoidFunction | undefined => {
    const { current: lineChart } = lineRef;

    if (lineChart === null || window === null) {
      return;
    }

    const resize = (): void => {
      const rootFontSize: number = mapWindowToFontSize(window);
      const { height } = lineChart;
      const overlap: number = height % rootFontSize;

      if (overlap === NONE) {
        return;
      }

      const rootFontSizeDiff: number = rootFontSize - overlap;
      setChartHeight(lineChart, height + rootFontSizeDiff);
    };

    resize();

    const observer = new MutationObserver(resize);
    observer.observe(lineChart.canvas, {
      attributes: true,
      characterData: true,
      childList: true,
      subtree: true,
    });

    return (): void => {
      observer.disconnect();
    };
  }, [window]);

  return (
    <Line
      aria-label={title}
      className={CLASS_NAME}
      data={{
        datasets: [...datasets],
        labels: [...xLabels],
      }}
      options={{
        maintainAspectRatio: false,
        normalized: true,
        plugins: {
          legend: {
            labels: {
              borderRadius: 1,
              boxHeight: 3,
              boxWidth: 3,
              padding: 20,
              useBorderRadius: true,
            },
            position: 'top',
          },
          title: {
            display: true,
            padding: {
              bottom: -10,
              top: 5,
            },
            text: title,
          },
          tooltip: {
            displayColors: true,
            intersect: false,
            position: 'nearest',
            xAlign: 'center',
            yAlign: 'center',
          },
        },
        responsive: true,
      }}
      ref={lineRef}
    />
  );
}
