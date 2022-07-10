import React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

const queryClient = new QueryClient()

function ReactQueryProvider ({ children }: ProviderProps) {
  return <QueryClientProvider client={queryClient}>
    {children}
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
}

interface ProviderProps {
  children?: React.ReactElement[] | React.ReactElement
}

export default ReactQueryProvider
