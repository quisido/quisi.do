import { withRecordError } from 'aws-rum-react';
import type { ReactElement, ReactNode } from 'react';
import { PureComponent } from 'react';

interface Props {
  readonly children: ReactNode;
  readonly recordError: (error: unknown) => void;
}

interface State {
  readonly error: Error | null;
}

class ErrorBoundary extends PureComponent<Props, State> {
  public constructor(props: Readonly<Props>) {
    super(props);
    this.state = {
      error: null,
    };
  }

  public static getDerivedStateFromError(error: Error): State {
    return {
      error,
    };
  }

  public componentDidCatch(error: Error): void {
    const { recordError } = this.props;
    recordError(error);
  }

  public render(): ReactElement {
    const { error } = this.state;
    if (error !== null) {
      return <>{error.message}</>;
    }

    const { children } = this.props;
    return <>{children}</>;
  }
}

export default withRecordError(ErrorBoundary);
