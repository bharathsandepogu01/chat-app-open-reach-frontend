import { PropsWithChildren } from 'react';
import { IUserDetails } from '@store/userDetailsSlice/types';

export interface IAuthContext {
	isAuthenticated: boolean;
	setTokens: (userDetails: IUserDetails) => void;
	clearTokens: () => void;
}

export interface IAuthContextProviderProps extends PropsWithChildren {}
