import React from 'react';
import Text from '@components/Text';
import Loader from '@components/Loader';
import GoogleLogo from '@public/images/google-logo.png';
import classes from './styles.module.scss';
import useGoogleLogin from '@hooks/useGoogleLogin';

function Login() {
	const { isLoading, openGoogleOAuthLogin } = useGoogleLogin();

	return (
		<div className={classes.loginContainer}>
			<div className={classes.headingTextContainer}>
				<Text variant={'h1'} bold extraLarge>
					Chat easy, chat instantly wherever you go
				</Text>
				<Text variant={'p'} medium semiBold>
					The easiest and fastest way to chat
				</Text>
				<button onClick={openGoogleOAuthLogin} disabled={isLoading}>
					{!isLoading ? <img src={GoogleLogo} alt={'Google'} /> : <Loader />}
					<Text variant="span">Sign In with Google</Text>
				</button>
			</div>
		</div>
	);
}

export default Login;
