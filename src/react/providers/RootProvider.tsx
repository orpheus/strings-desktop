import React, { Suspense, ReactElement } from 'react'
import ExpThemeProvider from './ThemeProvider'
import ReactQueryProvider from './ReactQueryProvider'
import ReactRouterProvider from './ReactRouterProvider'
import ReactDndProvider from './ReactDndProvider'


const Providers: IProviders = [
  ReactRouterProvider,
  ReactQueryProvider,
  ExpThemeProvider,
  ReactDndProvider
]

const AllProviders = ({ Providers, children }: AllProvidersProps) => {
  const Provider = Providers.shift()
  if (!Provider) return children
  return <Provider>
    {/* eslint-disable-next-line @typescript-eslint/no-unused-vars */}
    {AllProviders({ Providers, children })}
  </ Provider>
}

export default function RootProvider ({ children }: RootProviderProps) {
  return <Suspense fallback={null}>
    {AllProviders({ Providers, children })}
  </ Suspense>
}

export type IProvider = ({ children }: IProviderProps) => JSX.Element
type IProviders = IProvider[]

export interface IProviderProps {
  children: ReactElement | ReactElement[]
}

interface AllProvidersProps {
  Providers: IProviders
  children: ReactElement | ReactElement[]
}

interface RootProviderProps {
  children: ReactElement | ReactElement[]
}
