export default interface PackagesTableItem {
  readonly downloads: readonly number[];
  readonly explicitDownloads: number;
  readonly isHighlighted: boolean;
  readonly packageName: string;
  readonly repositoryName: string;
  readonly totalDownloads: number;
}
