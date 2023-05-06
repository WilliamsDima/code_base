import { initializeApp } from 'firebase/app'
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  listAll,
  ref,
  uploadBytes,
} from 'firebase/storage'
import { getAuth, GoogleAuthProvider, GithubAuthProvider } from 'firebase/auth'
import { doc, getDoc, getFirestore } from 'firebase/firestore/lite'
import { User as FirebaseUser } from 'firebase/auth'
import { IUserData } from '@store/redusers/main/types'
import { v4 } from 'uuid'

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
}

export const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const auth = getAuth(app)
export const storage = getStorage(app)
export const providerGoogle = new GoogleAuthProvider()
export const providerGitHub = new GithubAuthProvider()

export const getDataUser = async (user: FirebaseUser) => {
  const id = user.providerData[0].uid

  try {
    if (id) {
      const docRef = doc(db, 'users', id)
      const docSnap = await getDoc(docRef)
      const data = docSnap.data()
      return data as IUserData
    }
  } catch (error) {
    console.log('Error getDataUser', error)
  }
}

export const getImagesItem = async (id: number) => {
  try {
    const path = auth?.currentUser?.providerData[0].uid
    const imageListRef = ref(storage, `images-${path}/${id}/`)
    const { items } = await listAll(imageListRef)

    const data = items.map(async (item: any) => {
      return {
        path: item?._location?.path_,
        url: await getDownloadURL(item),
      }
    })

    if (data.length) {
      return await Promise.all(data)
    }
  } catch (error) {
    console.log('getImagesItem error', error)
  }
}

export const uploadImagesItem = (images: any[], id: number) => {
  const path = auth?.currentUser?.providerData[0].uid
  try {
    images.forEach(async (img: any) => {
      const imgeRef = ref(storage, `images-${path}/${id}/${img.name + v4()}`)
      await uploadBytes(imgeRef, img)
    })
  } catch (error) {
    console.log('uploadImagesItem error', error)
  }
}

export const deleteImagesItem = (images: any[]) => {
  try {
    images?.forEach(async (img: any) => {
      const imageListRef = ref(storage, `${img?.path}`)
      await deleteObject(imageListRef)
    })
  } catch (error) {
    console.log('deleteImagesItem error', error)
  }
}
