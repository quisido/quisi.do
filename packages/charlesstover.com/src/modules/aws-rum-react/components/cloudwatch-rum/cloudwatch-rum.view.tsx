import type { AwsRumConfig } from 'aws-rum-web';
import { AwsRum } from 'aws-rum-web';
import type { ReactElement, ReactNode } from 'react';
import { useMemo } from 'react';
import CloudWatchRUMContext from '../../contexts/cloudwatch-rum';

interface Props extends AwsRumConfig {
  readonly children: ReactNode;
  readonly id: string;
  readonly region: 'us-east-1' | 'us-west-2';
  readonly version: string;
}

export default function CloudWatchRUM({
  children,
  id,
  region,
  version,
  ...config
}: Props): ReactElement {
  const value: AwsRum = useMemo(
    (): AwsRum => new AwsRum(id, version, region, config),
    [config, id, region, version],
  );

  return (
    <CloudWatchRUMContext.Provider value={value}>
      {children}
    </CloudWatchRUMContext.Provider>
  );
}
