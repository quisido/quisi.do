import { useEffect } from 'react';

interface Props {
  readonly token: string;
}

const SOURCE = 'https://static.cloudflareinsights.com/beacon.min.js';

export default function CloudflareInsights({ token }: Readonly<Props>): null {
  useEffect((): VoidFunction | undefined => {
    if (window.location.hostname === 'localhost') {
      return;
    }

    const data: string = JSON.stringify({
      token,
    });

    const script: HTMLScriptElement = document.createElement('script');
    script.setAttribute('data-cf-beacon', data);
    script.setAttribute('defer', 'true');
    script.setAttribute('src', SOURCE);

    document.body.appendChild(script);
    return (): void => {
      document.body.removeChild(script);
    };
  }, [token]);

  return null;
}
