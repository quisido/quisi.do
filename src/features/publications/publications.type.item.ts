// Reactions and views are mutable when Dev.to and Medium article statistics are
//   merged.
export default interface PublicationsItem {
  readonly dateTime: number;
  readonly image?: string;
  reactions: number;
  readonly readingTime?: number;
  readonly title: string;
  readonly type: 'dev' | 'medium';
  readonly url: string;
  views: number;
}
