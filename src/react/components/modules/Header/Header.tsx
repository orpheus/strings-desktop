import React, { FC } from 'react'
import styles from './styles'

const Header: FC<HeaderProps> = ({ title, centerComponent, height }) => {
  const c = styles()
  return <header className={c.root} style={{ height }}>
   <div className={c.flexbox}>
     <h1 className={c.title}>
       {title}
     </h1>
     <div className={c.centerComponent}>
       {centerComponent}
     </div>
      <div className={c.placeholder}/>
   </div>
  </header>
}

export default Header

interface HeaderProps {
  title: string,
  centerComponent?: JSX.Element
  height?: number
}