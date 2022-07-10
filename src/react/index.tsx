import * as React from 'react'
import Root from './App/Root'
import { createRoot } from 'react-dom/client'

const container = document.getElementById('app')
const root = createRoot(container as HTMLElement)
root.render(<Root/>)

