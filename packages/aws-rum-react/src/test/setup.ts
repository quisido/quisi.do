import fetch from 'whatwg-fetch';

window.fetch = (
  ...args: [RequestInfo | URL, RequestInit | undefined]
): Promise<Response> => fetch(...args);
