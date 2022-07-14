import { createUseStyles } from 'react-jss'

export default createUseStyles(theme => {
  return {
    root: {
      padding: 10,
      width: '100%'
      // borderBottom: `1px solid ${theme.color.light}`
    },
    flexbox: {
      display: 'flex',
      alignItems: 'center',
    },
    title: {
      fontFamily: theme.font.title,
      color: theme.color.light,
      margin: 0,
      fontSize: 40,
      letterSpacing: '.2em',
      flex: 1
    },
    centerComponent: {
      textAlign: 'center',
      flex: 1
    },
    placeholder: {
      flex: 1
    }
  }
}, {name: "Header-styles"})