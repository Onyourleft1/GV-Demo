import { OrbitControls, PerspectiveCamera, Stars } from "@react-three/drei";
import React, { Suspense, useContext, useRef } from "react";
import Model from "./models/Model";
// import Pin from "./models/Pin";
import { useFrame } from "@react-three/fiber";
import { PopContext } from "./Homepage";

function Scene() {
	const camGrp = useRef();
	const [pop] = useContext(PopContext);

	useFrame(() => {
		// camGrp.current.rotation.y += 0.002;
	});
	return (
		<>
			<color attach={"background"} args={["black"]} />
			<group ref={camGrp} rotation={[Math.PI / 5, Math.PI / 1.4, 0]}>
				<PerspectiveCamera makeDefault position={[0, 0, 10]} fov={75} />
			</group>

			<OrbitControls enabled={!pop} enablePan={false} enableZoom={false} />
			<ambientLight intensity={10} />
			<group>
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
			{/* <group>
				<Pin position={[0, 4, 0]} />
			</group>
			<group rotation-z={-Math.PI / 2}>
				<Pin position={[0, -4, 0]} rotation-x={Math.PI} />
			</group> */}

			<Stars />
		</>
	);
}

export default Scene;
