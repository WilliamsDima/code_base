import { FC, SetStateAction, useState, useCallback } from 'react'
import styles from './styles.module.scss'

type IDropImg = {
  maxFiles: number
  setFile: React.Dispatch<SetStateAction<any[]>>
}

const DropImg: FC<IDropImg> = ({ maxFiles, setFile }) => {
  const [drag, setDrag] = useState(false)

  const dragHandler = useCallback((e: any, value: boolean) => {
    e.preventDefault()
    setDrag(value)
  }, [])

  const onDropHandler = useCallback(
    (e: any) => {
      const files = [...e?.target?.files]

      setFile((prev) => [...prev, ...files])
      setDrag(false)
    },
    [setFile, setDrag]
  )
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
