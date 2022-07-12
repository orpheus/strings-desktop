import makeUseApiMutation from '../ApiMutation'
import { stringController } from '../../constants/urls'
import { AxiosRequestConfig } from 'axios'

export const useUpdateStringOrderMutation = makeUseApiMutation<StringReqConfig, boolean>(
  'PUT',
  `${stringController}/updateOrder`)

interface StringReqConfig extends AxiosRequestConfig {
  data: StringOrderData[]
}

interface StringOrderData {
  id: string
  order: number
  name?: string
}

