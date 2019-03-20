'use client';

import {
  AwsRumProvider,
  MockAwsRumProvider,
  type Telemetry,
} from 'aws-rum-react';
import { type ReactElement, type ReactNode } from 'react';
import VERSION from '../constants/version.js';
import validateString from '../utils/validate-string.js';

interface Props {
  readonly children: ReactNode;
}

const TELEMETRIES: Telemetry[] = ['errors', 'http', 'performance'];

const APPLICATION_ID: string = validateString(
  process.env['CLOUDWATCH_RUM_APPLICATION_ID'],
);

const GUEST_ROLE_ARN: string = validateString(
  process.env['CLOUDWATCH_RUM_GUEST_ROLE_ARN'],
);

const IDENTITY_POOL_ID: string = validateString(
  process.env['CLOUDWATCH_RUM_IDENTITY_POOL_ID'],
);

export default function CloudWatchRum({ children }: Props): ReactElement {
  if (typeof window === 'undefined') {
    return <MockAwsRumProvider>{children}</MockAwsRumProvider>;
  }

  return (
    <AwsRumProvider
      allowCookies
      enableRumClient={window.location.hostname !== 'localhost'}
      enableXRay
      endpoint="https://dataplane.rum.us-west-2.amazonaws.com"
      guestRoleArn={GUEST_ROLE_ARN}
      id={APPLICATION_ID}
      identityPoolId={IDENTITY_POOL_ID}
      region="us-west-2"
      sessionSampleRate={1}
      telemetries={TELEMETRIES}
      version={VERSION}
    >
      {children}
    </AwsRumProvider>
  );
}
