import React from 'react'

import App from './App'
import LoadAppStyles from './styles'
import RootProvider from '../providers/RootProvider'

const Root = () => {
  LoadAppStyles()
  return (
    <RootProvider>
      <App />
    </RootProvider>
  )
}

export default Root
