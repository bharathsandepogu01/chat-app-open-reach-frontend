import React from 'react';
import Loader from '@components/Loader';
import classes from './styles.module.scss';

function Fallback() {
	return (
		<div className={classes.container}>
			<Loader />
		</div>
	);
}

export default Fallback;
