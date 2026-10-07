const LOCALHOST_NAMES = new Set(['127.0.0.1', '::1', 'localhost']);

interface PWARegisterModule {
  readonly registerSW: (options: {
    immediate: boolean;
    onRegisterError(error: unknown): void;
  }) => void;
}

export interface RegisterableLocation {
  hostname: string;
  protocol: string;
}

export const isRegisterableServiceWorkerLocation = (
  currentLocation: RegisterableLocation,
): boolean => {
  if (currentLocation.protocol === 'file:') {
    return false;
  }

  if (currentLocation.protocol === 'https:') {
    return true;
  }

  if (currentLocation.protocol !== 'http:') {
    return false;
  }

  return LOCALHOST_NAMES.has(currentLocation.hostname);
};

export const registerServiceWorker = async (): Promise<void> => {
  if (!import.meta.env.PROD) {
    return;
  }

  if (
    typeof navigator === 'undefined' ||
    typeof window === 'undefined' ||
    !('serviceWorker' in navigator)
  ) {
    return;
  }

  if (!isRegisterableServiceWorkerLocation(window.location)) {
    return;
  }

  const pwaRegisterModule =
    (await import('virtual:pwa-register')) as PWARegisterModule;

  pwaRegisterModule.registerSW({
    immediate: true,
    onRegisterError(error: unknown): void {
      window.console.error('Service worker registration failed.', error);
    },
  });
};
