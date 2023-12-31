'use client';

import { type ReactElement } from 'react';
import Button from '../../components/button';
import Section from '../../components/section';

const PATREON_OAUTH_CLIENT_ID =
  'J_6jrNJZNibHylSF83UVl9I4OHZYf67RAsU0s7_LnH1N5BKF-vgOyweF3KQLOKm1';

export default function Home(): ReactElement {
  return (
    <Section
      actions={
        <Button
          feature="home"
          href={`https://www.patreon.com/oauth2/authorize?client_id=${PATREON_OAUTH_CLIENT_ID}&redirect_uri=${encodeURIComponent(
            'https://quisi.do/auth/',
          )}&response_type=code`}
          variant="primary"
        >
          Authenticate
        </Button>
      }
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'stretch',
          justifyContent: 'flex-start',
        }}
      >
        <ul style={{ flexGrow: 1 }}>
          <li>Open source</li>
          <li>Transparent</li>
          <li>Not for profit</li>
        </ul>
        <ul style={{ flexGrow: 1 }}>
          <li>Educate</li>
          <li>Empower</li>
          <li>Heal</li>
        </ul>
      </div>
    </Section>
  );
}
