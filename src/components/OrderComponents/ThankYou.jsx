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
		var order = {
			orderID : this.props.orderID,
			time: this.props.opions[this.props.optionidx].option.deliveryTime,
		}
		var user = {
			firstName: this.props.user.firstName,
		}
		const { classes } = this.props;

		return ( 
			<ThemeProvider theme={theme}>
				<React.Fragment>
					<Typography variant="h5" gutterBottom>
						{user.firstName}, thank you for your order.
					</Typography>
					<Typography variant="subtitle1">
						Your order number is {order.orderID}. The expected delivery time is {order.time}.
						Please see the UserInfo page for traking detials.
					</Typography>
					<LinearBuffer />
				</React.Fragment>
			</ThemeProvider>
		);
	}
}
 
export default withStyles(useStyles)(ThankYou);