import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from '../theme';
import { useStyles } from './useStyles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

class DeliveryForm extends Component {

  RadioButtonsGroup = () => {
    const [value, setValue] = React.useState('drone');
    const handleChange = (event) => {
      setValue(value = event.target.value);
    };
  }

  render() {
    // var data = require('./options.json');
    var { options } = this.props;
    var { optionIdx } = this.props;

    const { classes } = this.props;

    return (
      <ThemeProvider theme={theme}>
        <React.Fragment>
          <Typography variant="h6" gutterBottom align='left'>
            Delivery method
          </Typography>
          <FormControl component="optionSet" >
            <RadioGroup
              aria-label="option"
              name="deliveryOption"
              defaultValue={'drone'}
              onChange={this.RadioButtonsGroup.handleChange}
            >
              <FormControlLabel
                value="drone"
                control={<Radio />}
                label="drone"
                onChange={() => {
                  optionIdx = 0;
                  this.props.onOptionSelectedChange(optionIdx);
                }} 
              />
              <Typography variant="subtitle1" >
                price: {options[0].option.fee}
              </Typography>
              <Typography>
                time: {options[0].option.deliveryTime}
              </Typography>
              <FormControlLabel
                value="robot"
                control={<Radio />}
                label="robot"
                onChange={() => {
                  optionIdx = 1;
                  this.props.onOptionSelectedChange(optionIdx);
                }} 
              />
              <Typography variant="subtitle1" >
                price: {options[1].option.fee}
              </Typography>
              <Typography>
                time: {options[1].option.deliveryTime}
              </Typography>
            </RadioGroup>
          </FormControl>
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
            onClick={this.props.onNext}
          >
            Next
          </Button>
        </div>
      </ThemeProvider>
    );
  }
}

export default withStyles(useStyles)(DeliveryForm);