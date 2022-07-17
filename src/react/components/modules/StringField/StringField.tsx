import React, { FC } from 'react'
import styles from './styles'

const StringField: FC<StringFieldProps> = ({ children }) => {
  const c = styles()
  return <div className={c.root}>
    <div className={c.padding}>
      {children}
    </div>
  </div>
}

interface StringFieldProps {
  children: JSX.Element
}

export default StringField
