import { useRef, useEffect } from "react";
import * as THREE from "three";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const Threejs = () => {
  const canvas = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);

    // Camera

    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight
    );
    camera.position.z = 2;

    // const geometry = new THREE.BoxGeometry(1, 1, 1);
    // const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    // const mesh = new THREE.Mesh(geometry, material);

    // scene.add(mesh);

    // Loader
    var dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath("./");
    dracoLoader.setDecoderConfig({ type: "js" });
    const loader = new GLTFLoader();
    loader.setDRACOLoader(dracoLoader);
    const textureLoder = new THREE.TextureLoader();
    let modal;

    loader.load(
      "./models/48_oxford.glb",
      function (gltf) {
        let aoMap = textureLoder.load("/texture/oxford_48_wholecut_ao.jpg");
        gltf.scene.traverse(function (child) {
          if (child.isMesh) {
            let m = child;

            m.receiveShadow = true;
            m.castShadow = true;
          }
          if (child.isLight) {
            let l = child;
            l.castShadow = true;
            l.shadow.bias = -0.003;
            l.shadow.mapSize.width = 2048;
            l.shadow.mapSize.height = 2048;
          }
        });
        modal = gltf.scene;

        scene.add(modal);
        // console.log(modal);
      },
      (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
      },
      (error) => {
        console.log(error);
      }
    );

    // Axes Helper
    const axesHelper = new THREE.AxesHelper(500);
    scene.add(axesHelper);

    // Orbit Controls
    const controls = new OrbitControls(camera, canvas.current);
    controls.minDistance = 0.3;
    controls.maxDistance = 1;

    // Liht
    const light = new THREE.AmbientLight();
    light.intensity = 1;
    scene.add(light);

    // Dir Light
    // const directionalLight = new THREE.DirectionalLight(0xffffff, 5);
    // directionalLight.position.z = 10;
    // directionalLight.position.y = 10;
    // scene.add(directionalLight);

    // Renderer

    const renderer = new THREE.WebGLRenderer({
      canvas: canvas.current,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);

    window.addEventListener("resize", onWindowResize, false);

    // Resize
    function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      render();
    }
    // Animate
    var animate = function () {
      requestAnimationFrame(animate);

      controls.update();

      render();
    };
    // Render Function
    function render() {
      renderer.render(scene, camera);
    }
    animate();
  }, []);
  return <canvas ref={canvas}></canvas>;
};

export default Threejs;
