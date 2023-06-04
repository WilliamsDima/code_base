import { auth, db, deleteImagesItem, uploadImagesItem } from '@api/firebase'
import { IItemCode } from '@appTypes/types'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Room } from '@storybook/molecules/Select/types'
import {
  arrayRemove,
  arrayUnion,
  doc,
  getDoc,
  updateDoc,
} from 'firebase/firestore'

type AddCode = {
  code: IItemCode
  images: any[]
}

export const codesAPI = createApi({
  reducerPath: 'codesAPI',
  baseQuery: fetchBaseQuery(),
  tagTypes: ['codes'],
  endpoints: (builder) => ({
    // получение массива кодовой базы в зависимости от выбранной комнаты
    getCodesRooms: builder.query<IItemCode[], Room>({
      async queryFn(value) {
        try {
          const path = value === 'only_my' ? 'users' : 'rooms'
          const userId = auth?.currentUser?.providerData[0].uid
          const id = value === 'only_my' ? userId : value

          if (value && id) {
            const codesRef = doc(db, path, id)
            const codes = (await getDoc(codesRef)).get('codes')

            return { data: codes }
          } else {
            const errorText = userId
              ? 'Комната не найдена!'
              : 'Пользователь не найден!'
            throw new Error(errorText)
          }
        } catch (error: any) {
          console.log('Error getCodesRooms', error?.message)
          return { error: error.message }
        }
      },
      providesTags: ['codes'],
    }),
    // добавление элемента в массив с кодовой базой
    addCode: builder.mutation({
      async queryFn({ code, images }: AddCode) {
        try {
          const path =
            code?.accessibility?.value === 'only_my' ? 'users' : 'rooms'

          const userId = auth?.currentUser?.providerData[0].uid
          const id =
            code?.accessibility?.value === 'only_my'
              ? userId
              : code?.accessibility?.value

          if (id && userId) {
            const codesRef = doc(db, path, id as string)
            const userRef = doc(db, 'users', userId as string)

            if (images?.length) {
              await uploadImagesItem(images, code.id)
            }

            await updateDoc(codesRef, {
              codes: arrayUnion(code),
            })

            if (code?.accessibility?.value !== 'only_my') {
              await updateDoc(userRef, {
                codes: arrayUnion(code),
              })
            }

            return { data: null }
          } else {
            const errorText = userId
              ? 'Комната не найдена!'
              : 'Пользователь не найден!'
            throw new Error(errorText)
          }
        } catch (error: any) {
          console.log('Error addCode', error?.message)
          return { error: error.message }
        }
      },
      invalidatesTags: ['codes'],
    }),
    // удаление элемента из массива с кодовой базой
    deleteCodeItem: builder.mutation({
      async queryFn({ item, images }) {
        try {
          const userId = auth?.currentUser?.providerData[0].uid

          const id =
            item?.accessibility?.value === 'only_my'
              ? userId
              : item?.accessibility?.value

          if (id && userId) {
            const codesRef = doc(db, 'rooms', id as string)
            const userRef = doc(db, 'users', userId as string)

            if (images?.length) {
              deleteImagesItem(images)
            }

            await updateDoc(userRef, {
              codes: arrayRemove(item),
            })

            await updateDoc(codesRef, {
              codes: arrayRemove(item),
            })

            return { data: null }
          } else {
            const errorText = userId
              ? 'Комната не найдена!'
              : 'Пользователь не найден!'
            throw new Error(errorText)
          }
        } catch (error: any) {
          console.log('Error removeCode', error?.message)
          return { error: error.message }
        }
      },
      invalidatesTags: ['codes'],
    }),
  }),
})

export const {
  useGetCodesRoomsQuery,
  useAddCodeMutation,
  useDeleteCodeItemMutation,
} = codesAPI
