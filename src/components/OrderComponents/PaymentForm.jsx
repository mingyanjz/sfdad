import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import { useStyles } from './useStyles';
import { withStyles } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from '../theme';

class PaymentForm extends Component {
  state = {  }

  render() {
    
    const { classes } = this.props;
    return (
      <ThemeProvider theme={theme}>
        <React.Fragment>
          {/* <Typography variant="h6" gutterBottom>
            Billing Info
          </Typography> */}
          {/* <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                required
                id="firstName"
                label="First Name"
                fullWidth
                autocomplete="name"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                required
                id="lastName"
                label="Last Name"
                fullWidth
                autocomplete="name"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                id="email"
                label="Email"
                fullWidth
                autocomplete="email"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                id="phone"
                label="Phone"
                fullWidth
                autocomplete="tel"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id="addressLine"
                label="Address Line"
                fullWidth
                autocomplete="shipping street-address"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                required
                id="provinceState"
                label="Province/State"
                fullWidth
                autocomplete="shipping region"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                required
                id="postcodeZipcode"
                label="Postcode/Zipcode"
                fullWidth
                autocomplete="shipping postal-code"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                required
                id="city"
                label="City"
                fullWidth
                autocomplete="shipping locality"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                required
                id="contry"
                label="Contry"
                fullWidth
                autocomplete="shipping country"
              />
            </Grid>
          </Grid>
          <br/>
          <br/> */}
          <Typography variant="h6" gutterBottom align='left'>
            Payment
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                required
                id="cardName"
                label="Name on card"
                fullWidth
                autoComplete="cc-name"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                required
                id="cardNumber"
                label="Card number"
                fullWidth
                autoComplete="cc-number"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                required
                id="expDate"
                label="Expiry date"
                fullWidth
                autoComplete="cc-exp"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                required
                id="cvv"
                label="CVV"
                helperText="Last three digits on signature strip"
                fullWidth
                autoComplete="cc-csc"
              />
            </Grid>
            <Grid item xs={12} >
              <FormControlLabel
                control={
                <Checkbox
                  color="secondary"
                  name="saveCard"
                  value="yes"
                />}
                label="Remember credit card details for next time"
              />
            </Grid>
          </Grid>
          <div className={classes.buttons}>
            <Button 
              className={classes.button}
              onClick={this.props.onBack}
            >
              Back
            </Button>
            <Button
              variant="contained"
              color= "primary"
              className={classes.button}
              onClick={this.props.onNext}
            >
              Next
            </Button>
          </div>
        </React.Fragment>
      </ThemeProvider>
    );
  }
}
 
export default withStyles(useStyles)(PaymentForm);
