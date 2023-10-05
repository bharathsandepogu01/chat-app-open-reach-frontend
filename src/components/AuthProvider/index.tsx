import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserDetails, getUserDetailsFromGlobalState } from '@store/userDetailsSlice';
import { AppDispatch } from '@store/index';
import { clearRootState } from '@utils/store';
import { IAuthContext, IAuthContextProviderProps } from './types';
import { IUserDetails } from '@store/userDetailsSlice/types';
import { addUserDetailsToStore } from '@utils/indexedDB';
import { clearLocalStorage, getLocalStorage, setLocalStorage } from '@utils/localStorage';
import { USER_EMAIL } from '@utils/constants';

export const AuthContext = React.createContext<IAuthContext>({
	isAuthenticated: false,
	clearTokens: () => {},
	setTokens: () => {},
});

function AuthProvider(props: IAuthContextProviderProps) {
	const [isAuthenticated, setIsAuthenticated] = React.useState<boolean>(false);
	const { data: userDetails } = useSelector(getUserDetailsFromGlobalState);

	const dispatch = useDispatch<AppDispatch>();

	const userEmail = getLocalStorage(USER_EMAIL);

	React.useEffect(() => {
		if (!userEmail) return;
		dispatch(fetchUserDetails(userEmail));
	}, []);

	React.useEffect(() => {
		if (!userDetails?.email) {
			setIsAuthenticated(false);
		} else {
			setIsAuthenticated(true);
		}
	}, [userDetails]);

	const setTokens = async (userDetails: IUserDetails) => {
		try {
			await addUserDetailsToStore(userDetails);
			setLocalStorage(USER_EMAIL, userDetails.email);
			dispatch(fetchUserDetails(userDetails.email));
		} catch (error) {
			console.error('something went wrong in setTokens');
		}
	};

	const clearTokens = () => {
		clearLocalStorage();
		clearRootState();
	};

	const value: IAuthContext = React.useMemo(() => {
		return {
			clearTokens,
			setTokens,
			isAuthenticated,
		};
	}, [isAuthenticated]);

	return <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>;
}

export default AuthProvider;
