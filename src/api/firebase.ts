import { initializeApp } from 'firebase/app'
import { getStorage, ref, deleteObject } from 'firebase/storage'
import { getAuth, GoogleAuthProvider, GithubAuthProvider } from 'firebase/auth'
import { doc, getDoc, getFirestore, updateDoc } from 'firebase/firestore/lite'
import { User as FirebaseUser } from 'firebase/auth'
import { IItemCode } from '../appTypes/types'
import { IUserData } from '@store/redusers/main/types'

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
}

const app = initializeApp(firebaseConfig)
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

export const addCode = async (codes: IItemCode[]) => {
  const id = auth?.currentUser?.providerData[0].uid

  try {
    if (id) {
      await updateDoc(doc(db, 'users', id), {
        codes,
      })
    }
  } catch (error) {
    console.log('Error addCode', error)
  }
}

export const deleteCode = (images: null | any[]) => {
  if (images?.length) {
    images?.forEach((img) => {
      const imageListRef = ref(storage, `${img?.path}`)
      deleteObject(imageListRef)
        .then(() => {
          console.log('file delited!')
        })
        .catch((error) => {
          console.log('deleteHandler', error)
        })
    })
  }
}
