import React from "react";
import "./Homepage.scss";
import { Canvas } from "@react-three/fiber";
import Scene from "./Scene";

function Homepage() {
	return (
		<div id="homepage_container">
			<Canvas style={{ height: "100vh" }}>
				<Scene />
			</Canvas>
		</div>
	);
}

export default Homepage;
