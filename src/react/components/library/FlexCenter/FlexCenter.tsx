import React, { ReactNode } from 'react'
import styles from './styles'

const FlexCenter = ({ children, flexDirection }: Props) => {
  const c = styles()
  return <div className={c.root} style={{ flexDirection }}>
    {children}
  </div>
}

export default FlexCenter

FlexCenter.defaultProps = {
  flexDirection: 'column'
}

interface Props {
  children: ReactNode
  flexDirection: 'row' | 'row-reverse' | 'column' | 'column-reverse'
}


