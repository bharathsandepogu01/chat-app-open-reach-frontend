import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
	fetchSelectedUserChatData,
	getSelectedUserChatFromGlobalState,
} from '@store/selectedUserChatSlice';
import Text from '@components/Text';
import classes from './styles.module.scss';
import Fallback from '@components/Fallback';
import { AppDispatch } from '@store/index';

const LazyChatsContainer = React.lazy(() => import('./LazyChatsContainer'));

function ChatsContainer() {
	const {
		data: { selectedUser: selectedUser },
	} = useSelector(getSelectedUserChatFromGlobalState);
	const dispatch = useDispatch<AppDispatch>();

	const selectedUserEmail = selectedUser?.email;

	React.useEffect(() => {
		if (!selectedUserEmail) return;
		dispatch(fetchSelectedUserChatData(selectedUserEmail));
	}, [selectedUserEmail]);

	return (
		<section className={classes.chatsMainContainer}>
			{selectedUser && (
				<React.Suspense fallback={<Fallback />}>
					<LazyChatsContainer selectedUser={selectedUser} key={selectedUser.email} />
				</React.Suspense>
			)}
			{!selectedUser && (
				<div className={classes.welcomeContainer}>
					<Text variant="h2" light large>
						Welcome to Chat App
					</Text>
				</div>
			)}
		</section>
	);
}

export default ChatsContainer;
