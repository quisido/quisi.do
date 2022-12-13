import { AwsRum } from 'aws-rum-web';
import { useContext } from 'react';
import AwsRumContext from '../contexts/aws-rum';

export default function useAwsRum(): AwsRum {
  const rum: AwsRum | null = useContext(AwsRumContext);
  if (rum === null) {
    throw new Error('Expected the AWS RUM context to be provided.');
  }
  return rum;
}
