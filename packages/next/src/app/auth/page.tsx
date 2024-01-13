'use client';

import { useRouter } from 'next/router.js';
import type { ParsedUrlQuery } from 'querystring';
import { type ReactElement, useEffect, useState } from 'react';
import mapUnknownToString from 'unknown2string';
import Div from '../../components/div/index.js';
import Header from '../../components/header/index.js';
import Section from '../../components/section.js';

const FIRST = 0;
const { PATREON_OAUTH_CLIENT_SECRET } = process.env;
const PATREON_OAUTH_CLIENT_ID =
  'J_6jrNJZNibHylSF83UVl9I4OHZYf67RAsU0s7_LnH1N5BKF-vgOyweF3KQLOKm1';

const mapParsedUrlQueryToCode = ({
  code,
}: ParsedUrlQuery): string | undefined => {
  if (typeof code === 'string') {
    return code;
  }
  if (typeof code === 'undefined') {
    return;
  }
  return code[FIRST];
};

export default function AuthPage(): ReactElement {
  const router = useRouter();
  const code: string | undefined = mapParsedUrlQueryToCode(router.query);

  const [error, setError] = useState<unknown>();
  const [response, setResponse] = useState<unknown>();

  useEffect((): void => {
    if (typeof code === 'undefined') {
      return;
    }

    if (typeof PATREON_OAUTH_CLIENT_SECRET === 'undefined') {
      setError(new Error('Expected a Patreon OAuth client secret to exist.'));
      return;
    }

    const body: URLSearchParams = new URLSearchParams();
    body.set('client_id', PATREON_OAUTH_CLIENT_ID);
    body.set('client_secret', PATREON_OAUTH_CLIENT_SECRET);
    body.set('code', code);
    body.set('grant_type', 'authorization_code');
    body.set('redirect_uri', 'https://quisi.do/auth/');
    window
      .fetch('https://www.patreon.com/api/oauth2/token', {
        body: body.toString(),
        method: 'POST',
      })
      .then(
        async (newResponse: Response): Promise<unknown> => newResponse.json(),
      )
      .then(setResponse)
      .catch(setError);
  }, [code]);

  return (
    <Section header={<Header>Authenticating</Header>}>
      {typeof error !== 'undefined' && (
        <Div element="p">{mapUnknownToString(error)}</Div>
      )}
      {typeof response !== 'undefined' && (
        <Div element="p">
          {JSON.stringify({ ...response, access_token: '', refresh_token: '' })}
        </Div>
      )}
      <Div element="p">Please wait while we verify your account.</Div>
    </Section>
  );
}
