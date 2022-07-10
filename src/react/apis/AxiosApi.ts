import axios, { AxiosRequestConfig, Method } from 'axios'

class AxiosApi<ApiRequestConfig extends IAxiosRequestConfig<UrlArgs>, Response, UrlArgs = void> {
  constructor (
    public method: Method,
    public url: AxiosUrl<UrlArgs>,
  ) {}

  async call ({
    data,
    params,
    responseType,
    urlArgs,
    ...axiosRequestConfig
  }: ApiRequestConfig): Promise<Response> {
    let url = this.url
    if (typeof url !== 'string') {
      if (urlArgs) {
        url = url(urlArgs)
      } else {
        throw Error("Method passed for AxiosApi.url but no UrlArgs were supplied")
      }
    }
    return (await axios({
      method: this.method,
      url,
      data: data,
      params: params,
      responseType: responseType || 'json',
      headers: {
        // Authorization: `Bearer ${window.localStorage.getItem('jwt')}`, // <- or have it on all calls,
        'content-type': responseType || 'application/json',
        Accept: responseType || 'application/json',
        'Cache-Control':
          'no-cache, no-store, must-revalidate, private, max-age=0',
        ...axiosRequestConfig.headers,
      },
      ...axiosRequestConfig,
    })).data
  }
}

export default AxiosApi

export type AxiosUrl<UrlArgs = void> = string | UrlGetter<UrlArgs>
export type UrlGetter<UrlArgs> = (urlArgs: UrlArgs) => string

export interface IAxiosRequestConfig<UrlArgs = unknown> extends AxiosRequestConfig {
  urlArgs?: UrlArgs
}