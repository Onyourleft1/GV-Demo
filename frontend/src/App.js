import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./components/Homepage/Homepage";
import Page404 from "./components/Page404/Page404";
import Header from "./components/Header/Header";
import { Suspense } from "react";

function App() {
	return (
		<div className="App">
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
					<Route path="*" element={<Page404 />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
