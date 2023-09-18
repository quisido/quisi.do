import type { User } from '@sentry/types';

const DEFAULT_USER: User = {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  ip_address: '{{auto}}',
};

export default DEFAULT_USER;
