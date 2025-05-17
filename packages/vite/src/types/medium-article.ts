export default interface MediumArticle {
  readonly claps: number;
  readonly firstPublishedAt: number;
  readonly friendsLinkViews: number;
  readonly internalReferrerViews: number;
  readonly postId: string;
  readonly previewImage: string;
  readonly readingTime: number;
  readonly reads: number;
  readonly slug: string;
  readonly syndicatedViews: number;
  readonly title: string;
  readonly updateNotificationSubscribers: number;
  readonly upvotes: number;
  readonly views: number;
}
