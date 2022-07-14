import { createUseStyles } from 'react-jss'
import Sanderland from '../../../public/assets/fonts/Sanderland.ttf'

export default createUseStyles({
  '@font-face': {
    fontFamily: 'Sanderland',
    src: `url(${Sanderland})`
  }
}, { name: 'App-styles' })
