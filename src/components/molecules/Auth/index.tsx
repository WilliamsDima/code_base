import { FC, memo } from 'react'
import styles from './styles.module.scss'
import Button from '@storybook/atoms/Button'
import { useAuth } from '@hooks/useAuth'
import { FcGoogle } from 'react-icons/fc'
import { GoMarkGithub } from 'react-icons/go'

const Auth: FC = memo(() => {
  const { signIn, isLoading } = useAuth()

  return (
    <div className={styles.auth}>
      {!isLoading && (
        <>
          <p>Auth тут какой то текст и картинка</p>
          <div className={styles.btns}>
            <Button className={styles.btn} onClick={() => signIn('google')}>
              <FcGoogle />
              <p>Войти с помощью Google</p>
            </Button>
            <Button className={styles.btn} onClick={() => signIn('github')}>
              <GoMarkGithub />
              <p>Войти с помощью GitHub</p>
            </Button>
          </div>
        </>
      )}
    </div>
  )
})

export default Auth
