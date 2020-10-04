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
		var { orderID } = this.props;
		console.log(orderID);
		console.log(typeof orderID);
		var { options } = this.props;
		console.log(options);
		console.log(typeof options);
		var { optionIdx } = this.props;

		const { classes } = this.props;

		
		return ( 
			<ThemeProvider theme={theme}>
				<React.Fragment>
					<Typography variant="h5" gutterBottom align='left'>
						Thank you for your order.
					</Typography>
					<Typography variant="subtitle1" align='left'>
						Your order number is {this.props.orderID["Your order id"]}. The expected delivery time is {options[optionIdx].deliveryTime}.
						Please see the UserInfo page for tracking details.
					</Typography>
					<LinearBuffer />
				</React.Fragment>
			</ThemeProvider>
		);
	}
}
 
export default withStyles(useStyles)(ThankYou);