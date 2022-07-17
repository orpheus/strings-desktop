import React, { useCallback, useEffect, useState } from 'react'
import styles from './styles'
import { useQuery } from 'react-query'
import { getThreadsApi } from '../../../apis/thread/get-threads-api'
import { useCreateThreadMutation } from '../../../apis/thread/create-thread-api'
import { IThread } from '../../../apis/thread/IThread'
import { useDeleteThreadMutation } from '../../../apis/thread/delete-thread-api'
import { IString } from '../../../apis/string/IString'
import { useCreateStringMutation } from '../../../apis/string/create-string-api'
import { getStringsApi } from '../../../apis/string/get-strings-api'
import { useDeleteStringMutation } from '../../../apis/string/delete-string-api'
import {
  useUpdateStringNameMutation,
} from '../../../apis/string/update-string-name-api'
import {
  useUpdateStringOrderMutation,
} from '../../../apis/string/update-strings-order'
import Header from '../../../components/modules/Header/Header'
import ThreadPanel from '../../../components/modules/ThreadPanel/ThreadPanel'
import CreateString from '../../../components/modules/CreateString/CreateString'
import StringField from '../../../components/modules/StringField/StringField'
import StringRow
  from '../../../components/modules/StringField/StringRow/StringRow'

const HomePage = () => {
  const c = styles()
  const [threads, setThreads] = useState<IThread[]>([])
  const [activeThread, setActiveThread] = useState<IThread>()
  const [newThreadName, setNewThreadName] = useState<string>('')

  const activeThreadId = activeThread?.id

  const [newStringName, setNewStringName] = useState<string>('')

  // Queries
  const { data: threadData } = useQuery('threads',
    getThreadsApi.call.bind(getThreadsApi))

  const { data: stringData, refetch: refetchStrings } = useQuery(
    ['strings', activeThreadId],
    () => getStringsApi.call.bind(getStringsApi)({ urlArgs: activeThreadId }),
    {
      enabled: Boolean(activeThreadId),
      staleTime: 5 * 60 * 1000,
    })

  // Mutation
  const createThreadMutation = useCreateThreadMutation()
  const deleteThreadMutation = useDeleteThreadMutation()

  const createStringMutation = useCreateStringMutation()
  const deleteStringMutation = useDeleteStringMutation()
  const updateStringNameMutation = useUpdateStringNameMutation()
  const updateStringOrderMutation = useUpdateStringOrderMutation()

  // Effects
  useEffect(() => {
    setThreads(threadData as IThread[])
  }, [threadData])

  useEffect(() => {
    if (!activeThread && threads?.length > 0) {
      const localActiveThreadId = window.localStorage.getItem('activeThread')
      let thread = threads[0]
      if (localActiveThreadId) {
        thread = threads.find((t: IThread) => t.id == localActiveThreadId) || thread
      }
      setActiveThread(thread)
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
    const value = e.target.value
    window.localStorage.setItem('activeThread', value)
    setActiveThread(threads.find(t => t.id === value))
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
    if (!newStringName) {
      console.log('Skipping string creation with empty name')
      return
    }
    const order = stringData.length

    const newString = {
      name: newStringName,
      thread: activeThread.id,
      order,
    }

    createStringMutation.mutate({
      data: newString,
    }, {
      onSuccess: async () => {
        await refetchStrings()
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

  /**
   * Reorders the strings in memory, updates the string order in the backend,
   * then updates the local react state
   * @param fromIndex - string at index
   * @param toIndex - index to move string
   */
  const handleStringDragAndDrop = useCallback(
    (fromIndex: number, toIndex: number) => {
      // Why does this become unsorted after a while? (after first drag and drop)
      const strings = [...stringData]
      strings.sort((a: IString, b: IString) => {
        return a.order - b.order
      })

      // Splice the item out of its current position, and splice it
      // into it's new position
      strings.splice(toIndex, 0, strings.splice(fromIndex, 1)[0])

      // Re-assign order. Can be optimized to only update order of those that changed
      const mappedStrings = strings.map((s, i) => {
        s.order = i
        return s
      })

      updateStringOrderMutation.mutate({
        data: mappedStrings.map(
          s => ({ name: s.name, order: s.order, id: s.id })),
      }, {
        onSuccess: async () => {
          await refetchStrings()
        },
      })
    }, [refetchStrings, stringData, updateStringOrderMutation])

  async function handleDeleteString (string: IString) {
    deleteStringMutation.mutate({
      urlArgs: string.id,
    }, {
      onSuccess: async () => {
        await refetchStrings()
      },
    })
  }

  async function updateStringName (string: IString, name: string) {
    if (string.name === name) return

    await updateStringNameMutation.mutate({
      params: {
        id: string.id,
        name,
      },
    }, {
      onSuccess: async () => {
        await refetchStrings()
      },
    })
  }

  const strings = stringData || []

  return <div className={c.root}>
    <Header
      title={'Strings'}
    />
    <ThreadPanel
      handleThreadSelect={handleSetActiveThread}
      threads={threads}
      activeThread={activeThread}
      newThreadName={newThreadName}
      handleOnKeyUpOnThreadInput={handleOnKeyUpOnThreadInput}
      setNewThreadName={setNewThreadName}
      handleCreateThread={handleCreateThread}
      handleDeleteThread={handleDeleteThread}
    />
    {activeThread && <>
      <CreateString handleOnKeyUpOnStringInput={handleOnKeyUpOnStringInput}
                    newStringName={newStringName}
                    setNewStringName={setNewStringName}/>
      <StringField>
        <>
          {strings.map((s: IString, index: number) => {
            return <StringRow
              key={s.name}
              s={s}
              index={index}
              handleStringDragAndDrop={handleStringDragAndDrop}
              updateStringName={updateStringName}
              handleDeleteString={handleDeleteString}
            />
          })}
        </>
      </StringField>
    </>}
  </div>
}

export default HomePage




