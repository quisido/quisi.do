import fetch from 'whatwg-fetch';

window.fetch = async (
  ...args: [RequestInfo | URL, RequestInit | undefined]
): Promise<Response> => fetch(...args);
