import { createUseStyles } from 'react-jss'

export default createUseStyles(theme => {
  // console.log("TextInput-Theme: ", theme)
  const primary = theme.color.primary

  return {
    root: {},
    label: {
      fontSize: 12
    },
    input: {
      display: 'block',
      background: 'none',
      border: 'none',
      outline: 'none',
      borderBottom: `1px solid ${primary}`,
      color: primary
    },
    errorMessageContainer: {},
    errorMessage: {},
  }
}, { name: 'TextInput-styles' })