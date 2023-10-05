import React, { useCallback } from 'react';
import { io } from 'socket.io-client';
import { v4 as uuidv4 } from 'uuid';
import { IPrivateMessage, IReceiveMessage, ISocketContext, ISocketProviderProps } from './types';
import { useDispatch, useSelector } from 'react-redux';
import {
	addMessageToChatData,
	getSelectedUserChatFromGlobalState,
} from '@store/selectedUserChatSlice';
import { getUserDetailsFromGlobalState } from '@store/userDetailsSlice';
import { addNewMessage, addSentMessage } from '@store/chatListSlice';
import { getLocalStorage } from '@utils/localStorage';
import { USER_EMAIL } from '@utils/constants';
import { IChatDetailsIndexedDB } from '@store/chatListSlice/types';
import { addMessageToStore } from '@utils/indexedDB';

export const SocketContext = React.createContext<ISocketContext>({
	sendPrivateMessage: () => {},
	disconnectSocket: () => {},
});

function SocketProvider(props: ISocketProviderProps) {
	const [socket, setSocket] = React.useState(null);

	const {
		data: { selectedUser: selectedChatUser },
	} = useSelector(getSelectedUserChatFromGlobalState);
	const userDetails = useSelector(getUserDetailsFromGlobalState).data;

	const dispatch = useDispatch();

	React.useEffect(() => {
		const newSocket = io(process.env.SERVER_URL, { autoConnect: false });
		setSocket(newSocket);
	}, []);

	React.useEffect(() => {
		if (!socket) return;

		const userEmail = getLocalStorage(USER_EMAIL);

		socket.auth = {
			email: userEmail,
		};

		socket.connect();

		const errorCallback = () => {
			console.error('unable to connect to server via sockets');
		};

		socket.on('connect_error', errorCallback);

		return () => {
			socket?.off('connect_error', errorCallback);
			socket?.disconnect();
		};
	}, [socket]);

	const sendPrivateMessage = useCallback(
		async (content: string) => {
			const privateMessageObj: IPrivateMessage = {
				id: uuidv4(),
				content,
				from: userDetails?.email,
				to: selectedChatUser?.email,
				timestamp: Date.now(),
			};

			// sending private message via sockets

			socket.emit('privateMessage', privateMessageObj, (err: Error, response: string) => {
				if (err) {
					console.error('something went wrong to send message');
				} else {
					console.log(response);
				}
			});

			dispatch(
				addSentMessage({
					messageDetails: { ...privateMessageObj },
					userDetails: { ...selectedChatUser },
				})
			);

			// updating indexedDB store

			const otherUser =
				userDetails.email === privateMessageObj.from
					? privateMessageObj.to
					: privateMessageObj.from;

			const messageToStore: IChatDetailsIndexedDB = { ...privateMessageObj, otherUser: otherUser };

			try {
				await addMessageToStore(messageToStore);
			} catch (error) {
				console.error(error);
			}

			// updating local global state

			if (selectedChatUser.email !== privateMessageObj.to) return;

			dispatch(addMessageToChatData({ messageDetails: { ...privateMessageObj } }));
		},
		[socket, selectedChatUser, userDetails, dispatch]
	);

	React.useEffect(() => {
		if (!socket) return;

		const receivePrivateMessageCallback = async (messageObj: IReceiveMessage) => {
			// receiving private message via sockets
			dispatch(
				addNewMessage({
					messageDetails: { ...messageObj },
				})
			);

			// updating indexedDB store

			const otherUser = userDetails.email === messageObj.to ? messageObj.from : messageObj.to;

			const messageToStore: IChatDetailsIndexedDB = { ...messageObj, otherUser: otherUser };

			try {
				await addMessageToStore(messageToStore);
			} catch (error) {
				console.log(error);
			}

			// updating local global state

			if (selectedChatUser?.email !== messageObj.from) return;

			dispatch(addMessageToChatData({ messageDetails: { ...messageObj } }));
		};

		socket.on('privateMessage', receivePrivateMessageCallback);

		return () => {
			socket?.off('privateMessage', receivePrivateMessageCallback);
		};
	}, [socket, selectedChatUser, dispatch, userDetails]);

	const disconnectSocket = useCallback(() => {
		socket.disconnect();
	}, [socket]);

	const value = React.useMemo(() => {
		return {
			sendPrivateMessage,
			disconnectSocket,
		};
	}, [sendPrivateMessage, disconnectSocket]);

	return <SocketContext.Provider value={value}>{props.children}</SocketContext.Provider>;
}

export default SocketProvider;
