export default interface PackagesTableItem {
  downloads: number[];
  explicitDownloads: number;
  isHighlighted: boolean;
  packageName: string;
  repositoryName: string;
  totalDownloads: number;
}
