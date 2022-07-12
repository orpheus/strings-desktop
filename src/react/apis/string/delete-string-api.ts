import makeUseApiMutation from '../ApiMutation'
import { stringController } from '../../constants/urls'
import { IAxiosRequestConfig } from '../AxiosApi'

export const useDeleteStringMutation = makeUseApiMutation<IAxiosRequestConfig<StringId>, boolean, StringId>(
  'DELETE',
  (id: StringId) => {
    return `${stringController}/${id}`
  })

type StringId = string
