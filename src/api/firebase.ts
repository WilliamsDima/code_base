import { useEffect, useState } from "react"
import { initializeApp } from "firebase/app"
import { getStorage } from "firebase/storage"
import {
	getAuth,
	GoogleAuthProvider,
	onAuthStateChanged,
	signInWithPopup,
	signOut,
} from "firebase/auth"
import {
	doc,
	getDoc,
	getFirestore,
	setDoc,
	updateDoc,
} from "firebase/firestore/lite"
import { User as FirebaseUser } from "firebase/auth"
import { IItemCode } from "../services/types"

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
const db = getFirestore(app)
const auth = getAuth(app)
const storage = getStorage(app)
const provider = new GoogleAuthProvider()

export const getDataUser = async (user: FirebaseUser) => {
	const id = user.providerData[0].uid

	const docRef = doc(db, "users", id)
	const docSnap = await getDoc(docRef)
	const data = docSnap.data()
	return data
}

export const addCode = async (user: FirebaseUser, codes: IItemCode[]) => {
	const id = user.providerData[0].uid

	await updateDoc(doc(db, "users", id), {
		id,
		name: user.displayName,
		email: user.email,
		codes,
	})
}

export const useAuth = () => {
	const [user, setUser] = useState<FirebaseUser | null>(auth?.currentUser)

	const addUser = async (user: FirebaseUser) => {
		const id = user.providerData[0].uid

		const isUser = await getDataUser(user)

		if (!!isUser) {
			await updateDoc(doc(db, "users", id), {
				id,
				name: user.displayName,
				email: user.email,
			})
		} else {
			await setDoc(doc(db, "users", id), {
				id,
				name: user.displayName,
				email: user.email,
				codes: [],
			})
		}
	}

	const signIn = async () => {
		try {
			const res = await signInWithPopup(auth, provider)
			const userData = res.user

			addUser(userData)
			setUser(userData)
		} catch (err) {
			console.error(err)
		} finally {
		}
	}

	const logout = () => {
		signOut(auth)
		setUser(null)
	}

	const isAuth = () =>
		onAuthStateChanged(auth, user => {
			if (user) {
				setUser(user)
			} else {
				console.log("isAuth error logout")
			}
		})

	useEffect(() => {
		isAuth()
	}, [])

	return { user, signIn, logout, storage }
}
