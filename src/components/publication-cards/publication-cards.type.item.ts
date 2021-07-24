export default interface PublicationCardsItem {
  readonly dateTime: number;
  readonly image?: string;
  reactions: number;
  readonly readingTime?: number;
  readonly title: string;
  readonly type: 'dev' | 'medium';
  readonly url: string;
  views: number;
}
