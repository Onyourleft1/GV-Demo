import React, { useContext, useRef, useState } from "react";
import { useGLTF } from "@react-three/drei";
import Pin from "./Pin";
import { useFrame } from "@react-three/fiber";
import { CoordinatesContext, PopContext } from "../Homepage";
import { DataContext } from "../../../App";

export default function Model(props) {
	const [data] = useContext(DataContext);
	const [, updateMapCenter] = useContext(CoordinatesContext);
	const [, setPop] = useContext(PopContext);

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

		let Latitude = Math.asin(z);
		let Longitude = Math.atan2(y, x);

		let LAT = ((Latitude * 180) / Math.PI) * -1;
		let LNG = (Longitude * 180) / Math.PI;

		updateMapCenter([LAT, LNG]);
	};

	const transformToNormal = (longitude, latitude) => {
		// Step 1: Convert longitude and latitude from degrees to radians
		const lonRad = (longitude - 180) * (Math.PI / 180); // Adjust for Google Maps center
		const latRad = (90 - latitude) * (Math.PI / 180);

		// Step 2: Calculate x, y, z coordinates
		const x = Math.sin(latRad) * Math.cos(lonRad);
		const y = Math.sin(latRad) * Math.sin(lonRad);
		const z = Math.cos(latRad);

		return [-x, -y, -z];
	};

	useFrame(() => {
		pin.current.lookAt(0, 0, 0);
	});
	return (
		<group {...props} dispose={null}>
			<group name="Sketchfab_model" rotation={[-Math.PI / 2, 0, 0]} scale={3}>
				<group name="GLTF_SceneRootNode" rotation={[Math.PI / 2, 0, 0]}>
					<lineSegments
						name="Object_4"
						geometry={nodes.Object_4.geometry}
						material={materials.sat_gps_material}
					>
						<meshBasicMaterial color={"#2f88e4"} />
					</lineSegments>
					<lineSegments
						name="Object_6"
						geometry={nodes.Object_6.geometry}
						material={materials.sat_comms_material}
					/>
					{/* <lineSegments
						name="Object_8"
						geometry={nodes.Object_8.geometry}
						// material={materials.sat_tech_material}
					>
						<meshBasicMaterial color={"#2f88e4"} />
					</lineSegments> */}
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
						// material={materials.routes_material}
					></lineSegments> */}

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
					></mesh>
					<group ref={pin} position={[pos.x, pos.y, pos.z]}>
						<Pin
							scale={0.2}
							rotation-x={-Math.PI / 2}
							position={[0, 0, -0.1]}
						/>
					</group>
					{data.map((d, index) => {
						return (
							<mesh key={index} position={transformToNormal(d.LNG, d.LAT)}>
								<sphereGeometry args={[0.02, 16, 16]} />
								<meshBasicMaterial color={"#2f88e4"} />
							</mesh>
						);
					})}
				</group>
			</group>
		</group>
	);
}

useGLTF.preload("/assets/models/of_planes_and_satellites.glb");
