import React, { FC, useEffect, useRef, useState } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import { IString } from '../../../../apis/string/IString'
import styles from './styles'

const StringRow: FC<StringRowProps> = ({
  s,
  index,
  handleStringDragAndDrop,
  updateStringName,
  handleDeleteString
}) => {
  const c = styles()

  const [
    {
      canDrop,
      isOver,
    }, drop] = useDrop<DropTarget, unknown, CollectedProps>(() => ({
    // The type (or types) to accept - strings or symbols
    accept: DRAG_AND_DROP_TYPES.STRING,
    // Props to collect
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop() && monitor.getItem().index !== index,
    }),
    drop: (item) => {
      if (item.index !== index) {
        handleStringDragAndDrop(item.index, index)
      }
    },
  }), [index, handleStringDragAndDrop])

  const [{ isDragging }, drag] = useDrag(() => ({
    type: DRAG_AND_DROP_TYPES.STRING,
    item: { index },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  }), [index])

  const [editable, setEditable] = useState(false)
  const [internalName, setInternalName] = useState(s.name)

  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => setInternalName(s.name), [s.name])

  useEffect(() => {
    if (editable) {
      inputRef.current?.focus()
    }
  }, [editable])

  function handleInternalNameChange (e: React.ChangeEvent<HTMLInputElement>) {
    setInternalName(e.target.value)
  }

  async function handleStringNameChange () {
    await updateStringName(s, internalName)
    setEditable(false)
  }

  function handleStringNameDoubleClick () {
    setEditable(true)
  }

  async function handleOnKeyUpOnInternalNameInput (e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter' || e.key === 'Escape') {
      await handleStringNameChange()
    }
  }

  return <div className={c.root}
              ref={node => editable ? node : drag(drop(node))}
              style={{
                opacity: isDragging || isOver ? 0.5 : 1,
                fontWeight: isOver ? 'bold' : 'inherit',
                // backgroundColor: isOver && canDrop ? 'red' : 'inherit',
              }}>
    {!editable &&
      <div
        className={c.text}
        onDoubleClick={handleStringNameDoubleClick}
      >
        {s.name}
      </div>}
    {editable &&
      <input
        className={c.input}
        ref={inputRef}
        type={'text'}
        value={internalName}
        onChange={handleInternalNameChange}
        onBlur={handleStringNameChange}
        onKeyUp={handleOnKeyUpOnInternalNameInput}
      />
    }
    {/*<div role="Handle" ref={drag}/>*/}
    <button
      onClick={() => handleDeleteString(s)}
      className={c.delete}>
      ---
    </button>
  </div>
}

interface CollectedProps {
  isOver: boolean
  canDrop: boolean
}

interface DropTarget {
  index: number
}

interface StringRowProps {
  s: IString
  index: number
  updateStringName: (string: IString, name: string) => Promise<void>
  handleStringDragAndDrop: (fromIndex: number, toIndex: number) => void
  handleDeleteString: (string: IString) => void
}

const DRAG_AND_DROP_TYPES = {
  STRING: 'STRING',
}

export default StringRow
