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
import Paper from '@material-ui/core/Paper';
import userEvent from '@testing-library/user-event';

class Review extends Component {
  state = {

  };

  getOrder = (order) => {
    fetch('http://18.221.103.171/dispatchDeliveryBackend/Login/order/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Origin': 'http://localhost:3000',
      },
      body: JSON.stringify( {
        optionID: this.props.optionIdx,
        email: user.email //????
      })
    })
      .then(order => {
        this.props.onPaymentPay(order);
      })
  }

  render() {
    var order = {
      optionID: this.props.option.optionIdx,
      email: this.props.user.email,
    };
    var optionID = this.props.optionIdx;
    // var data = require('./options.json');
    var data = this.props.options;
    const { classes } = this.props;
    return (
      <ThemeProvider theme={theme}>
        <React.Fragment>
          <Typography variant="h6" gutterBottom>
            Order Summary
          </Typography>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableBody>
                <TableRow>
                  <TableCell>option</TableCell>
                  <TableCell align="right">{data[optionID].carrierType}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>from</TableCell>
                  <TableCell align="right">{data[optionID].startAddress}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>to</TableCell>
                  <TableCell align="right">{data[optionID].endAddress}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>weight</TableCell>
                  <TableCell align="right">{data[optionID].weight} lbs</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>TOTAL</TableCell>
                  <TableCell align="right">{data[optionID].fee} USD</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
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
            className={classes.button}
            onClick={() => {
              this.getOrder(order);
              this.props.onNext;
            }}
          >
            Place Order
          </Button>
        </div>
      </ThemeProvider>
    );
  }
}

export default withStyles(useStyles)(Review);

