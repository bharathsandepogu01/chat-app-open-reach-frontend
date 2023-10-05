import React from 'react';
import clsx from 'clsx';
import classes from './styles.module.scss';
import ChatListContainer from '@components/ChatListContainer';
import ChatsContainer from '@components/ChatsContainer';
import SocketProvider from '@components/SocketProvider';

function Home() {
	return (
		<SocketProvider>
			<main className={clsx(classes.container)}>
				<ChatListContainer />
				<ChatsContainer />
			</main>
		</SocketProvider>
	);
}

export default Home;
