import { FC, useState, memo } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import {
  dracula,
  oneLight,
} from 'react-syntax-highlighter/dist/esm/styles/prism'
import styles from './styles.module.scss'
import { useAppContext } from '@context/appContext'
import Button from '@storybook/atoms/Button'
import { MdOutlineContentCopy, MdOutlineDone } from 'react-icons/md'

type CodeType = {
  code: string
  copy: number
  id: number
  language?: string
  copyHandler: () => void
}

const Code: FC<CodeType> = memo(
  ({ code, copy, id, language = 'javascript', copyHandler }) => {
    const { themeAppLS } = useAppContext()

    const codeTheme = themeAppLS === 'dark' ? dracula : oneLight

    const [copyCount, setCopyCount] = useState<boolean>(false)

    const copyHandlerBtn = () => {
      navigator.clipboard.writeText(code).then(
        function () {
          //console.log('Async: Copying to clipboard was successful!')
          copyHandler()
          setCopyCount(true)
        },
        function (err) {
          console.error('Async: Could not copy text: ', err, code)
        }
      )
    }
    return (
      <div className={styles['language-of-snippet']}>
        <div className={styles.copyBtn}>
          <Button className={styles.btn} onClick={copyHandlerBtn}>
            {copyCount ? (
              <MdOutlineDone className={styles.done} />
            ) : (
              <MdOutlineContentCopy />
            )}
            :<span>{copy}</span>
          </Button>
        </div>
        <SyntaxHighlighter language={language} style={codeTheme}>
          {`${code}`}
        </SyntaxHighlighter>
      </div>
    )
  }
)

export default Code
