import { AwsRum } from 'aws-rum-web';
import type { ReactElement, ReactNode } from 'react';
import { PureComponent } from 'react';
import { withAwsRum } from '../../../../modules/aws-rum-react';

interface Props {
  readonly awsRum: AwsRum;
  readonly children: ReactNode;
}

interface State {
  readonly error: Error | null;
}

class ErrorBoundary extends PureComponent<Props, State> {
  public constructor(props: Props) {
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
    const { awsRum } = this.props;
    awsRum.recordError(error);
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

export default withAwsRum(ErrorBoundary);
