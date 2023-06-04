import { auth, db, deleteImagesItem, uploadImagesItem } from '@api/firebase'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { arrayRemove, doc, updateDoc } from 'firebase/firestore'

export const userAPI = createApi({
  baseQuery: fetchBaseQuery(),
  tagTypes: ['UserCodes'],
  endpoints: (builder) => ({
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
  useFetchDeleteCodeItemMutation,
  useFetchUpdateCodeItemMutation,
} = userAPI
