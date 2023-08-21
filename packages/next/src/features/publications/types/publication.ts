// Reactions and views are mutable when Dev.to and Medium article statistics are
//   merged.
export default interface Publication {
  readonly dateTime: number;
  readonly image?: string | undefined;
  reactions: number;
  readonly readingTime?: number | undefined;
  readonly title: string;
  readonly type: 'dev' | 'medium';
  readonly url: string;
  views: number;
}
