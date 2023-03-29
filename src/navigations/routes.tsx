import { Route, Routes } from "react-router-dom"
import Home from "../screens/Home"
import NotFount from "../screens/NotFound"
import { RoutesNames } from "./routes-names"

const Navigations = (props: any) => {
	return (
		<>
			<Routes>
				<Route path={RoutesNames.Home.Home} element={<Home />} />

				{/* 404 page */}
				<Route path='*' element={<NotFount />} />
			</Routes>
		</>
	)
}

export default Navigations
