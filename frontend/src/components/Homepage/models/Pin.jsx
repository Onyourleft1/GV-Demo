import React from "react";
import { useGLTF } from "@react-three/drei";

export default function Pin(props) {
	const { nodes, materials } = useGLTF("/assets/models/map_pin.glb");
	return (
		<group {...props} dispose={null}>
			<group scale={0.01}>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.Extrude_remesh_Mat_0.geometry}
					material={materials.material}
					position={[0.015, -0.029, 0]}
				/>
			</group>
		</group>
	);
}

useGLTF.preload("/assets/models/map_pin.glb");
