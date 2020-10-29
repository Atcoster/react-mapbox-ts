import React, { FC } from 'react';
import Mapbox from '@/components/Mapbox';
import classes from './index.module.css';

const Content: FC = () => {
	return (
		<div className={classes.root}>
			<Mapbox />
		</div>
	);
};

export default Content;
