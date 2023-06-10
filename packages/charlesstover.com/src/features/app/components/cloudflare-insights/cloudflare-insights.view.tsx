import { useEffect } from 'react';

interface Props {
  readonly token: string;
}

const SOURCE = 'https://static.cloudflareinsights.com/beacon.min.js';

export default function CloudflareInsights({ token }: Readonly<Props>): null {
  useEffect((): VoidFunction | undefined => {
    if (process.env.NODE_ENV !== 'production') {
      return;
    }

    const data: string = JSON.stringify({
      token,
    });

    const script: HTMLScriptElement = window.document.createElement('script');
    script.setAttribute('data-cf-beacon', data);
    script.setAttribute('defer', 'true');
    script.setAttribute('src', SOURCE);

    window.document.body.appendChild(script);
    return (): void => {
      window.document.body.removeChild(script);
    };
  }, [token]);

  return null;
}
