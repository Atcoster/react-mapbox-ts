import React, { FC } from 'react';
import AppBar from '@/components/layout/AppBar';
import Content from '@/components/layout/Content';
import classes from './index.module.css';

const Wrapper: FC = () => {
	return (
		<div className={classes.wrapper}>
			<AppBar />
			<Content />
		</div>
	);
};

export default Wrapper;
