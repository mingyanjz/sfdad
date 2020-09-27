import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button'
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { withStyles } from '@material-ui/core/styles';
import { ThemeProvider} from '@material-ui/core/styles';
import theme from '../theme';
import { useStyles } from './useStyles';

class DeliveryForm extends Component {
  state = { 
    checked:-1,
  }

  render() { 
    const { classes } = this.props;
    return (
      <ThemeProvider theme={theme}>
        <React.Fragment>
          <Typography variant="h6" gutterBottom>
            Delivery method
          </Typography>
          {/* <List dense className={classes.root}> */}
          <List dense >
            <ListItem key={0} button>
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={this.checked === 1}
                  inputProps={{ 'aria-labelledby': `checkbox-list-1` }}
                />
              </ListItemIcon>
              <ListItemText id={`checkbox-list-1`} primary={'drone'} />
            </ListItem>
            
            <ListItem key={1} button>
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={this.checked === 2}
                  inputProps={{ 'aria-labelledby': `checkbox-list-2` }}
                />
              </ListItemIcon>
              <ListItemText id={`checkbox-list-2`} primary={'car'} />
            </ListItem>
          </List>
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
            color= "primary"
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