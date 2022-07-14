import { createUseStyles } from 'react-jss'

export default createUseStyles(theme => {
  return {
    root: {
      width: '100%',
      height: 50,
      borderBottom: '1px solid white',
      color: 'white',
      display: 'flex',
      alignItems: 'center'
    },
    input: {
      flex: 1,
      background: 'none',
      outline: 'none',
      border: 'none',
      color: theme.color.light,
      height: '100%',
      fontSize: theme.fontSize.main,
      paddingLeft: 15,
      fontFamily: 'monospace'
    },
    text: {
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      fontFamily: 'monospace',
      paddingLeft: 15,
      fontSize: theme.fontSize.main,
      flex: 1
    },
    delete: {
      background: 'none',
      outline: 'none',
      border: 'none',
      color: theme.color.light,
      height: '100%',
      fontSize: theme.fontSize.main,
      cursor: 'pointer',
      paddingRight: 30,
      fontFamily: 'monospace',
      '&:hover': {
        opacity: '50%'
      },
      '&:active': {
        opacity: '75%'
      }
    }
  }
}, { name: 'StringRow' })