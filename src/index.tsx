import React from 'react';
import ReactDOM from 'react-dom';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red';
import orange from '@material-ui/core/colors/orange';
import yellow from '@material-ui/core/colors/yellow';
import Header from './components/layout/Header';
import Drawer from './components/layout/Drawer';
import Footer from './components/layout/Footer';
import './index.css';

const theme = createMuiTheme({
	palette: {
		primary: {
			// light: will be calculated from palette.primary.main,
			main: blue[500],
			// dark: will be calculated from palette.primary.main,
			// contrastText: will be calculated to contrast with palette.primary.main
		},
		secondary: {
			main: purple[500],
		},
		error: {
			main: red[500],
		},
		warning: {
			main: orange[500],
		},
		info: {
			main: yellow[500],
		},
		success: {
			main: green[500],
		},
		// Used by `getContrastText()` to maximize the contrast between the background and the text.
		contrastThreshold: 3,
		// Used by the functions below to shift a color's luminance by approximately
		// two indexes within its tonal palette.
		// E.g., shift from Red 500 to Red 300 or Red 700.
		tonalOffset: 0.2,
	},
});

ReactDOM.render(
	<React.StrictMode>
		<ThemeProvider theme={theme}>
			<Header />
			<Drawer />
			<Footer />
		</ThemeProvider>
	</React.StrictMode>,
	document.getElementById('root')
);
