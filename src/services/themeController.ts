import { useLocalStorage } from "./../hooks/useLocalStorage"
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useMemo } from "react"
import { createTheme } from "@mui/material/styles"

export const useThemeApp = () => {
	const [mode, setMode] = useState<"light" | "dark">("dark")

	const [themeLocal] = useLocalStorage("themeApp", "")

	const colorMode = useMemo(
		() => ({
			toggleColorMode: (value?: any) => {
				if (!value) {
					setMode(prevMode => (prevMode === "light" ? "dark" : "light"))
				} else {
					setMode(value)
				}
			},
		}),
		[]
	)

	const theme = useMemo(
		() =>
			createTheme({
				palette: {
					mode,
					primary: {
						main: "#fff",
					},
				},
			}),
		[mode]
	)

	useEffect(() => {
		if (themeLocal) {
			colorMode.toggleColorMode(themeLocal)
		}
	}, [])

	return { theme, colorMode }
}
