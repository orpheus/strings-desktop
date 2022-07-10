import React from 'react'
import { Route, Routes as ReactRoutes } from 'react-router-dom'
import HomePage from './pages/HomePage/HomePage'

const Routes = () => {
  return <ReactRoutes>
    <Route index element={<HomePage/>}/>
  </ReactRoutes>
}

export default Routes


