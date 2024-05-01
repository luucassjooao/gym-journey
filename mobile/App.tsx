import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {Router} from './src/routes';
import {AuthProvider} from './src/context/auth';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: true,
      refetchOnWindowFocus: true,
      refetchOnReconnect: true,
      staleTime: 10 * 60 * 1000,
      gcTime: 60 * 60 * 1000,
    },
  },
});

if (__DEV__) {
  import('react-query-native-devtools').then(({addPlugin}) => {
    addPlugin({queryClient});
  });
}

function App(): JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
