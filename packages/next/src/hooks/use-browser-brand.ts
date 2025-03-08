'use client';

import useUserAgent from './use-user-agent.js';

enum BrowserBrand {
  Chrome = 'Chrome',
  Edge = 'Edge',
}

export default function useBrowserBrand(): BrowserBrand | null {
  const userAgent: string | null = useUserAgent();

  if (userAgent === null) {
    return null;
  }

  if (userAgent.includes(' Edg/')) {
    return BrowserBrand.Edge;
  }

  return null;
}
