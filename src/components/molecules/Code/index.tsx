import { FC, useState, memo } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import {
  dracula,
  oneLight,
} from 'react-syntax-highlighter/dist/esm/styles/prism'
import styles from './styles.module.scss'
import { useActions } from '@hooks/useActions'
import { useAppContext } from '@context/appContext'
import Button from '@storybook/atoms/Button'
import { MdOutlineContentCopy, MdOutlineDone } from 'react-icons/md'

type CodeType = {
  code: string
  copy: number
  id: number
  language?: string
}

const Code: FC<CodeType> = memo(({ code, copy, id, language }) => {
  const { copyCode } = useActions()
  const { themeAppLS } = useAppContext()

  const codeTheme = themeAppLS === 'dark' ? dracula : oneLight

  const [copyCount, setCopyCount] = useState<boolean>(false)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [typeCode, setTypeCode] = useState<string>(
    () => language || 'javascript'
  )

  const copyHandler = () => {
    navigator.clipboard.writeText(code).then(
      function () {
        console.log('Async: Copying to clipboard was successful!')
        // copyCode(id)
        setCopyCount(true)
      },
      function (err) {
        console.error('Async: Could not copy text: ', err)
      }
    )
  }
  return (
    <div className={styles['language-javascript-of-snippet']}>
      <div className={styles.copyBtn}>
        <Button className={styles.btn} onClick={copyHandler}>
          {copyCount ? (
            <MdOutlineDone className={styles.done} />
          ) : (
            <MdOutlineContentCopy />
          )}
          :<span>{copy}</span>
        </Button>
      </div>
      <SyntaxHighlighter language={typeCode} style={codeTheme}>
        {`${code}`}
      </SyntaxHighlighter>
    </div>
  )
})

export default Code
