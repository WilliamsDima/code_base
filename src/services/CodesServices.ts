import { auth, db, deleteImagesItem, uploadImagesItem } from '@api/firebase'
import { IItemCode } from '@appTypes/types'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Room } from '@storybook/molecules/Select/types'
import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore'
import { deleteItemFromRoom, getCodesAPI } from './ApiUtils'
import { findItem, updateItemCode } from '@hooks/helpers'

type AddCode = {
  code: IItemCode
  images: any[]
}

type UpdateCode = {
  images: any[]
  item: IItemCode
  prevRoom: Room
}

export const codesAPI = createApi({
  reducerPath: 'codesAPI',
  baseQuery: fetchBaseQuery(),
  tagTypes: ['codes'],
  endpoints: (builder) => ({
    // получение массива кодовой базы в зависимости от выбранной комнаты
    getCodesRooms: builder.query<IItemCode[] | undefined, Room>({
      async queryFn(value) {
        try {
          const codes = await getCodesAPI(value)
          return { data: codes }
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
            item?.accessibility?.value === 'only_my' ||
            item?.accessibility?.value === undefined
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
    // обновление элемента из массива в кодовой базой
    updateCodeItem: builder.mutation({
      async queryFn({ images, item, prevRoom }: UpdateCode) {
        try {
          const userId = auth?.currentUser?.providerData[0].uid

          // обновляю картинки если требуется
          if (userId && !!images?.length) {
            await uploadImagesItem(images, item.id)
          }

          if (userId) {
            const myCodes = await getCodesAPI('only_my')
            // обновляю в своей базу
            if (myCodes) {
              const newCodes = updateItemCode(myCodes, item)
              await updateDoc(doc(db, 'users', userId), {
                codes: newCodes,
              })
            }

            const prevCodes = await getCodesAPI(prevRoom)

            if (prevCodes) {
              const prevItem = findItem(prevCodes, item)

              if (prevRoom !== item.accessibility?.value) {
                if (prevRoom !== 'only_my' && prevItem) {
                  console.log('delete prev', item.accessibility?.value)
                  await deleteItemFromRoom(prevItem, prevRoom)
                }

                if (item.accessibility?.value !== 'only_my') {
                  const codesRefRoom = doc(
                    db,
                    'rooms',
                    item.accessibility?.value as string
                  )

                  await updateDoc(codesRefRoom, {
                    codes: arrayUnion(item),
                  })
                }
              }
            }
            // обновляю в комнате так же
            if (item.accessibility?.value !== 'only_my') {
              const codesInRooms = await getCodesAPI(item.accessibility.value)

              if (codesInRooms) {
                const newCodesInRooms = updateItemCode(codesInRooms, item)

                await updateDoc(doc(db, 'rooms', item.accessibility.value), {
                  codes: newCodesInRooms,
                })
              }
            }

            return { data: null }
          } else {
            throw new Error('Пользователь не найден!')
          }
        } catch (error: any) {
          console.log('Error updateCode', error?.message)
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
  useUpdateCodeItemMutation,
} = codesAPI
