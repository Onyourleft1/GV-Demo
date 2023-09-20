import React, { useState } from "react";
import "./Homepage.scss";
import { Canvas } from "@react-three/fiber";
import Scene from "./Scene";
import "leaflet/dist/leaflet.css"; // Import Leaflet CSS
// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// import { Html } from "@react-three/drei";
import Form from "./components/Form/Form";

export const CoordinatesContext = React.createContext();
export const PopContext = React.createContext();

function Homepage() {
	const [mapCenter, setMapCenter] = useState([0, 0]);
	const [pop, setPop] = useState(false);

	// Function to update the map center
	const updateMapCenter = (newCenter) => {
		setMapCenter(newCenter);
	};

	return (
		<CoordinatesContext.Provider value={[mapCenter, updateMapCenter]}>
			<PopContext.Provider value={[pop, setPop]}>
				<div id="homepage_container">
					<Canvas style={{ height: "100vh" }}>
						<Scene />
					</Canvas>
				</div>
				<div
					style={{
						opacity: pop ? 1 : 0,
						display: pop ? "inline" : "none",
						width: pop ? "80vw" : "0px",
						height: pop ? "80vh" : "0px",
						transition: "all ease-in-out 0.3s",
						position: "absolute",
						top: "5%",
						left: "5%",
					}}
					position={[0, 0, 0]}
				>
					<Form />
				</div>
			</PopContext.Provider>
		</CoordinatesContext.Provider>
	);
}

export default Homepage;
