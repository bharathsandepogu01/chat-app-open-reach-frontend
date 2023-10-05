import { PropsWithChildren } from 'react';

type TVariant = 'p' | 'span' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

export default interface ITextProps extends PropsWithChildren {
	tiny?: boolean;
	extraSmall?: boolean;
	small?: boolean;
	medium?: boolean;
	extraMedium?: boolean;
	large?: boolean;
	extraLarge?: boolean;
	secondaryText?: boolean;
	primaryColor?: boolean;
	bold?: boolean;
	semiBold?: boolean;
	light?: boolean;
	customClassName?: string;
	variant: TVariant;
}
