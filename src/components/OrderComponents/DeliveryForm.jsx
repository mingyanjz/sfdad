import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
// import List from '@material-ui/core/List';
// import ListItem from '@material-ui/core/ListItem';
// import ListItemText from '@material-ui/core/ListItemText';
// import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button'
// import ListItemIcon from '@material-ui/core/ListItemIcon';
import Avatar from '@material-ui/core/Avatar';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import { withStyles } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from '../theme';
import { useStyles } from './useStyles';
import { ListItemAvatar } from '@material-ui/core';
import drone_logo from '../MapComponents/drone_logo.png';
import robot_logo from '../MapComponents/robot_logo.png';

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
          <FormControl className={classes.formControl}
          // component="optionSet"
          >
            <RadioGroup
              // aria-label="option"
              // name="deliveryOption"
              defaultValue={'drone'}
              onChange={this.RadioButtonsGroup.handleChange}
            >
              <ListItemAvatar className={classes.typo}>
                <Avatar alt="drone" src={drone_logo} />
              </ListItemAvatar>
              <FormControlLabel
                value="drone"
                control={<Radio />}
                label="DRONE"
                onChange={() => {
                  optionIdx = 0;
                  this.props.onOptionSelectedChange(optionIdx);
                }}
              />
              <Typography className={classes.typo} >
                price: {Number(options[0].option.fee).toFixed(2)} USD
              </Typography>
              <Typography className={classes.typo}>
                Arrival time: {options[0].option.deliveryTime}
              </Typography>
              <br></br>
              <ListItemAvatar className={classes.typo}>
                <Avatar alt="robot" src={robot_logo} />
              </ListItemAvatar>
              <FormControlLabel
                value="robot"
                control={<Radio />}
                label="ROBOT"
                onChange={() => {
                  optionIdx = 1;
                  this.props.onOptionSelectedChange(optionIdx);
                }}
              />
              <Typography className={classes.typo}>
                price: {Number(options[1].option.fee).toFixed(2)} USD
              </Typography>
              <Typography className={classes.typo}>
                Arrival time: {options[1].option.deliveryTime}
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