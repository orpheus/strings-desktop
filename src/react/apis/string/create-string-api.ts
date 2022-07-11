import makeUseApiMutation from '../ApiMutation'
import { stringController } from '../../constants/urls'
import { AxiosRequestConfig } from 'axios'
import { IString } from './IString'

export const useCreateStringMutation = makeUseApiMutation<CreateStringReq, IString>(
  'POST', stringController)

interface CreateStringReq extends AxiosRequestConfig {
  data: StringReq
}

interface StringReq {
  name: string
  description?: string
  thread: string
  order: number
}

