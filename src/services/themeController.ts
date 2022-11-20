import { useEffect } from 'react';
import React from 'react'
import { createTheme } from '@mui/material/styles'

export const useThemeApp = () => {

    const [mode, setMode] = React.useState<'light' | 'dark'>('light')


    const colorMode = React.useMemo(
      () => ({
        toggleColorMode: (value?: any) => {

            if (!value) {
                setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'))
            } else {
                setMode(value)
            }   
        },
      }),
      [],
    )

    const theme = React.useMemo(
        () =>
          createTheme({
            palette: {
              mode,
              primary: {
                main: '#fff',
              },
            },
          }),
        [mode],
      )

    useEffect(() => {

        if (localStorage.getItem('themeApp')) {
            colorMode.toggleColorMode(localStorage.getItem('themeApp'))
        }
    }, [])

    return {theme, colorMode}
}