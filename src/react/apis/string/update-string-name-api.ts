import makeUseApiMutation from '../ApiMutation'
import { stringController } from '../../constants/urls'
import { AxiosRequestConfig } from 'axios'

export const useUpdateStringNameMutation = makeUseApiMutation<CreateStringReq, boolean>(
  'PUT',
  `${stringController}/updateName`)

interface CreateStringReq extends AxiosRequestConfig {
  params: StringReq
}

interface StringReq {
  id: string
  name: string
}

