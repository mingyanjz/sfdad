import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button'
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { withStyles } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from '../theme';
import { useStyles } from './useStyles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { Grid } from '@material-ui/core';

class DeliveryForm extends Component {

  constructor() {
    super();
    this.state = {
      loadingSatellites: false,
      selected: [],
    }
  }

  RadioButtonsGroup = () => {
    const [value, setValue] = React.useState('drone');

    const handleChange = (event) => {
      setValue(value = event.target.value);
      this.props.onOptionChange(value);
    };
  }

  render() {
    var option  = {
      value: this.props.value,
    };

    const { classes } = this.props;

    return (
      <ThemeProvider theme={theme}>
        <React.Fragment>
          <Typography variant="h6" gutterBottom>
            Delivery method
          </Typography>
          <FormControl component="optionSet">
            <RadioGroup
              aria-label="option"
              name="deliveryOption"
              value={this.RadioButtonsGroup.value}
              onChange={this.RadioButtonsGroup.handleChange}>
              <FormControlLabel
                value="drone"
                control={<Radio />}
                label="drone"
              />
              <FormControlLabel
                value="car"
                control={<Radio />}
                label="car"
              />
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