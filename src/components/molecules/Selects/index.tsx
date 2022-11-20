import React, { FC } from "react"
import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import {  } from '@mui/material/colors'
import './styles.scss'
import { ITag } from "../../../services/types"

type ISelect = {
  label: string
  value: ITag | null
  list: ITag[] | undefined
  onChange: (value: any | null) => void
}

const SelectList: FC<ISelect> = ({ label, value, onChange, list}) => {

  return (
    <div className="select_list">
      <Box sx={{ minWidth: 90, maxWidth: 120, bgcolor: 'background.default' }}>
        <FormControl fullWidth>
          <InputLabel 
          sx={{bgcolor: 'background.default'}}
          id="demo-simple-select-label">
            {label}
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={value?.value}
            label={label}
            sx={{ bgcolor: 'background.default', fontSize: 14 }}
            
          >
            {list?.map((t) => {
              return <MenuItem 
              onClick={() => onChange(t)}
              sx={{ fontSize: 14 }}
              key={t.id} 
              value={t.id}>{t.value}</MenuItem>
            })}
          </Select>
        </FormControl>
      </Box>
    </div>
  )
}

export default SelectList
