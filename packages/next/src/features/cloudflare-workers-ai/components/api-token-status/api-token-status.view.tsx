import { type ReactElement } from 'react';
import LoadingIcon from '../../../../components/loading-icon/index.js';
import type Status from '../../types/api-token-status.js';

interface Props {
  readonly children: Status;
}

export default function CloudflareWorkersAiApiTokenStatus({
  children,
}: Props): ReactElement {
  switch (children.status) {
    case 'uninitiated':
      return <>✖</>;
    case 'loading':
      return <LoadingIcon />;
    case 'error':
      return <>❌ {children.message}</>;
    case 'success':
      return <>✔ {JSON.stringify(children.data)}</>;
  }
}
