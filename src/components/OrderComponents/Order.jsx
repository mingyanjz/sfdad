import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
// import Button from '@material-ui/core/Button';
// import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from '../theme';
import { useStyles } from './useStyles';

import AddressForm from './AddressForm';
import DeliveryForm from './DeliveryForm';
import PaymentForm from './PaymentForm';
import Review from './Review';
import ThankYou from './ThankYou';


class Order extends Component {
  state = { 
    step: 0, 
    // query form
    pickupAddress: {text:'', zip:null, lat:null, lng:null},
    shipAddress: {text:'', zip:null, lat:null, lng:null},
    item: {weight: null, length: null, height: null, width: null},
    // delivery form

    // payment form
    
  }

  handleQueryChange = (query) => {
    this.setState({
      pickupAddress: query.pickupAddress,
      shipAddress: query.shipAddress,
      item: query.item
    });
    // console.log(this.state.pickupAddress)
  }

  
  handleNext = () => {
    const {step} = this.state;
    this.setState({
      step: step+1,
    })
    console.log(this.state.step);
  };

  handleBack = () => {
    const {step} = this.state;
    this.setState({
      step: step-1,
    })
  };

  getStepContent = step =>  {
    switch (step) {
      case 0:
        return <AddressForm {...this.state} onQueryChange={this.handleQueryChange} 
                    onNext={this.handleNext}/>;
      case 1:
        return <DeliveryForm onNext={this.handleNext} onBack={this.handleBack}/>;
      case 2:
        return <PaymentForm onNext={this.handleNext} onBack={this.handleBack}/>;
      case 3:
        return <Review onNext={this.handleNext} onBack={this.handleBack}/>;
      case 4:
        return <ThankYou />;
      default:
        throw new Error('Unknown step');
    }
  }

  render() { 
    const { classes } = this.props;

    const steps = [{info: 'Query', emoji: <span role="img" aria-label="tent">🏰</span>}, 
                   {info: 'Deliver', emoji: <span role="img" aria-label="tent">🚀</span>} ,
                   {info: 'Pay', emoji: <span role="img" aria-label="tent">💳</span>}, 
                   {info: 'Confirm', emoji: <span role="img" aria-label="tent">😘</span>},];


    return (
      <ThemeProvider theme={theme}>
        <React.Fragment>
          <main className={classes.layout}>
            <Paper className={classes.paper}>
              {/* <Typography component="h1" variant="h4" display='block' align="center">
                Order
              </Typography> */}
              <Stepper activeStep={this.state.step} className={classes.stepper}>
                {steps.map((label) => (
                  <Step key={label.info}>
                    <StepLabel>
                      {label.emoji}
                      {" "}
                      {label.info}
                    </StepLabel>
                  </Step>
                ))}
              </Stepper>
              <React.Fragment>
                {this.getStepContent(this.state.step)}
              </React.Fragment>
            </Paper>
          </main>
        </React.Fragment>
      </ThemeProvider>
    );
  }
}
 
export default withStyles(useStyles)(Order);
