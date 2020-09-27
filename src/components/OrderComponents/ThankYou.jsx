import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { useStyles } from './useStyles';
import theme from '../theme';
import { ThemeProvider } from '@material-ui/core/styles';
import LinearBuffer from './Loading';

class ThankYou extends Component {
	state = {  }

	render() { 
		return ( 
			<ThemeProvider theme={theme}>
					<React.Fragment>
					<Typography variant="h5" gutterBottom>
						Thank you for your order.
					</Typography>
					<Typography variant="subtitle1">
						Your order number is #2001234. The expected delivery time is XXX. 
					</Typography>
					<LinearBuffer />
				</React.Fragment>
			</ThemeProvider>
		);
	}
}
 
export default withStyles(useStyles)(ThankYou);