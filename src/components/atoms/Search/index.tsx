import React, { FC } from "react"
import Paper from '@mui/material/Paper'
import InputBase from '@mui/material/InputBase'
import IconButton from '@mui/material/IconButton'
import SearchIcon from '@mui/icons-material/Search'
import './styles.scss'

interface ISearch {
  value: string
  onChange: (value: string) => void
  submit: (e: any) => void
}

const Search: FC<ISearch> = ({value, onChange, submit}) => {


  return (
    <Paper
      component="div"
      sx={{ display: 'flex', alignItems: 'center', width: '100%' }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1, fontSize: 14 }}
        value={value}
        onKeyDown={submit}
        onChange={(e: any) => onChange(e?.target?.value)}
        placeholder="Search"
      />
      <IconButton onClick={submit}  type="button" sx={{ p: '10px' }} aria-label="search">
        <SearchIcon sx={{fontSize: 20}}/>
      </IconButton>
    </Paper>
  )
}

export default Search
