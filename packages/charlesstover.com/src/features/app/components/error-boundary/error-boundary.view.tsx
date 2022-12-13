import { AwsRum } from 'aws-rum-web';
import type { ErrorInfo, ReactElement, ReactNode } from 'react';
import { Component } from 'react';
import { withAwsRum } from '../../../../modules/aws-rum-react';

interface Props {
  readonly awsRum: AwsRum;
  readonly children: ReactNode;
}

interface State {
  readonly error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  public constructor(props: Props) {
    super(props);
    this.state = {
      error: null,
    };
  }

  public componentDidCatch(error: Error, _errorInfo: ErrorInfo): void {
    this.props.awsRum.recordError(error);
  }

  public render(): ReactElement {
    if (this.state.error !== null) {
      return <>{this.state.error.message}</>;
    }
    return <>{this.props.children}</>;
  }
}

export default withAwsRum(ErrorBoundary);
