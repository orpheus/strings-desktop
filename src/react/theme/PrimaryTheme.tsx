const PrimaryTheme = {
  color: {
    primary: '#c52e6c',
    secondary: '#246181',
    dark: '#000',
    light: '#fff'
  },
  font: {
    title: 'Sanderland',
    main: 'monospace'
  },
  fontSize: {
    default: 12,
    main: 14
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
