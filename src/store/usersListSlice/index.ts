import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { IUserDetailsState } from './types';
import { RootState } from '..';
import { MOCK_SERVER_URL } from '@utils/constants';

const initialState: IUserDetailsState = {
	data: [],
	fetchStatus: 'idle',
	fetchError: null,
};

export const fetchUserList = createAsyncThunk('users/fetchDetails', async (searchStr: string) => {
	const url = new URL(MOCK_SERVER_URL + '/users/list');
	url.searchParams.append('search', searchStr);
	const res = await fetch(url);
	const resData = await res.json();
	return resData?.data ?? [];
});

const usersListSlice = createSlice({
	name: 'users',
	initialState: initialState,
	reducers: {
		clearUsersList() {
			return initialState;
		},
	},
	extraReducers(builder) {
		builder
			.addCase(fetchUserList.pending, (state) => {
				state.data = [];
				state.fetchStatus = 'loading';
			})
			.addCase(fetchUserList.fulfilled, (state, action) => {
				state.fetchStatus = 'idle';
				state.data = action.payload;
				state.data.push({
					email: 'bharath.s17@iiits.in',
					firstName: 'John',
					lastName: 'Son',
					pictureURL: null,
					userName: 'johnson_s01',
				});
			})
			.addCase(fetchUserList.rejected, (state, { error }) => {
				state.fetchStatus = 'idle';
				state.fetchError = error.message ?? 'something went wrong while fetching friend list...';
			});
	},
});

export const { clearUsersList } = usersListSlice.actions;

export const getUsersListFromGlobalState = (state: RootState) => state.usersList;

export default usersListSlice.reducer;
