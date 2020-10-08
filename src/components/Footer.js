import React, { Component } from 'react'
import Typography from '@material-ui/core/Typography';

class Footer extends Component{
    render() {
        return (
			<div className='App-footer'>
				<Typography variant="h5" color="textSecondary" align="buttom">
					{'Copyright © SF Dispatched 2020.'}
				</Typography>
			</div>
        )
    }
}
export default Footer;