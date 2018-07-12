import getRequest from './get-request.js';

export default function getRequestHeaders(): Headers {
  const { headers } = getRequest();
  return headers;
}
