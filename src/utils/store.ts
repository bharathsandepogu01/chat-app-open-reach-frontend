import { store } from '@store/index';
import { clearChatList } from '@store/chatListSlice';
import { clearSelectedUser } from '@store/selectedUserChatSlice';
import { clearUserDetails } from '@store/userDetailsSlice';
import { clearUsersList } from '@store/usersListSlice';

export function clearRootState() {
	const dispatch = store.dispatch;

	// clear all redux state slices
	dispatch(clearChatList());
	dispatch(clearSelectedUser());
	dispatch(clearUsersList());
	dispatch(clearUserDetails());
}
