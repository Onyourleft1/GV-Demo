import React, { useContext, useRef, useState } from "react";
import { Html, useGLTF } from "@react-three/drei";
import Pin from "./Pin";
import { useFrame } from "@react-three/fiber";
// import second from 'first'
import "leaflet/dist/leaflet.css"; // Import Leaflet CSS
import { CoordinatesContext } from "../Homepage";
import "leaflet/dist/leaflet.css"; // Import Leaflet CSS
import { MapContainer, TileLayer, Marker } from "react-leaflet";

export default function Model(props) {
	const [mapCenter, updateMapCenter] = useContext(CoordinatesContext);
	const [pop, setPop] = useState(false);
	const [pos, setPos] = useState({
		x: 0,
		y: 0,
		z: 0,
	});

	const pin = useRef();

	const { nodes, materials } = useGLTF(
		"/assets/models/of_planes_and_satellites.glb"
	);

	const calc = (e) => {
		// Assume you have React Three Fiber coordinates (x, y, z)
		const x = e.normal.x;
		const y = e.normal.y;
		const z = e.normal.z;

		// Step 2: Convert to Spherical Coordinates
		const radius = Math.sqrt(x * x + y * y + z * z);
		const theta = Math.atan2(y, x); // Angle in radians
		const phi = Math.acos(z / radius); // Angle in radians

		const longitude = theta * (180 / Math.PI); // Convert to degrees
		const latitude = 90 - phi * (180 / Math.PI); // Convert to degrees

		// Step 3: Adjust for Sphere's Center on Google Maps
		const sphereCenterLatitude = 0;
		const sphereCenterLongitude = 0;

		let adjustedLongitude = longitude + sphereCenterLongitude;
		let adjustedLatitude = latitude + sphereCenterLatitude;

		// Ensure adjusted longitude is in the range -180 to 180
		if (adjustedLongitude > 180) {
			adjustedLongitude -= 360;
		} else if (adjustedLongitude < -180) {
			adjustedLongitude += 360;
		}

		// Ensure adjusted latitude is in the range -90 to 90
		if (adjustedLatitude > 90) {
			adjustedLatitude = 90;
		} else if (adjustedLatitude < -90) {
			adjustedLatitude = -90;
		}

		// Limit the output to 6 digits after the decimal point
		// adjustedLongitude = adjustedLongitude.toFixed(6);
		// adjustedLatitude = -adjustedLatitude.toFixed(6);
		adjustedLongitude = adjustedLongitude.toFixed(3) - 6;
		adjustedLatitude = -adjustedLatitude.toFixed(3) + 7;

		// Now you have the adjusted latitude and longitude for the sphere's position on Google Maps
		// console.log(adjustedLatitude);
		// console.log(adjustedLongitude);

		updateMapCenter([adjustedLongitude, adjustedLatitude]);
	};

	useFrame(() => {
		pin.current.lookAt(0, 0, 0);
	});
	return (
		<group {...props} dispose={null}>
			<group name="Sketchfab_model" rotation={[-Math.PI / 2, 0, 0]} scale={3}>
				<group name="GLTF_SceneRootNode" rotation={[Math.PI / 2, 0, 0]}>
					{/* <lineSegments
						name="Object_4"
						geometry={nodes.Object_4.geometry}
						material={materials.sat_gps_material}
					/> */}
					{/* <lineSegments
						name="Object_6"
						geometry={nodes.Object_6.geometry}
						material={materials.sat_comms_material}
					/> */}
					<lineSegments
						name="Object_8"
						geometry={nodes.Object_8.geometry}
						material={materials.sat_tech_material}
					/>
					{/* <lineSegments
						name="Object_10"
						geometry={nodes.Object_10.geometry}
						material={materials.sat_earth_material}
					/> */}
					{/* <lineSegments
						name="Object_12"
						geometry={nodes.Object_12.geometry}
						material={materials.routes_material}
					/> */}
					{/* <lineSegments
						name="Object_13"
						geometry={nodes.Object_13.geometry}
						material={materials.routes_material}
					/> */}

					<mesh
						name="Object_15"
						geometry={nodes.Object_15.geometry}
						material={materials.earth}
						onPointerEnter={(e) => {
							e.stopPropagation();
						}}
						onPointerMove={(e) => {
							e.stopPropagation();
							setPos({
								x: e.normal.x,
								y: e.normal.y,
								z: e.normal.z,
							});
							// calc(e);
						}}
						onDoubleClick={(e) => {
							e.stopPropagation();
							// console.log(e.normal);
							calc(e);
							setPop(true);
						}}
					>
						<Html
							position={[0, 3, 0]}
							style={{
								opacity: pop ? 1 : 0,
								transition: "all ease-in-out 0.3s",
							}}
							onPointerMissed={(e) => {
								e.stopPropagation();
								setPop(false);
							}}
						>
							<div
								style={{
									width: "30vw",
									height: "30vh",
								}}
							>
								<MapContainer
									center={mapCenter}
									zoom={0}
									style={{
										height: "100%",
										width: "100%",
										borderRadius: "20px",
									}}
								>
									<TileLayer
										url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
										attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
									/>
									<Marker position={mapCenter}>
										{/* <Popup>A sample popup. Replace with your content.</Popup> */}
									</Marker>
								</MapContainer>
							</div>
						</Html>
					</mesh>
					<group ref={pin} position={[pos.x, pos.y, pos.z]}>
						<Pin
							scale={0.2}
							rotation-x={-Math.PI / 2}
							position={[0, 0, -0.1]}
						/>
					</group>
				</group>
			</group>
		</group>
	);
}

useGLTF.preload("/assets/models/of_planes_and_satellites.glb");
