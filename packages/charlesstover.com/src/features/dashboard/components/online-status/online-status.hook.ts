import useOffline from 'use-offline';

export default function useOnlineStatus(status: boolean): string {
  const isUserOffline: boolean = useOffline();

  if (isUserOffline) {
    return '❔';
  }

  if (status) {
    return '✅';
  }

  return '❌';
}
