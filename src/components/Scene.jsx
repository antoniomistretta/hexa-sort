import { Canvas } from "@react-three/fiber";

export const Scene = ({ children }) => {
    return (
        <Canvas
            orthographic
            shadows
            camera={{
                up: [0, 0, 1],
                position: [100, 0, 300],
                zoom: 35,
            }}
        >
            <ambientLight />
            <directionalLight
                position={[-100, -100, 200]}
                castShadow
                shadow-mapSize={[2048, 2048]}
                shadow-camera-left={-500}
                shadow-camera-right={500}
                shadow-camera-top={500}
                shadow-camera-bottom={-500}
                shadow-camera-near={0}
                shadow-camera-far={1000}
            />
            {children}
        </Canvas>
    );
};
