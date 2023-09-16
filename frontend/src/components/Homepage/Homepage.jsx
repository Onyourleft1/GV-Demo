import React, { useState } from "react";
import "./Homepage.scss";
import { Canvas } from "@react-three/fiber";
import Scene from "./Scene";

export const CoordinatesContext = React.createContext();

function Homepage() {
	const [mapCenter, setMapCenter] = useState([0, 0]);

	// Function to update the map center
	const updateMapCenter = (newCenter) => {
		setMapCenter(newCenter);
	};

	return (
		<CoordinatesContext.Provider value={[mapCenter, updateMapCenter]}>
			<div id="homepage_container">
				<Canvas style={{ height: "100vh" }}>
					<Scene />
				</Canvas>
			</div>
		</CoordinatesContext.Provider>
	);
}

export default Homepage;
