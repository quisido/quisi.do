import { PieChartProps } from '@awsui/components-react/pie-chart';

export default interface Item extends PieChartProps.Datum {
  description?: string[];
  downloads: number[];
  filteringText: string;
  isHighlighted: boolean;
  packageName: string;
  repositoryName: string;
  totalDownloads: number;
  uniqueDownloads: number;
}
