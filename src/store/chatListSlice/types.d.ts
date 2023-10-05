import { TStatus } from '@store/types';
import { IUserDetails } from '@store/userDetailsSlice/types';

export interface IChatDetails {
	from: string;
	to: string;
	timestamp: number;
	content: string;
	id: string;
}

export interface IChatDetailsIndexedDB extends IChatDetails {
	otherUser: string;
}

export interface IChatUserDetails extends IUserDetails {}

export interface IChatListDetails {
	userDetails: IChatUserDetails | null;
	lastMessageTimestamp: number;
}

export interface IChatListSlice {
	data: IChatListDetails[];
	fetchStatus: TStatus;
	fetchError: string | null;
}

export interface IChatListApiResponse {
	userDetails: IChatUserDetails;
	lastMessageTimestamp: number;
}
