'use client';

import type { AwsRum } from 'aws-rum-web';
import { createContext, type Context } from 'react';

const AwsRumContext: Context<AwsRum | null> = createContext<AwsRum | null>(
  null,
);

export default AwsRumContext;
