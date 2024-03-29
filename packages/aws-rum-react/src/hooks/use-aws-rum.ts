import type { AwsRum } from 'aws-rum-web';
import { useContext } from 'react';
import AwsRumContext from '../contexts/aws-rum.js';

export default function useAwsRum(): AwsRum {
  const client: AwsRum | null = useContext(AwsRumContext);

  if (client === null) {
    throw new Error('Expected the AWS RUM context to be provided.');
  }

  return client;
}
