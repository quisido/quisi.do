import { type ReactElement, useState } from 'react';

import { Button } from '../components/design-system.js';
import { WHOAMI } from '../constants/whoami.js';
import { useAuthentication } from '../contexts/authentication.js';

interface Props {
  readonly children: number;
  readonly fetch?: typeof globalThis.fetch | undefined;
}

const NO_CONTENT = 204;

export default function HeaderAuthenticationUserId({
  children,
  fetch = globalThis.fetch,
}: Props): ReactElement {
  const { set } = useAuthentication();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string>();

  const onUnauthenticate = async (): Promise<void> => {
    setPending(true);
    setError(undefined);
    try {
      const response: Response = await fetch(WHOAMI, {
        credentials: 'include',
        method: 'DELETE',
        redirect: 'error',
      });
      if (response.status !== NO_CONTENT) {
        throw new Error('Logout request failed');
      }
      set({ id: null });
    } catch (_error: unknown) {
      setError('Unable to sign out. Please try again.');
    } finally {
      setPending(false);
    }
  };

  return (
    <div>
      <div>User #{children}</div>
      <Button
        disabled={pending}
        onClick={(): void => {
          void onUnauthenticate();
        }}
      >
        Unauthenticate
      </Button>
      {typeof error === 'string' && <p role="alert">{error}</p>}
    </div>
  );
}
