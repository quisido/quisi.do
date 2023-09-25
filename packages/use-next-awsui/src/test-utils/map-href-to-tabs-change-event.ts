import type { NonCancelableCustomEvent } from '@awsui/components-react/interfaces';
import type { TabsProps } from '@awsui/components-react/tabs';

export default function mapHrefToTabsChangeEvent(
  href?: string | undefined,
): NonCancelableCustomEvent<TabsProps.ChangeDetail> {
  // @ts-expect-error `activeTabHref` has invalid `exactOptionalPropertyTypes`.
  return new CustomEvent('', {
    detail: {
      activeTabHref: href,
      activeTabId: 'test-active-tab-id',
    },
  });
}
