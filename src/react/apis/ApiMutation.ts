import AxiosApi, { AxiosUrl, IAxiosRequestConfig } from './AxiosApi'
import { useMutation, UseMutationOptions } from 'react-query'
import { Method } from 'axios'

function makeUseApiMutation<T extends IAxiosRequestConfig<UrlArgs>, Response, UrlArgs = void> (
  method: Method,
  url: AxiosUrl<UrlArgs>) {
  const api = new AxiosApi<T, Response, UrlArgs>(method, url)
  return (options?: Omit<UseMutationOptions<Response, unknown, T>, 'mutationFn'>) => {
    return useMutation(api.call.bind(api), options)
  }
}

export default makeUseApiMutation
