import { createUseStyles } from 'react-jss'

export default createUseStyles(theme => {
  // console.log("FlexCenter-Theme: ", theme)
  return {
    root: {
      display: 'flex',
      width: '100%',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center'
    },
  }
}, { name: 'FlexCenter-styles' })