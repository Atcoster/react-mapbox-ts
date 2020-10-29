import React, { FC } from 'react';
import AppBarMui from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import classes from './index.module.css';

const AppBar: FC = () => {
	return (
		<AppBarMui position="static" classes={{ root: classes.root }}>
			<Toolbar>App name</Toolbar>
		</AppBarMui>
	);
};

export default AppBar;
