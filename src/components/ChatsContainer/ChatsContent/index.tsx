import React from 'react';
import clsx from 'clsx';
import { useSelector } from 'react-redux';
import Text from '@components/Text';
import { getSelectedUserChatFromGlobalState } from '@store/selectedUserChatSlice';
import { getUserDetailsFromGlobalState } from '@store/userDetailsSlice';
import { getChatDateDisplayText, getIsTimeOfDiffDays, getTimeFormatFromUTC } from '@utils/date';
import classes from './styles.module.scss';

function ChatsContent() {
	const {
		data: { chatData },
	} = useSelector(getSelectedUserChatFromGlobalState);
	const userDetails = useSelector(getUserDetailsFromGlobalState).data;
	const recentEleRef = React.useRef<HTMLDivElement>();

	const recentMessageId = React.useMemo(() => {
		return chatData[chatData.length - 1]?.id;
	}, [chatData]);

	React.useLayoutEffect(() => {
		recentEleRef.current?.scrollIntoView({ behavior: 'instant' });
	}, [recentMessageId]);

	return (
		<div className={classes.mainContainer} role="region" aria-label="person's chat data">
			<div className={classes.container}>
				{chatData.map((chat, index) => {
					const isSameUserSent = userDetails.email === chat.from;
					const timeDisplayText = getTimeFormatFromUTC(chat.timestamp);
					const dateDayDisplayText = getChatDateDisplayText(chatData[index + 1]?.timestamp);
					const isTimeOfDiffDays = getIsTimeOfDiffDays(
						chat.timestamp,
						chatData[index + 1]?.timestamp ?? chat.timestamp
					);
					const isRecentMessage = index === chatData.length - 1;
					return (
						<div
							key={chat.id}
							ref={(el) => {
								if (isRecentMessage) {
									recentEleRef.current = el;
								}
							}}
						>
							<div
								className={clsx(
									classes.chatContentContainer,
									isSameUserSent && classes.chatContainerColored
								)}
							>
								<Text
									variant="p"
									small
									customClassName={clsx(classes.content, isSameUserSent && classes.contentColored)}
								>
									{chat.content}
								</Text>
								<Text
									variant="p"
									extraSmall
									secondaryText
									customClassName={classes.timeIconContainer}
								>
									{timeDisplayText}
								</Text>
							</div>
							{!isTimeOfDiffDays && (
								<div className={classes.daySeparator}>
									<Text variant="p" secondaryText bold extraSmall>
										{dateDayDisplayText}
									</Text>
								</div>
							)}
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default ChatsContent;
