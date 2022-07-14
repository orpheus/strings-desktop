import React from 'react'
import { ThemeProvider } from 'react-jss'
import PrimaryTheme from '../theme/PrimaryTheme'
import { IProviderProps } from './RootProvider'

const ExpThemeProvider = ({ children }: IProviderProps) => {
  return <ThemeProvider theme={PrimaryTheme}>
    {children}
  </ThemeProvider>
}

export default ExpThemeProvider
