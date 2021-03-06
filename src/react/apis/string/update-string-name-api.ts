import makeUseApiMutation from '../ApiMutation'
import { stringController } from '../../constants/urls'
import { AxiosRequestConfig } from 'axios'

export const useUpdateStringNameMutation = makeUseApiMutation<StringReqConfig, boolean>(
  'PUT',
  `${stringController}/updateName`)

interface StringReqConfig extends AxiosRequestConfig {
  params: StringParams
}

interface StringParams {
  id: string
  name: string
}

