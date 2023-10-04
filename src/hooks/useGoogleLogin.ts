import { getGoogleOAuthURL } from '@utils/googleOAuth';
import React from 'react';
import useAuthContext from './useAuthContext';

function useGoogleLogin() {
	const [state, setState] = React.useState({
		isLoading: false,
		error: null,
		data: null,
	});

	const { setTokens } = useAuthContext();

	const childWindowRef = React.useRef<Window>();
	const intervalId = React.useRef<number | null>(null);

	React.useEffect(() => {
		const messageEventCallback = function (e: MessageEvent<Window>) {
			if (!(e.origin === process.env.CLIENT_URL && e.source === childWindowRef.current)) return;
			const callbackData: unknown = e.data;
			const typedCallbackData = callbackData as {
				code: string | undefined;
				error: string | undefined;
			};
			if (!typedCallbackData.code || typedCallbackData.error) {
				setState((prevState) => {
					return {
						...prevState,
						isLoading: false,
						data: null,
						error: 'error in getting google code, please try again',
					};
				});
			} else {
				getGoogleUserInfo(typedCallbackData.code);
			}
		};
		window.addEventListener('message', messageEventCallback);

		return () => {
			window.removeEventListener('message', messageEventCallback);
		};
	}, []);

	const openGoogleOAuthChildWindow = () => {
		setState((prevState) => {
			return { ...prevState, isLoading: true, data: null, error: null };
		});

		const url = getGoogleOAuthURL();

		childWindowRef.current = window.open(url, 'GOOGLE_POP_UP');

		intervalId.current = window.setInterval(() => {
			if (!childWindowRef.current?.closed) return;
			setState((prevState) => {
				return { ...prevState, isLoading: false };
			});
			clearInterval(intervalId.current);
		}, 500);
	};

	const getGoogleUserInfo = async (code: string) => {
		const getAccessTokenRes = await fetch(process.env.GOOGLE_TOKEN_URL, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				code,
				client_id: process.env.GOOGLE_CLIENT_ID,
				client_secret: process.env.GOOGLE_CLIENT_SECRET,
				redirect_uri: `${process.env.CLIENT_URL}/google-callback`,
				grant_type: 'authorization_code',
			}),
		});
		if (!getAccessTokenRes.ok) {
			setState((prevState) => {
				return {
					...prevState,
					error: 'unable to get access token from google, please try again',
					isLoading: false,
				};
			});
			return;
		}
		const jsonText = await getAccessTokenRes.text();
		const { access_token } = JSON.parse(jsonText);
		const fetchUserInfoRes = await fetch(
			`${process.env.GOOGLE_USER_INFO_URL}?alt=json&access_token=${access_token}`
		);
		if (!fetchUserInfoRes.ok) {
			setState((prevState) => {
				return {
					...prevState,
					error: 'unable to get under info from google, please try again',
					isLoading: false,
				};
			});
			return;
		}
		const userInfo = await fetchUserInfoRes.json();
		const resultToStore = {
			userName: userInfo.name,
			email: userInfo.email,
			firstName: userInfo.given_name,
			lastName: userInfo.family_name,
			pictureURL: userInfo.picture,
		};
		setState((prevState) => {
			return {
				...prevState,
				data: resultToStore,
				isLoading: false,
				error: null,
			};
		});
		setTokens(resultToStore);
	};

	return {
		...state,
		openGoogleOAuthLogin: openGoogleOAuthChildWindow,
	};
}

export default useGoogleLogin;
