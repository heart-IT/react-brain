import { QueryClientProvider, useQuery } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';
export function App() {
  const { data } = useQuery({ queryKey: ['feed'], queryFn: getFeed });
  return <ErrorBoundary fallback={<p>failed</p>}><Feed items={data} /></ErrorBoundary>;
}
