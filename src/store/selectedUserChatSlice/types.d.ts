import { TUserStatus } from '@components/SocketProvider/types';
import { IChatUserDetails, IChatDetails } from '@store/chatListSlice/types';
import { TStatus } from '@store/types';

export interface ISelectedUserDetails extends IChatUserDetails {
	status: TUserStatus | null;
}

export interface ISelectedUserChatDetails {
	selectedUser: ISelectedUserDetails;
	chatData: IChatDetails[];
}

export interface ISelectedUserChatSlice {
	data: ISelectedUserChatDetails;
	fetchStatus: TStatus;
	fetchError: string | null;
}
