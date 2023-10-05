import React, { PropsWithChildren } from 'react';

export interface ISlideSectionProps extends PropsWithChildren {
	onClickBackButton?: () => void;
	header?: React.JSX.Element | string;
}
