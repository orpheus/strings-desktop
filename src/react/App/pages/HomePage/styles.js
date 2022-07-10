import { createUseStyles } from 'react-jss'

export default createUseStyles(theme => {
  const primary = theme.color.primary
  return {
    root: {
      height: '100%',
      width: '100%',
      backgroundColor: '#fff',
      color: '#000'
    }
  }
}, { name: 'HomePage-styles' })