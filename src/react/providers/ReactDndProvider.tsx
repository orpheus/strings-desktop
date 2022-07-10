import React from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

function ReactDndProvider ({ children }: ProviderProps) {
  return <DndProvider backend={HTML5Backend}>
    {children}
  </DndProvider>
}

interface ProviderProps {
  children?: React.ReactElement[] | React.ReactElement
}

export default ReactDndProvider