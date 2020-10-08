import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
// import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from '../theme';
import { useStyles } from './useStyles';

import { Menu } from 'antd';
import { Typography } from 'antd';
import { Icon } from 'antd';


import { Link, Redirect } from "react-router-dom";

import AddressForm from './AddressForm';
import DeliveryForm from './DeliveryForm';
import PaymentForm from './PaymentForm';
import Review from './Review';
import ThankYou from './ThankYou';
import GMap from '../MapComponents/GMap';

 

class Order extends Component {
  state = { 
    step: 0, 
    // query form
    pickupAddress: {text:'', zip:null, lat:null, lng:null},
    shipAddress: {text:'', zip:null, lat:null, lng:null},
    item: {weight: null, length: null, height: null, width: null},
    // delivery form
    options: null,
    optionIdx: 0, // 0: drone; 1: car
    // payment form
    // review
    orderID: null,
    // helper
    isLoading: false,
    anchorEl: null,
  }


  handleQueryChange = (query) => {
    this.setState({
      pickupAddress: query.pickupAddress,
      shipAddress: query.shipAddress,
      item: query.item
    });
  }

  handleOptionsChange = (options) => {
    this.setState({
      options: options
    })
    console.log('option is changed')
    this.handleLoading(false);

    var {pickupAddress} = this.state;
    pickupAddress.lat = options[0].startToEnd.points[0].lat;
    pickupAddress.lng = options[0].startToEnd.points[0].lng;
    this.setState(pickupAddress);

    var {shipAddress} = this.state;
    shipAddress.lat = options[0].startToEnd.points[1].lat;
    shipAddress.lng = options[0].startToEnd.points[1].lng;
    this.setState(shipAddress);

    this.handleNext();
    console.log(this.state.options);
  }

  handleLoading = (isLoading) => {
    this.setState({
      isLoading: isLoading
    });
  }

  handleOptionSelected = (optionIdx) => {
    this.setState({
      optionIdx: optionIdx
    });
  }

  handlePaymentPay = (orderID) => {
    console.log(orderID);
    this.setState({
      orderID: orderID
    });
    console.log("order" + this.state.orderID["Your order id"]);
  }
  
  handleNext = () => {
    const {step} = this.state;
    this.setState({step: step+1})
    // console.log(this.state.step);
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
                    onNext={this.handleNext} onOptionsChange={this.handleOptionsChange}
                    onLoading={this.handleLoading}/>;
      case 1:
        return <DeliveryForm {...this.state} onOptionSelectedChange={this.handleOptionSelected}
                    onNext={this.handleNext} onBack={this.handleBack}/>;
      case 2:
        return <PaymentForm onNext={this.handleNext} onBack={this.handleBack}/>;
      case 3:
        return <Review {...this.state} user={this.props.user} onPaymentPayChange={this.handlePaymentPay} onNext={this.handleNext} onBack={this.handleBack}/>;
      case 4:
        return <ThankYou {...this.state}/>;
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

    const test = {lat:37.75, lng:-122.45}

    const { SubMenu } = Menu;
    const { Title, Paragraph, Text } = Typography;

    return (
      <ThemeProvider theme={theme}>
        {this.props.user == null &&  <Redirect to="/login"/>}
        <React.Fragment>
          {/* <main className={classes.layout}> */}
          <main>
            <span className={classes.layout}>
                <Paper className={classes.paper}>
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
            </span>
            <span className={classes.userLayout}>
              <Menu className={classes.menu} mode="horizontal" >
                <SubMenu key="sub1" title={this.props.user == null? 
                  <div>
                    <Icon type="user" style={{ fontSize: 20 }} />
                    <Text strong style={{fontSize: 16}}>Please log in</Text>
                  </div>
                  : 
                  <div>
                    <Icon type="user" style={{ fontSize: 20 }} />
                    <Text strong style={{fontSize: 16}}>{this.props.user.email}</Text>
                  </div>
                  }
                >
                  <Menu.Item key="9">
                    {this.props.user == null? <Text strong>log in</Text>: <Text strong>log out</Text>}
                    <Link to="/login" onClick={this.props.logout}/>
                  </Menu.Item>
                  <Menu.Item key="10">
                    <Text strong>orders</Text>
                    <Link to="/history" onClick={this.props.onClickUser}></Link>  
                  </Menu.Item>
                </SubMenu>
              </Menu>
            </span>
          </main>
        </React.Fragment>

        <div>
          <GMap {...this.state}/>
        </div>
      </ThemeProvider>
    );
  }
}
 
export default withStyles(useStyles)(Order);
