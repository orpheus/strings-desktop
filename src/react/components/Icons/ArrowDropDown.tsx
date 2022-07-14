import React, { FC } from 'react'

const ArrowDropDown: FC<ArrowDropDownProps> = ({height, width, fill}) => {
  return <div id={"ArrowDropDown-root"}>
    <svg xmlns="http://www.w3.org/2000/svg" height={height} viewBox={`0 0 ${height} ${width}`} width={width} fill={fill || "#000000"}><path d="M0 0h24v24H0V0z" fill="none"/><path d="M7 10l5 5 5-5H7z"/></svg>
  </div>
}

export default ArrowDropDown

interface ArrowDropDownProps {
  height?: number
  width?: number
  fill?: string
}

ArrowDropDown.defaultProps = {
  height: 24,
  width: 24,
  fill: undefined
}