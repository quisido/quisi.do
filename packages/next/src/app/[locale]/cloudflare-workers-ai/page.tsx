'use client';

import { ReactElement, useEffect } from 'react';
import type {
  Inputs,
  Model,
} from '../../../app-components/cloudflare-workers-ai';
import CloudflareWorkersAi from '../../../app-components/cloudflare-workers-ai';

const ACCOUNT_IDENTIFIER = 'da0f1e5d73beae3d7bbc796d448766ab';

const handleFetch = async <M extends Model>(
  apiToken: string,
  model: M,
  inputs: Inputs[M],
): Promise<unknown> => {
  const response: Response = await window.fetch(
    `https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_IDENTIFIER}/ai/run/${model}`,
    {
      body: JSON.stringify(inputs),
      method: 'POST',
      mode: 'no-cors',
      headers: {
        Authorization: `Bearer ${apiToken}`,
        'Content-Type': 'application/json',
      },
    },
  );

  return await response.json();
};

export default function CloudflareWorkersAiPage(): ReactElement {
  return <CloudflareWorkersAi onFetch={handleFetch} />;
}
