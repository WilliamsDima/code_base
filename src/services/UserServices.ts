import { auth, db, storage } from '@api/firebase'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IUserData } from '@store/redusers/main/types'
import {
  arrayRemove,
  arrayUnion,
  doc,
  getDoc,
  updateDoc,
} from 'firebase/firestore/lite'
import { v4 } from 'uuid'
import { deleteObject, ref, uploadBytes } from 'firebase/storage'

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
              images.forEach(async (img: any) => {
                const imgeRef = ref(
                  storage,
                  `images-${id}/${code.id}/${img.name + v4()}`
                )
                await uploadBytes(imgeRef, img)
              })
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
      async queryFn({ codes }) {
        try {
          const id = auth?.currentUser?.providerData[0].uid
          if (id) {
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
              images?.forEach(async (img: any) => {
                const imageListRef = ref(storage, `${img?.path}`)
                await deleteObject(imageListRef)
              })
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
