import { createUseStyles } from 'react-jss'

export default createUseStyles(theme => {
  return {
    root: {
      height: 40,
      backgroundColor: theme.color.dark,
      borderBottom: `1px solid ${theme.color.light}`,
      display: 'flex'
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
    }
  }
}, {name: "CreateString"})