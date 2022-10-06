import type { ComponentType } from 'react';

export default interface ContentProps {
  readonly onError: (error: Readonly<Error>) => void;
  readonly onErrorDismiss: VoidFunction;
  readonly onHelpDismiss: VoidFunction;
  readonly onHelpRequest: (Help: ComponentType<unknown>) => void;
}
