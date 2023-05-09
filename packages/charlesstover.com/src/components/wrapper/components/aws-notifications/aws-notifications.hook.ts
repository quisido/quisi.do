import type { FlashbarProps } from '@awsui/components-react/flashbar';
import { useMemo } from 'react';
import EMPTY_ARRAY from '../../../../constants/empty-array';
import type Notification from '../../../../types/notification';
import mapNotificationsToAwsFlashbarPropsMessageDefinitions from '../../utils/map-notifications-to-aws-flashbar-props-message-definitions';

export default function useAwsWrapperNotifications(
  notifications: readonly Notification[] = EMPTY_ARRAY,
): readonly FlashbarProps.MessageDefinition[] {
  return useMemo((): readonly FlashbarProps.MessageDefinition[] => {
    return mapNotificationsToAwsFlashbarPropsMessageDefinitions(notifications);
  }, [notifications]);
}
