import { TStatus } from '@store/types';
import { IUserDetails } from '@store/userDetailsSlice/types';

export interface IUserDetailsState {
	data: IUserDetails[];
	fetchStatus: TStatus;
	fetchError: string | null;
}
