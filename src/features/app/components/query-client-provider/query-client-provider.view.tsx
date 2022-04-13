import type { ReactElement, ReactNode } from 'react';
import { QueryClientProvider as ReactQueryClientProvider } from 'react-query';
import QUERY_CLIENT from '../../../../constants/query-client';

// Fix for `QueryClientProvider` being incorrectly defined.
// https://github.com/tannerlinsley/react-query/issues/3476
declare module 'react-query/types/react/QueryClientProvider' {
  interface QueryClientProviderProps {
    readonly children?: ReactNode;
  }
}

interface Props {
  readonly children: ReactNode;
}

export default function QueryClientProvider({ children }: Props): ReactElement {
  return (
    <ReactQueryClientProvider client={QUERY_CLIENT}>
      {children}
    </ReactQueryClientProvider>
  );
}
