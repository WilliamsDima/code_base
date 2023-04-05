import { db } from '@api/firebase'
import { IItemCode } from '@appTypes/types'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IUserData } from '@store/redusers/main/types'
import { doc, getDoc } from 'firebase/firestore/lite'
import { User as FirebaseUser } from 'firebase/auth'

export const userAPI = createApi({
  baseQuery: fetchBaseQuery(),
  tagTypes: ['UserCodes'],
  endpoints: (builder) => ({
    fetchCodeListUser: builder.query<IItemCode[], FirebaseUser | null>({
      async queryFn(user) {
        try {
          const id = user?.providerData[0].uid
          if (id) {
            const docRef = doc(db, 'users', id)
            const docSnap = await getDoc(docRef)
            const data = docSnap.data() as IUserData
            return { data: data.codes }
          } else {
            throw new Error('Пользователь не найден')
          }
        } catch (error: any) {
          console.log('Error fetchCodeListUser', error?.message)
          return { error: error.message }
        }
      },
      providesTags: ['UserCodes'],
    }),
  }),
})

export const { useFetchCodeListUserQuery } = userAPI
