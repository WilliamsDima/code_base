/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useMemo } from "react"
import { createTheme } from "@mui/material/styles"

export const useThemeApp = () => {
	const [mode, setMode] = useState<"light" | "dark">("dark")

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
		if (localStorage.getItem("themeApp")) {
			colorMode.toggleColorMode(localStorage.getItem("themeApp"))
		}
	}, [])

	return { theme, colorMode }
}
