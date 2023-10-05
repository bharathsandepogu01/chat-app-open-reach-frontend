import React from 'react';
import ChatListHeader from './ChatListHeader/index';
import ChatListContent from './ChatListContent';
import classes from './styles.module.scss';

function ChatListContainer() {
	return (
		<section className={classes.chatsListMainContainer}>
			<ChatListHeader />
			<ChatListContent />
		</section>
	);
}

export default ChatListContainer;
