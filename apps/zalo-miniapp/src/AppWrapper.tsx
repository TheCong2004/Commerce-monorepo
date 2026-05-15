import { App, ZMPRouter, AnimationRoutes, SnackbarProvider, Route } from 'zmp-ui';
import { QueryClientProvider, QueryClient } from '@commerce/shared-hooks';
import MainApp from './MainApp';

const queryClient = new QueryClient();

const AppWrapper = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <App>
        <SnackbarProvider>
          <MainApp />
        </SnackbarProvider>
      </App>
    </QueryClientProvider>
  );
}

export default AppWrapper;
