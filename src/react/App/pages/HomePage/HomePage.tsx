import React, { FC, useEffect, useState } from 'react'
import styles from './styles'
import { useDrag, useDrop } from 'react-dnd'
import { useQuery } from 'react-query'
import { getThreadsApi } from '../../../apis/thread/get-threads-api'
import { useCreateThreadMutation } from '../../../apis/thread/create-thread-api'
import { IThread } from '../../../apis/thread/IThread'
import { useDeleteThreadMutation } from '../../../apis/thread/delete-thread-api'
import { IString } from '../../../apis/string/IString'
import { useCreateStringMutation } from '../../../apis/string/create-string-api'
import { getStringsApi } from '../../../apis/string/get-strings-api'

const HomePage = () => {
  const c = styles()
  const [threads, setThreads] = useState<IThread[]>([])
  const [activeThread, setActiveThread] = useState<IThread>()
  const [newThreadName, setNewThreadName] = useState<string>('')

  const activeThreadId = activeThread?.id

  const [threadStringMap, setThreadStringMap] = useState<ThreadStringMap>(
    new Map())
  const [newStringName, setNewStringName] = useState<string>('')

  // Queries
  const { data: threadData } = useQuery('threads',
    getThreadsApi.call.bind(getThreadsApi))

  const { data: stringData } = useQuery(['strings', activeThreadId],
    () => getStringsApi.call.bind(getStringsApi)({ urlArgs: activeThreadId }),
    {
      enabled: Boolean(activeThreadId),
    })

  // Mutation
  const createThreadMutation = useCreateThreadMutation()
  const deleteThreadMutation = useDeleteThreadMutation()

  const createStringMutation = useCreateStringMutation()

  // Effects
  useEffect(() => {
    setThreads(threadData as IThread[])
  }, [threadData])

  useEffect(() => {
    if (activeThreadId) {
      setThreadStringMap(prev => {
        const newMap = new Map(prev)
        newMap.set(activeThreadId, stringData)
        return newMap
      })
    }
  }, [activeThreadId, stringData])

  useEffect(() => {
    if (!activeThread && threads?.length > 0) {
      setActiveThread(threads[0])
    }
  }, [threads, activeThread])

  async function handleCreateThread () {
    const thread = {
      name: newThreadName,
    }
    await createThreadMutation.mutate({
      data: thread,
    }, {
      onSuccess: newThread => {
        setThreads(prev => {
          return [...prev, newThread]
        })
        setActiveThread(newThread)
        setNewThreadName('')
      },
    })
  }

  async function handleOnKeyUpOnThreadInput (e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      await handleCreateThread()
    }
  }

  function handleSetActiveThread (e: React.ChangeEvent<HTMLSelectElement>) {
    setActiveThread(threads.find(t => t.id === e.target.value))
  }

  async function handleDeleteThread () {
    const activeThreadId = activeThread?.id
    if (!activeThreadId) {
      return
    }
    await deleteThreadMutation.mutate({
      urlArgs: activeThreadId,
    }, {
      onSuccess: () => {
        cleanupStateOnThreadDelete(activeThreadId)
      },
    })
  }

  function cleanupStateOnThreadDelete (activeThreadId: string) {
    // Removes/filters out the active thread
    setThreads(prev => prev.filter(thread => thread.id !== activeThreadId))

    setThreadStringMap(prev => {
      const newState = new Map(prev)
      newState.delete(activeThreadId)
      return newState
    })

    // Sets the new active thread
    if (threads.length > 0) {
      // The new state is not yet flushed, so check if it's the thread we're deleting
      if (threads[0].id !== activeThreadId) {
        setActiveThread(threads[0])
      } else {
        setActiveThread(undefined)
      }
    } else {
      setActiveThread(undefined)
    }

    // Clear the new string name input
    setNewStringName('')
  }

  async function handleCreateString () {
    if (!activeThread) {
      console.error('Cannot create string without active thread')
      return
    }
    const strings = threadStringMap.get(activeThread.id) || []
    const order = strings.length

    const newString = {
      name: newStringName,
      thread: activeThread.id,
      order,
    }

    createStringMutation.mutate({
      data: newString,
    }, {
      onSuccess: createdString => {
        setThreadStringMap(prev => {
          const newState = new Map(prev)
          newState.set(activeThread.id, [...strings, createdString])
          return newState
        })
        setNewStringName('')
      },
    })
  }

  async function handleOnKeyUpOnStringInput (e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      // Do something
      await handleCreateString()
    }
  }

  function handleStringDragAndDrop (fromIndex: number, toIndex: number) {
    if (!activeThread) return

    setThreadStringMap(prev => {
      const newState = new Map(prev)
      const strings = newState.get(activeThread.id)
      if (!strings) {
        return prev
      }
      // Splice the item out of its current position, and splice it
      // into it's new position
      strings.splice(toIndex, 0, strings.splice(fromIndex, 1)[0])

      // Re-assign order. Can be optimized to only update order of those that changed
      const mappedStrings = strings.map((s, i) => {
        s.order = i
        return s
      })

      newState.set(activeThread.id, mappedStrings)
      return newState
    })
  }

  // function handleDeleteString (stringIndex: number) {
  //   setThreadStringMap(prev => {
  //     const newState = new Map(prev)
  //     const strings = newState.get(activeThread)
  //     if (!strings) {
  //       return prev
  //     }
  //     strings.splice(stringIndex, 1)
  //     const mappedStrings = strings.map((s, i) => {
  //       s.priority = i
  //       return s
  //     })
  //     newState.set(activeThread, mappedStrings)
  //     return newState
  //   })
  // }

  function updateStringName (stringIndex: number, newName: string) {
    if (!activeThread) return

    setThreadStringMap(prev => {
      const newState = new Map(prev)
      const strings = newState.get(activeThread.id)
      if (!strings) {
        return prev
      }
      strings[stringIndex].name = newName
      newState.set(activeThread.id, strings)
      return newState
    })
  }

  const strings = threadStringMap.get(activeThread?.id || '__no_thread') || []

  return <div className={c.root}>
    <div>
      <input type={'text'}
             placeholder={'thread name'}
             value={newThreadName}
             onKeyUp={handleOnKeyUpOnThreadInput}
             onChange={e => setNewThreadName(e.target.value)}
      />
      <button
        onClick={handleCreateThread}
      >
        Create Thread
      </button>
    </div>
    <select value={activeThread?.id || 'DEFAULT_VALUE'}
            onChange={handleSetActiveThread}>
      <option value={'DEFAULT_VALUE'} disabled>Threads</option>
      {threads?.map(thread => {
        return <option key={thread.id} value={thread.id}>
          {thread.name}
        </option>
      })}
    </select>
    {activeThread && <span>
      <button
        onClick={handleDeleteThread}>
        Delete "{activeThread.name}" Thread
      </button>
    </span>}
    {activeThread && <>
      <div>
        <input type={'text'}
               placeholder={'string name'}
               value={newStringName}
               onKeyUp={handleOnKeyUpOnStringInput}
               onChange={e => setNewStringName(e.target.value)}
        />
        <button
          onClick={handleCreateString}
        >
          Create String for "{activeThread?.name}" thread
        </button>
      </div>
      <StringField>
        <>
          {strings.map((s: IString) => {
            return <div key={s.name} style={{
              display: 'flex',
              alignItems: 'center',
            }}>
              <div style={{ width: 300 }}>
                <StringRow
                  s={s}
                  index={s.order}
                  handleStringDragAndDrop={handleStringDragAndDrop}
                  updateStringName={updateStringName}
                />
              </div>
              {/*<button onClick={() => handleDeleteString(s.priority)}>*/}
              {/*  Delete {s.name}*/}
              {/*</button>*/}
            </div>

          })}
        </>
      </StringField>
    </>}
  </div>
}

const StringField = ({ children }: StringFieldProps) => {
  return <div role={'string-field'}>
    {children}
  </div>
}

interface StringFieldProps {
  children: JSX.Element
}

const StringRow: FC<StringRowProps> = ({
  s,
  index,
  handleStringDragAndDrop,
  updateStringName,
}) => {
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
  }), [index])

  const [{ isDragging }, drag, dragPreview] = useDrag(() => ({
    type: DRAG_AND_DROP_TYPES.STRING,
    item: { index },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  }), [index])

  const [editable, setEditable] = useState(false)
  const [internalName, setInternalName] = useState(s.name)

  useEffect(() => setInternalName(s.name), [s.name])

  function handleInternalNameChange (e: React.ChangeEvent<HTMLInputElement>) {
    setInternalName(e.target.value)
  }

  function handleStringNameChange () {
    updateStringName(s.order, internalName)
  }

  function handleStringNameClick () {
    setEditable(true)
  }

  function handleOnKeyUpOnInternalNameInput (e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter' || e.key === 'Escape') {
      handleStringNameChange()
    }
  }

  return <div ref={node => drag(drop(node))} style={{
    opacity: isDragging ? 0.5 : 1,
    height: 30,
    borderBottom: '1px solid black',
    backgroundColor: isOver && canDrop ? 'red' : 'white',
  }}>
    {!editable && <div
      onDoubleClick={handleStringNameClick}
      style={{ width: 100 }}
    >
      {s.name}
    </div>
    }
    {editable &&
      <input
        type={'text'}
        value={internalName}
        onChange={handleInternalNameChange}
        onBlur={handleStringNameChange}
        onKeyUp={handleOnKeyUpOnInternalNameInput}
      />
    }
    {/*<div role="Handle" ref={drag}/>*/}
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
  handleStringDragAndDrop: (fromIndex: number, toIndex: number) => void
  updateStringName: (stringIndex: number, newName: string) => void
}

type ThreadStringMap = Map<ThreadId, IString[]>
type ThreadId = string

const DRAG_AND_DROP_TYPES = {
  STRING: 'STRING',
}

export default HomePage




