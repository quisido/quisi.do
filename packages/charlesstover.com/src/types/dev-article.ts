/* eslint-disable @typescript-eslint/naming-convention */
export default interface DevArticle {
  readonly canonical_url: string;
  readonly collection_id: null;
  readonly comments_count: number;
  readonly cover_image: string;
  readonly created_at: string;
  readonly crossposted_at: null;
  readonly description: string;
  readonly edited_at: string | null;
  readonly id: number;
  readonly last_comment_at: string;
  readonly path: string;
  readonly positive_reactions_count: number;
  readonly public_reactions_count: number;
  readonly published_at: string;
  readonly published_timestamp: string;
  readonly readable_publish_date: string;
  readonly social_image: string;
  readonly slug: string;
  readonly tag_list: string[];
  readonly tags: string;
  readonly title: string;
  readonly type_of: 'article';
  readonly url: string;
  readonly user: {
    readonly github_username: string;
    readonly name: string;
    readonly profile_image: string;
    readonly profile_image_90: string;
    readonly twitter_username: string;
    readonly username: string;
    readonly website_url: string;
  };
}
