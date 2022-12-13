import type { AwsRum } from 'aws-rum-web';
import type { Context } from 'react';
import { createContext } from 'react';

const CloudWatchRUMContext: Context<AwsRum | null> =
  createContext<AwsRum | null>(null);

export default CloudWatchRUMContext;
