import { useEffect } from "react"
import { useState } from "react"
import { onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth"
import { doc, setDoc, updateDoc } from "firebase/firestore/lite"
import { User as FirebaseUser } from "firebase/auth"
import { auth, db, getDataUser, provider, storage } from "../api/firebase"

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
