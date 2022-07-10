const primaryTheme = {
  color: {
    primary: '#56D88B',
    secondary: '#000',
    background: '#000'
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

export default primaryTheme
