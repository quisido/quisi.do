import { Component, type PropsWithChildren, type ReactNode } from 'react';

interface State {
  readonly error: Error | null;
}

export default class ErrorBoundary extends Component<PropsWithChildren, State> {
  public static getDerivedStateFromError(err: Error): Pick<State, 'error'> {
    return { error: err };
  }

  public constructor(props: PropsWithChildren) {
    super(props);
    this.state = { error: null };

    this.render = (): ReactNode => {
      if (this.state.error) {
        return (
          <span data-testid="error-boundary-error-message">
            {this.state.error.message}
          </span>
        );
      }

      return this.props.children;
    };
  }
}
