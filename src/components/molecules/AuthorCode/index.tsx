import { FC, memo, useEffect } from 'react'
import styles from './styles.module.scss'
import { useAppSelector } from '@hooks/hooks'
import { IItemCode } from '@appTypes/types'
import { useGetUserQuery } from '@services/UserServices'
import Avatar from '@storybook/atoms/Avatar'
import { Loading } from '@storybook/atoms/Loading'

type Props = {
  item: IItemCode
  clearCashHandler: () => void
}

const AuthorCode: FC<Props> = memo(({ item, clearCashHandler }) => {
  const { room } = useAppSelector((store) => store.main)

  const { data: userData, isLoading } = useGetUserQuery(
    item?.accessibility?.userIdCreator || ''
  )

  useEffect(() => {
    clearCashHandler()
  }, [clearCashHandler, userData])

  return room.value !== 'only_my' ? (
    <>
      {isLoading && <Loading active={isLoading} />}
      <div className={styles.author}>
        {userData && (
          <Avatar
            className={styles.authorAvatar}
            src={userData?.avatarUrl}
            alt={'user-author'}
          />
        )}
        <p className={styles.authorName}>{userData?.name}</p>
      </div>
    </>
  ) : (
    <></>
  )
})

export default AuthorCode
