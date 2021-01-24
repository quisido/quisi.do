export default interface Item {
  description?: string[];
  downloads: number[];
  explicitDownloads: number;
  isHighlighted: boolean;
  packageName: string;
  repositoryName: string;
  totalDownloads: number;
}
