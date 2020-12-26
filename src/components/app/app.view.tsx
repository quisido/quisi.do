import { ReactElement } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import Home from '../../components/home';
import Packages from '../../components/packages';
import Publications from '../../components/publications';
import Quotes from '../../components/quotes';

const queryClient: QueryClient = new QueryClient();

export default function App(): ReactElement {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Switch>
          <Route component={Packages} path="/packages" />
          <Route component={Publications} path="/publications" />
          <Route component={Quotes} path="/quotes" />
          <Route component={Home} />
        </Switch>
      </QueryClientProvider>
    </BrowserRouter>
  );
}
