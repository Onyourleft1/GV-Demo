import React from "react";
import { useGLTF } from "@react-three/drei";

export default function Model(props) {
	const { nodes, materials } = useGLTF(
		"/assets/models/of_planes_and_satellites.glb"
	);
	return (
		<group {...props} dispose={null}>
			<group name="Sketchfab_model" rotation={[-Math.PI / 2, 0, 0]} scale={3}>
				<group name="GLTF_SceneRootNode" rotation={[Math.PI / 2, 0, 0]}>
					<lineSegments
						name="Object_4"
						geometry={nodes.Object_4.geometry}
						material={materials.sat_gps_material}
					/>
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
					/>
				</group>
			</group>
		</group>
	);
}

useGLTF.preload("/assets/models/of_planes_and_satellites.glb");
