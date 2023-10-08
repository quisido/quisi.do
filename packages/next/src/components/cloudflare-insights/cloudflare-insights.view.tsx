import type { ReactElement } from 'react';

interface Props {
  readonly token: string;
}

export default function CloudflareInsights({
  token,
}: Props): ReactElement | null {
  if (process.env.NODE_ENV !== 'production') {
    return null;
  }

  const data: string = JSON.stringify({
    token,
  });

  return (
    <script
      data-cf-beacon={data}
      defer
      src="https://static.cloudflareinsights.com/beacon.min.js"
      type="text/javascript"
    />
  );
}
