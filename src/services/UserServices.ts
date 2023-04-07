import { auth, db, deleteImagesItem, uploadImagesItem } from '@api/firebase'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IUserData } from '@store/redusers/main/types'
import {
  arrayRemove,
  arrayUnion,
  doc,
  getDoc,
  updateDoc,
} from 'firebase/firestore/lite'

export const userAPI = createApi({
  baseQuery: fetchBaseQuery(),
  tagTypes: ['UserCodes'],
  endpoints: (builder) => ({
    fetchCodeListUser: builder.query({
      async queryFn() {
        try {
          const id = auth?.currentUser?.providerData[0].uid
          if (id) {
            const docRef = doc(db, 'users', id)
            const docSnap = await getDoc(docRef)
            const data = docSnap.data() as IUserData
            return { data: data.codes }
          } else {
            throw new Error('Пользователь не найден!')
          }
        } catch (error: any) {
          console.log('Error fetchCodeListUser', error?.message)
          return { error: error.message }
        }
      },
      providesTags: ['UserCodes'],
    }),
    fetchAddCodeListUser: builder.mutation({
      async queryFn({ code, images }) {
        try {
          const id = auth?.currentUser?.providerData[0].uid
          if (id) {
            const userRef = doc(db, 'users', id)

            if (images.length) {
              await uploadImagesItem(images, code.id)
            }

            await updateDoc(userRef, {
              codes: arrayUnion(code),
            })

            return { data: null }
          } else {
            throw new Error('Пользователь не найден!')
          }
        } catch (error: any) {
          console.log('Error addCode', error?.message)
          return { error: error.message }
        }
      },
      invalidatesTags: ['UserCodes'],
    }),
    fetchUpdateCodeItem: builder.mutation({
      async queryFn({ codes, images, idItem }) {
        try {
          const id = auth?.currentUser?.providerData[0].uid
          if (id) {
            if (images?.length) {
              await uploadImagesItem(images, idItem)
            }

            await updateDoc(doc(db, 'users', id), {
              codes,
            })

            return { data: null }
          } else {
            throw new Error('Пользователь не найден!')
          }
        } catch (error: any) {
          console.log('Error updateCode', error?.message)
          return { error: error.message }
        }
      },
      invalidatesTags: ['UserCodes'],
    }),
    fetchDeleteCodeItem: builder.mutation({
      async queryFn({ item, images }) {
        try {
          const id = auth?.currentUser?.providerData[0].uid
          if (id) {
            const userRef = doc(db, 'users', id)

            if (images?.length) {
              deleteImagesItem(images)
            }

            await updateDoc(userRef, {
              codes: arrayRemove(item),
            })
            return { data: null }
          } else {
            throw new Error('Пользователь не найден!')
          }
        } catch (error: any) {
          console.log('Error removeCode', error?.message)
          return { error: error.message }
        }
      },
      invalidatesTags: ['UserCodes'],
    }),
  }),
})

export const {
  useFetchCodeListUserQuery,
  useFetchAddCodeListUserMutation,
  useFetchDeleteCodeItemMutation,
  useFetchUpdateCodeItemMutation,
} = userAPI
