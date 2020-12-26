export default interface DevArticle {
  canonical_url: string;
  collection_id: null;
  comments_count: number;
  cover_image: string;
  created_at: string;
  crossposted_at: null;
  description: string;
  edited_at: null | string;
  id: number;
  last_comment_at: string;
  path: string;
  positive_reactions_count: number;
  public_reactions_count: number;
  published_at: string;
  published_timestamp: string;
  readable_publish_date: string;
  social_image: string;
  slug: string;
  tag_list: string[];
  tags: string;
  title: string;
  type_of: 'article';
  url: string;
  user: {
    github_username: string;
    name: string;
    profile_image: string;
    profile_image_90: string;
    twitter_username: string;
    username: string;
    website_url: string;
  };
}
