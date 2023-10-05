import React from 'react';
import SendIcon from '@public/icons/send-icon.svg';
import classes from './styles.module.scss';
import useSocketContext from '@hooks/useSocketContext';
import { useSelector } from 'react-redux';
import { getSelectedUserChatFromGlobalState } from '@store/selectedUserChatSlice';

function ChatsFooter() {
	const [inputData, setInputData] = React.useState('');
	const { sendPrivateMessage } = useSocketContext();
	const {
		data: { selectedUser: selectedChatUser },
	} = useSelector(getSelectedUserChatFromGlobalState);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputData(e.target.value);
	};

	const sendMessage = () => {
		const data = inputData.trim();
		if(!data) return;
		sendPrivateMessage(inputData);
		setInputData('');
	};

	const handleClick = () => {
		sendMessage();
	};

	const handleKeyBoardInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key !== 'Enter') return;
		sendMessage();
	};

	React.useEffect(() => {
		return () => {
			setInputData('');
		};
	}, [selectedChatUser.email]);

	return (
		<footer className={classes.container}>
			<input
				className={classes.input}
				placeholder={'Type a message'}
				value={inputData}
				onChange={handleChange}
				onKeyDown={handleKeyBoardInput}
			/>
			<button
				className={classes.sendButton}
				disabled={inputData.length === 0}
				onClick={handleClick}
			>
				<SendIcon className={classes.icon} />
			</button>
		</footer>
	);
}

export default ChatsFooter;
