import React from 'react';
import Text from '@components/Text';
import IChatsHeader from './types';
import classes from './styles.module.scss';
import ProfileIcon from '@public/icons/profile-icon.svg';

function ChatsHeader(props: IChatsHeader) {
	const { selectedUserDetails } = props;

	return (
		<header className={classes.container}>
			<div className={classes.profileNameWithIcon}>
				<ProfileIcon className={classes.icon} />
				<Text variant="p" small bold customClassName={classes.name}>{`${
					selectedUserDetails.firstName ?? ''
				} ${selectedUserDetails.lastName ?? ''}`}</Text>
			</div>
		</header>
	);
}

export default ChatsHeader;
