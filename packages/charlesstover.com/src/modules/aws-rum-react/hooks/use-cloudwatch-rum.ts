import { AwsRum } from 'aws-rum-web';
import { useContext } from 'react';
import CloudWatchRUMContext from '../contexts/cloudwatch-rum';

export default function useCloudWatchRUM(): AwsRum {
  const rum: AwsRum | null = useContext(CloudWatchRUMContext);
  if (rum === null) {
    throw new Error('Expected the CloudWatch RUM context to be provided.');
  }
  return rum;
}
