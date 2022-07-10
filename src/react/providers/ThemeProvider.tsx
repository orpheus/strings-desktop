import React from 'react'
import { ThemeProvider } from 'react-jss'
import primaryTheme from '../theme/primarytheme'
import { IProviderProps } from './RootProvider'

const ExpThemeProvider = ({ children }: IProviderProps) => {
  return <ThemeProvider theme={primaryTheme}>
    {children}
  </ThemeProvider>
}

export default ExpThemeProvider
