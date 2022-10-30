import type { CyHttpMessages } from 'cypress/types/net-stubbing';

export default function destroyRequest(
  request: CyHttpMessages.IncomingHttpRequest,
): void {
  request.destroy();
}
