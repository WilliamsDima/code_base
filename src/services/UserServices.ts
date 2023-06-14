import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getUserAPI } from './ApiUtils'
import { User } from '@appTypes/types'
import { doc, updateDoc } from 'firebase/firestore'
import { auth, db } from '@api/firebase'

export const userAPI = createApi({
  reducerPath: 'userAPI',
  baseQuery: fetchBaseQuery(),
  tagTypes: ['user'],
  endpoints: (builder) => ({
    // получение пользователя
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
    // обновление данных пользователя
    updateUserData: builder.mutation({
      async queryFn() {
        try {
          const userId = auth?.currentUser?.providerData[0].uid
          const currentUser = auth?.currentUser

          if (userId && currentUser) {
            const userRef = doc(db, 'users', userId as string)

            const userData: User = {
              avatarUrl: currentUser.photoURL || '',
              email: currentUser.email || '',
              id: userId,
              name: currentUser.displayName || '',
            }

            await updateDoc(userRef, {
              user: userData,
            })

            return { data: userData }
          } else {
            const errorText = 'Пользователь не найден!'
            throw new Error(errorText)
          }
        } catch (error: any) {
          console.log('Error updateUserData', error?.message)
          return { error: error.message }
        }
      },
      invalidatesTags: ['user'],
    }),
  }),
})

export const { useGetUserQuery, useUpdateUserDataMutation } = userAPI
