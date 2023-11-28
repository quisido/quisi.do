import { type ReactElement } from 'react';

interface Props {
  readonly token: string;
}

export default function CloudflareInsights({
  token,
}: Props): ReactElement | null {
  const beacon: string = JSON.stringify({
    token,
  });

  return (
    <script
      data-cf-beacon={beacon}
      defer
      src="https://static.cloudflareinsights.com/beacon.min.js"
      type="text/javascript"
    />
  );
}
