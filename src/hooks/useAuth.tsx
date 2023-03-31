import {
  auth,
  db,
  getDataUser,
  providerGitHub,
  providerGoogle,
} from '@api/firebase'
import {
  onAuthStateChanged,
  User as FirebaseUser,
  signInWithPopup,
  signOut,
} from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore/lite'
import React, {
  FC,
  useState,
  useMemo,
  createContext,
  useContext,
  useEffect,
  ReactElement,
  useCallback,
} from 'react'

type signIn = 'google' | 'github'

type IContext = {
  user: FirebaseUser | null
  isLoading: boolean
  signIn: (value: signIn) => void
  logout: () => void
}

const AuthContext = createContext<IContext>({} as IContext)

type AuthProviderType = {
  children: ReactElement | boolean
}

export const AuthProvider: FC<AuthProviderType> = ({ children }) => {
  const [user, setUser] = useState<FirebaseUser | null>(auth?.currentUser)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const createUser = async (user: FirebaseUser) => {
    const userData = {
      id: user.uid,
      name: user.displayName,
      email: user.email,
      codes: [],
    }
    try {
      await setDoc(doc(db, 'users', user.uid), userData)
    } catch (error) {
      console.log('createUser error', error)
    }
  }

  const signIn = useCallback(async (value: signIn) => {
    setIsLoading(true)
    try {
      const res = await signInWithPopup(
        auth,
        value === 'google' ? providerGoogle : providerGitHub
      )
      const userData = res.user

      const isUser = await getDataUser(userData)

      !isUser && createUser(userData)
      setUser(userData)
    } catch (error) {
      console.error('signIn error', error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const logout = async () => {
    setIsLoading(true)
    try {
      await signOut(auth)
      setUser(null)
    } catch (error) {
      console.log('logout error', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user: any) => {
      setIsLoading(true)
      if (user) {
        setUser(user)
        setIsLoading(false)
      } else {
        setUser(null)
        setIsLoading(false)
      }
    })

    return unsub
  }, [])

  const value = useMemo(() => {
    return {
      user,
      isLoading,
      signIn,
      logout,
    }
  }, [user, isLoading, signIn])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  return useContext(AuthContext)
}
