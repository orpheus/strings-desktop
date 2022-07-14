import React, { FC } from 'react'
import styles from './styles'
import { IThread } from '../../../apis/thread/IThread'

const ThreadPanel: FC<ThreadPanelProps> = ({
  threads,
  activeThread,
  handleThreadSelect,
  newThreadName,
  handleOnKeyUpOnThreadInput,
  setNewThreadName,
  // handleCreateThread,
  handleDeleteThread,
}) => {
  const c = styles()
  return <div className={c.root}>
    <div className={c.panelLeft}>
      <input type={'text'}
             placeholder={'new thread'}
             value={newThreadName}
             onKeyUp={handleOnKeyUpOnThreadInput}
             onChange={e => setNewThreadName(e.target.value)}
             className={c.input}
      />
    </div>
    {/*<button*/}
    {/*  onClick={handleCreateThread}*/}
    {/*>*/}
    {/*  +*/}
    {/*</button>*/}
    <div className={c.panelRight}>
      <select
        className={c.select}
        value={activeThread?.id || 'DEFAULT_VALUE'}
        onChange={handleThreadSelect}>
        <option value={'DEFAULT_VALUE'} disabled>Threads</option>
        {threads?.map(thread => {
          return <option key={thread.id} value={thread.id}>
            {thread.name}
          </option>
        })}
      </select>

    </div>
    {activeThread && <div className={c.deleteButton}>
      <button
        className={c.delete}
        onClick={handleDeleteThread}>
        D
      </button>
    </div>}
  </div>
}

export default ThreadPanel

interface ThreadPanelProps {
  activeThread?: IThread
  threads: IThread[]
  handleThreadSelect: (e: React.ChangeEvent<HTMLSelectElement>) => void
  newThreadName: string
  handleOnKeyUpOnThreadInput: (e: React.KeyboardEvent<HTMLInputElement>) => void
  setNewThreadName: (name: string) => void
  handleCreateThread: () => void
  handleDeleteThread: () => void
}