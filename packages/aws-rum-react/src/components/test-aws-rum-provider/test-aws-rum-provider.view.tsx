/// <reference types="jest" />
import { AwsRum } from 'aws-rum-web';
import type { MutableRefObject, ReactElement, ReactNode } from 'react';
import { useMemo, useRef } from 'react';
import AwsRumContext from '../../contexts/aws-rum';
import noop from '../../test/utils/noop';

interface Props {
  readonly children: ReactNode;
  readonly recordError?: ((error: unknown) => void) | undefined;
}

export default function TestAwsRumProvider({
  children,
  recordError = noop,
}: Props): ReactElement {
  const recordErrorRef: MutableRefObject<(error: unknown) => void> =
    useRef(recordError);
  recordErrorRef.current = recordError;

  const client: AwsRum = useMemo((): AwsRum => {
    const newClient: AwsRum = new AwsRum('test-id', '0.0.0', 'us-east-1');
    newClient.recordError = (err: unknown): void => {
      recordErrorRef.current(err);
    };
    return newClient;
  }, []);

  return (
    <AwsRumContext.Provider value={client}>{children}</AwsRumContext.Provider>
  );
}
