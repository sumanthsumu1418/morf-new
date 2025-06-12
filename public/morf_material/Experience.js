import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import Lights from "./Lights.js";
import { useMemo, useState, useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, Text, useGLTF } from "@react-three/drei";

const boxGeometry = new THREE.SphereGeometry(1);

// const textureLoader = new THREE.TextureLoader()

// const floor2Material = new THREE.MeshStandardMaterial({
//     color: "#222222",
//     metalness: 0,
//     roughness: 0,
//   });
//   const obstacleMaterial = new THREE.MeshStandardMaterial({
//     color: "#ff0000",
//     roughness: 1,
//   });
//   const wallMaterial = new THREE.MeshStandardMaterial({
//     color: "#887777",
//     metalness: 0,
//     roughness: 0,
//   });

// const normarMap = textureLoader.load(
//     "/morf_material/FabricLeatherCowhide003_NRM_1K.jpg"
//   );
//   const map = textureLoader.load(
//     "/morf_material/FabricLeatherCowhide003_AO_1K.jpg"
//   );
//   const rufnesh = textureLoader.load(
//     "/morf_material/FabricLeatherCowhide003_GLOSS_1K.jpg"
//   );

const textureLoader = new THREE.TextureLoader();
const normalMap = textureLoader.load("/morf_material/suede___canvas_chocolate_b.jpg");

const rufnesh = textureLoader.load(
  "/morf_material/suede_gloss.jpg"
);

const map = textureLoader.load(
  "/morf_material/suede_ao.jpg"
);

const floor1Material = new THREE.MeshStandardMaterial({
  color: "white",
  map: normalMap,
  roughnessMap: rufnesh,
  aoMap: map
  
  
  // aoMap: map,

  // metalness: 0,
  // roughness: 0,

  //   normalmap: "/morf_material/FabricLeatherCowhide003_NRM_1K.jpg",
  //   map: "/morf_material/FabricLeatherCowhide003_AO_1K.jpg",
  //   roughnessMap: "/morf_material/FabricLeatherCowhide003_GLOSS_1K.jpg",
});

export default function Experience() {
  useEffect(() => {
    return () => {};
  }, []);

  return (
    <>
      <OrbitControls makeDefault />

      <Lights />

      <mesh
        castShadow
        position-x={-2}
        geometry={boxGeometry}
        material={floor1Material}
      >
        {/* <sphereGeometry />
        <meshStandardMaterial    /> */}
      </mesh>

      <mesh castShadow position-x={2} scale={1.5}>
        <boxGeometry />
        <meshStandardMaterial color="mediumpurple" />
      </mesh>

      <mesh
        receiveShadow
        position-y={-1}
        rotation-x={-Math.PI * 0.5}
        scale={10}
      >
        <planeGeometry />
        <meshStandardMaterial color="greenyellow" />
      </mesh>
    </>
  );
}
