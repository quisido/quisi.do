import type { AwsRum } from 'aws-rum-web';
import { useContext } from 'react';
import MISSING_AWS_RUM_CONTEXT_ERROR from '../constants/missing-aws-rum-context-error';
import AwsRumContext from '../contexts/aws-rum';

export default function useAwsRum(): AwsRum {
  const client: AwsRum | null = useContext(AwsRumContext);

  if (client === null) {
    throw MISSING_AWS_RUM_CONTEXT_ERROR;
  }

  return client;
}
