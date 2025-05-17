export default function appendCloudflareInsights(
  token: string,
  nonce: string,
): void {
  const script: HTMLScriptElement = window.document.createElement('script');
  script.dataset['cfBeacon'] = JSON.stringify({ token });
  script.defer = true;
  script.setAttribute('nonce', nonce);
  script.setAttribute(
    'src',
    'https://static.cloudflareinsights.com/beacon.min.js',
  );
  script.setAttribute('type', 'text/javascript');

  const preconnect: HTMLLinkElement = window.document.createElement('link');
  preconnect.setAttribute('href', 'https://cloudflareinsights.com');
  preconnect.setAttribute('rel', 'preconnect');
  window.document.head.appendChild(script);
}
