import type { FlashbarProps } from '@cloudscape-design/components/flashbar';
import { useMemo } from 'react';
import EMPTY_ARRAY from '../../../../../../constants/empty-array';
import type Notification from '../../../../../../types/notification';
import mapNotificationsToMessageDefinitions from '../../utils/map-notifications-to-message-definitions';

export default function useCloudscapeDesignWrapperNotifications(
  notifications: readonly Notification[] = EMPTY_ARRAY,
): readonly FlashbarProps.MessageDefinition[] {
  return useMemo(
    (): readonly FlashbarProps.MessageDefinition[] =>
      mapNotificationsToMessageDefinitions(notifications),
    [notifications],
  );
}
