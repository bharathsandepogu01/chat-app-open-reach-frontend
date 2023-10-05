import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IChatListDetails, IChatListSlice } from './types';
import { RootState } from '..';
import {
	getAllMessagedUsersWithRecentTimeStampFromStore,
	getAllUserDetailsFromStore,
} from '@utils/indexedDB';

const initialState: IChatListSlice = {
	data: [],
	fetchStatus: 'idle',
	fetchError: null,
};

export const fetchChatList = createAsyncThunk('chatList/fetchRecentChats', async () => {
	const usersRecentMessagedTimestampMap = await getAllMessagedUsersWithRecentTimeStampFromStore();
	const userDetailsMap = await getAllUserDetailsFromStore();
	const resArray: IChatListDetails[] = [];
	for (const [key, value] of Object.entries(usersRecentMessagedTimestampMap)) {
		resArray.push({
			userDetails: userDetailsMap[key] ?? {
				email: key,
				firstName: key,
				lastName: null,
				pictureURL: null,
				userName: key,
			},
			lastMessageTimestamp: value,
		});
	}
	return resArray;
});

const chatListSlice = createSlice({
	name: 'chatList',
	initialState: initialState,
	reducers: {
		addNewMessage(state, action) {
			const messageDetails = action.payload.messageDetails;

			const userChatDetails = state.data.find(
				(data) => data.userDetails.email === messageDetails?.from
			);

			if (!userChatDetails) {
				const newChatListDetails: IChatListDetails = {
					userDetails: {
						email: messageDetails.from,
						firstName: messageDetails.from,
						lastName: null,
						pictureURL: null,
						userName: messageDetails.from,
					},
					lastMessageTimestamp: messageDetails.timestamp,
				};
				state.data.push(newChatListDetails);
			} else {
				userChatDetails.lastMessageTimestamp = messageDetails.timestamp;
			}
			state.data.sort((a, b) => b.lastMessageTimestamp - a.lastMessageTimestamp);
		},
		addSentMessage(state, action) {
			const messageDetails = action.payload.messageDetails;
			const userChatDetails = state.data.find(
				(data) => data.userDetails.email === messageDetails?.to
			);
			if (!userChatDetails) {
				const newChatListDetails: IChatListDetails = {
					userDetails: { ...action.payload.userDetails },
					lastMessageTimestamp: messageDetails.timestamp,
				};
				state.data.push(newChatListDetails);
			} else {
				userChatDetails.lastMessageTimestamp = messageDetails.timestamp;
			}
			state.data.sort((a, b) => b.lastMessageTimestamp - a.lastMessageTimestamp);
		},
		clearChatList() {
			return initialState;
		},
	},
	extraReducers(builder) {
		builder
			.addCase(fetchChatList.pending, (state) => {
				state.fetchStatus = 'loading';
			})
			.addCase(fetchChatList.fulfilled, (state, action) => {
				state.fetchStatus = 'idle';

				const resData: IChatListDetails[] = action.payload;

				resData.forEach((eachChatData) => {
					state.data.push({
						userDetails: eachChatData.userDetails,
						lastMessageTimestamp: eachChatData.lastMessageTimestamp,
					});
				});

				state.data.sort((a, b) => b.lastMessageTimestamp - a.lastMessageTimestamp);
			})
			.addCase(fetchChatList.rejected, (state, { error }) => {
				state.fetchStatus = 'idle';
				state.fetchError =
					error.message ?? 'something went wrong while fetching chat lust details...';
			});
	},
});

export const getChatListFromGlobalState = (state: RootState) => state.chatList;

export const { addNewMessage, addSentMessage, clearChatList } = chatListSlice.actions;

export default chatListSlice.reducer;
