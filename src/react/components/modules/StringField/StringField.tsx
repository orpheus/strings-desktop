import React, { FC } from 'react'
import styles from './styles'

const StringField: FC<StringFieldProps> = ({ children }) => {
  const c = styles()
  return <div className={c.root}>
    {children}
  </div>
}

interface StringFieldProps {
  children: JSX.Element
}

export default StringField
