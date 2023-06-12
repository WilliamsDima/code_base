import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getUserAPI } from './ApiUtils'
import { User } from '@appTypes/types'

export const userAPI = createApi({
  reducerPath: 'userAPI',
  baseQuery: fetchBaseQuery(),
  tagTypes: ['user'],
  endpoints: (builder) => ({
    // получение пользователя
    // нужно сделать так чтоб при заходе на сайт данные пользователя в коллекции обновлялись, чтоб аватарка была актуальной
    getUser: builder.query<User | undefined, string>({
      async queryFn(uid) {
        try {
          const user = await getUserAPI(uid)
          return { data: user }
        } catch (error: any) {
          console.log('Error getUser', error?.message)
          return { error: error.message }
        }
      },
      providesTags: ['user'],
    }),
  }),
})

export const { useGetUserQuery } = userAPI
