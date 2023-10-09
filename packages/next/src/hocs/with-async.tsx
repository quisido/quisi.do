import { type ComponentType, type ReactElement } from 'react';
import type Optional from '../types/optional';

interface AsyncProps {
  readonly error?: string | undefined;
  readonly initiated: boolean;
  readonly loading: boolean;
}

interface ErrorProps {
  readonly children: string;
}

export default function withAsync<T extends object>(
  UninitiatedComponent: ComponentType,
  LoadingComponent: ComponentType,
  ErrorComponent: ComponentType<ErrorProps>,
  Component: ComponentType<T>,
): ComponentType<AsyncProps & Optional<T>> {
  return function AsyncComponent({
    initiated,
    error,
    loading,
    ...props
  }: AsyncProps & Optional<T>): ReactElement {
    if (!initiated) {
      return <UninitiatedComponent />;
    }

    if (typeof error !== 'undefined') {
      return <ErrorComponent>{error}</ErrorComponent>;
    }

    if (loading) {
      return <LoadingComponent />;
    }

    // Technical debt: We accept `Partial<T>` but pass on the assumption of `T`.
    //   This is because TypeScript cannot maintain the exclusivity of the
    //   `AsyncState` state machine, such that `T` must exist if the machine is
    //   initiated, not loading, and not in error. However, this means that
    //   required props can be missing, since we override it here.
    // Omit<AsyncProps & Partial<T>, "initiated" | "error" | "loading">' is
    //   assignable to the constraint of type 'T', but 'T' could be instantiated
    //   with a different subtype of constraint '{}'.
    return <Component {...(props as unknown as T)} />;
  };
}
