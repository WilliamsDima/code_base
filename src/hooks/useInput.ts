import { useState, ChangeEvent } from 'react'

export const useInput = (initialValue: any) => {
  const [value, setValue] = useState(initialValue)
  const [error, setError] = useState(false)

  const reset = () => {
    setValue(initialValue)
  }

  const bind = {
    value,
    onChange: (event: ChangeEvent<HTMLInputElement>) =>
      setValue(event.target.value),
  }

  return { value, reset, bind, error, setError }
}
