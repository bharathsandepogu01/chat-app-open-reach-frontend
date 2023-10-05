import React from 'react';
import SlideSection from '@components/SlideSection';
import Text from '@components/Text';
import useAuthContext from '@hooks/useAuthContext';
import { useSelector } from 'react-redux';
import { getUserDetailsFromGlobalState } from '@store/userDetailsSlice';
import LogoutIcon from '@public/icons/logout-icon.svg';
import classes from './styles.module.scss';

function ChatListHeader() {
	const { clearTokens } = useAuthContext();
	const [openProfile, setOpenProfile] = React.useState<boolean>(false);

	const { data: userDetails } = useSelector(getUserDetailsFromGlobalState);

	const handleOpenProfile = () => {
		setOpenProfile(!openProfile);
	};

	const handleLogout = () => {
		clearTokens();
	};

	return (
		<header className={classes.container}>
			<button onClick={handleOpenProfile}>
				<img src={userDetails?.pictureURL} className={classes.image} />
			</button>
			<button onClick={handleLogout}>
				<LogoutIcon className={classes.icon} />
			</button>
			{openProfile && (
				<SlideSection
					onClickBackButton={handleOpenProfile}
					header={
						<Text variant="h2" bold>
							Profile
						</Text>
					}
				>
					<main className={classes.profileContentContainer}>
						<img src={userDetails?.pictureURL} alt="user profile image" className={classes.image} />
						<div className={classes.infoContainer}>
							<Text variant="p" secondaryText small>
								Your name
							</Text>
							<Text variant="p" small>{`${userDetails?.firstName ?? ''} ${
								userDetails?.lastName ?? ''
							}`}</Text>
						</div>
						<div className={classes.infoContainer}>
							<Text variant="p" secondaryText small>
								Your email
							</Text>
							<Text variant="p" small>{`${userDetails?.email}`}</Text>
						</div>
					</main>
				</SlideSection>
			)}
		</header>
	);
}

export default ChatListHeader;
