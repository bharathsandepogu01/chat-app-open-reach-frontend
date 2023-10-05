import React from 'react';
import SearchBar from '@components/SearchBar';
import Text from '@components/Text';
import EmptyBox from '@public/icons/empty-box.svg';
import classes from './styles.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserList, getUsersListFromGlobalState } from '@store/usersListSlice';
import { AppDispatch } from '@store/index';
import ChatUserDetail from '../ChatUserDetail';
import Loader from '@components/Loader';
import { IUserDetails } from '@store/userDetailsSlice/types';
import {
	getSelectedUserChatFromGlobalState,
	setSelectedUserChatDetails,
} from '@store/selectedUserChatSlice';
import { fetchChatList, getChatListFromGlobalState } from '@store/chatListSlice';
import { addUserDetailsToStore } from '@utils/indexedDB';

function ChatListContent() {
	const [searchMode, setSearchMode] = React.useState<boolean>(false);

	const { data: usersList, fetchStatus: userListFetchStatus } = useSelector(
		getUsersListFromGlobalState
	);
	const { data: chatListData } = useSelector(getChatListFromGlobalState);
	const {
		data: { selectedUser: selectedChatUser },
	} = useSelector(getSelectedUserChatFromGlobalState);
	const dispatch = useDispatch<AppDispatch>();

	React.useEffect(() => {
		dispatch(fetchChatList());
	}, []);

	const handleSearch = (str: string) => {
		setSearchMode(true);
		dispatch(fetchUserList(str));
	};

	const handleOnclickUser = async (userDetails: IUserDetails) => {
		try {
			dispatch(setSelectedUserChatDetails({ selectedUser: userDetails }));
			await addUserDetailsToStore(userDetails);
		} catch (error) {
			console.error(error);
		}
	};

	const handleOnClickChatUser = (userDetails: IUserDetails) => {
		dispatch(setSelectedUserChatDetails({ selectedUser: userDetails }));
	};

	const isLoadingUsersList = userListFetchStatus === 'loading';
	const showNoSearchResults = usersList.length === 0 && !isLoadingUsersList;
	const showEmptyChatList = !searchMode && chatListData.length === 0;
	const showChatList = !searchMode && chatListData.length > 0;

	return (
		<div className={classes.container} role="region" aria-label="Chat List Box with Search Bar">
			<SearchBar
				onSearch={handleSearch}
				onCancelSearch={() => {
					setSearchMode(false);
				}}
			/>
			{searchMode && (
				<div className={classes.searchResultContainer}>
					{showNoSearchResults && (
						<Text variant="p" small>
							No friends or chats found...
						</Text>
					)}
					{isLoadingUsersList && (
						<div className={classes.loaderContainer}>
							<Loader />
						</div>
					)}
					{!showNoSearchResults &&
						usersList.map((user) => {
							const displayName = `${user?.firstName ?? ''} ${user?.lastName ?? ''}`;
							return (
								<ChatUserDetail
									key={user?.email}
									displayName={displayName}
									onClickUserDetail={() => {
										handleOnclickUser(user);
									}}
									pictureUrl={user.pictureURL}
								/>
							);
						})}
				</div>
			)}

			{showEmptyChatList && (
				<div className={classes.noRecentChatsContainer}>
					<EmptyBox className={classes.icon} />
					<Text variant="p" small secondaryText>
						No recent chats found...
					</Text>
				</div>
			)}

			{showChatList && (
				<div className={classes.usersChatListContainer}>
					{chatListData.map((chatData) => {
						const { userDetails: user } = chatData;
						const displayName = `${user?.firstName ?? ''} ${user?.lastName ?? ''}`;
						return (
							<ChatUserDetail
								key={user?.email}
								displayName={displayName}
								onClickUserDetail={() => {
									handleOnClickChatUser(user);
								}}
								pictureUrl={user.pictureURL}
								isUserSelected={selectedChatUser?.email === user?.email}
							/>
						);
					})}
				</div>
			)}
		</div>
	);
}

export default ChatListContent;
