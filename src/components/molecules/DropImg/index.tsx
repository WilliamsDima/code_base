import { FC } from 'react'
import styles from './styles.module.scss'

type IDropImg = {
  drag: boolean
  maxFiles: number
  dragHandler: (e: any, value: boolean) => any
  onDropHandler: (e: any) => any
}

const DropImg: FC<IDropImg> = ({
  drag,
  dragHandler,
  maxFiles,
  onDropHandler,
}) => {
  return (
    <div className={styles.drop}>
      {drag ? (
        <div
          onDragStart={(e) => dragHandler(e, true)}
          onDragOver={(e) => dragHandler(e, false)}
          onDragLeave={(e) => dragHandler(e, true)}
          className={styles.drag}
        >
          <input
            accept=".png, .jpg, .jpeg"
            type="file"
            multiple={true}
            maxLength={maxFiles}
            onDrop={onDropHandler}
            onChange={onDropHandler}
          />
          <p className={styles.textDrop}>Отпустите файл для загрузки</p>
        </div>
      ) : (
        <div
          onDragStart={(e) => dragHandler(e, true)}
          onDragOver={(e) => dragHandler(e, false)}
          onDragLeave={(e) => dragHandler(e, true)}
          className={styles.drag}
        >
          <input
            accept=".png, .jpg, .jpeg"
            multiple={true}
            type="file"
            onDrop={onDropHandler}
            onChange={onDropHandler}
          />
          <p className={styles.textDrop}>перетащите файл для загрузки</p>
        </div>
      )}
    </div>
  )
}

export default DropImg
