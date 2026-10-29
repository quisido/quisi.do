import { act } from '@testing-library/react';
import { type ReactElement } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { WHOAMI } from '../constants/whoami.js';
import { AuthenticationProvider } from '../contexts/authentication.js';
import render from '../design-systems/core-test/render.js';
import useAsyncState from '../modules/use-async-state/index.js';
import type Authentication from '../types/authentication.js';
import HeaderAuthenticationUserId from './header-authentication-user-id.js';

interface Props {
  readonly fetch: typeof globalThis.fetch;
}

const TestAuthentication = ({ fetch }: Props): ReactElement => {
  const state = useAsyncState<Authentication>();
  return (
    <AuthenticationProvider value={state}>
      <HeaderAuthenticationUserId fetch={fetch}>{1}</HeaderAuthenticationUserId>
      <output aria-label="Authentication status">
        {state.data?.id === null ? 'Signed out' : 'Signed in'}
      </output>
    </AuthenticationProvider>
  );
};

describe('Unauthenticate', (): void => {
  it('waits for cookie deletion before signing out and prevents repeated requests', async (): Promise<void> => {
    const response = Promise.withResolvers<Response>();
    const fetch = vi
      .fn<typeof globalThis.fetch>()
      .mockReturnValue(response.promise);
    const { clickButton, getByName } = render(
      <TestAuthentication fetch={fetch} />,
    );
    await clickButton('Unauthenticate');
    expect(getByName('button', 'Unauthenticate')).toBeDisabled();
    expect(getByName('status', 'Authentication status')).toMatchTextContent(
      'Signed in',
    );
    expect(fetch).toHaveBeenCalledExactlyOnceWith(WHOAMI, {
      credentials: 'include',
      method: 'DELETE',
      redirect: 'error',
    });
    await act(async (): Promise<void> => {
      response.resolve(new Response(null, { status: 204 }));
      await response.promise;
    });
    expect(getByName('status', 'Authentication status')).toMatchTextContent(
      'Signed out',
    );
  });

  it.each(['http', 'network', 'legacy-worker'])(
    'keeps authentication and exposes a retry after a %s failure',
    async (failure): Promise<void> => {
      const fetch = vi.fn<typeof globalThis.fetch>();
      if (failure === 'legacy-worker') {
        fetch.mockResolvedValue(new Response(null, { status: 200 }));
      } else if (failure === 'http') {
        fetch.mockResolvedValue(new Response(null, { status: 500 }));
      } else {
        fetch.mockRejectedValue(new Error('Network failure'));
      }
      const { clickButton, getByName, getByRole } = render(
        <TestAuthentication fetch={fetch} />,
      );
      await clickButton('Unauthenticate');
      expect(getByRole('alert')).toMatchTextContent(
        'Unable to sign out. Please try again.',
      );
      expect(getByName('status', 'Authentication status')).toMatchTextContent(
        'Signed in',
      );
      expect(getByName('button', 'Unauthenticate')).not.toBeDisabled();
      fetch.mockResolvedValue(new Response(null, { status: 204 }));
      await clickButton('Unauthenticate');
      expect(getByName('status', 'Authentication status')).toMatchTextContent(
        'Signed out',
      );
    },
  );
});
