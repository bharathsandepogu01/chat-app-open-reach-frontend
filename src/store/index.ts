import { configureStore } from '@reduxjs/toolkit';
import userSlice from './userDetailsSlice';
import usersListSlice from './usersListSlice';
import chatListSlice from './chatListSlice';
import selectedUserChatSlice from './selectedUserChatSlice/index';

export const store = configureStore({
	reducer: {
		userDetails: userSlice,
		usersList: usersListSlice,
		chatList: chatListSlice,
		selectedUserChat: selectedUserChatSlice,
	},
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
