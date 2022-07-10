import { HashRouter } from 'react-router-dom'
import React from 'react'

function ReactRouterProvider ({ children }: ProviderProps) {
  return <HashRouter>
    {children}
  </HashRouter>
}

interface ProviderProps {
  children?: React.ReactElement[] | React.ReactElement
}

export default ReactRouterProvider