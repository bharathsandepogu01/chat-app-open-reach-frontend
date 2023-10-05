import React, { useEffect } from 'react';
import clsx from 'clsx';
import { ISlideSectionProps } from './types';
import CancelIcon from '@public/icons/cancel-icon.svg';
import classes from './styles.module.scss';

function SlideSection({ onClickBackButton, header, children }: ISlideSectionProps) {
	const [slideIn, setSlideIn] = React.useState<boolean>(false);

	useEffect(() => {
		setSlideIn(true);
	}, []);

	const handleSlideOut = () => {
		setSlideIn(false);
		setTimeout(() => {
			onClickBackButton && onClickBackButton();
		}, 300);
	};

	return (
		<section
			className={clsx(
				classes.container,
				classes.containerLeft,
				classes.containerAbsolute,
				slideIn && classes.slideInContainer
			)}
		>
			{onClickBackButton && (
				<header>
					<button onClick={handleSlideOut}>
						<CancelIcon className={classes.icon} />
					</button>
					{header && header}
				</header>
			)}
			{children}
		</section>
	);
}

export default SlideSection;
