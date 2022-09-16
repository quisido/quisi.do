import type { Telemetry } from 'aws-rum-react';
import { AwsRumProvider } from 'aws-rum-react';
import type { ReactElement, ReactNode } from 'react';
import VERSION from '../../../../constants/version';

interface Props {
  readonly children: ReactNode;
  readonly enabled: boolean;
}

const TELEMETRIES: Telemetry[] = ['errors', 'http', 'performance'];

export default function CloudWatchRum({
  children,
  enabled,
}: Readonly<Props>): ReactElement {
  return (
    <AwsRumProvider
      allowCookies
      enableRumClient={enabled}
      enableXRay
      endpoint="https://dataplane.rum.us-west-2.amazonaws.com"
      guestRoleArn="arn:aws:iam::787801101157:role/RUM-Monitor-us-west-2-787801101157-8402338865861-Unauth"
      id="f2349f55-d850-4a22-bb67-967e31005b33"
      identityPoolId="us-west-2:d23010a9-7639-410f-9c2e-39d4d2332c79"
      region="us-west-2"
      sessionSampleRate={1}
      telemetries={TELEMETRIES}
      version={VERSION}
    >
      {children}
    </AwsRumProvider>
  );
}
