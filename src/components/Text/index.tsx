import React from 'react';
import clsx from 'clsx';
import classes from './styles.module.scss';
import ITextProps from './types';

function Text(props: ITextProps) {
	const classNames = clsx(
		classes.commonTextStyles,
		props.tiny && classes.tiny,
		props.extraSmall && classes.extraSmall,
		props.small && classes.small,
		props.medium && classes.medium,
		props.extraMedium && classes.extraMedium,
		props.large && classes.large,
		props.extraLarge && classes.extraLarge,
		props.secondaryText && classes.secondaryText,
		props.primaryColor && classes.primaryColor,
		props.bold && classes.bold,
		props.semiBold && classes.semiBold,
		props.light && classes.light,
		props.customClassName
	);

	const Text = props.variant;

	return <Text className={classNames}>{props.children}</Text>;
}

export default Text;
