import I18n from 'lazy-i18n';
import { type ReactElement } from 'react';
import Button from '../../../../components/button';

interface Props {
  readonly onRunClick: VoidFunction;
}

export default function Actions({ onRunClick }: Props): ReactElement {
  return (
    <Button
      feature="cloudflare-workers-ai/actions"
      onClick={onRunClick}
      variant="primary"
    >
      <I18n>Run</I18n>
    </Button>
  );
}
