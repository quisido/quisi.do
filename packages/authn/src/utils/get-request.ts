import getState from './get-state.js';

export default function getRequest(): Request {
  const { request } = getState();
  return request;
}
