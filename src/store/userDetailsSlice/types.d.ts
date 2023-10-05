import { TStatus } from '@store/types';

export interface IUserDetails {
	userName: string;
	email: string;
	firstName: string;
	lastName: string;
	pictureURL: string;
}

export interface IUserDetailsState {
	data: IUserDetails | null;
	fetchStatus: TStatus;
	fetchError: string | null;
}
