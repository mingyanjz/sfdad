import { createMuiTheme } from '@material-ui/core/styles';
 

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#009688',
    },
    secondary: {
      main: '#1976d2',
    },
  },
  typography: {
    fontSize: 21,
  },
});

export default theme;