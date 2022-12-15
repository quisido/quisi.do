import type { AwsRumConfig } from 'aws-rum-web';
import { AwsRum } from 'aws-rum-web';
import type { ReactElement, ReactNode } from 'react';
import { useMemo } from 'react';
import AwsRumContext from '../../contexts/aws-rum';

interface Props extends AwsRumConfig {
  readonly children: ReactNode;
  readonly id: string;
  readonly region: 'us-east-1' | 'us-west-2';
  readonly version: string;
}

export default function AwsRumProvider({
  children,
  id,
  region,
  version,
  ...config
}: Props): ReactElement {
  const awsRum: AwsRum = useMemo(
    (): AwsRum => new AwsRum(id, version, region, config),
    [config, id, region, version],
  );

  return (
    <AwsRumContext.Provider value={awsRum}>{children}</AwsRumContext.Provider>
  );
}
