import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';
import { useStyles } from './useStyles';
import theme from '../theme';
import { ThemeProvider } from '@material-ui/core/styles';


class AddressForm extends Component {
  

  getOptions = (query) => {
    this.props.onLoading(true);
    var url = 'http://18.191.48.223/dispatchDeliveryBackend/Login/option?';
    // test case
    // '2601 Mason St, San Francisco, CA 94133'
    // '99 Harding Rd, San Francisco, CA 94132'
    url += ('from=' + this.props.pickupAddress.text + ', San Francisco, CA ' + this.props.pickupAddress.zip);
    url += ('&to=' + this.props.shipAddress.text + ', San Francisco, CA ' + this.props.shipAddress.zip);
    console.log(url);
    url = encodeURI(url);
    fetch(url)
      .then(res => res.json())
      .then(data => {
        this.props.onOptionsChange(data);
      })
      
    // // temporary for testing
    // var data = require('./options.json');
    // this.props.onOptionsChange(data);
  }


  render() {     
    var query = {
          pickupAddress: this.props.pickupAddress, 
          shipAddress: this.props.shipAddress,
          item: this.props.item,
          options: this.props.options,
        };

    const { classes } = this.props;
      
    return (
      <ThemeProvider theme={theme}>
        <React.Fragment>
          <Typography variant="h6" gutterBottom align='left'>
            Pick up from
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={9}>
              <TextField
                required
                id="pick up address"
                name="address"
                label="Pick-up Address"
                // helperText="hello"
                fullWidth
                autoComplete="shipping address-line"
                defaultValue={this.props.pickupAddress.text}
                onChange={(e) => {
                  query.pickupAddress.text = e.target.value;
                  this.props.onQueryChange(query);
                }} 
              />
            </Grid>
            <Grid item xs={3}>
              <Typography variant="body1" align="center">San Francisco, CA</Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                name="zip"
                label="zip code"
                fullWidth
                autoComplete="shipping postal-code"
                defaultValue={this.props.pickupAddress.zip}
                onChange={(e) => {
                  query.pickupAddress.zip = e.target.value;
                  this.props.onQueryChange(query);
                }} 
              />
            </Grid>
          </Grid>
          <br/>
          <br/>
          <Typography variant="h6" gutterBottom align='left' >
            Ship to
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={9}>
              <TextField
                required
                id="shipping address"
                name="address"
                label="Shipping Address"
                fullWidth
                defaultValue={this.props.shipAddress.text}
                autoComplete="shipping address-line"
                onChange={(e) => {
                  query.shipAddress.text = e.target.value;
                  this.props.onQueryChange(query);
                }} 
              />
            </Grid>
            <Grid item xs={3}>
              <Typography variant="body1" align="center">San Francisco, CA</Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                name="zip"
                label="zip code"
                fullWidth
                defaultValue={this.props.shipAddress.zip}
                autoComplete="shipping postal-code"
                onChange={(e) => {
                  query.shipAddress.zip = e.target.value;
                  this.props.onQueryChange(query);
                }} 
              />
            </Grid>

          </Grid>
          {/* <br/>
          <br/> */}
          {/* <Typography variant="h6" gutterBottom align='left' >
            Item
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                name="weight in kg"
                label="weight in kg"
                fullWidth
                defaultValue={this.props.item.weight}
                autoComplete="weight in kg"
                onChange={(e) => {
                  query.item.weight = e.target.value;
                  this.props.onQueryChange(query);
                }} 
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                name="height in cm"
                label="height in cm"
                fullWidth
                defaultValue={this.props.item.height}
                autoComplete="height in cm"
                onChange={(e) => {
                  query.item.height = e.target.value;
                  this.props.onQueryChange(query);
                }} 
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                name="length in cm"
                label="length in cm"
                fullWidth
                defaultValue={this.props.item.length}
                autoComplete="length in cm"
                onChange={(e) => {
                  query.item.length = e.target.value;
                  this.props.onQueryChange(query);
                }} 
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                name="width in cm"
                label="width in cm"
                fullWidth
                defaultValue={this.props.item.width}
                autoComplete="width in lbs"
                onChange={(e) => {
                  query.item.width = e.target.value;
                  this.props.onQueryChange(query);
                }} 
              />
            </Grid>
          </Grid> */}
          
          { this.props.isLoading ? 
            <div className={classes.buttons}>
              <Button
                // disabled  
                variant="contained"
                color= "primary"
                className={classes.button}
              >
                Loading...{'  '}
                <CircularProgress size={13} color='inherit'/> 
              </Button>
            </div>  
            : 
            <div className={classes.buttons}>
            <Button 
              variant="contained"
              color= "primary"
              onClick={() => {
                this.getOptions(query);
              }}
              className={classes.button}
            >
              next
            </Button>
          </div>   
        }

        </React.Fragment>
      </ThemeProvider>
    );
  }
}
 
export default withStyles(useStyles)(AddressForm);

