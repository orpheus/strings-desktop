import React, { FC } from 'react'
import styles from './styles'

const CreateString: FC<CreateStringProps> = ({
  newStringName,
  setNewStringName,
  handleOnKeyUpOnStringInput,
}) => {
  const c = styles()
  return <div className={c.root}>
    <input type={'text'}
           placeholder={'string name'}
           value={newStringName}
           onKeyUp={handleOnKeyUpOnStringInput}
           onChange={e => setNewStringName(e.target.value)}
           className={c.input}
    />
  </div>
}

export default CreateString

interface CreateStringProps {
  newStringName: string
  setNewStringName: (name: string) => void
  handleOnKeyUpOnStringInput: (e: React.KeyboardEvent<HTMLInputElement>) => void
}