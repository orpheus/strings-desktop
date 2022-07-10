import React from 'react'

import App from './App'
import RootProvider from '../providers/RootProvider'

const Root = () => {
  return (
    <RootProvider>
      <App />
    </RootProvider>
  )
}

export default Root
