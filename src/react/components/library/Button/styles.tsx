import { createUseStyles } from 'react-jss'
import { MainTheme } from '../../../theme/primarytheme'

export default createUseStyles((theme: MainTheme) => {
  // console.log("Button-Theme: ", theme)
  let primary = theme.color.primary
  const background = theme.color.background
  return {
    root: {},
    container: {},
    button: (props: StyleProps) => {
      primary = props.color || theme.color.primary
      return {
        background: '#000',
        color: primary,
        border: `1px ${primary} solid`,
        outline: 'none',
        '&:hover': {
          animation: 'none',
          background: primary,
          color: background,
          fontWeight: 'bold',
          cursor: 'pointer',
        },
        '&:active': {
          background: background,
          color: primary,
        },
        '&:disabled': {
          cursor: 'default',
          background: background,
          borderColor:  'grey',
          fontWeight: 'normal',
          color: 'grey'
        }
      }
    }
  }
}, { name: 'Button-styles' })

export interface StyleProps {
  color: string
}