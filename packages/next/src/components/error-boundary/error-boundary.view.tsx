import { withRecordError } from 'aws-rum-react';
import type { PropsWithChildren, ReactElement } from 'react';
import { PureComponent } from 'react';

interface Props {
  readonly recordError: (error: unknown) => void;
}

interface State {
  readonly error: Error | null;
}

class ErrorBoundary extends PureComponent<
  Required<PropsWithChildren<Props>>,
  State
> {
  public constructor(props: Readonly<Required<PropsWithChildren<Props>>>) {
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
