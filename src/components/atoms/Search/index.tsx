import { FC } from 'react'
import Paper from '@mui/material/Paper'
import InputBase from '@mui/material/InputBase'
import './styles.scss'

interface ISearch {
  value: string
  onChange: (value: string) => void
}

const Search: FC<ISearch> = ({ value, onChange }) => {
  return (
    <Paper
      component="div"
      sx={{ display: 'flex', alignItems: 'center', width: '100%' }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1, fontSize: 14, height: 40 }}
        value={value}
        onChange={(e: any) => onChange(e?.target?.value)}
        placeholder="Search"
      />
    </Paper>
  )
}

export default Search
