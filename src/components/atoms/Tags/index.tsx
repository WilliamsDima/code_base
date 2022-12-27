import { FC } from "react"
import { Typography, Chip } from "@mui/material"
import "./styles.scss"

type ITag = {
	id: number
	value: string
}

type ITags = {
	tags: ITag[]
	maxTags: number
	deleteTag: (id: number) => void
}

const Tags: FC<ITags> = ({ tags, maxTags, deleteTag }) => {
	return (
		<div className={tags.length > maxTags ? "tags_list error" : "tags_list"}>
			{tags.map((item: ITag) => {
				return (
					<Chip
						key={item.id}
						label={item.value}
						sx={{ mr: 1, mb: 1, fontSize: 14 }}
						variant='outlined'
						onDelete={() => deleteTag(item.id)}
					/>
				)
			})}
			<Typography sx={{ mt: -1 }} fontWeight={500} variant='h5' component='p'>
				{tags.length}/{maxTags}
			</Typography>
		</div>
	)
}

export default Tags
