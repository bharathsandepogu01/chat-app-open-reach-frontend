import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ISelectedUserChatSlice } from './types';
import { RootState } from '..';
import { getUserMessagesFromStore } from '@utils/indexedDB';

const initialState: ISelectedUserChatSlice = {
	data: {
		chatData: [],
		selectedUser: null,
	},
	fetchError: null,
	fetchStatus: 'idle',
};

export const fetchSelectedUserChatData = createAsyncThunk(
	'selectedUserChat/fetchChatData',
	async (email: string) => {
		const resData = await getUserMessagesFromStore(email);
		return resData;
	}
);

const selectedUserChatSlice = createSlice({
	name: 'selectedUserChat',
	initialState: initialState,
	reducers: {
		setSelectedUserChatDetails: (state, action) => {
			state.data.selectedUser = action.payload.selectedUser;
		},
		addMessageToChatData: (state, action) => {
			state.data.chatData.push(action.payload.messageDetails);
		},
		clearSelectedUser() {
			return initialState;
		},
	},
	extraReducers(builder) {
		builder
			.addCase(fetchSelectedUserChatData.pending, (state) => {
				state.fetchStatus = 'loading';
			})
			.addCase(fetchSelectedUserChatData.fulfilled, (state, action) => {
				state.fetchStatus = 'idle';
				state.data.chatData = action.payload;
			})
			.addCase(fetchSelectedUserChatData.rejected, (state, { error }) => {
				state.fetchStatus = 'idle';
				state.fetchError = error.message ?? 'something went wrong while fetching user details...';
			});
	},
});

export const getSelectedUserChatFromGlobalState = (state: RootState) => state.selectedUserChat;

export const { setSelectedUserChatDetails, addMessageToChatData, clearSelectedUser } =
	selectedUserChatSlice.actions;

export default selectedUserChatSlice.reducer;
