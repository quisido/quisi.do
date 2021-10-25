import type { ComponentType } from 'react';

export default interface ContentsProps {
  readonly onError: (error: Readonly<Error>) => void;
  readonly onErrorDismiss: () => void;
  readonly onHelpDismiss: () => void;
  readonly onHelpRequest: (Help: ComponentType<unknown>) => void;
}
