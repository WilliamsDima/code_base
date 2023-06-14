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
import { useNavigate } from 'react-router-dom'
import { RoutesNames } from '../navigations/routes-names'

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
  const navigation = useNavigate()
  const [user, setUser] = useState<FirebaseUser | null>(auth?.currentUser)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const toHome = useCallback(() => {
    navigation(RoutesNames.Home)
  }, [navigation])

  const createUser = async (user: FirebaseUser) => {
    const id = user?.providerData[0].uid
    const userData = {
      user: {
        id,
        name: user.displayName,
        email: user.email,
        avatarUrl: user.photoURL,
      },
      codes: [],
    }
    try {
      await setDoc(doc(db, 'users', id), userData)
    } catch (error) {
      console.log('createUser error', error)
    }
  }

  const signIn = useCallback(
    async (value: signIn) => {
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
        toHome()
      } catch (error) {
        console.error('signIn error', error)
      } finally {
        setIsLoading(false)
      }
    },
    [toHome]
  )

  const logout = async () => {
    setIsLoading(true)
    try {
      await signOut(auth)
      setUser(null)
      window.location.reload()
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
        toHome()
      } else {
        setUser(null)
        setIsLoading(false)
      }
    })

    return unsub
  }, [toHome])

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
