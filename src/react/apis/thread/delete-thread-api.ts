import makeUseApiMutation from '../ApiMutation'
import { threadController } from '../../constants/urls'
import { IAxiosRequestConfig } from '../AxiosApi'

export const useDeleteThreadMutation = makeUseApiMutation<IAxiosRequestConfig<ThreadId>, boolean, ThreadId>(
  'DELETE',
  (id: ThreadId) => {
    console.log("Delete Thread Url: ", id)
    return `${threadController}/${id}`
  })

type ThreadId = string
