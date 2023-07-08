import { createUseStyles } from 'react-jss'

export default createUseStyles(theme => {
  return {
    root: {
      height: 40,
      backgroundColor: theme.color.dark,
      border: `1px solid ${theme.color.light}`,
      borderRight: 'none',
      borderLeft: 'none',
      // borderBottom: 'none',
      display: 'flex',
      boxSizing: 'border-box'
    },
    panelLeft: {
      flex: 1,
      backgroundColor: theme.color.dark
    },
    input: {
      background: 'none',
      outline: 'none',
      border: 'none',
      color: theme.color.light,
      height: '100%',
      width: '100%',
      fontSize: theme.fontSize.default,
      paddingLeft: 10,
      fontFamily: 'monospace',
      '&::placeholder': {
        color: '#fff',
        opacity: '50%'
      },
    },
    deleteButton: {
      width: 50
    },
    delete: {
      backgroundColor: 'cornflowerblue',
      color: theme.color.light,
      '&:hover': {
        color: theme.color.dark,
        backgroundColor: 'cornflowerblue'
      },
      '&:active': {
        color: 'cornflowerblue',
        backgroundColor: theme.color.light
      },
      background: 'none',
      outline: 'none',
      border: 'none',
      height: '100%',
      width: '100%',
      fontSize: theme.fontSize.default,
      cursor: 'pointer',
      fontWeight: 'bold'
    },
    panelRight: {
      flex: 1,
      fontSize: theme.fontSize.default,
    },
    select: {
      background: 'none',
      outline: 'none',
      border: 'none',
      color: theme.color.light,
      height: '100%',
      width: '97%',
      fontSize: theme.fontSize.default,
      paddingRight: 10,
      fontFamily: 'monospace'
    },
    threadName: {

    }
  }
}, {name: "ThreadPanel"})