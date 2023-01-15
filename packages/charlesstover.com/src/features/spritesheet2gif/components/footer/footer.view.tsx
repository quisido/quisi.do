import Button from '@awsui/components-react/button';
import type { ReactElement } from 'react';

interface Props {
  readonly loading: boolean;
  readonly onSubmit: VoidFunction;
}

export default function SpriteSheet2GifFooter({
  loading,
  onSubmit,
}: Readonly<Props>): ReactElement {
  return (
    <Button loading={loading} onClick={onSubmit} variant="primary">
      Convert
    </Button>
  );
}
