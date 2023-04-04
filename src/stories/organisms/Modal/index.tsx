import {
  HTMLAttributes,
  memo,
  forwardRef,
  useEffect,
  RefObject,
  MutableRefObject,
  Dispatch,
  SetStateAction,
} from 'react'
import styles from './styles.module.scss'
import cn from 'classnames'

interface IModal extends HTMLAttributes<HTMLDialogElement> {
  open: boolean | MutableRefObject<any> | Dispatch<SetStateAction<boolean>>
}

type Ref = RefObject<HTMLDivElement> | any

const Modal = forwardRef<Ref, IModal>((props, ref) => {
  const { open, className, children, ...rest } = props
  const classnames = cn(styles.modal, className, {
    [styles.open]: open,
  })

  useEffect(() => {
    if (open) {
      document.body.classList.add('modal')
    } else {
      document.body.classList.remove('modal')
    }
  }, [open])

  return (
    <dialog className={classnames} {...rest}>
      <div className={styles.modalContent} ref={ref}>
        {children}
      </div>
    </dialog>
  )
})

export default memo(Modal)
