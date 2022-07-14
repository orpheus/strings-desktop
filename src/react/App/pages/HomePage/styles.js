import { createUseStyles } from 'react-jss'

export default createUseStyles(theme => {
  return {
    root: {
      height: '100%',
      width: '100%',
      backgroundColor: theme.color.primary,
      color: '#000'
    }
  }
}, { name: 'HomePage-styles' })