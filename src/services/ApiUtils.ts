import { auth, db } from '@api/firebase'
import { IItemCode, User } from '@appTypes/types'
import { Room } from '@storybook/molecules/Select/types'
import { doc, getDoc, updateDoc, arrayRemove } from 'firebase/firestore'

export const getCodesAPI = async (
  value: Room
): Promise<IItemCode[] | undefined> => {
  try {
    const path = value === 'only_my' ? 'users' : 'rooms'
    const userId = auth?.currentUser?.providerData[0].uid
    const id = value === 'only_my' ? userId : value

    if (value && id) {
      const codesRef = doc(db, path, id)
      const codes = (await getDoc(codesRef)).get('codes')

      return codes
    } else {
      const errorText = userId
        ? 'Комната не найдена!'
        : 'Пользователь не найден!'
      throw new Error(errorText)
    }
  } catch (error: any) {
    console.log('Error getCodesRooms', error?.message)
  }
}

export const deleteItemFromRoom = async (item: IItemCode, room: Room) => {
  const userId = auth?.currentUser?.providerData[0].uid

  if (userId) {
    const codesRef = doc(db, 'rooms', room)

    await updateDoc(codesRef, {
      codes: arrayRemove(item),
    })
  }
}

export const getUserAPI = async (uid: string): Promise<User | undefined> => {
  try {
    const usersRef = doc(db, 'users', uid)
    const user = (await getDoc(usersRef)).get('user')
    return user
  } catch (error: any) {
    console.log('Error getUserAPI', error?.message)
  }
}
