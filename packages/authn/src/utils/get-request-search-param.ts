import getRequest from './get-request.js';

export default function getRequestSearchParam(name: string): string | null {
  const request: Request = getRequest();
  const { searchParams } = new URL(request.url);
  return searchParams.get(name);
}
