import AxiosApi from '../AxiosApi'
import { threadController } from '../../constants/urls'
import { IThread } from './ithread'
import { AxiosRequestConfig } from 'axios'

export const getThreadsApi = new AxiosApi<AxiosRequestConfig, IThread[]>('GET',
  threadController)

