import makeUseApiMutation from '../ApiMutation'
import { threadController } from '../../constants/urls'
import { AxiosRequestConfig } from 'axios'
import { IThread } from './IThread'

export const useCreateThreadMutation = makeUseApiMutation<CreateThreadReq, IThread>(
  'POST', threadController)

interface CreateThreadReq extends AxiosRequestConfig {
  data: CreateThreadBody
}

interface CreateThreadBody {
  name: string
  description?: string
}