import { createUseStyles } from 'react-jss'

export default createUseStyles(theme => {
  return {
    root: {
      position: 'absolute',
      background: 'inherit',
      width: '100%'
    },
    padding: {
      marginBottom: '64px'
    }
  }
}, { name: 'StringField' })