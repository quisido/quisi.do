export default interface PackagesItem {
  readonly directDownloads: number;
  readonly downloads: readonly number[];
  readonly isHighlighted: boolean;
  readonly packageName: string;
  readonly repositoryName: string;
  readonly totalDownloads: number;
}
