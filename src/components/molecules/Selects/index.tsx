import { FC } from "react"
import Box from "@mui/material/Box"
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import FormControl from "@mui/material/FormControl"
import Select from "@mui/material/Select"
import {} from "@mui/material/colors"
import "./styles.scss"
import { ITag } from "../../../appTypes/types"

type ISelect = {
	label: string
	value: ITag | null
	list: ITag[] | undefined
	onChange: (value: any | null) => void
}

const SelectList: FC<ISelect> = ({ label, value, onChange, list }) => {
	return (
		<div>
			<Box sx={{ minWidth: 90, maxWidth: 120, bgcolor: "background.default" }}>
				<FormControl fullWidth>
					<InputLabel
						sx={{ bgcolor: "background.default" }}
						id='demo-simple-select-label'
					>
						{label.toLocaleLowerCase()}
					</InputLabel>
					<Select
						className='select_list'
						labelId='demo-simple-select-label'
						id='demo-simple-select'
						value={value?.value.toLocaleLowerCase()}
						label={label.toLocaleLowerCase()}
						sx={{ bgcolor: "background.default", fontSize: 14 }}
					>
						{list?.map(t => {
							return (
								<MenuItem
									onClick={() => onChange(t)}
									sx={{ fontSize: 14 }}
									key={t.id}
									value={t.id}
								>
									{t.value.toLocaleLowerCase()}
								</MenuItem>
							)
						})}
					</Select>
				</FormControl>
			</Box>
		</div>
	)
}

export default SelectList
