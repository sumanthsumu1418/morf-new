import React, {
  Suspense,
  useRef,
  useState,
  useEffect,
  useCallback,
} from "react";
import { Canvas } from "@react-three/fiber";
import {
  useGLTF,
  OrbitControls,
  useProgress,
  ContactShadows,
} from "@react-three/drei";
import * as THREE from "three";

function HSLAToHexA(h, s, l) {
  s /= 100;
  l /= 100;
  let c = (1 - Math.abs(2 * l - 1)) * s,
    x = c * (1 - Math.abs(((h / 60) % 2) - 1)),
    m = l - c / 2,
    r = 0,
    g = 0,
    b = 0;
  if (0 <= h && h < 60) {
    r = c;
    g = x;
    b = 0;
  } else if (60 <= h && h < 120) {
    r = x;
    g = c;
    b = 0;
  } else if (120 <= h && h < 180) {
    r = 0;
    g = c;
    b = x;
  } else if (180 <= h && h < 240) {
    r = 0;
    g = x;
    b = c;
  } else if (240 <= h && h < 300) {
    r = x;
    g = 0;
    b = c;
  } else if (300 <= h && h < 360) {
    r = c;
    g = 0;
    b = x;
  }
  // Having obtained RGB, convert channels to hex
  r = Math.round((r + m) * 255).toString(16);
  g = Math.round((g + m) * 255).toString(16);
  b = Math.round((b + m) * 255).toString(16);
  if (r.length == 1) r = "0" + r;
  if (g.length == 1) g = "0" + g;
  if (b.length == 1) b = "0" + b;
  return "#" + r + g + b;
}

import { modelsData, modelsPartsData, decorationsTypeData } from "lib/data";

function Sneaker({
  setCurrentSeleted,
  group,

  state,
  setState,
}) {
  const { scene } = useGLTF(state.currentBaseURL, true);

  const loadingManager = new THREE.LoadingManager();

  loadingManager.onStart = () => {
    setState((prev) => ({ ...prev, loading: true }));
  };

  loadingManager.onLoad = () => {
    setState((prev) => ({ ...prev, loading: false }));
  };
  const textLoder = new THREE.TextureLoader(loadingManager);

  useEffect(() => {
    group.current.children.map((e) => {
      if (e.material.name === "STITCHING") {
        e.material.color = new THREE.Color("#4f2a12");
      } else if (
        "CAPTOE_COUNTER_QUARTER_VAMP_WINGTIP_UPPER_TASSEL_APRON_SADDLE_BINDING".includes(
          e.material.name
        )
      ) {
        const normarMap = textLoder.load(
          "/morf_material/FabricLeatherCowhide003_NRM_1K.jpg"
        );
        const map = textLoder.load(
          "/morf_material/FabricLeatherCowhide003_AO_1K.jpg"
        );
        const rufnesh = textLoder.load(
          "/morf_material/FabricLeatherCowhide003_GLOSS_1K.jpg"
        );

        normarMap.repeat.set(5, 5);
        normarMap.wrapS = normarMap.wrapT = THREE.RepeatWrapping;
        map.repeat.set(5, 5);
        map.wrapS = map.wrapT = THREE.RepeatWrapping;
        rufnesh.repeat.set(5, 5);
        rufnesh.wrapS = rufnesh.wrapT = THREE.RepeatWrapping;

        e.material.normalMap = normarMap;
        // e.material.map = map;
        e.material.roughnessMap = rufnesh;
        e.material.color = new THREE.Color("#633636");
        e.material.color.convertSRGBToLinear();
      } else if (e.material.name === "SOLE") {
        const map = textLoder.load("/morf_material/Natural_Sole_Texture_2.png");

        map.repeat.set(1, 1);

        e.material.map = map;
      } else if (e.material.name === "LACES") {
        e.material.color = new THREE.Color("#4f2a12");
      } else if (e.material.name === "LINING") {
        // 4e0d30
        e.material.color = new THREE.Color("#460303");
        e.material.color.convertSRGBToLinear();
      }
    });
  }, [state.currentBaseURL, group]);

  return (
    <group ref={group} position={[0.0, 0.16, 0.0]}>
      {scene.children.map((e) => {
        return (
          <mesh
            key={e.uuid}
            {...e}
            visible={modelsPartsData[state.currentBase][state.currentModel][
              state.currentDecoration
            ].includes(e.name)}
            scale={
              !modelsPartsData[state.currentBase][state.currentModel][
                state.currentDecoration
              ].includes(e.name)
                ? [0, 0, 0]
                : e.scale
            }
          />
        );
      })}
    </group>
  );
}

export default function App() {
  const [currentSeleted, setCurrentSeleted] = useState(null);
  const { active } = useProgress();
  const [currentType, setCurrentType] = useState(null);
  const kurageAssets = process.env.NEXT_PUBLIC_KURAGEASSETS;
  const [state, setState] = useState({
    currentSeleted: "",
    currentType: "",
    currentBase: "round",
    currentModel: "oxford",
    currentDecoration: "classic",
    currentBaseURL: `${kurageAssets}/morf/models/ROUND/MORF_ROUND_OXFORD.glb`,
    currentToeCap: "",
    currentVamp: "",
    currentQuarter: "",
    currentStich: "",
    currentLace: "",
    currentSole: "",
    currentEngrave: "",
    loading: true,
  });
  const group = useRef(null);
  const canvasDiv = useRef(null);

  const helperRef = useRef(null);

  useEffect(() => {
    function setPositionToRangeHandler(newColor) {
      const sliderRange = document.querySelector("#hue").value;
      const sliderPosition = (95.8 / 350) * sliderRange;

      document.querySelector("#hue-color").style.left = sliderPosition + "%";
    }
    document.querySelector("#hue").addEventListener("input", (e) => {
      const h = e.currentTarget.value;
      const s = 30;
      const l = 30;
      const newColor = HSLAToHexA(h, s, l);
      canvasDiv.current.style.backgroundColor = newColor;
      document.querySelector("#hue-color").style.backgroundColor = newColor;
      setPositionToRangeHandler(newColor);
      group.current.children.map((e) => {
        if (
          "CAPTOE_COUNTER_QUARTER_VAMP_WINGTIP_UPPER_TASSEL_APRON_SADDLE_BINDING".includes(
            e.material.name
          )
        ) {
          e.material.color = new THREE.Color(newColor);
          e.material.color.convertSRGBToLinear();
        }
      });
    });
  }, []);

  return (
    <div className="customiser" style={{ position: "relative" }}>
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          top: 0,
          left: 0,
          zIndex: 10,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "white",
          pointerEvents: "none",
          transition: "all 0.4s",
          opacity: state.loading || active ? 1 : 0,
        }}
      >
        <p>Loading...</p>
      </div>
      <div
        ref={canvasDiv}
        style={{ backgroundColor: "#633636", height: "80vh" }}
      >
        <Canvas
          concurrent
          camera={{
            position: [9, 8, -12],
            fov: 20,
          }}
          frameloop="demand"
          gl={{ powerPreference: "low-power" }}
        >
          <ambientLight color="#ffffff" intensity={1} />
          <spotLight
            intensity={1}
            angle={0.1}
            penumbra={1}
            position={[5, 25, 20]}
          />
          <rectAreaLight
            intensity={1}
            position={[0, 0.8, 0]}
            width={1}
            height={1}
            onUpdate={(self) => self.lookAt(new THREE.Vector3(0, 0, 0))}
          />

          <Suspense fallback={null}>
            <Sneaker
              helperRef={helperRef}
              group={group}
              state={state}
              setState={setState}
            />
          </Suspense>
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            enableRotate={false}
            minDistance={1.2}
            maxDistance={2.5}
          />
          <ContactShadows
            rotation-x={Math.PI / 2}
            position={[0, -0.00000001, 0]}
            opacity={0.5}
            width={1}
            height={1}
            blur={1}
            far={0.5}
          />
        </Canvas>
      </div>
      <div className="homeCustom">
        <div class="hue">
          <div
            id="hue-color"
            style={{ left: "0%", backgroundColor: "#633636" }}
          >
            <span></span>
          </div>
          <input id="hue" type="range" min="0" max="350" step="1" />
        </div>

        <div className="type">
          <div className="type__decoration">
            <p className="type__heading">DECORATION</p>
            <div className="type__items">
              <p className="type__items--item active">Classic</p>
              <p className="type__items--item">Cap Toe</p>
              <p className="type__items--item">Full Brogue</p>
            </div>
          </div>
          <div className="type__leather">
            <p className="type__heading" style={{ textAlign: "right" }}>
              LEATHER
            </p>
            <div className="type__items">
              <p className="type__items--item active">Calf</p>
              <p className="type__items--item">Suede</p>
              <p className="type__items--item">Patent</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
