import React from 'react';
import classes from './styles.module.scss';
import useAuthContext from '@hooks/useAuthContext';
import Fallback from '@components/Fallback';

const Login = React.lazy(() => import('@components/Login'));
// const Home = React.lazy(() => import('@components/Home'));

function RootLayout(): JSX.Element {
	const { isAuthenticated } = useAuthContext();

	return (
		<div className={classes.appContainer} role="application" aria-label="application main layout">
			{isAuthenticated ? (
				<React.Suspense fallback={<Fallback />}>
					{/* <Home /> */}
					<section>{'Home Page'}</section>
				</React.Suspense>
			) : (
				<React.Suspense fallback={<Fallback />}>
					<Login />
				</React.Suspense>
			)}
		</div>
	);
}

export default RootLayout;
