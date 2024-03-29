// https://docs.sentry.io/api/events/list-a-projects-issues/
// /api/0/projects/{organization_slug}/{project_slug}/issues/

export interface Metadata {
  // readonly display_title_with_tree_label: boolean;
  readonly filename?: string | undefined;
  readonly function?: string | undefined;
  readonly type?: string | undefined; // 'Error'
  readonly value: string;
}

/*
export interface Project {
  readonly id: string;
  readonly name: string;
  readonly slug: string;
}
*/

export default interface SentryIssue {
  // readonly annotations: [];
  // readonly assignedTo: null;
  readonly count: string;
  readonly culprit: string;
  readonly firstSeen: string;
  readonly hasSeen: boolean;
  readonly id: string;
  readonly isBookmarked: boolean;
  readonly isPublic: boolean;
  readonly isSubscribed: boolean;
  readonly lastSeen: string;
  readonly level: string; // 'error'
  // readonly logger: null;
  readonly metadata: Metadata;
  readonly numComments: number;
  readonly permalink: string;
  // readonly project: Project;
  // readonly shareId: null;
  readonly shortId: string;
  readonly stats: Record<'24h', readonly (readonly [number, number])[]>;
  readonly status: string; // 'unresolved'
  // readonly statusDetails: {};
  // readonly subscriptionDetails: null;
  readonly title: string;
  readonly type: string; // 'default'
  readonly userCount: number;
}
