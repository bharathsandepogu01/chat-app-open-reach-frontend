import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { IUserDetailsState } from './types';
import { RootState } from '..';
import { getUserDetailsFromStore } from '@utils/indexedDB';

const initialState: IUserDetailsState = {
	data: null,
	fetchStatus: 'idle',
	fetchError: null,
};

export const fetchUserDetails = createAsyncThunk('user/fetchDetails', async (email: string) => {
	const data = await getUserDetailsFromStore(email);
	console.log(data);
	return data;
});

const userDetailsSlice = createSlice({
	name: 'user',
	initialState: initialState,
	reducers: {
		clearUserDetails() {
			return initialState;
		},
	},
	extraReducers(builder) {
		builder
			.addCase(fetchUserDetails.pending, (state) => {
				state.fetchStatus = 'loading';
			})
			.addCase(fetchUserDetails.fulfilled, (state, action) => {
				state.fetchStatus = 'idle';
				state.data = action.payload;
			})
			.addCase(fetchUserDetails.rejected, (state, { error }) => {
				state.fetchStatus = 'idle';
				state.fetchError = error.message ?? 'something went wrong while fetching user details...';
			});
	},
});

export const { clearUserDetails } = userDetailsSlice.actions;

export const getUserDetailsFromGlobalState = (state: RootState) => state.userDetails;

export default userDetailsSlice.reducer;
