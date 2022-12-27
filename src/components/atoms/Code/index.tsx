import { FC, useState } from "react"
import { Button, Typography } from "@mui/material"
import { green, grey } from "@mui/material/colors"
import ContentCopyIcon from "@mui/icons-material/ContentCopy"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import {
	dracula,
	oneLight,
} from "react-syntax-highlighter/dist/esm/styles/prism"
import "./styles.scss"
import { useActions } from "../../../hooks/useActions"
import { useTheme } from "@mui/material/styles"

type CodeType = {
	code: string
	copy: number
	id: number
}

const Code: FC<CodeType> = ({ code, copy, id }) => {
	const { copyCode } = useActions()

	const theme = useTheme()
	const codeTheme = theme.palette.mode === "dark" ? dracula : oneLight

	const [copyCount, setCopyCount] = useState<boolean>(false)

	const copyHandler = () => {
		navigator.clipboard.writeText(code).then(
			function () {
				console.log("Async: Copying to clipboard was successful!")
				copyCode(id)
				setCopyCount(true)
			},
			function (err) {
				console.error("Async: Could not copy text: ", err)
			}
		)
	}
	return (
		<Typography variant='h5'>
			<div className='language-javascript-of-snippet'>
				<SyntaxHighlighter language='javascript' style={codeTheme}>
					{`${code}`}
				</SyntaxHighlighter>

				<div className='copy_btn'>
					<Button
						sx={{ border: "none", minWidth: "5px" }}
						variant='outlined'
						onClick={copyHandler}
					>
						<ContentCopyIcon
							sx={copyCount ? { color: green[500] } : { color: grey[500] }}
							fontSize='large'
						/>
					</Button>
					<Typography variant='h6' component={"span"} color={green[500]}>
						: {copy}
					</Typography>
				</div>
			</div>
		</Typography>
	)
}

export default Code
