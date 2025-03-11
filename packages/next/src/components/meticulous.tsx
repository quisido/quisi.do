import type { ReactElement } from 'react';

/**
 *   Meticulous loads synchronously on purpose. This is acceptable, because this
 * component should only be mounted in development environments.
 * https://app.meticulous.ai/projects/quisi.do/quisi.do/setup/recorder/nextjs/install-in-app-directory
 */

interface Props {
  readonly recordingToken: string;
}

export default function Meticulous({
  recordingToken,
}: Props): ReactElement | null {
  return (
    <script
      data-recording-token={recordingToken}
      data-is-production-environment="false"
      src="https://snippet.meticulous.ai/v1/meticulous.js"
    />
  );
}
