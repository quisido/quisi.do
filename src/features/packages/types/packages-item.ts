export default interface PackagesItem extends Record<string, unknown> {
  readonly directDownloads: number;
  readonly downloads: readonly number[];
  readonly href: string;
  readonly isHighlighted: boolean;
  readonly packageName: string;
  readonly totalDownloads: number;
}
