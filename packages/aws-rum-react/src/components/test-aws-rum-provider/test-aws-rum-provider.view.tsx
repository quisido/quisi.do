/// <reference types="jest" />
import { AwsRum } from 'aws-rum-web';
import type { MutableRefObject, ReactElement, ReactNode } from 'react';
import { useMemo, useRef } from 'react';
import AwsRumContext from '../../contexts/aws-rum';
import mapRefToFunction from '../../utils/map-ref-to-function';
import noop from '../../utils/noop';

interface Props {
  readonly children: ReactNode;
  readonly recordError?: AwsRum['recordError'] | undefined;
  readonly recordEvent?: AwsRum['recordEvent'] | undefined;
  readonly recordPageView?: AwsRum['recordPageView'] | undefined;
}

export default function TestAwsRumProvider({
  children,
  recordError = noop,
  recordEvent = noop,
  recordPageView = noop,
}: Props): ReactElement {
  const recordErrorRef: MutableRefObject<AwsRum['recordError']> =
    useRef(recordError);
  const recordEventRef: MutableRefObject<AwsRum['recordEvent']> =
    useRef(recordEvent);
  const recordPageViewRef: MutableRefObject<AwsRum['recordPageView']> =
    useRef(recordPageView);

  recordErrorRef.current = recordError;
  recordEventRef.current = recordEvent;
  recordPageViewRef.current = recordPageView;

  const client: AwsRum = useMemo((): AwsRum => {
    const newClient: AwsRum = new AwsRum('test-id', '0.0.0', 'us-east-1');
    newClient.recordError = mapRefToFunction(recordErrorRef);
    newClient.recordEvent = mapRefToFunction(recordEventRef);
    newClient.recordPageView = mapRefToFunction(recordPageViewRef);
    return newClient;
  }, []);

  return (
    <AwsRumContext.Provider value={client}>{children}</AwsRumContext.Provider>
  );
}
