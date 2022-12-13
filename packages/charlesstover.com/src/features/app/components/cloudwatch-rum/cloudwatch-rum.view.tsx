import { Telemetry } from 'aws-rum-web';
import type { ReactElement, ReactNode } from 'react';
import {
  AwsRumProvider,
  ReactRouterRecordPageView,
} from '../../../../modules/aws-rum-react';

interface Props {
  readonly children: ReactNode;
}

const TELEMETRIES: Telemetry[] = ['errors', 'http', 'performance'];

export default function CloudWatchRUM({ children }: Props): ReactElement {
  return (
    <AwsRumProvider
      allowCookies
      enableXRay
      endpoint="https://dataplane.rum.us-east-1.amazonaws.com"
      guestRoleArn="arn:aws:iam::094281974650:role/RUM-Monitor-us-east-1-094281974650-2971760190761-Unauth"
      id="5d4772b7-8ced-4ada-a26b-abfafd5da105"
      identityPoolId="us-east-1:709b9e62-2a5d-4715-bddd-9ecac01b558b"
      region="us-east-1"
      sessionSampleRate={1}
      telemetries={TELEMETRIES}
      version="1.0.0"
    >
      {children}
    </AwsRumProvider>
  );
}
