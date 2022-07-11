import AxiosApi, { IAxiosRequestConfig } from '../AxiosApi'
import { stringController } from '../../constants/urls'
import { IString } from './IString'

export const getStringsApi = new AxiosApi<IAxiosRequestConfig<ThreadId>, IString[], ThreadId>(
  'GET',
  (id: ThreadId) => `${stringController}?thread=${id}`)

type ThreadId = string

