import "./App.scss"
import { Provider } from "react-redux"
import { BrowserRouter } from "react-router-dom"
import { ThemeProvider } from "@mui/material/styles"
import { AppContext } from "./context"
import { store } from "./store"
import { useThemeApp } from "./hooks/useTheme"
import Navigations from "./navigations/routes"

function App() {
	const { colorMode, theme } = useThemeApp()

	return (
		<AppContext.Provider value={colorMode}>
			<Provider store={store}>
				<BrowserRouter>
					<ThemeProvider theme={theme}>
						<Navigations />
					</ThemeProvider>
				</BrowserRouter>
			</Provider>
		</AppContext.Provider>
	)
}

export default App
