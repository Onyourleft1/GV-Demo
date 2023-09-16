import { OrbitControls, PerspectiveCamera, Stars } from "@react-three/drei";
import React, { Suspense } from "react";
import Model from "./models/Model";
import Pin from "./models/Pin";

function Scene() {
	return (
		<>
			<color attach={"background"} args={["black"]} />
			<PerspectiveCamera makeDefault position={[0, 0, 10]} fov={75} />
			<OrbitControls />
			<ambientLight intensity={10} />
			<group rotation={[Math.PI / 16 + 0.1, -Math.PI / 2 - 0.7, 0]}>
				<Suspense
					fallback={
						<mesh>
							<sphereGeometry args={[3.4, 8, 8]} />
							<meshBasicMaterial color={"white"} wireframe />
						</mesh>
					}
				>
					<Model />
				</Suspense>
			</group>
			<group position={[0, 4, 0]}>
				<Pin />
			</group>

			<Stars />
		</>
	);
}

export default Scene;
