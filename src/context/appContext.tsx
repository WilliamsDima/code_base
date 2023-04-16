import { Message } from '@appTypes/types'
import { useLocalStorage } from '@hooks/useLocalStorage'
import { THEME_LOCAL } from '@services/constans'
import {
  useContext,
  createContext,
  useMemo,
  FC,
  ReactElement,
  useCallback,
  useState,
} from 'react'

type theme = 'dark' | 'light'
type IContext = {
  themeAppLS: theme
  themeHandler: () => void
  messageWarning: Message | null
  setMessageWarning: (message: Message | null) => void
}

const AppContext = createContext<IContext>({} as IContext)

type AppProviderType = {
  children: ReactElement
}

export const AppProvider: FC<AppProviderType> = ({ children }) => {
  const [themeAppLS, setThemeAppLS] = useLocalStorage(THEME_LOCAL, 'dark')
  const [messageWarning, setMessageWarning] = useState<Message | null>(null)

  const themeHandler = useCallback(() => {
    const value = themeAppLS === 'dark' ? 'light' : 'dark'
    setThemeAppLS(value)
  }, [setThemeAppLS, themeAppLS])

  const value = useMemo(() => {
    return {
      themeAppLS,
      themeHandler,
      messageWarning,
      setMessageWarning,
    }
  }, [themeAppLS, themeHandler, messageWarning])

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export const useAppContext = () => {
  return useContext(AppContext)
}
