import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import Dashboard from './pages/Dashboard';
import { ReduxProvider } from './redux/provider';

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
		},
	},
});

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<ReduxProvider>
				<Dashboard />
			</ReduxProvider>
		</QueryClientProvider>
	);
}

export default App;
