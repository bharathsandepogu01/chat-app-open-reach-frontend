import React from 'react';
import { useLocation } from 'react-router-dom';
import Loader from '@components/Loader';
import classes from './styles.module.scss';
import Text from '@components/Text';

function GoogleCallback() {
	const location = useLocation();

	React.useEffect(() => {
		const searchParams = new URLSearchParams(location.search);
		if (!window.opener) return;
		window.opener.postMessage(
			{
				code: searchParams.get('code'),
				error: searchParams.get('error'),
			},
			process.env.CLIENT_URL
		);
		window.close();
	}, []);

	return (
		<main className={classes.callbackContainer}>
			<Loader />
			<Text variant="h1" extraMedium bold>
				Authentication in process
			</Text>
			<Text variant="p" secondaryText>
				If it is taking more time, please close the window and try again...
			</Text>
		</main>
	);
}

export default GoogleCallback;
