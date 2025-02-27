import React, { useRef, useEffect } from 'react';
import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { MeshStandardMaterial } from 'three';

const ThreeScene = () => {
  const gltf = useLoader(GLTFLoader, '/models/scene.glb');
  const sceneRef = useRef();




  
  // Apply metal material to the model
  useEffect(() => {
    if (gltf.scene) {
      gltf.scene.traverse((child) => {
        if (child.isMesh) {
          child.material = new MeshStandardMaterial({
            metalness: 1, // Fully metallic
            roughness: .2, // Slightly rough for realistic reflections
          });
        }
      });
    }
  }, [gltf]);

  return (
    <primitive
      object={gltf.scene}
      ref={sceneRef}
      scale={[10, 10, 50]}
      position={[0, 0, 0]}
      rotation={[0, -50, 0]}
    />
  );
};

export default ThreeScene;