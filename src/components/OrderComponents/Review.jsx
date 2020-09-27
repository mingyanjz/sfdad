import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import { useStyles } from './useStyles';
import { withStyles } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from '../theme';


const product = { name: 'Product 1', price: '$9.99'};


class Review extends Component {
  state = {  }
  render() { 
    const { classes } = this.props;
    return (
      <ThemeProvider theme={theme}>
        <React.Fragment>
          <Typography variant="h6" gutterBottom>
            Summary
          </Typography>
          <List>  
            <ListItem className={classes.listItem} key={product.name}>
              <ListItemText primary={product.name} />
              <Typography variant="subtitle1" className={classes.total}>{product.price}</Typography>
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
            Place Order
          </Button>
        </div>
      </ThemeProvider>
    );
  }
}
 
export default withStyles(useStyles)(Review);

