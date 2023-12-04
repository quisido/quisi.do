import type Category from '../../../../../types/navigation-category';
import type Component from '../../../../../types/navigation-component';
import type ExternalLink from '../../../../../types/navigation-external-link';
import type Link from '../../../../../types/navigation-link';

export default interface MuiNavigationRootItemProps {
  readonly divider: boolean;
  readonly item: Category | Component | ExternalLink | Link;
}
