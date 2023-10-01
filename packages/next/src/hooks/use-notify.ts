import { useNotifications } from '../contexts/notifications';
import type Notification from '../types/notification';
import useEffectEvent from './use-effect-event';

export default function useNotify(): (
  notification: Notification,
) => VoidFunction {
  const [, setNotifications] = useNotifications();

  return useEffectEvent((notification: Notification): VoidFunction => {
    setNotifications(
      (oldNotifications: readonly Notification[]): readonly Notification[] => [
        ...oldNotifications,
        notification,
      ],
    );

    return (): void => {
      const isNotThisNotification = (oldNotification: Notification): boolean =>
        oldNotification !== notification;
      setNotifications(
        (oldNotifications: readonly Notification[]): readonly Notification[] =>
          oldNotifications.filter(isNotThisNotification),
      );
    };
  });
}
