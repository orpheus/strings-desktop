const PrimaryTheme = {
  color: {
    primary: '#246181',
    secondary: '#c52e6c',
    dark: '#000',
    light: '#fff'
  },
  font: {
    title: 'Sanderland',
    main: 'monospace'
  },
  fontSize: {
    default: 12,
    main: 12
  }
}

export interface MainTheme {
  color: ColorTheme
}

interface ColorTheme {
  primary: string
  secondary: string
  background: string
}

export default PrimaryTheme
