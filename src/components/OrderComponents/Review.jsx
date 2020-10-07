import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { useStyles } from './useStyles';
import { withStyles } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from '../theme';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';

class Review extends Component {

  getOrder = () => {
    var { options } = this.props;
    var { optionIdx } = this.props;
    var optionID = options[optionIdx].option.id;
    var email = this.props.user.email;
    console.log(email);
    console.log(optionID);
    fetch('http://18.191.48.223/dispatchDeliveryBackend/Login/order/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        optionID: optionID,
        email: email
      })
    })
      .then(res => {return res.json()})
      .then(orderID => {
        this.props.onPaymentPayChange(orderID);
      })
      .then(data => console.log("orderid" + this.props.orderID))
      .then(data => this.props.onNext());
  }

  render() {
    var { options } = this.props;
    var { optionIdx } = this.props;

    // var order = {

    // };

    // console.log(order);
    // console.log(order.optionID);
    // console.log()

    const { classes } = this.props;
    return (
      <ThemeProvider theme={theme}>
        <React.Fragment>
          <Typography variant="h6" gutterBottom align='left'>
            Order Summary
          </Typography>
            <Table className={classes.table} aria-label="simple table">
              <TableBody>
                <TableRow>
                  <TableCell>option</TableCell>
                  <TableCell align="right">{options[optionIdx].carrierType}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>from</TableCell>
                  <TableCell align="right">{options[optionIdx].startAddress}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>to</TableCell>
                  <TableCell align="right">{options[optionIdx].endAddress}</TableCell>
                </TableRow>
                {/* <TableRow>
                  <TableCell>weight</TableCell>
                  <TableCell align="right">{options[optionIdx].weight} lbs</TableCell>
                </TableRow> */}
                <TableRow>
                  <TableCell>TOTAL</TableCell>
                  <TableCell align="right">{Number(options[optionIdx].option.fee).toFixed(2)} USD</TableCell>
                </TableRow>
              </TableBody>
            </Table>
        </React.Fragment>

        <div className={classes.buttons}>
          <Button
            className={classes.button}
            onClick={this.props.onBack}
          >
            Back
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              this.getOrder();
              
            }}
            className={classes.button}
          >
            Place Order
          </Button>
        </div>
      </ThemeProvider>
    );
  }
}

export default withStyles(useStyles)(Review);

