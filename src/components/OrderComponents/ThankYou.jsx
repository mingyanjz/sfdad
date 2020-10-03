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
		var payment = {
			orderID: this.props.orderID,
			firstName: this.props.firstName,
			time: this.props.deliveryTime,
		};

		return ( 
			<ThemeProvider theme={theme}>
				<React.Fragment>
					<Typography variant="h5" gutterBottom>
						{payment.firstName}, thank you for your order.
					</Typography>
					<Typography variant="subtitle1">
						Your order number is {payment.orderID}. The expected delivery time is {payment.time}.
						Please see the UserInfo page for traking detials.
					</Typography>
					<LinearBuffer />
				</React.Fragment>
			</ThemeProvider>
		);
	}
}
 
export default withStyles(useStyles)(ThankYou);