// https://docs.sentry.io/api/events/list-a-projects-issues/
// /api/0/projects/{organization_slug}/{project_slug}/issues/

export interface Metadata {
  // Readonly display_title_with_tree_label: boolean;
  readonly filename?: string | undefined;
  readonly function?: string | undefined;
  readonly value: string;

  // Type can be "Error"
  readonly type?: string | undefined;
}

/*
 *Export interface Project {
 *  readonly id: string;
 *  readonly name: string;
 *  readonly slug: string;
 *}
 */

export default interface SentryIssue {
  /*
   * Readonly annotations: [];
   * readonly assignedTo: null;
   */
  readonly count: string;
  readonly culprit: string;
  readonly firstSeen: string;
  readonly hasSeen: boolean;
  readonly id: string;
  readonly isBookmarked: boolean;
  readonly isPublic: boolean;
  readonly isSubscribed: boolean;
  readonly lastSeen: string;
  // Readonly logger: null;
  readonly metadata: Metadata;
  readonly numComments: number;
  readonly permalink: string;
  /*
   * Readonly project: Project;
   * readonly shareId: null;
   */
  readonly shortId: string;
  readonly stats: Record<'24h', readonly (readonly [number, number])[]>;

  /*
   * Readonly statusDetails: {};
   * readonly subscriptionDetails: null;
   */
  readonly title: string;
  readonly userCount: number;

  // Level can be 'error'.
  readonly level: string;

  // Status can be 'unresolved'.
  readonly status: string;

  // Type can be 'default'.
  readonly type: string;
}
