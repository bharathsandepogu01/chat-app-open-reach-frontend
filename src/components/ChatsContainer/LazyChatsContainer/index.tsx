import React from 'react';
import ChatsHeader from '../ChatsHeader';
import ChatsContent from '../ChatsContent';
import ChatsFooter from '../ChatsFooter';
import classes from './styles.module.scss';
import { ILazyLoadContainerProps } from './types';

function LazyChatsContainer({ selectedUser }: ILazyLoadContainerProps) {
	return (
		<>
			<div role="region" aria-label="chat content" className={classes.contentLayout}>
				<ChatsHeader selectedUserDetails={selectedUser} />
				<ChatsContent key={selectedUser.email} />
				<ChatsFooter />
			</div>
		</>
	);
}

export default LazyChatsContainer;
