export default interface Item {
  description?: string[];
  downloads: number[];
  isHighlighted: boolean;
  packageName: string;
  repositoryName: string;
  totalDownloads: number;
  uniqueDownloads: number;
}
