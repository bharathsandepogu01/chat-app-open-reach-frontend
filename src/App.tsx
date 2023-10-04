import React from 'react';
import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
	RouterProvider,
	redirect,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import RootLayout from './components/RootLayout';
import GoogleCallback from '@components/GoogleCallback';
import AuthProvider from '@components/AuthProvider';
import '@styles/globals.scss';

const appRouter = createBrowserRouter(
	createRoutesFromElements(
		<>
			<Route index path="/" element={<RootLayout />} />
			<Route path="/google-callback" element={<GoogleCallback />} />
			<Route path="*" loader={() => redirect('/')} />
		</>
	)
);

function App(): JSX.Element {
	return (
		<Provider store={store}>
			<AuthProvider>
				<RouterProvider router={appRouter} />
			</AuthProvider>
		</Provider>
	);
}

export default App;
