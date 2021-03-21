export default interface PublicationCardItem {
  dateTime: number;
  image?: string;
  reactions: number;
  readingTime?: number;
  title: string;
  type: 'dev' | 'medium';
  url: string;
  views: number;
}
