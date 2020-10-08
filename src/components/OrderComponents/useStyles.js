export const useStyles = theme => ({
    layout: {
      position:'absolute',
      // position:'relative',
      padding: '20px',
      width: 'auto',
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2),
      [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
        width: 600,
        marginLeft: 'auto',
        marginRight: 'auto',
      },
      zIndex:10,
    },
    userLayout: {
      position:'absolute',
      padding: '10px',
      margin: '10px',
      marginRight: '20px',
      width: 'auto',
      right: '0px',
      zIndex:10,
    },
    paper: {
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(3),
      padding: theme.spacing(2),
      [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(0),
        padding: theme.spacing(3),
        width: 600,
      },
    },
    stepper: {
      padding: theme.spacing(3, 0, 5),
    },
    buttons: {
      display: 'flex',
      justifyContent: 'flex-end',
      maxHeight: '60px',
    },
    button: {
      marginTop: theme.spacing(3),
      marginLeft: theme.spacing(1),
    },
    listItem: {
      padding: theme.spacing(1, 0),
    },
    formControl: {
      padding: theme.spacing(1, 0),
      marginLeft: theme.spacing(3),
    },
    formControlLable: {
      marginLeft: theme.spacing(0),
    },
    typo: {
      padding: theme.spacing(0.5),
      marginLeft: theme.spacing(3),
    },
    total: {
      fontWeight: 700,
    },
    menu: {
      'border-radius': '5px',
    }
    
  })
  