import React from 'react'
import styles, { StyleProps } from './styles'
import clsx from 'clsx'

const Button = ({
  handleOnClick,
  text,
  className,
  style,
  disabled,
  color
}: Props) => {
  const c = styles({color} as StyleProps)
  return <div className={c.root}>
    <div className={c.container}>
      <button
        style={style}
        className={clsx(c.button, className)}
        onClick={handleOnClick}
        disabled={disabled}
      >
        {text}
      </button>
    </div>
  </div>
}

export default Button

interface Props {
  handleOnClick: () => void
  text: string
  className?: string
  style?: React.CSSProperties
  disabled?: boolean
  color?: string
}


