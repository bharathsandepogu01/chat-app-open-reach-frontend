import React from 'react';
import clsx from 'clsx';
import { ILoaderProps } from './types';
import classes from './styles.module.scss';

function Loader(props: ILoaderProps) {
	return <div className={clsx(classes.loader, props.mini && classes.smallLoader)} />;
}

export default Loader;
