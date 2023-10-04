export const getURLQueryStringFromObj = (obj: { [key: string]: string }) => {
	const params = [];
	for (const [key, value] of Object.entries(obj)) {
		const queryStringParam = `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
		params.push(queryStringParam);
	}
	return params.join('&');
};

export const getGoogleOAuthURL = () => {
	const options = {
		redirect_uri: `${process.env.CLIENT_URL}/google-callback`,
		client_id: process.env.GOOGLE_CLIENT_ID,
		access_type: 'offline',
		response_type: 'code',
		prompt: 'consent',
		scope: [
			'https://www.googleapis.com/auth/userinfo.profile',
			'https://www.googleapis.com/auth/userinfo.email',
		].join(' '),
	};

	return `${process.env.GOOGLE_OAUTH_ROOT_URL}?${getURLQueryStringFromObj(options)}`;
};
