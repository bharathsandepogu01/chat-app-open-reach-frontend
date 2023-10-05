import React from 'react';
import clsx from 'clsx';
import Text from '@components/Text';
import { IChatUserDetail } from './types';
import classes from './styles.module.scss';
import ProfileIcon from '@public/icons/profile-icon.svg';

function ChatUserDetail(props: IChatUserDetail) {
	return (
		<div
			className={clsx(classes.chatUser, props.isUserSelected && classes.bgColored)}
			role={'button'}
			onClick={() => props.onClickUserDetail()}
		>
			<ProfileIcon className={classes.icon} />
			<Text variant="p" small semiBold customClassName={classes.name}>
				{props.displayName}
			</Text>
		</div>
	);
}

export default ChatUserDetail;
