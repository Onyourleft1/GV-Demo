import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./components/Homepage/Homepage";
import Page404 from "./components/Page404/Page404";
import Header from "./components/Header/Header";
import React, { Suspense, useEffect, useState } from "react";
import GridPage from "./components/GridPage/GridPage";
import axios from "axios";

export const DataContext = React.createContext();

function App() {
	const [data, setData] = useState([]);
	const updatedata = (data) => {
		setData(data);
	};
	useEffect(() => {
		// setData([
		// 	{
		// 		ID: 1,
		// 		Name: "Lebanon",
		// 		Notes: "This is a test",
		// 		LAT: 33.95,
		// 		LNG: 35.922,
		// 	},
		// 	{
		// 		ID: 2,
		// 		Name: "Egypt",
		// 		Notes: "This is a test",
		// 		LAT: 26.476,
		// 		LNG: 32.539,
		// 	},
		// ]);
		axios
			.get("/api/data")
			.then((response) => {
				setData(response.data);
			})
			.catch((error) => {
				console.log(error);
			});
	}, [data]);

	return (
		<div className="App">
			<DataContext.Provider value={[data, updatedata]}>
				<BrowserRouter>
					<Header />
					<Routes>
						<Route
							path="/"
							element={
								<Suspense fallback={<p>Loading</p>}>
									<Homepage />
								</Suspense>
							}
						/>
						<Route path="/Grid" element={<GridPage />} />
						<Route path="*" element={<Page404 />} />
					</Routes>
				</BrowserRouter>
			</DataContext.Provider>
		</div>
	);
}

export default App;
