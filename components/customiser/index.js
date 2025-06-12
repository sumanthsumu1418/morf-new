import React, {
  Suspense,
  useRef,
  useState,
  useEffect,
  useCallback,
  createRef,
} from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Canvas, useThree, useLoader, useFrame } from "@react-three/fiber";

import AddToCart from "./../AddToCart";
// useSwipe

import axios from "axios";

// import S3 from "aws-sdk/clients/s3";

// import {RGBELoader} from "three/examples/jsm/loaders/RGBELoader";
import {
  useGLTF,
  OrbitControls,
  useProgress,
  PerspectiveCamera,
  Environment,
} from "@react-three/drei";
import * as THREE from "three";
import { TimelineMax, TweenMax } from "gsap";
import {
  modelsData,
  modelsPartsData,
  decorationsTypeData,
  decorationsTypeDataWithPatina,
  rotationData,
  vampData,
  quarterData,
  capToeData,
  lacesData,
  apronData,
  saddleData,
  bindingData,
  counterData,
  upperData,
  tasselData,
  stitchingData,
  wingTipData,
  soleData,
  patinaFullGrainData,
  patinaSuedeData,
} from "lib/data";
import useMediaQuery from "../../hooks/useMediaQuery";
import MobileAcc from "@/components/customiser/MobOptions";
import BaseModel from "./baseModel";
import ModelStyle from "./modelStyle";
import Decoration from "./decoration";
import CapToe from "./capToe";
import Quarter from "./quarter";
import WingTip from "./wingTip";
import Laces from "./laces";
import Stitching from "./stitching";
import Vamp from "./vamp";
import Counter from "./counter";
import Tassel from "./tassel";
import Binding from "./binding";
import Apron from "./apron";
import Saddle from "./saddle";
import Sole from "./sole";
import Upper from "./upper";
import Patina from "./patina";
import SoleEngraving from "./soleEngraving";
import Size from "./Size";
import Width from "./Width";
// import S3 from "react-aws-s3";
import ResetCustomiser from "./ResetCustomiser";
import SocialShare from "./SocialShare";
import SizeScanner from "./SizeScanner";
import copyTextToClipboard from "../shared/utility";
import { toast } from "react-toastify";
import { ADD_ITEM_TO_ORDER } from "graphql/productsqueries";
import client from "../shared/client";
import { initialCart } from "store/user/action";
import { addActiveOrdersToCart, isActiveCartInOtherState } from "uitlity";
import FullGrain from "./fullGrain";
import PatinaSuede from "./patinaSuede";
import { useSwipeable } from "react-swipeable";
// import useSwipe from "hooks/useSwipe";
// import { transparent } from "material-ui/styles/colors";
let custImgArray = [];

function Sneaker({
  setCurrentSeleted,
  group,
  currentSeleted,
  state,
  accIndex,
  setAccIndex,
  setState,
  texture,
  setTexture,
  sneakerGroup,
  material,
  modelId,
  setModelId,
  isBreakPoint,
  saveFile,
  addToCart,
  setAddToCart,
  tweenCamera,
  addToCartData,
  download,
  setDownload,
  slideIndex,
  setSlideIndex,
  currentMaterial,
  setCurrentMaterial,
  setOpenOption,
  handleMaterialClick,
}) {
  const { scene } = useGLTF(state.currentBaseURL, true);

  // const [custImgArray, setCustImgArray] = useState([]);

  const set = useThree((state) => state.set);
  const gl = useThree((state) => state.gl);

  const { camera } = useThree();

  const onPointerOverEvent = (e) => {
    e.stopPropagation();
    e.object.material.opacity = 0.95;
  };
  const onPointerOutEvent = (e) => {
    e.stopPropagation();
    e.object.material.opacity = 1;
  };

  const onClickEvent = (e) => {
    e.stopPropagation();

    if (
      "CAPTOE_COUNTER_QUARTER_VAMP_WINGTIP_STITCHING_LACES_SOLE_TASSEL_BINDING_APRON_SADDLE_UPPER_TASSEL".includes(
        e.object.material.name
      )
    ) {
      setAccIndex(3);

      if (isBreakPoint) {
        // if(openOption)

        // setOpenOption(true);
        setSlideIndex(5);
      }
    }

    setCurrentSeleted(e.object.material);

    if (isBreakPoint) {
      setCurrentMaterial(e?.object?.material?.name);
    }
  };
  const loadingManager = new THREE.LoadingManager();

  loadingManager.onStart = () => {
    setState((prev) => ({ ...prev, loading: true }));
  };

  loadingManager.onLoad = () => {
    setState((prev) => ({ ...prev, loading: false }));
  };
  const textLoder = new THREE.TextureLoader(loadingManager);

  const disableMapIntensity = (e) => {
    e.material.envMapIntensity = 0;
    e.material.metalness = 0;
    e.material.roughness = 1;
  };

 const kurageAssets = process.env.NEXT_PUBLIC_KURAGEASSETS; 

  // const deg2rad = (degrees) => degrees * (Math.PI / 180);

  let topImage;
  let leftImage;
  let rightImage;
  let backImage;

  // Side :  x: 3.3961470148417203,y: 0.44218254361018,z: -0.7215677,
  // back : x: 0.017928097805728037,y: 0.17052092058456386,z: 2.3156322872891955
  async function takeScreenshot() {
    setAddToCart(false);
    set({
      camera: new THREE.PerspectiveCamera(),
    });
    await tweenCamera({
      x: 2.109233123401041,
      y: -0.018968917045833845,
      z: -0.04034898938330056,
    });
    // camera.rotation.set(deg2rad(30), 0, 0);

    setTimeout(async () => {
      rightImage = gl.domElement
        .toDataURL("image/png")
        .replace("image/png", "image/octet-stream");

      // await saveFile(rightImage, "right.png");
      takeBackScreenShot();
    }, 1250);
  }

  const takeBackScreenShot = async () => {
    await tweenCamera({
      x: -0.041822258762365824,
      y: -0.05933612218579609,
      z: 1.327656717008937,
    });
    setTimeout(async () => {
      backImage = gl.domElement
        .toDataURL("image/png")
        .replace("image/png", "image/octet-stream");

      // await saveFile(backImage, "back.png");
      takeSideScreenShot();
    }, 1000);
  };

  const takeSideScreenShot = async () => {
    await tweenCamera({
      x: -2.0939798073594273,
      y: -0.11489356001960521,
      z: 0.23000057792809622,
    });
    setTimeout(async () => {
      leftImage = gl.domElement
        .toDataURL("image/png")
        .replace("image/png", "image/octet-stream");

      // await saveFile(leftImage, "left.png");
      takeTopScreenShot();
    }, 1000);
  };

  const takeTopScreenShot = async () => {
    await tweenCamera({
      x: -0.006019142722489665,
      y: 2.2202168069810515,
      z: -1.3000046822173368,
    });
    setTimeout(async () => {
      topImage = gl.domElement
        .toDataURL("image/png")
        .replace("image/png", "image/octet-stream");

      uploadImages();
    }, 1000);
  };

  const uploadImages = async () => {
    const rightFile = dataURLtoFile(rightImage, "right.png");
    const leftFile = dataURLtoFile(leftImage, "left.png");
    const topFile = dataURLtoFile(topImage, "top.png");
    const backFile = dataURLtoFile(backImage, "back.png");

    const copyObject = addToCartData;
    const newArray = Object.values(copyObject);
    const customiserCode = newArray.join("");

    //*customiser dummy Data*//
    // const customiserCode =
    //   "6321511100500000500001605000005000005000005000005000005000003050000180000";

    await addAllFilesToS3(
      rightFile,
      leftFile,
      topFile,
      backFile,
      customiserCode
    ).then(() => {
      // not getting all files in an array
      //How will get to know addAllFilesToS3 uploaded all the files
    });

    //custImgArray.length > 0
  };

  const addAllFilesToS3 = async (
    rightFile,
    leftFile,
    topFile,
    backFile,
    customiserCode
  ) => {
    await uploadToS3(rightFile, customiserCode);
    await uploadToS3(leftFile, customiserCode);
    await uploadToS3(topFile, customiserCode);
    await uploadToS3(backFile, customiserCode);

    if (download) {
      await saveFile(rightImage, "right.png");
      await saveFile(leftImage, "left.png");
      await saveFile(topImage, "top.png");
      await saveFile(backImage, "back.png");
      setState({ ...state, stateCustomeImgstatus: false });
      setDownload(false);
    } else {
      if (custImgArray.length > 0) {
        setState({ ...state, stateCustomeImgstatus: true });
      }
    }

    // let uploadArray = [rightFile, leftFile, topFile, backFile];
    // uploadArray.forEach((element) => {
    //   uploadToS3(element, customiserCode);
    // });
  };

  const uploadToS3 = async (imgFile, customiserCode) => {
    try {
      let { data } = await axios.post("/api/s3-upload", {
        name: `customiser_product_images/${customiserCode}/${imgFile.name}`,
        type: imgFile.type,
      });

      const url = data.url;
      await axios
        .put(url, imgFile, {
          headers: {
            "Content-type": imgFile.type,
            "Access-Control-Allow-Origin": "*",
          },
        })
        .then((res) => {
          if (res.status == 200 && res.statusText == "OK") {
            custImgArray.push(
              `${process.env.NEXT_PUBLIC_S3ASSETS_URL}/customiser_product_images/${customiserCode}/${imgFile.name}`
            );
          }
        });
    } catch (err) {}
    // console.log("uploadToS3", custImgArray);
  };

  function dataURLtoFile(dataurl, filename) {
    var arr = dataurl.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  }

  //x: 0.007066393148351425, y: 3.2493583786824645, z: -1.3006230018625384;

  useEffect(() => {
    // console.log("useEffect Sneaker 1", texture);

    addToCart ? takeScreenshot() : null;

    group.current.children.map((e) => {
      if (e.material.name === "STITCHING") {
        disableMapIntensity(e);
        // console.log("scene children e ====> STITCHING IF BLOCK", e.name);
        e.material.color = new THREE.Color(`#${state.currentStich.color}`);
        e.material.color.convertSRGBToLinear();
      } else if (
        "CAPTOE_COUNTER_QUARTER_VAMP_WINGTIP_UPPER_TASSEL_APRON_SADDLE_BINDING".includes(
          e.material.name
        )
      ) {
        // when updation happens
        if (material) {
          if (e.material.name == material.name) {
            updateMaterial(e, texture.currentMap, texture.currentCategory);
          }
        }
        // first render
        else {
          disableMapIntensity(e);
          e.material.aoMap = null;
          e.material.aoMapIntensity = 0;

          switch (e.material.name) {
            case "CAPTOE":
              updateMaterial(
                e,
                state.currentCapToe.texture,
                state.currentCapToe.category,
                state.currentCapToe.color
              );
              break;
            case "COUNTER":
              {
                updateMaterial(
                  e,
                  state.currentCounter.texture,
                  state.currentCounter.category,
                  state.currentCounter.color
                );
                // console.log("scene children e ====> COUNTER IF BLOCK", e.name);
              }

              break;
            case "VAMP":
              updateMaterial(
                e,
                state.currentVamp.texture,
                state.currentVamp.category,
                state.currentVamp.color
              );
              break;
            case "WINGTIP":
              updateMaterial(
                e,
                state.currentWingTip.texture,
                state.currentWingTip.category,
                state.currentWingTip.color
              );
              break;
            case "UPPER":
              updateMaterial(
                e,
                state.currentUpper.texture,
                state.currentUpper.category,
                state.currentUpper.color
              );
              break;
            case "TASSEL":
              updateMaterial(
                e,
                state.currentTassel.texture,
                state.currentTassel.category,
                state.currentTassel.color
              );
              break;
            case "APRON":
              updateMaterial(
                e,
                state.currentApron.texture,
                state.currentApron.category,
                state.currentApron.color
              );
              break;
            case "SADDLE":
              updateMaterial(
                e,
                state.currentSaddle.texture,
                state.currentSaddle.category,
                state.currentApron.color
              );
              break;
            case "BINDING":
              updateMaterial(
                e,
                state.currentBinding.texture,
                state.currentBinding.category,
                state.currentBinding.color
              );
              break;

            default:
              updateMaterial(
                e,
                state.currentQuarter.texture,
                state.currentQuarter.category,
                state.currentQuarter.color
              );
              break;
          }
        }
      } else if (e.material.name === "SOLE") {
        // console.trace();
        const map = textLoder.load("/morf_material/Natural_Sole_Texture_2.jpg");
        disableMapIntensity(e);
        map.repeat.set(1, 1);
        map.wrapS = map.wrapT = THREE.RepeatWrapping;
        e.material.map = map;

        e.material.color = new THREE.Color(`#${state.currentSole.color}`);

        e.material.color.convertSRGBToLinear();
        e.material.needsUpdate = true;
        // console.group("Sole details");
      } else if (e.material.name === "SOLE_4_MIDDLE") {
        const normalMap = textLoder.load(
          "/morf_material/sole/Cement-05_normal.jpg"
        );
        normalMap.repeat.set(1, 1);

        normalMap.wrapS = normalMap.wrapT = THREE.RepeatWrapping;

        const AoMap = textLoder.load(
          "/morf_material/sole/Cement-05_height.jpg"
        );
        AoMap.repeat.set(1, 1);
        AoMap.wrapS = AoMap.wrapT = THREE.RepeatWrapping;

        //Cement-05_roughness
        const rougnessMap = textLoder.load(
          `${kurageAssets}/morf/textures/sole/Cement-05_height.jpg`
        );
        rougnessMap.repeat.set(5, 5);
        rougnessMap.wrapS = rougnessMap.wrapT = THREE.RepeatWrapping;

        e.material.normalMap = null;
        e.material.aoMap = null;
        e.material.roughness = null;

        e.material.map = null;
        disableMapIntensity(e);
        e.material.envMapIntensity = 1;
        e.material.color = new THREE.Color("#917361");
        e.material.color.convertSRGBToLinear();
        e.material.needsUpdate = true;
      } else if (e.material.name === "SOLE_3" || e.material.name === "SOLE_2") {
        const normalMap = textLoder.load(
          `${kurageAssets}/morf/textures/sole/Cement-05_normal.jpg`
        );
        normalMap.repeat.set(1, 1);
        normalMap.wrapS = normalMap.wrapT = THREE.RepeatWrapping;
        disableMapIntensity(e);

        const aoMap = textLoder.load(
          `${kurageAssets}/morf/textures/sole/grunge_wall_09_ambientocclusion.jpg`
        );
        aoMap.repeat.set(1, 1);
        aoMap.wrapS = aoMap.wrapT = THREE.RepeatWrapping;

        const rougnessMap = textLoder.load(
          `${kurageAssets}/morf/textures/sole/grunge_wall_09_roughness.jpg`
        );
        rougnessMap.repeat.set(1, 1);
        rougnessMap.wrapS = rougnessMap.wrapT = THREE.RepeatWrapping;

        e.material.normalMap = normalMap;
        // e.material.aoMap = aoMap;
        e.material.map = null;
        e.material.envMapIntensity = 1;
        // e.material.roughnessMap = rougnessMap;

        e.material.color = null;

        //471623;

        e.material.color = new THREE.Color("#471623");

        e.material.color.convertSRGBToLinear();
        // e.material.color.convertSRGBToLinear();
        e.material.needsUpdate = true;
      } else if (e.material.name === "SOLE_1") {
        const normalMap = textLoder.load(
          `${kurageAssets}/morf/textures/sole/FabricLeatherCowhide003_NRM_1K.jpg`
        );
        normalMap.repeat.set(5, 5);
        normalMap.wrapS = normalMap.wrapT = THREE.RepeatWrapping;
        disableMapIntensity(e);

        const aoMap = textLoder.load(
          `${kurageAssets}/morf/textures/sole/generic_leather_ambientOcclusion.jpg`
        );
        aoMap.repeat.set(5, 5);
        aoMap.wrapS = aoMap.wrapT = THREE.RepeatWrapping;

        const rougnessMap = textLoder.load(
          `${kurageAssets}/morf/textures/sole/generic_leather_roughness.jpg`
        );
        rougnessMap.repeat.set(5, 5);
        rougnessMap.wrapS = rougnessMap.wrapT = THREE.RepeatWrapping;

        e.material.map = null;
        e.material.aoMap = aoMap;
        e.material.roughnessMap = rougnessMap;
        e.material.normalMap = normalMap;

        e.material.envMapIntensity = 0.03;

        e.material.color = new THREE.Color("#a35c40");
        e.material.color.convertSRGBToLinear();
        e.material.needsUpdate = true;
      } else if (
        e.material.name === "SOLE_4_FRONT" ||
        e.material.name === "SOLE_4_BACK"
      ) {
        const normalMap = textLoder.load(
          `${kurageAssets}/morf/textures/sole/Cement-05_basecolor.jpg`
        );
        normalMap.repeat.set(1, 1);
        normalMap.wrapS = normalMap.wrapT = THREE.RepeatWrapping;

        const aoMap = textLoder.load(
          `${kurageAssets}/morf/textures/sole/smooth_plastic_03_dirty_ambientOcclusion_1.jpg`
        );
        aoMap.repeat.set(1, 1);
        aoMap.wrapS = aoMap.wrapT = THREE.RepeatWrapping;
        disableMapIntensity(e);
        const rougnessMap = textLoder.load(
          `${kurageAssets}/morf/textures/sole/Cement-05_roughness.jpg`
        );
        rougnessMap.repeat.set(1, 1);
        rougnessMap.wrapS = rougnessMap.wrapT = THREE.RepeatWrapping;

        // e.material.map = map;
        e.material.aoMap = aoMap;
        e.material.roughnessMap = rougnessMap;
        e.material.normalMap = normalMap;

        e.material.color = new THREE.Color("#3b2019");
        e.material.color.convertSRGBToLinear();
        e.material.needsUpdate = true;
      } else if (e.material.name === "LACES") {
        disableMapIntensity(e);
        e.material.color = new THREE.Color("#d0b19a");
      } else if (e.material.name === "LINING") {
        // 4e0d30
        disableMapIntensity(e);
        e.material.color = new THREE.Color("#460303");
        e.material.color.convertSRGBToLinear();
      }
    });
  }, [
    state.currentBaseURL,
    group,
    texture,
    addToCart,
    state.currentPatina,
    state.currentDecoration,
  ]);

  // 1. according to material texture should upgrade 2. color also need to be dynamic

  const updateMaterial = (e, currentMap, currentCategory, color) => {
    // console.log("Update Material", currentMap, currentCategory, color);
    e.material.aoMap = null;
    e.material.aoMapIntensity = 0;
    if (currentCategory == "SUEDE") {
      //map
      const map = textLoder.load(currentMap);
      map.repeat.set(3, 3);
      map.wrapS = map.wrapT = THREE.RepeatWrapping;

      e.material.map = map;

      // setting other map to null
      e.material.normalMap = null;
      e.material.roughnessMap = null;

      // setting default values
      disableMapIntensity(e);

      if (color == "000000") {
        e.material.color = new THREE.Color("#2d2d2d");
        e.material.transparent = true;
        // e.material.opacity = 0.8
        e.material.color.convertSRGBToLinear();
      }

      if (color) {
        e.material.color = new THREE.Color(`#${color}`);
        e.material.color.convertSRGBToLinear();
      }
      e.material.aoMap = null;

      e.material.needsUpdate = true;
    } else if (currentCategory == "CALF LEATHER") {
      // normalMap

      const normalMap = textLoder.load(currentMap);
      normalMap.repeat.set(5, 5);
      normalMap.wrapS = normalMap.wrapT = THREE.RepeatWrapping;
      disableMapIntensity(e);

      const vamp = textLoder.load(
        `${kurageAssets}/morf/patinaTexture/${state.currentBase}/${state.currentModel}/${state.currentDecoration}/${state.currentBase}-${state.currentModel}-${state.currentDecoration}-vamp.jpg`
      );
      const quarter = textLoder.load(
        `${kurageAssets}/morf/patinaTexture/${state.currentBase}/${state.currentModel}/${state.currentDecoration}/${state.currentBase}-${state.currentModel}-${state.currentDecoration}-quarter.jpg`
      );
      const capToe = textLoder.load(
        `${kurageAssets}/morf/patinaTexture/${state.currentBase}/${state.currentModel}/${state.currentDecoration}/${state.currentBase}-${state.currentModel}-${state.currentDecoration}-captoe.jpg`
      );
      const counter = textLoder.load(
        `${kurageAssets}/morf/patinaTexture/${state.currentBase}/${state.currentModel}/${state.currentDecoration}/${state.currentBase}-${state.currentModel}-${state.currentDecoration}-counter.jpg`
      );
      const wingTip = textLoder.load(
        `${kurageAssets}/morf/patinaTexture/${state.currentBase}/${state.currentModel}/${state.currentDecoration}/${state.currentBase}-${state.currentModel}-${state.currentDecoration}-wingtip.jpg`
      );
      const upper = textLoder.load(
        `${kurageAssets}/morf/patinaTexture/${state.currentBase}/${state.currentModel}/${state.currentDecoration}/${state.currentBase}-${state.currentModel}-${state.currentDecoration}-upper.jpg`
      );
      const tassel = textLoder.load(
        `${kurageAssets}/morf/patinaTexture/${state.currentBase}/${state.currentModel}/${state.currentDecoration}/${state.currentBase}-${state.currentModel}-${state.currentDecoration}-tassel.jpg`
      );
      const apron = textLoder.load(
        `${kurageAssets}/morf/patinaTexture/${state.currentBase}/${state.currentModel}/${state.currentDecoration}/${state.currentBase}-${state.currentModel}-${state.currentDecoration}-apron.jpg`
      );
      const saddle = textLoder.load(
        `${kurageAssets}/morf/patinaTexture/${state.currentBase}/${state.currentModel}/${state.currentDecoration}/${state.currentBase}-${state.currentModel}-${state.currentDecoration}-saddle.jpg`
      );
      const binding = textLoder.load(
        `${kurageAssets}/morf/patinaTexture/${state.currentBase}/${state.currentModel}/${state.currentDecoration}/${state.currentBase}-${state.currentModel}-${state.currentDecoration}-binding.jpg`
      );

      vamp.wrapS = vamp.wrapT = THREE.MirroredRepeatWrapping;
      // qMap.repeat.set(1, 1);
      quarter.wrapS = quarter.wrapT = THREE.MirroredRepeatWrapping;
      capToe.wrapS = capToe.wrapT = THREE.MirroredRepeatWrapping;
      counter.wrapS = counter.wrapT = THREE.MirroredRepeatWrapping;
      wingTip.wrapS = wingTip.wrapT = THREE.MirroredRepeatWrapping;
      upper.wrapS = upper.wrapT = THREE.MirroredRepeatWrapping;
      tassel.wrapS = tassel.wrapT = THREE.MirroredRepeatWrapping;
      apron.wrapS = apron.wrapT = THREE.MirroredRepeatWrapping;
      saddle.wrapS = saddle.wrapT = THREE.MirroredRepeatWrapping;
      binding.wrapS = binding.wrapT = THREE.MirroredRepeatWrapping;

      //RoughnessMap
      const roughnessMap = textLoder.load(
        `${kurageAssets}/morf/textures/calfLeather/FabricLeatherCowhide003_GLOSS_1K.jpg`
      );
      roughnessMap.repeat.set(1, 1);
      e.geometry.setAttribute(
        "uv2",
        new THREE.BufferAttribute(e.geometry.attributes.uv.array, 2)
      );

      roughnessMap.wrapS = roughnessMap.wrapT = THREE.RepeatWrapping;

      // updating Map
      e.material.normalMap = normalMap;
      e.material.roughnessMap = roughnessMap;
      e.material.map = null;
      e.material.aoMap = null;
      e.material.aoMapIntensity = 1.4;

      if (state.currentPatina == "with_patina") {
        if (e.material.name == "VAMP") {
          e.material.aoMap = vamp;
        } else if (e.material.name == "QUARTER") {

          e.material.aoMap = quarter;
        } else if (e.material.name == "CAPTOE") {
          e.material.aoMap = capToe;
        } else if (e.material.name == "COUNTER") {
          e.material.aoMap = counter;
        } else if (e.material.name == "WINGTIP") {
          e.material.aoMap = wingTip;
        } else if (e.material.name == "UPPER") {
          e.material.aoMap = upper;
        } else if (e.material.name == "TASSEL") {
          e.material.aoMap = tassel;
        } else if (e.material.name == "APRON") {
          e.material.aoMap = apron;
        } else if (e.material.name == "SADDLE") {
          e.material.aoMap = saddle;
        } else if (e.material.name == "BINDING") {
          e.material.aoMap = binding;
        }

        if (state.isPatinaSuede) {
          const map = textLoder.load(
            `${kurageAssets}/morf/textures/suede/suede_canvas_light.jpg`
          );
          map.repeat.set(3, 3);
          map.wrapS = map.wrapT = THREE.RepeatWrapping;

          e.material.map = map;

          // setting other map to null
          e.material.normalMap = null;
          e.material.roughnessMap = null;
          e.material.color = new THREE.Color(`#${state.currentSuede.color}`);
          e.material.color.convertSRGBToLinear();
          e.material.needsUpdate = true;
        } else {
          e.material.color = new THREE.Color(
            `#${state.currentFullGrain.color}`
          );
          e.material.color.convertSRGBToLinear();
        }
      } else {
        if (color) {
          e.material.color = new THREE.Color(`#${color}`);
          e.material.color.convertSRGBToLinear();
        }
      }

      e.material.opacity = 1;
      e.material.needsUpdate = true;
    } else if (currentCategory == "OTHERS") {
      // getting other texture
      const mapTexture = currentMap.slice(15);
      // disableMapIntensity(e);

      if (mapTexture == "blackPatent.jpg") {
        //map
        const map = textLoder.load(currentMap);
        map.repeat.set(5, 5);
        map.wrapS = map.wrapT = THREE.RepeatWrapping;

        // setting map
        e.material.map = map;
        e.material.normalMap = null;
        e.material.roughnessMap = null;

        // setting defult value
        e.material.envMapIntensity = 2;
        (e.material.roughness = 0.2), (e.material.metalness = 1);

        // updating color
        e.material.color = new THREE.Color("#8f8f8f");
        e.material.transparent = true;
        e.material.color.convertSRGBToLinear();
      } else if (mapTexture == "blackVelvet.jpg") {
        //map
        const map = textLoder.load(currentMap);
        map.repeat.set(15, 15);
        map.wrapS = map.wrapT = THREE.RepeatWrapping;

        // updating map
        e.material.map = map;
        e.material.normalMap = null;
        e.material.roughnessMap = null;
        e.material.needsUpdate = true;
      } else {
        //map
        const map = textLoder.load(currentMap);
        map.repeat.set(3, 3);
        map.wrapS = map.wrapT = THREE.RepeatWrapping;

        //rotating map
        map.rotation = 1.375;
        // e.material.envMapIntensity = 2;

        // updating map
        e.material.map = map;
        e.material.normalMap = null;
        e.material.roughnessMap = null;
        e.material.needsUpdate = true;
      }
    }
    e.material.needsUpdate = true;
  };

  return (
    <group
      ref={group}
      onPointerOver={onPointerOverEvent}
      onPointerOut={onPointerOutEvent}
      // onPointerDown={!isBreakPoint && onClickEvent}
      onPointerDown={onClickEvent}
    >
      {scene.children.map((e) => {
        console.log("Update Material", e);
        return (
          <mesh
            key={e.uuid}
            {...e}
            visible={modelsPartsData[state.currentBase][state.currentModel][
              state?.currentDecoration
            ].includes(e?.name)}
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

const customiserOption = [
  {
    id: 1,
    title: "MODEL, STYLE & DECORATION",
  },
  {
    id: 2,
    title: "PATINA",
  },
  {
    id: 3,
    title: "COLOUR/MATERIAL",
  },
  {
    id: 4,
    title: "SIZE & PERSONALIZATION",
  },
];

export default function App() {
  const router = useRouter();
  const [showaddToloader, setshowaddToloader] = useState(false);
  const [SizeError, setSizeError] = useState(false);

  const loadingManager = new THREE.LoadingManager();

  loadingManager.onStart = () => {
    setState((prev) => ({ ...prev, loading: true }));
  };

  loadingManager.onLoad = () => {
    setState((prev) => ({ ...prev, loading: false }));
  };
  const textureLoader = new THREE.TextureLoader(loadingManager);
  // const gl1 = useThree();

  const group = useRef();
  const cameraRef = useRef(null);
  const helperRef = useRef(null);
  const ref = createRef(null);
  let canvasRef = useRef();

  const kurageAssets = process.env.NEXT_PUBLIC_KURAGEASSETS;
  console.log("kurageAssets", kurageAssets);

  const [isBlackPatent, setBlackPatent] = useState(false);
  const [modelId, setModelId] = useState(null);
  const [currentSeleted, setCurrentSeleted] = useState(null);
  const { active, progress } = useProgress();
  const [currentType, setCurrentType] = useState("BASEMODEL");
  const [accIndex, setAccIndex] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [showModalSize, setShowModalSize] = useState(false);
  const [exitCustomiser, setExitCustomiser] = useState(false);
  const [engraving, setEngraving] = useState({});
  const [addToCartData, setAddToCartData] = useState({});
  const [linkCopied, setLinkCopied] = useState("");
  const [modelChange, setModalChange] = useState(false);
  const [texture, setTexture] = useState({
    currentMap: "/morf_material/FabricLeatherCowhide003_NRM_1K.jpg",
    currentRughness: "/morf_material/FabricLeatherCowhide003_GLOSS_1K.jpg",
    currentCategory: "CALF LEATHER",
    color: "#933a0f",
    materialName: "",
  });

  const [engraveAdded, setEngraveAdded] = useState("");

  const [addToCart, setAddToCart] = useState(false);
  const [download, setDownload] = useState(false);
  const [material, setMetirial] = useState();
  const [state, setState] = useState({
    currentSeleted: "",
    currentType: "",
    currentBase: "round",
    currentModel: "oxford",
    currentDecoration: "classic",
    currentPatina: "without_patina",
    currentStiching: "",
    currentBaseURL: `${kurageAssets}/morf/models/ROUND/MORF_ROUND_OXFORD.glb`,
    // currentBaseURL: "/morf_material/MORF_SQUARE_LOAFER.glb",
    currentCapToe: {
      attribute_value: "05",
      color: "a76820",
      name: "Tan",
      category: "CALF LEATHER",
      otherTexture: "",
      texture: "/morf_material/FabricLeatherCowhide003_NRM_1K.jpg",
    },
    currentVamp: {
      attribute_value: "05",
      color: "a76820",
      name: "Tan",
      category: "CALF LEATHER",
      otherTexture: "",
      texture: "/morf_material/FabricLeatherCowhide003_NRM_1K.jpg",
    },
    currentQuarter: {
      attribute_value: "05",
      color: "a76820",
      name: "Tan",
      category: "CALF LEATHER",
      otherTexture: "",
      texture: "/morf_material/FabricLeatherCowhide003_NRM_1K.jpg",
    },
    currentStich: {
      attribute_value: "03",
      color: "320f08",
      name: "Dark Brown",
    },
    currentLace: {
      attribute_value: "16",
      color: "d2c5b1",
      name: "Beige",
    },
    currentWingTip: {
      attribute_value: "05",
      color: "a76820",
      name: "Tan",
      category: "CALF LEATHER",
      otherTexture: "",
      texture: "/morf_material/FabricLeatherCowhide003_NRM_1K.jpg",
    },
    currentSole: {
      attribute_value: "18",
      color: "363636",
      name: "Black",
      category: "Leather",
    },
    currentEngrave: {
      leftShoe: "",
      rightShoe: "",
    },
    currentPrice: "",
    currentSize: {},
    currentWidth: {
      id: 0,
      value: "standardE",
      name: "Standard (E)",
    },
    currentCounter: {
      attribute_value: "05",
      color: "a76820",
      name: "Tan",
      category: "CALF LEATHER",
      otherTexture: "",
      texture: "/morf_material/FabricLeatherCowhide003_NRM_1K.jpg",
    },
    currentUpper: {
      attribute_value: "05",
      color: "a76820",
      name: "Tan",
      category: "CALF LEATHER",
      otherTexture: "",
      texture: "/morf_material/FabricLeatherCowhide003_NRM_1K.jpg",
    },
    currentBinding: {
      attribute_value: "05",
      color: "a76820",
      name: "Tan",
      category: "CALF LEATHER",
      otherTexture: "",
      texture: "/morf_material/FabricLeatherCowhide003_NRM_1K.jpg",
    },
    currentApron: {
      attribute_value: "05",
      color: "a76820",
      name: "Tan",
      category: "CALF LEATHER",
      otherTexture: "",
      texture: "/morf_material/FabricLeatherCowhide003_NRM_1K.jpg",
    },
    currentSaddle: {
      attribute_value: "05",
      color: "a76820",
      name: "Tan",
      category: "CALF LEATHER",
      otherTexture: "",
      texture: "/morf_material/FabricLeatherCowhide003_NRM_1K.jpg",
    },
    currentTassel: {
      attribute_value: "05",
      color: "a76820",
      name: "Tan",
      category: "CALF LEATHER",
      otherTexture: "",
      texture: "/morf_material/FabricLeatherCowhide003_NRM_1K.jpg",
    },
    currentFullGrain: {
      attribute_value: "05",
      color: "a76820",
      name: "Tan",
      category: "FULL GRAIN",
      otherTexture: "",
      texture: "/morf_material/FabricLeatherCowhide003_NRM_1K.jpg",
    },
    currentSuede: {
      // attribute_value: "02",
      // color: "7d7b76",
      // name: "Grey",
      // category: "PATINASUEDE",
      // otherTexture: "",
      // texture: "/morf_material/FabricLeatherCowhide003_NRM_1K.jpg",
    },
    loading: true,
    isPatinaSuede: false,
  });

  const [updatedPrice, setUpdatedPrice] = useState(
    state.currentPrice ? state.currentPrice : 7990
  );
  const [basePrice, setBasePrice] = useState(
    state.currentPrice ? state.currentPrice : 7990
  );

  const [openOption, setOpenOption] = useState(false);

  const [slideHeight, setSlideHeight] = useState(0);

  const [slideIndex, setSlideIndex] = useState(1);
  const [currentMaterial, setCurrentMaterial] = useState("VAMP");

  const [socialShare, setSocialShare] = useState(false);

  const isBreakPoint = useMediaQuery(1024);
  const isMobileBreakPoint = useMediaQuery(600);

  const loadingManagerApp = new THREE.LoadingManager();

  const textLoder = new THREE.TextureLoader(loadingManagerApp);

  useEffect(() => {
    if (router.query?.shoe_price) {
      setModelId(router.query["shoe_design"].toString().split("").map(Number));
      setState((prev) => ({
        ...prev,
        currentPrice:
          Number(router.query["shoe_price"]) < 7990
            ? 7990
            : Number(router.query["shoe_price"]),
      }));
      setUpdatedPrice(
        Number(router.query["shoe_price"]) < 7990
          ? 7990
          : Number(router.query["shoe_price"])
      );
      setBasePrice(
        Number(router.query["shoe_price"]) < 7990
          ? 7990
          : Number(router.query["shoe_price"])
      );
    } else {
      setModelId(router.query["shoe_design"]?.toString().split("").map(Number));
      setState((prev) => ({
        ...prev,
        currentPrice: "7990",
      }));
      setUpdatedPrice("7990");
      setBasePrice("7990");
    }
  }, []);

  useEffect(() => {
    if (!modelId || typeof modelId == "number" || modelId.length < 73) {
      // console.log("useEffect with Model Id in app.js returned", modelId);
      return;
    } else if (modelId) {
      // console.log("useEffect with Model Id in app.js not returned", modelId);
      // console.log("ModeId==>", modelId);
      if (modelId[0]) {
        if (modelId[0].toString() === "1") {
          setState((prev) => ({
            ...prev,
            currentBase: "round",
            currentBaseURL: modelsData["round"][prev.currentModel].url,
          }));
        } else if (modelId[0].toString() === "2") {
          setState((prev) => ({
            ...prev,
            currentBase: "almond",
            currentBaseURL: modelsData["almond"][prev.currentModel].url,
          }));
        } else if (modelId[0].toString() === "3") {
          setState((prev) => ({
            ...prev,
            currentBase: "square",
            currentBaseURL: modelsData["square"][prev.currentModel].url,
          }));
        }
      }

      if (modelId[1]) {
        if (modelId[1].toString() === "1") {
          setState((prev) => ({
            ...prev,
            currentModel: "oxford",
            currentDecoration: "classic",
            currentBaseURL: modelsData[prev.currentBase]["oxford"].url,
          }));
        }

        if (modelId[1].toString() === "2") {
          setState((prev) => ({
            ...prev,
            currentModel: "derby",
            currentDecoration: "classic",
            currentBaseURL: modelsData[prev.currentBase]["derby"].url,
          }));
        }

        if (modelId[1].toString() === "3") {
          setState((prev) => ({
            ...prev,
            currentModel: "monkStrap",
            currentDecoration: "classic",
            currentBaseURL: modelsData[prev.currentBase]["monkStrap"].url,
          }));
        }

        if (modelId[1].toString() === "4") {
          setState((prev) => ({
            ...prev,
            currentModel: "loafer",
            currentDecoration: "classic",
            currentBaseURL: modelsData[prev.currentBase]["loafer"].url,
          }));
        }
      }

      if (modelId[2]) {
        if (modelId[2].toString() === "1") {
          setState((prev) => ({
            ...prev,
            currentDecoration: "classic",
          }));
        }
        if (modelId[2].toString() === "2") {
          setState((prev) => ({
            ...prev,
            currentDecoration: "capToe",
          }));
        }
        if (modelId[2].toString() === "3") {
          setState((prev) => ({
            ...prev,
            currentDecoration: "fullBrogue",
          }));
        }
        if (modelId[2].toString() === "4") {
          setState((prev) => ({
            ...prev,
            currentDecoration: "wholeCut",
          }));
        }
        if (modelId[2].toString() === "5") {
          setState((prev) => ({
            ...prev,
            currentDecoration: "wingTip",
          }));
        }
        if (modelId[2].toString() === "6") {
          setState((prev) => ({
            ...prev,
            currentDecoration: "wingTipFullBrogue",
          }));
        }
        if (modelId[2].toString() === "7") {
          setState((prev) => ({
            ...prev,
            currentDecoration: "classicBrogue",
          }));
        }
        if (modelId[2].toString() === "8") {
          setState((prev) => ({
            ...prev,
            currentDecoration: "tassel",
          }));
        }
        if (modelId[2].toString() === "9") {
          setState((prev) => ({
            ...prev,
            currentDecoration: "penny",
          }));
        }
      }

      // Vamp_calf
      if (`${modelId[3].toString()}${modelId[4].toString()}`) {
        let vamp_calf_index = `${modelId[3].toString()}${modelId[4].toString()}`;

        if (`${modelId[3].toString()}${modelId[4].toString()}` !== "00") {
          vampData[0].colors.find((color) => {
            if (color.attribute_value == vamp_calf_index) {
              setState((prev) => ({
                ...prev,
                currentVamp: {
                  id: color.id,
                  color: color.value,
                  category: color.category,
                  name: color.name,
                  attribute_value: color.attribute_value,
                  texture: "/morf_material/FabricLeatherCowhide003_NRM_1K.jpg",
                },
              }));

              if (group.current) {
                group.current.children.map((e) => {
                  if (e.material.name === "VAMP") {
                    e.material.color = new THREE.Color(`#${color.value}`);
                    e.material.color.convertSRGBToLinear();
                  }
                });
              }
            }
          });
        }
      }

      // Vamp_suede
      if (`${modelId[5].toString()}${modelId[6].toString()}`) {
        let vamp_suede_index = `${modelId[5].toString()}${modelId[6].toString()}`;

        if (`${modelId[5].toString()}${modelId[6].toString()}` !== "00") {
          vampData[1].colors.find((color) => {
            if (color.attribute_value == vamp_suede_index) {
              setState((prev) => ({
                ...prev,
                currentVamp: {
                  id: color.id,
                  color: color.value,
                  category: color.category,
                  name: color.name,
                  attribute_value: color.attribute_value,
                  texture: "/morf_material/suede_canvas_light.jpg",
                },
              }));

              if (group.current) {
                group.current.children.map((e) => {
                  //first
                  if (e.material.name === "VAMP") {
                    // console.log(
                    //   "main use Effect material name APP JS vamp Suede====>"
                    // );
                    // firstTextureUpdate(e);
                    e.material.color = new THREE.Color(`#${color.value}`);
                    e.material.color.convertSRGBToLinear();
                  }
                });
              }
            }
          });
        }
      }

      // Vamp_others
      if (`${modelId[7].toString()}${modelId[8].toString()}`) {
        let vamp_others_index = `${modelId[7].toString()}${modelId[8].toString()}`;

        if (`${modelId[7].toString()}${modelId[8].toString()}` !== "00") {
          vampData[2].colors.find((color) => {
            if (color.attribute_value == vamp_others_index) {
              setState((prev) => ({
                ...prev,
                currentVamp: {
                  id: color.id,
                  color: color.value,
                  category: color.category,
                  name: color.name,
                  attribute_value: color.attribute_value,
                  texture: color.otherTexture,
                },
              }));

              if (group.current) {
                group.current.children.map((e) => {
                  if (e.material.name === "VAMP") {
                    // console.log(
                    //   "main use Effect material name APP JS vamp others====>"
                    // );
                    // firstTextureUpdate(e, color?.otherTexture);
                    e.material.color = new THREE.Color(`#${color.value}`);
                    e.material.color.convertSRGBToLinear();
                  }
                });
              }
            }
          });
        }
      }

      // quarter_calf

      if (`${modelId[9].toString()}${modelId[10].toString()}`) {
        let quarter_calf_index = `${modelId[9].toString()}${modelId[10].toString()}`;

        if (`${modelId[9].toString()}${modelId[10].toString()}` !== "00") {
          quarterData[0].colors.find((color) => {
            if (color.attribute_value == quarter_calf_index) {
              setState((prev) => ({
                ...prev,
                currentQuarter: {
                  id: color.id,
                  color: color.value,
                  category: color.category,
                  name: color.name,
                  attribute_value: color.attribute_value,
                  texture: "/morf_material/FabricLeatherCowhide003_NRM_1K.jpg",
                },
              }));

              if (group.current) {
                group.current.children.map((e) => {
                  if (e.material.name === "QUARTER") {
                    e.material.color = new THREE.Color(`#${color.value}`);
                    e.material.color.convertSRGBToLinear();
                  }
                });
              }

              // sneakerGroup(color.value);
            }
          });
        }
      }
      // quarter_suede -> change
      if (`${modelId[11].toString()}${modelId[12].toString()}`) {
        let quarter_suede_index = `${modelId[11].toString()}${modelId[12].toString()}`;

        if (`${modelId[11].toString()}${modelId[12].toString()}` !== "00") {
          quarterData[1].colors.find((color) => {
            if (color.attribute_value == quarter_suede_index) {
              setState((prev) => ({
                ...prev,
                currentQuarter: {
                  id: color.id,
                  color: color.value,
                  category: color.category,
                  name: color.name,
                  attribute_value: color.attribute_value,
                  texture: "/morf_material/suede_canvas_light.jpg",
                },
              }));

              if (group.current) {
                group.current.children.map((e) => {
                  if (e.material.name === "QUARTER") {
                    // firstTextureUpdate(e);
                    e.material.color = new THREE.Color(`#${color.value}`);
                    e.material.color.convertSRGBToLinear();
                  }
                });
              }
            }
          });
        }
      }

      // quarter_others -> change
      if (`${modelId[13].toString()}${modelId[14].toString()}`) {
        let quarter_others_index = `${modelId[13].toString()}${modelId[14].toString()}`;

        if (`${modelId[13].toString()}${modelId[14].toString()}` !== "00") {
          quarterData[2].colors.find((color) => {
            if (color.attribute_value == quarter_others_index) {
              setState((prev) => ({
                ...prev,
                currentQuarter: {
                  id: color.id,
                  color: color.value,
                  category: color.category,
                  name: color.name,
                  attribute_value: color.attribute_value,
                  texture: color.otherTexture,
                },
              }));

              if (group.current) {
                group.current.children.map((e) => {
                  if (e.material.name === "QUARTER") {
                    // firstTextureUpdate(e, color?.otherTexture);
                    e.material.color = new THREE.Color(`#${color.value}`);
                    e.material.color.convertSRGBToLinear();
                  }
                });
              }
            }
          });
        }
      }

      // CapToe_calf

      if (`${modelId[15].toString()}${modelId[16].toString()}`) {
        let capToe_calf_index = `${modelId[15].toString()}${modelId[16].toString()}`;

        if (`${modelId[15].toString()}${modelId[16].toString()}` !== "00") {
          capToeData[0].colors.find((color) => {
            if (color.attribute_value == capToe_calf_index) {
              setState((prev) => ({
                ...prev,
                currentCapToe: {
                  id: color.id,
                  color: color.value,
                  name: color.name,
                  category: color.category,
                  attribute_value: color.attribute_value,
                  texture: "/morf_material/FabricLeatherCowhide003_NRM_1K.jpg",
                },
              }));

              if (group.current) {
                group.current.children.map((e) => {
                  if (e.material.name === "CAPTOE") {
                    e.material.color = new THREE.Color(`#${color.value}`);
                    e.material.color.convertSRGBToLinear();
                  }
                });
              }
            }
          });
        }
      }

      // CapToe_suede -> change

      if (`${modelId[17].toString()}${modelId[18].toString()}`) {
        let capToe_suede_index = `${modelId[17].toString()}${modelId[18].toString()}`;

        if (`${modelId[17].toString()}${modelId[18].toString()}` !== "00") {
          capToeData[1].colors.find((color) => {
            if (color.attribute_value == capToe_suede_index) {
              setState((prev) => ({
                ...prev,
                currentCapToe: {
                  id: color.id,
                  color: color.value,
                  name: color.name,
                  category: color.category,
                  attribute_value: color.attribute_value,
                  texture: "/morf_material/suede_canvas_light.jpg",
                },
              }));

              if (group.current) {
                group.current.children.map((e) => {
                  if (e.material.name === "CAPTOE") {
                    e.material.color = new THREE.Color(`#${color.value}`);
                    e.material.color.convertSRGBToLinear();
                  }
                });
              }
            }
          });
        }
      }

      // CapToe_others -> change

      if (`${modelId[19].toString()}${modelId[20].toString()}`) {
        let capToe_others_index = `${modelId[19].toString()}${modelId[20].toString()}`;

        if (`${modelId[19].toString()}${modelId[20].toString()}` !== "00") {
          capToeData[2].colors.find((color) => {
            if (color.attribute_value == capToe_others_index) {
              setState((prev) => ({
                ...prev,
                currentCapToe: {
                  id: color.id,
                  color: color.value,
                  name: color.name,
                  category: color.category,
                  attribute_value: color.attribute_value,
                  texture: color.otherTexture,
                },
              }));

              if (group.current) {
                group.current.children.map((e) => {
                  if (e.material.name === "CAPTOE") {
                    e.material.color = new THREE.Color(`#${color.value}`);
                    e.material.color.convertSRGBToLinear();
                  }
                });
              }
            }
          });
        }
      }

      // Lace

      if (`${modelId[21].toString()}${modelId[22].toString()}`) {
        let lace_index = `${modelId[21].toString()}${modelId[22].toString()}`;

        if (`${modelId[21].toString()}${modelId[22].toString()}` !== "00") {
          lacesData.find((color) => {
            if (color.attribute_value == lace_index) {
              setState((prev) => ({
                ...prev,
                currentLace: {
                  id: color.id,
                  color: color.value,
                  name: color.name,
                  attribute_value: color.attribute_value,
                  texture: "/morf_material/FabricLeatherCowhide003_NRM_1K.jpg",
                },
              }));

              if (group.current) {
                group.current.children.map((e) => {
                  if (e.material.name === "LACES") {
                    e.material.color = new THREE.Color(`#${color.value}`);
                    e.material.color.convertSRGBToLinear();
                  }
                });
              }
            }
          });
        }
      }

      // Apron_calf

      if (`${modelId[23].toString()}${modelId[24].toString()}`) {
        let apron_calf_index = `${modelId[23].toString()}${modelId[24].toString()}`;

        if (`${modelId[23].toString()}${modelId[24].toString()}` !== "00") {
          apronData[0].colors.find((color) => {
            if (color.attribute_value == apron_calf_index) {
              setState((prev) => ({
                ...prev,
                currentApron: {
                  id: color.id,
                  color: color.value,
                  name: color.name,
                  attribute_value: color.attribute_value,
                  category: color.category,
                  texture: "/morf_material/FabricLeatherCowhide003_NRM_1K.jpg",
                },
              }));

              if (group.current) {
                group.current.children.map((e) => {
                  if (e.material.name === "APRON") {
                    e.material.color = new THREE.Color(`#${color.value}`);
                    e.material.color.convertSRGBToLinear();
                  }
                });
              }
            }
          });
        }
      }

      // Apron_suede -> change

      if (`${modelId[25].toString()}${modelId[26].toString()}`) {
        let apron_suede_index = `${modelId[25].toString()}${modelId[26].toString()}`;

        if (`${modelId[25].toString()}${modelId[26].toString()}` !== "00") {
          apronData[1].colors.find((color) => {
            if (color.attribute_value == apron_suede_index) {
              setState((prev) => ({
                ...prev,
                currentApron: {
                  id: color.id,
                  color: color.value,
                  name: color.name,
                  attribute_value: color.attribute_value,
                  category: color.category,
                  texture: "/morf_material/suede_canvas_light.jpg",
                },
              }));

              if (group.current) {
                group.current.children.map((e) => {
                  if (e.material.name === "APRON") {
                    // firstTextureUpdate(e);
                    e.material.color = new THREE.Color(`#${color.value}`);
                    e.material.color.convertSRGBToLinear();
                  }
                });
              }
            }
          });
        }
      }

      // Apron_others -> change

      if (`${modelId[27].toString()}${modelId[28].toString()}`) {
        let apron_suede_index = `${modelId[27].toString()}${modelId[28].toString()}`;

        if (`${modelId[27].toString()}${modelId[28].toString()}` !== "00") {
          apronData[2].colors.find((color) => {
            if (color.attribute_value == apron_suede_index) {
              setState((prev) => ({
                ...prev,
                currentApron: {
                  id: color.id,
                  color: color.value,
                  name: color.name,
                  attribute_value: color.attribute_value,
                  texture: color.otherTexture,
                  category: color.category,
                },
              }));

              if (group.current) {
                group.current.children.map((e) => {
                  if (e.material.name === "APRON") {
                    e.material.color = new THREE.Color(`#${color.value}`);
                    e.material.color.convertSRGBToLinear();
                  }
                });
              }
            }
          });
        }
      }

      // Saddle_calf

      if (`${modelId[29].toString()}${modelId[30].toString()}`) {
        let saddle_calf_index = `${modelId[29].toString()}${modelId[30].toString()}`;

        if (`${modelId[29].toString()}${modelId[30].toString()}` !== "00") {
          saddleData[0].colors.find((color) => {
            if (color.attribute_value == saddle_calf_index) {
              setState((prev) => ({
                ...prev,
                currentSaddle: {
                  id: color.id,
                  color: color.value,
                  name: color.name,
                  attribute_value: color.attribute_value,
                  category: color.category,
                  texture: "/morf_material/FabricLeatherCowhide003_NRM_1K.jpg",
                },
              }));

              if (group.current) {
                group.current.children.map((e) => {
                  if (e.material.name === "SADDLE") {
                    e.material.color = new THREE.Color(`#${color.value}`);
                    e.material.color.convertSRGBToLinear();
                  }
                });
              }
            }
          });
        }
      }

      // Saddle_suede -> change

      if (`${modelId[31].toString()}${modelId[32].toString()}`) {
        let saddle_suede_index = `${modelId[31].toString()}${modelId[32].toString()}`;

        if (`${modelId[31].toString()}${modelId[32].toString()}` !== "00") {
          saddleData[1].colors.find((color) => {
            if (color.attribute_value == saddle_suede_index) {
              setState((prev) => ({
                ...prev,
                currentSaddle: {
                  id: color.id,
                  color: color.value,
                  name: color.name,
                  category: color.category,
                  attribute_value: color.attribute_value,
                  texture: "/morf_material/suede_canvas_light.jpg",
                },
              }));

              if (group.current) {
                group.current.children.map((e) => {
                  if (e.material.name === "SADDLE") {
                    e.material.color = new THREE.Color(`#${color.value}`);
                    e.material.color.convertSRGBToLinear();
                  }
                });
              }
            }
          });
        }
      }

      // Saddle_others -> change

      if (`${modelId[33].toString()}${modelId[34].toString()}`) {
        let saddle_others_index = `${modelId[33].toString()}${modelId[34].toString()}`;

        if (`${modelId[33].toString()}${modelId[34].toString()}` !== "00") {
          saddleData[2].colors.find((color) => {
            if (color.attribute_value == saddle_others_index) {
              setState((prev) => ({
                ...prev,
                currentSaddle: {
                  id: color.id,
                  color: color.value,
                  name: color.name,
                  attribute_value: color.attribute_value,
                  texture: color.otherTexture,
                  category: color.category,
                },
              }));

              if (group.current) {
                group.current.children.map((e) => {
                  if (e.material.name === "SADDLE") {
                    e.material.color = new THREE.Color(`#${color.value}`);
                    e.material.color.convertSRGBToLinear();
                  }
                });
              }
            }
          });
        }
      }

      // Binding_calf

      if (`${modelId[35].toString()}${modelId[36].toString()}`) {
        let binding_calf_index = `${modelId[35].toString()}${modelId[36].toString()}`;

        if (`${modelId[35].toString()}${modelId[36].toString()}` !== "00") {
          bindingData[0].colors.find((color) => {
            if (color.attribute_value == binding_calf_index) {
              setState((prev) => ({
                ...prev,
                currentBinding: {
                  id: color.id,
                  color: color.value,
                  category: color.category,
                  name: color.name,
                  attribute_value: color.attribute_value,
                  texture: "/morf_material/FabricLeatherCowhide003_NRM_1K.jpg",
                },
              }));

              if (group.current) {
                group.current.children.map((e) => {
                  if (e.material.name === "BINDING") {
                    e.material.color = new THREE.Color(`#${color.value}`);
                    e.material.color.convertSRGBToLinear();
                  }
                });
              }
            }
          });
        }
      }

      // Binding_suede -> change

      if (`${modelId[37].toString()}${modelId[38].toString()}`) {
        let binding_suede_index = `${modelId[37].toString()}${modelId[38].toString()}`;

        if (`${modelId[37].toString()}${modelId[38].toString()}` !== "00") {
          bindingData[1].colors.find((color) => {
            if (color.attribute_value == binding_suede_index) {
              setState((prev) => ({
                ...prev,
                currentBinding: {
                  id: color.id,
                  color: color.value,
                  category: color.category,
                  name: color.name,
                  attribute_value: color.attribute_value,
                  texture: "/morf_material/suede_canvas_light.jpg",
                },
              }));

              if (group.current) {
                group.current.children.map((e) => {
                  if (e.material.name === "BINDING") {
                    e.material.color = new THREE.Color(`#${color.value}`);
                    e.material.color.convertSRGBToLinear();
                  }
                });
              }
            }
          });
        }
      }

      // Binding_others -> change

      if (`${modelId[39].toString()}${modelId[40].toString()}`) {
        let binding_others_index = `${modelId[39].toString()}${modelId[40].toString()}`;

        if (`${modelId[39].toString()}${modelId[40].toString()}` !== "00") {
          bindingData[2].colors.find((color) => {
            if (color.attribute_value == binding_others_index) {
              setState((prev) => ({
                ...prev,
                currentBinding: {
                  id: color.id,
                  color: color.value,
                  category: color.category,
                  name: color.name,
                  attribute_value: color.attribute_value,
                  texture: color.otherTexture,
                },
              }));

              if (group.current) {
                group.current.children.map((e) => {
                  if (e.material.name === "BINDING") {
                    e.material.color = new THREE.Color(`#${color.value}`);
                    e.material.color.convertSRGBToLinear();
                  }
                });
              }
            }
          });
        }
      }

      // Counter_calf

      if (`${modelId[41].toString()}${modelId[42].toString()}`) {
        let counter_calf_index = `${modelId[41].toString()}${modelId[42].toString()}`;

        if (`${modelId[41].toString()}${modelId[42].toString()}` !== "00") {
          counterData[0].colors.find((color) => {
            if (color.attribute_value == counter_calf_index) {
              setState((prev) => ({
                ...prev,
                currentCounter: {
                  id: color.id,
                  color: color.value,
                  name: color.name,
                  attribute_value: color.attribute_value,
                  category: color.category,
                  texture: "/morf_material/FabricLeatherCowhide003_NRM_1K.jpg",
                },
              }));

              if (group.current) {
                group.current.children.map((e) => {
                  if (e.material.name === "COUNTER") {
                    e.material.color = new THREE.Color(`#${color.value}`);
                    e.material.color.convertSRGBToLinear();
                  }
                });
              }
            }
          });
        }
      }

      // Counter_suede -> change

      if (`${modelId[43].toString()}${modelId[44].toString()}`) {
        let counter_suede_index = `${modelId[43].toString()}${modelId[44].toString()}`;

        if (`${modelId[43].toString()}${modelId[44].toString()}` !== "00") {
          counterData[1].colors.find((color) => {
            if (color.attribute_value == counter_suede_index) {
              setState((prev) => ({
                ...prev,
                currentCounter: {
                  id: color.id,
                  color: color.value,
                  name: color.name,
                  attribute_value: color.attribute_value,
                  texture: "/morf_material/suede_canvas_light.jpg",
                  category: color.category,
                },
              }));

              if (group.current) {
                group.current.children.map((e) => {
                  if (e.material.name === "COUNTER") {
                    e.material.color = new THREE.Color(`#${color.value}`);
                    e.material.color.convertSRGBToLinear();
                  }
                });
              }
            }
          });
        }
      }

      // Counter_others -> change

      if (`${modelId[45].toString()}${modelId[46].toString()}`) {
        let counter_others_index = `${modelId[45].toString()}${modelId[46].toString()}`;

        if (`${modelId[45].toString()}${modelId[46].toString()}` !== "00") {
          counterData[2].colors.find((color) => {
            if (color.attribute_value == counter_others_index) {
              setState((prev) => ({
                ...prev,
                currentCounter: {
                  id: color.id,
                  color: color.value,
                  name: color.name,
                  attribute_value: color.attribute_value,
                  texture: color.otherTexture,
                  category: color.category,
                },
              }));

              if (group.current) {
                group.current.children.map((e) => {
                  if (e.material.name === "COUNTER") {
                    e.material.color = new THREE.Color(`#${color.value}`);
                    e.material.color.convertSRGBToLinear();
                  }
                });
              }
            }
          });
        }
      }

      // Upper_calf

      if (`${modelId[47].toString()}${modelId[48].toString()}`) {
        let upper_calf_index = `${modelId[47].toString()}${modelId[48].toString()}`;

        if (`${modelId[47].toString()}${modelId[48].toString()}` !== "00") {
          upperData[0].colors.find((color) => {
            if (color.attribute_value == upper_calf_index) {
              setState((prev) => ({
                ...prev,
                currentUpper: {
                  id: color.id,
                  color: color.value,
                  name: color.name,
                  attribute_value: color.attribute_value,
                  category: color.category,
                  texture: "/morf_material/FabricLeatherCowhide003_NRM_1K.jpg",
                },
              }));

              if (group.current) {
                group.current.children.map((e) => {
                  if (e.material.name === "UPPER") {
                    e.material.color = new THREE.Color(`#${color.value}`);
                    e.material.color.convertSRGBToLinear();
                  }
                });
              }
            }
          });
        }
      }

      // Upper_suede -> change

      if (`${modelId[49].toString()}${modelId[50].toString()}`) {
        let upper_suede_index = `${modelId[49].toString()}${modelId[50].toString()}`;

        if (`${modelId[49].toString()}${modelId[50].toString()}` !== "00") {
          upperData[1].colors.find((color) => {
            if (color.attribute_value == upper_suede_index) {
              setState((prev) => ({
                ...prev,
                currentUpper: {
                  id: color.id,
                  color: color.value,
                  name: color.name,
                  attribute_value: color.attribute_value,
                  category: color.category,
                  texture: "/morf_material/suede_canvas_light.jpg",
                },
              }));

              if (group.current) {
                group.current.children.map((e) => {
                  if (e.material.name === "UPPER") {
                    e.material.color = new THREE.Color(`#${color.value}`);
                    e.material.color.convertSRGBToLinear();
                  }
                });
              }
            }
          });
        }
      }

      // Upper_others -> change

      if (`${modelId[51].toString()}${modelId[52].toString()}`) {
        let upper_others_index = `${modelId[51].toString()}${modelId[52].toString()}`;

        if (`${modelId[51].toString()}${modelId[52].toString()}` !== "00") {
          upperData[2].colors.find((color) => {
            if (color.attribute_value == upper_others_index) {
              setState((prev) => ({
                ...prev,
                currentUpper: {
                  id: color.id,
                  color: color.value,
                  name: color.name,
                  attribute_value: color.attribute_value,
                  texture: color.otherTexture,
                  category: color.category,
                },
              }));

              if (group.current) {
                group.current.children.map((e) => {
                  if (e.material.name === "UPPER") {
                    e.material.color = new THREE.Color(`#${color.value}`);
                    e.material.color.convertSRGBToLinear();
                  }
                });
              }
            }
          });
        }
      }

      // Tassel_calf

      if (`${modelId[53].toString()}${modelId[54].toString()}`) {
        let tassel_calf_index = `${modelId[53].toString()}${modelId[54].toString()}`;

        if (`${modelId[53].toString()}${modelId[54].toString()}` !== "00") {
          tasselData[0].colors.find((color) => {
            if (color.attribute_value == tassel_calf_index) {
              setState((prev) => ({
                ...prev,
                currentTassel: {
                  id: color.id,
                  color: color.value,
                  name: color.name,
                  attribute_value: color.attribute_value,
                  category: color.category,
                  texture: "/morf_material/FabricLeatherCowhide003_NRM_1K.jpg",
                },
              }));

              if (group.current) {
                group.current.children.map((e) => {
                  if (e.material.name === "TASSEL") {
                    e.material.color = new THREE.Color(`#${color.value}`);
                    e.material.color.convertSRGBToLinear();
                  }
                });
              }
            }
          });
        }
      }

      // Tassel_suede -> change

      if (`${modelId[55].toString()}${modelId[56].toString()}`) {
        let tassel_suede_index = `${modelId[55].toString()}${modelId[56].toString()}`;

        if (`${modelId[55].toString()}${modelId[56].toString()}` !== "00") {
          tasselData[1].colors.find((color) => {
            if (color.attribute_value == tassel_suede_index) {
              setState((prev) => ({
                ...prev,
                currentTassel: {
                  id: color.id,
                  color: color.value,
                  name: color.name,
                  attribute_value: color.attribute_value,
                  category: color.category,
                  texture: "/morf_material/suede_canvas_light.jpg",
                },
              }));

              if (group.current) {
                group.current.children.map((e) => {
                  if (e.material.name === "TASSEL") {
                    e.material.color = new THREE.Color(`#${color.value}`);
                    e.material.color.convertSRGBToLinear();
                  }
                });
              }
            }
          });
        }
      }

      // Tassel_others -> change

      if (`${modelId[57].toString()}${modelId[58].toString()}`) {
        let tassel_others_index = `${modelId[57].toString()}${modelId[58].toString()}`;

        if (`${modelId[57].toString()}${modelId[58].toString()}` !== "00") {
          tasselData[2].colors.find((color) => {
            if (color.attribute_value == tassel_others_index) {
              setState((prev) => ({
                ...prev,
                currentTassel: {
                  id: color.id,
                  color: color.value,
                  name: color.name,
                  attribute_value: color.attribute_value,
                  texture: color.otherTexture,
                  category: color.category,
                },
              }));

              if (group.current) {
                group.current.children.map((e) => {
                  if (e.material.name === "TASSEL") {
                    e.material.color = new THREE.Color(`#${color.value}`);
                    e.material.color.convertSRGBToLinear();
                  }
                });
              }
            }
          });
        }
      }

      // Stitching
      if (`${modelId[59].toString()}${modelId[60].toString()}`) {
        let stitch_index = `${modelId[59].toString()}${modelId[60].toString()}`;

        if (`${modelId[59].toString()}${modelId[60].toString()}` !== "00") {
          stitchingData.find((color) => {
            if (color.attribute_value == stitch_index) {
              setState((prev) => ({
                ...prev,
                currentStich: {
                  id: color.id,
                  color: color.value,
                  name: color.name,
                  attribute_value: color.attribute_value,
                },
              }));

              if (group.current) {
                group.current.children.map((e) => {
                  if (e.material.name === "STITCHING") {
                    e.material.color = new THREE.Color(`#${color.value}`);
                    e.material.color.convertSRGBToLinear();
                  }
                });
              }
            }
          });
        }
      }

      // Wing_tip_calf

      if (`${modelId[61].toString()}${modelId[62].toString()}`) {
        let wingTip_calf_index = `${modelId[61].toString()}${modelId[62].toString()}`;

        if (`${modelId[61].toString()}${modelId[62].toString()}` !== "00") {
          wingTipData[0].colors.find((color) => {
            if (color.attribute_value == wingTip_calf_index) {
              setState((prev) => ({
                ...prev,
                currentWingTip: {
                  id: color.id,
                  color: color.value,
                  category: color.category,
                  name: color.name,
                  attribute_value: color.attribute_value,
                  texture: "/morf_material/FabricLeatherCowhide003_NRM_1K.jpg",
                },
              }));

              if (group.current) {
                group.current.children.map((e) => {
                  if (e.material.name === "WINGTIP") {
                    e.material.color = new THREE.Color(`#${color.value}`);
                    e.material.color.convertSRGBToLinear();
                  }
                });
              }
            }
          });
        }
      }

      // Wing_tip_suede -> change

      if (`${modelId[63].toString()}${modelId[64].toString()}`) {
        let wingTip_suede_index = `${modelId[63].toString()}${modelId[64].toString()}`;

        if (`${modelId[63].toString()}${modelId[64].toString()}` !== "00") {
          wingTipData[1].colors.find((color) => {
            if (color.attribute_value == wingTip_suede_index) {
              setState((prev) => ({
                ...prev,
                currentWingTip: {
                  id: color.id,
                  color: color.value,
                  category: color.category,
                  name: color.name,
                  attribute_value: color.attribute_value,
                  texture: "/morf_material/suede_canvas_light.jpg",
                },
              }));

              if (group.current) {
                group.current.children.map((e) => {
                  if (e.material.name === "WINGTIP") {
                    e.material.color = new THREE.Color(`#${color.value}`);
                    e.material.color.convertSRGBToLinear();
                  }
                });
              }
            }
          });
        }
      }

      // Wing_Tip_others -> change

      if (`${modelId[65].toString()}${modelId[66].toString()}`) {
        let wingTip_others_index = `${modelId[65].toString()}${modelId[66].toString()}`;

        if (`${modelId[65].toString()}${modelId[66].toString()}` !== "00") {
          wingTipData[2].colors.find((color) => {
            if (color.attribute_value == wingTip_others_index) {
              setState((prev) => ({
                ...prev,
                currentWingTip: {
                  id: color.id,
                  color: color.value,
                  category: color.category,
                  name: color.name,
                  attribute_value: color.attribute_value,
                  texture: color.otherTexture,
                },
              }));

              if (group.current) {
                group.current.children.map((e) => {
                  if (e.material.name === "WINGTIP") {
                    e.material.color = new THREE.Color(`#${color.value}`);
                    e.material.color.convertSRGBToLinear();
                  }
                });
              }
            }
          });
        }
      }

      // Sole_leather

      if (`${modelId[67].toString()}${modelId[68].toString()}`) {
        let sole_leather_index = `${modelId[67].toString()}${modelId[68].toString()}`;

        if (`${modelId[67].toString()}${modelId[68].toString()}` !== "00") {
          soleData[0].colors.find((color) => {
            if (color.attribute_value == sole_leather_index) {
              setState((prev) => ({
                ...prev,
                currentSole: {
                  id: color.id,
                  color: color.value,
                  category: color.category,
                  name: color.name,
                  attribute_value: color.attribute_value,
                },
              }));

              if (group.current) {
                group.current.children.map((e) => {
                  if (e.material.name === "SOLE") {
                    e.material.color = new THREE.Color(`#${color.value}`);
                    e.material.color.convertSRGBToLinear();
                  }
                });
              }
            }
          });
        }
        setState((prev) => ({
          ...prev,
          // currentModel: state.currentModel,
          // currentDecoration: state.currentDecoration,
          currentBaseURL: modelsData[state.currentBase][state.currentModel].url,
        }));
      }

      // Sole_rubber
      if (`${modelId[69].toString()}${modelId[70].toString()}`) {
        let sole_rubber_index = `${modelId[69].toString()}${modelId[70].toString()}`;

        if (`${modelId[69].toString()}${modelId[70].toString()}` !== "00") {
          soleData[1].colors.find((color) => {
            if (color.attribute_value == sole_rubber_index) {
              setState((prev) => ({
                ...prev,
                currentSole: {
                  id: color.id,
                  color: color.value,
                  category: color.category,
                  name: color.name,
                  attribute_value: color.attribute_value,
                },
              }));

              if (group.current) {
                group.current.children.map((e) => {
                  if (e.material.name === "SOLE") {
                    e.material.color = new THREE.Color(`#${color.value}`);
                    e.material.color.convertSRGBToLinear();
                  }
                });
              }
            }
          });
        }

        setState((prev) => ({
          ...prev,
          // currentModel: state.currentModel,
          // currentDecoration: state.currentDecoration,
          currentBaseURL: modelsData[state.currentBase][state.currentModel].url,
        }));
      }

      // Sole_eva

      if (`${modelId[71].toString()}${modelId[72].toString()}`) {
        let sole_eva_index = `${modelId[71].toString()}${modelId[72].toString()}`;

        if (`${modelId[71].toString()}${modelId[72].toString()}` !== "00") {
          soleData[2].colors.find((color) => {
            if (color.attribute_value == sole_eva_index) {
              setState((prev) => ({
                ...prev,
                currentSole: {
                  id: color.id,
                  color: color.value,
                  category: color.category,
                  name: color.name,
                  attribute_value: color.attribute_value,
                },
              }));

              if (group.current) {
                group.current.children.map((e) => {
                  if (e.material.name === "SOLE") {
                    e.material.color = new THREE.Color(`#${color.value}`);
                    e.material.color.convertSRGBToLinear();
                  }
                });
              }
            }
          });
          setState((prev) => ({
            ...prev,
            // currentModel: state.currentModel,
            // currentDecoration: state.currentDecoration,
            currentBaseURL:
              modelsData[state.currentBase][state.currentModel].soleUrl,
          }));
        }
      }

      // Patina FullGrain
      if (`${modelId[73]?.toString()}${modelId[74]?.toString()}`) {
        //     setState((prev) => ({
        //       ...prev,
        //       currentPatina: "without_patina",
        //     }));
        let fullGrainIndex = `${modelId[73]?.toString()}${modelId[74]?.toString()}`;

        if (`${modelId[73]?.toString()}${modelId[74]?.toString()}` !== "00") {
          patinaFullGrainData[0].colors.find((color) => {
            if (color.attribute_value == fullGrainIndex) {
              setState((prev) => ({
                ...prev,
                currentPatina: "with_patina",
                currentFullGrain: {
                  id: color.id,
                  color: color.value,
                  category: color.category,
                  name: color.name,
                  attribute_value: color.attribute_value,
                  texture: "/morf_material/FabricLeatherCowhide003_NRM_1K.jpg",
                },
              }));

              if (group.current) {
                group.current.children.map((e) => {
                  if (
                    "CAPTOE_COUNTER_QUARTER_VAMP_WINGTIP_UPPER_TASSEL_APRON_SADDLE_BINDING".includes(
                      e.material.name
                    )
                  ) {
                    e.material.color = new THREE.Color(`#${color.value}`);
                    e.material.color.convertSRGBToLinear();
                    e.material.needsUpdate = true;
                  }
                });
              }
            }
          });
        }
      }

      //Patina Suede
      if (`${modelId[75]?.toString()}${modelId[76]?.toString()}`) {
        let suedeIndex = `${modelId[75]?.toString()}${modelId[76]?.toString()}`;

        if (`${modelId[75]?.toString()}${modelId[76]?.toString()}` !== "00") {
          patinaSuedeData[0].colors.find((color) => {
            if (color.attribute_value == suedeIndex) {
              setState((prev) => ({
                ...prev,
                currentPatina: "with_patina",
                currentSuede: {
                  id: color.id,
                  color: color.value,
                  category: color.category,
                  name: color.name,
                  attribute_value: color.attribute_value,
                  texture: `${kurageAssets}/morf/textures/suede/suede_canvas_light.jpg`,
                },
                isPatinaSuede: true,
              }));

              //   if (group.current) {
              //     group.current.children.map((e) => {
              //       console.log("Patina color changing ==>", e.material.name);
              //       if (
              //         "CAPTOE_COUNTER_QUARTER_VAMP_WINGTIP_UPPER_TASSEL_APRON_SADDLE_BINDING".includes(
              //           e.material.name
              //         )
              //       ) {
              //         // e.material.color = new THREE.Color(`#${color.value}`);
              //         // e.material.color.convertSRGBToLinear();

              //         const map = textLoder.load(
              //           `${kurageAssets}/morf/textures/suede/suede_canvas_light.jpg"
              //         );
              //         map.repeat.set(3, 3);
              //         map.wrapS = map.wrapT = THREE.RepeatWrapping;

              //         e.material.map = map;

              //         // setting other map to null
              //         e.material.normalMap = null;
              //         e.material.roughnessMap = null;

              //         e.material.color = new THREE.Color(`#${color.value}`);
              //         e.material.color.convertSRGBToLinear();

              //         e.material.needsUpdate = true;
              //         // setMetirial(e.material);
              //       }
              //     });
              //   }
              if (group.current) {
                group.current.children.forEach((child) => {
                  // check if material name includes any of the given strings
                  if (
                    [
                      "CAPTOE",
                      "COUNTER",
                      "QUARTER",
                      "VAMP",
                      "WINGTIP",
                      "UPPER",
                      "TASSEL",
                      "APRON",
                      "SADDLE",
                      "BINDING",
                    ].some((str) => child.material.name.includes(str))
                  ) {
                    // load texture and set properties
                    const texture = textLoder.load(
                      `${kurageAssets}/morf/textures/suede/suede_canvas_light.jpg`
                    );
                    texture.repeat.set(3, 3);
                    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

                    // set material properties
                    child.material.map = texture;
                    child.material.normalMap = null; // setting other map to null
                    child.material.roughnessMap = null; // setting other map to null
                    child.material.color = new THREE.Color(`#${color.value}`);
                    child.material.color.convertSRGBToLinear();
                    child.material.needsUpdate = true;
                  }
                });
              }
            }
          });
        }
      }
    }
  }, [modelId, group.current]);

  useEffect(() => {
    // console.log("useEffect with ADT", modelId);
    setAddToCartData({
      base_model:
        (state.currentBase === "round" && "1") ||
        (state.currentBase === "almond" && "2") ||
        (state.currentBase === "square" && "3"),
      model_style:
        (state.currentModel === "oxford" && "1") ||
        (state.currentModel === "derby" && "2") ||
        (state.currentModel === "monkStrap" && "3") ||
        (state.currentModel === "loafer" && "4"),
      decoration:
        (state.currentDecoration === "classic" && "1") ||
        (state.currentDecoration === "capToe" && "2") ||
        (state.currentDecoration === "fullBrogue" && "3") ||
        (state.currentDecoration === "wholeCut" && "4") ||
        (state.currentDecoration === "wingTip" && "5") ||
        (state.currentDecoration === "wingTipFullBrogue" && "6") ||
        (state.currentDecoration === "classicBrogue" && "7") ||
        (state.currentDecoration === "tassel" && "8") ||
        (state.currentDecoration === "penny" && "9"),
      vamp_calf:
        state.currentVamp.category === "CALF LEATHER"
          ? state.currentVamp.attribute_value
          : "00",
      vamp_suede:
        state.currentVamp.category === "SUEDE"
          ? state.currentVamp.attribute_value
          : "00",
      vamp_others:
        state.currentVamp.category === "OTHERS"
          ? state?.currentVamp?.attribute_value
          : "00",
      quarter_calf:
        state.currentQuarter.category === "CALF LEATHER"
          ? state.currentQuarter.attribute_value
          : "00",
      quarter_suede:
        state.currentQuarter.category === "SUEDE"
          ? state.currentQuarter.attribute_value
          : "00",
      quarter_others:
        state.currentQuarter.category === "OTHERS"
          ? state?.currentQuarter?.attribute_value
          : "00",
      captoe_calf:
        state.currentCapToe.category === "CALF LEATHER"
          ? state.currentCapToe.attribute_value
          : "00",

      captoe_suede:
        state.currentCapToe.category === "SUEDE"
          ? state.currentCapToe.attribute_value
          : "00",

      captoe_others:
        state.currentCapToe.category === "OTHERS"
          ? state?.currentCapToe?.attribute_value
          : "00",

      lace: state.currentLace.attribute_value
        ? state.currentLace.attribute_value
        : "00",

      apron_calf:
        state.currentApron.category === "CALF LEATHER"
          ? state.currentApron.attribute_value
          : "00",

      apron_suede:
        state.currentApron.category === "SUEDE"
          ? state.currentApron.attribute_value
          : "00",

      apron_others:
        state.currentApron.category === "OTHERS"
          ? state.currentApron.attribute_value
          : "00",

      saddle_calf:
        state.currentSaddle.category === "CALF LEATHER"
          ? state.currentSaddle.attribute_value
          : "00",

      saddle_suede:
        state.currentSaddle.category === "SUEDE"
          ? state.currentSaddle.attribute_value
          : "00",

      saddle_others:
        state.currentSaddle.category === "OTHERS"
          ? state.currentSaddle.attribute_value
          : "00",

      binding_calf:
        state.currentBinding.category === "CALF LEATHER"
          ? state.currentBinding.attribute_value
          : "00",

      binding_suede:
        state.currentBinding.category === "SUEDE"
          ? state.currentBinding.attribute_value
          : "00",

      binding_others:
        state.currentBinding.category === "OTHERS"
          ? state.currentBinding.attribute_value
          : "00",

      counter_calf:
        state.currentCounter.category === "CALF LEATHER"
          ? state.currentCounter.attribute_value
          : "00",

      counter_suede:
        state.currentCounter.category === "SUEDE"
          ? state.currentCounter.attribute_value
          : "00",

      counter_others:
        state.currentCounter.category === "OTHERS"
          ? state.currentCounter.attribute_value
          : "00",

      upper_calf:
        state.currentUpper.category === "CALF LEATHER"
          ? state.currentUpper.attribute_value
          : "00",

      upper_suede:
        state.currentUpper.category === "SUEDE"
          ? state.currentUpper.attribute_value
          : "00",

      upper_others:
        state.currentUpper.category === "OTHERS"
          ? state.currentUpper.attribute_value
          : "00",

      tassel_calf:
        state.currentTassel.category === "CALF LEATHER"
          ? state.currentTassel.attribute_value
          : "00",

      tassel_suede:
        state.currentTassel.category === "SUEDE"
          ? state.currentTassel.attribute_value
          : "00",

      tassel_others:
        state.currentTassel.category === "OTHERS"
          ? state.currentTassel.attribute_value
          : "00",

      stitching: state.currentStich.attribute_value
        ? state.currentStich.attribute_value
        : "00",

      wingTip_calf:
        state.currentWingTip.category === "CALF LEATHER"
          ? state.currentWingTip.attribute_value
          : "00",

      wingTip_suede:
        state.currentWingTip.category === "SUEDE"
          ? state.currentWingTip.attribute_value
          : "00",

      wingTip_others:
        state.currentWingTip.category === "OTHERS"
          ? state?.currentWingTip?.attribute_value
          : "00",

      sole_leather:
        state.currentSole.category === "Leather"
          ? state.currentSole.attribute_value
          : "00",
      sole_rubber:
        state.currentSole.category === "Rubber"
          ? state.currentSole.attribute_value
          : "00",
      sole_eva:
        state.currentSole.category === "Eva"
          ? state.currentSole.attribute_value
          : "00",
      patina_FullGrain:
        state.currentPatina == "with_patina"
          ? state.currentFullGrain.attribute_value
            ? state.currentFullGrain.attribute_value
            : "00"
          : "00",
      patina_Suede:
        state.currentPatina == "with_patina"
          ? state.currentSuede.attribute_value
            ? state.currentSuede.attribute_value
            : "00"
          : "00",
    });

    if (state.currentEngrave.leftShoe && state.currentEngrave.rightShoe) {
      // setUpdatedPrice(parseInt(state.currentPrice) + 1000);
      return;
    } else if (
      state.currentEngrave.leftShoe === "" &&
      state.currentEngrave.rightShoe !== ""
    ) {
      setUpdatedPrice(parseInt(state.currentPrice) + 500);
    } else if (
      state.currentEngrave.leftShoe !== "" &&
      state.currentEngrave.rightShoe === ""
    ) {
      // setUpdatedPrice(parseInt(state.currentPrice) + 500);
    }
  }, [state]);

  // console.log("updatedPrice outside", updatedPrice);

  const handleOptionClick = () => {
    // console.log("APP => handleOptionClick ==>");
    setOpenOption((prev) => !prev);
  };

  const handleSetCurrentSeleted = (e) => {
    setCurrentSeleted(() => e);

    // console.log("APP => handleSetCurrentSeleted ==> e ", e);

    if (
      "CAPTOE_COUNTER_QUARTER_VAMP_WINGTIP_STITCHING_LACES_SOLE_TASSEL_BINDING_APRON_SADDLE_UPPER_TASSEL_FULLGRAIN_SUEDE".includes(
        e?.name
      )
    ) {
      setCurrentType(() => e.name);
    }
  };

  const tweenCamera = (e) => {
    TweenMax.to(cameraRef.current.position, 1, {
      ...e,
    });
  };

  const animateCamera = (e) => {
    // console.log("APP => animateCamera ==> e ", e);
    switch (e) {
      case "STITCHING":
        tweenCamera(rotationData[e]);
        break;
      case "VAMP":
        tweenCamera(rotationData[e]);
        break;
      case "QUARTER":
        tweenCamera(rotationData[e]);
        break;
      case "LACES":
        tweenCamera(rotationData[e]);
        break;
      case "SOLE":
        tweenCamera(rotationData[e]);
        break;
      case "CAPTOE":
        tweenCamera(rotationData[e]);
        break;
      case "WINGTIP":
        tweenCamera(rotationData[e]);
        break;
      case "COUNTER":
        tweenCamera(rotationData[e]);
        break;
      case "APRON":
        tweenCamera(rotationData[e]);
        break;
      case "UPPER":
        tweenCamera(rotationData[e]);
        break;
      case "SADDLE":
        tweenCamera(rotationData[e]);
        break;
      case "FULLGRAIN":
        tweenCamera(rotationData[e]);
        break;
      case "SUEDE":
        tweenCamera(rotationData[e]);
        break;

      default:
        break;
    }
  };

  const handleAccadionClick = (e) => {
    setCurrentType((prev) => e);
    if (
      "CAPTOE_COUNTER_QUARTER_VAMP_WINGTIP_STITCHING_LACES_SOLE_TASSEL_BINDING_APRON_SADDLE_UPPER_TASSEL_FULLGRAIN_SUEDE".includes(
        e
      )
    ) {
      animateCamera(e);

      setCurrentSeleted((prev) => ({ ...prev, name: e }));
    }
  };

  const handleBaseModelClick = useCallback((base) => {
    // setMetirial(null);
    // console.log("APP => handleBaseModelClick ==> base ", modelChange, state);
    if (modelId) {
      router.push("/customiser");
    }

    setState((prev) => ({
      ...prev,
      currentCapToe: {
        attribute_value: "05",
        color: "a76820",
        name: "Tan",
        category: "CALF LEATHER",
        otherTexture: "",
        texture: "/morf_material/FabricLeatherCowhide003_NRM_1K.jpg",
      },
      currentVamp: {
        attribute_value: "05",
        color: "a76820",
        name: "Tan",
        category: "CALF LEATHER",
        otherTexture: "",
        texture: "/morf_material/FabricLeatherCowhide003_NRM_1K.jpg",
      },
      currentQuarter: {
        attribute_value: "05",
        color: "a76820",
        name: "Tan",
        category: "CALF LEATHER",
        otherTexture: "",
        texture: "/morf_material/FabricLeatherCowhide003_NRM_1K.jpg",
      },
      currentWingTip: {
        attribute_value: "05",
        color: "a76820",
        name: "Tan",
        category: "CALF LEATHER",
        otherTexture: "",
        texture: "/morf_material/FabricLeatherCowhide003_NRM_1K.jpg",
      },
      currentCounter: {
        attribute_value: "05",
        color: "a76820",
        name: "Tan",
        category: "CALF LEATHER",
        otherTexture: "",
        texture: "/morf_material/FabricLeatherCowhide003_NRM_1K.jpg",
      },
      currentUpper: {
        attribute_value: "05",
        color: "a76820",
        name: "Tan",
        category: "CALF LEATHER",
        otherTexture: "",
        texture: "/morf_material/FabricLeatherCowhide003_NRM_1K.jpg",
      },
      currentBinding: {
        attribute_value: "05",
        color: "a76820",
        name: "Tan",
        category: "CALF LEATHER",
        otherTexture: "",
        texture: "/morf_material/FabricLeatherCowhide003_NRM_1K.jpg",
      },
      currentApron: {
        attribute_value: "05",
        color: "a76820",
        name: "Tan",
        category: "CALF LEATHER",
        otherTexture: "",
        texture: "/morf_material/FabricLeatherCowhide003_NRM_1K.jpg",
      },
      currentSaddle: {
        attribute_value: "05",
        color: "a76820",
        name: "Tan",
        category: "CALF LEATHER",
        texture: "/morf_material/FabricLeatherCowhide003_NRM_1K.jpg",
      },
      currentTassel: {
        attribute_value: "05",
        color: "a76820",
        name: "Tan",
        category: "CALF LEATHER",
        otherTexture: "",
        texture: "/morf_material/FabricLeatherCowhide003_NRM_1K.jpg",
      },
      currentSole: {
        attribute_value: "18",
        color: "573419",
        name: "Natural",
        category: "Leather",
      },
      // loading: true,
      currentBase: base,
      currentBaseURL: modelsData[base][prev.currentModel].url,
    })),
      [state.currentBase];
    setMetirial(null);
  });

  const handleModelStyleClick = useCallback((modelStyle) => {
    // console.log("APP => handleModelStyleClick ==> modelStyle ", modelStyle);

    if (modelId) {
      router.push("/customiser");
      // handleResetClick();
    }

    modelStyle === "loafer"
      ? setState((prev) => ({
          ...prev,
          currentCapToe: {
            attribute_value: "05",
            color: "a76820",
            name: "Tan",
            category: "CALF LEATHER",
            otherTexture: "",
            texture: "/morf_material/FabricLeatherCowhide003_NRM_1K.jpg",
          },
          currentVamp: {
            attribute_value: "05",
            color: "a76820",
            name: "Tan",
            category: "CALF LEATHER",
            otherTexture: "",
            texture: "/morf_material/FabricLeatherCowhide003_NRM_1K.jpg",
          },
          currentQuarter: {
            attribute_value: "05",
            color: "a76820",
            name: "Tan",
            category: "CALF LEATHER",
            otherTexture: "",
            texture: "/morf_material/FabricLeatherCowhide003_NRM_1K.jpg",
          },
          currentWingTip: {
            attribute_value: "05",
            color: "a76820",
            name: "Tan",
            category: "CALF LEATHER",
            otherTexture: "",
            texture: "/morf_material/FabricLeatherCowhide003_NRM_1K.jpg",
          },
          currentCounter: {
            attribute_value: "05",
            color: "a76820",
            name: "Tan",
            category: "CALF LEATHER",
            otherTexture: "",
            texture: "/morf_material/FabricLeatherCowhide003_NRM_1K.jpg",
          },
          currentUpper: {
            attribute_value: "05",
            color: "a76820",
            name: "Tan",
            category: "CALF LEATHER",
            otherTexture: "",
            texture: "/morf_material/FabricLeatherCowhide003_NRM_1K.jpg",
          },
          currentBinding: {
            attribute_value: "05",
            color: "a76820",
            name: "Tan",
            category: "CALF LEATHER",
            otherTexture: "",
            texture: "/morf_material/FabricLeatherCowhide003_NRM_1K.jpg",
          },
          currentApron: {
            attribute_value: "05",
            color: "a76820",
            name: "Tan",
            category: "CALF LEATHER",
            otherTexture: "",
            texture: "/morf_material/FabricLeatherCowhide003_NRM_1K.jpg",
          },
          currentSaddle: {
            attribute_value: "05",
            color: "a76820",
            name: "Tan",
            category: "CALF LEATHER",
            otherTexture: "",
            texture: "/morf_material/FabricLeatherCowhide003_NRM_1K.jpg",
          },
          currentTassel: {
            attribute_value: "05",
            color: "a76820",
            name: "Tan",
            category: "CALF LEATHER",
            otherTexture: "",
            texture: "/morf_material/FabricLeatherCowhide003_NRM_1K.jpg",
          },
          currentSole: {
            attribute_value: "18",
            color: "573419",
            name: "Natural",
            category: "Leather",
          },
          currentModel: modelStyle,
          currentDecoration: "penny",
          currentBaseURL: modelsData[prev.currentBase][modelStyle].url,
        }))
      : setState((prev) => ({
          ...prev,
          currentCapToe: {
            attribute_value: "05",
            color: "a76820",
            name: "Tan",
            category: "CALF LEATHER",
            otherTexture: "",
            texture: "/morf_material/FabricLeatherCowhide003_NRM_1K.jpg",
          },
          currentVamp: {
            attribute_value: "05",
            color: "a76820",
            name: "Tan",
            category: "CALF LEATHER",
            otherTexture: "",
            texture: "/morf_material/FabricLeatherCowhide003_NRM_1K.jpg",
          },
          currentQuarter: {
            attribute_value: "05",
            color: "a76820",
            name: "Tan",
            category: "CALF LEATHER",
            otherTexture: "",
            texture: "/morf_material/FabricLeatherCowhide003_NRM_1K.jpg",
          },
          currentWingTip: {
            attribute_value: "05",
            color: "a76820",
            name: "Tan",
            category: "CALF LEATHER",
            otherTexture: "",
            texture: "/morf_material/FabricLeatherCowhide003_NRM_1K.jpg",
          },
          currentCounter: {
            attribute_value: "05",
            color: "a76820",
            name: "Tan",
            category: "CALF LEATHER",
            otherTexture: "",
            texture: "/morf_material/FabricLeatherCowhide003_NRM_1K.jpg",
          },
          currentUpper: {
            attribute_value: "05",
            color: "a76820",
            name: "Tan",
            category: "CALF LEATHER",
            otherTexture: "",
            texture: "/morf_material/FabricLeatherCowhide003_NRM_1K.jpg",
          },
          currentBinding: {
            attribute_value: "05",
            color: "a76820",
            name: "Tan",
            category: "CALF LEATHER",
            otherTexture: "",
            texture: "/morf_material/FabricLeatherCowhide003_NRM_1K.jpg",
          },
          currentApron: {
            attribute_value: "05",
            color: "a76820",
            name: "Tan",
            category: "CALF LEATHER",
            otherTexture: "",
            texture: "/morf_material/FabricLeatherCowhide003_NRM_1K.jpg",
          },
          currentSaddle: {
            attribute_value: "05",
            color: "a76820",
            name: "Tan",
            category: "CALF LEATHER",
            otherTexture: "",
            texture: "/morf_material/FabricLeatherCowhide003_NRM_1K.jpg",
          },
          currentTassel: {
            attribute_value: "05",
            color: "a76820",
            name: "Tan",
            category: "CALF LEATHER",
            otherTexture: "",
            texture: "/morf_material/FabricLeatherCowhide003_NRM_1K.jpg",
          },
          currentSole: {
            attribute_value: "18",
            color: "573419",
            name: "Natural",
            category: "Leather",
          },
          currentModel: modelStyle,
          currentDecoration:
            prev.currentModel === "loafer" ? "classic" : prev.currentDecoration,
          currentBaseURL: modelsData[prev.currentBase][modelStyle].url,
        })),
      [state.currentModel];
    setMetirial(null);
  });

  const handleDecorationClick = useCallback((decoration) => {
    setMetirial(null);
    setState((prev) => ({
      ...prev,
      currentDecoration: decoration,
    })),
      [state.currentDecoration];
  });

  const handlePatinaClick = useCallback(
    (patina) => {
      patina == "with_patina"
        ? setUpdatedPrice(Number(basePrice) + 1500)
        : setUpdatedPrice(basePrice);
      // setState((prev) => ({
      //   ...prev,
      //   currentPatina: patina,
      // }));
      setState((prev) => ({
        ...prev,
        currentPatina: patina,
        currentCapToe: {
          attribute_value: "05",
          color: "a76820",
          name: "Tan",
          category: "CALF LEATHER",
          otherTexture: "",
          texture: "/morf_material/FabricLeatherCowhide003_NRM_1K.jpg",
        },
        currentVamp: {
          attribute_value: "05",
          color: "a76820",
          name: "Tan",
          category: "CALF LEATHER",
          otherTexture: "",
          texture: "/morf_material/FabricLeatherCowhide003_NRM_1K.jpg",
        },
        currentQuarter: {
          attribute_value: "05",
          color: "a76820",
          name: "Tan",
          category: "CALF LEATHER",
          otherTexture: "",
          texture: "/morf_material/FabricLeatherCowhide003_NRM_1K.jpg",
        },
        currentWingTip: {
          attribute_value: "05",
          color: "a76820",
          name: "Tan",
          category: "CALF LEATHER",
          otherTexture: "",
          texture: "/morf_material/FabricLeatherCowhide003_NRM_1K.jpg",
        },
        currentCounter: {
          attribute_value: "05",
          color: "a76820",
          name: "Tan",
          category: "CALF LEATHER",
          otherTexture: "",
          texture: "/morf_material/FabricLeatherCowhide003_NRM_1K.jpg",
        },
        currentUpper: {
          attribute_value: "05",
          color: "a76820",
          name: "Tan",
          category: "CALF LEATHER",
          otherTexture: "",
          texture: "/morf_material/FabricLeatherCowhide003_NRM_1K.jpg",
        },
        currentBinding: {
          attribute_value: "05",
          color: "a76820",
          name: "Tan",
          category: "CALF LEATHER",
          otherTexture: "",
          texture: "/morf_material/FabricLeatherCowhide003_NRM_1K.jpg",
        },
        currentApron: {
          attribute_value: "05",
          color: "a76820",
          name: "Tan",
          category: "CALF LEATHER",
          otherTexture: "",
          texture: "/morf_material/FabricLeatherCowhide003_NRM_1K.jpg",
        },
        currentSaddle: {
          attribute_value: "05",
          color: "a76820",
          name: "Tan",
          category: "CALF LEATHER",
          texture: "/morf_material/FabricLeatherCowhide003_NRM_1K.jpg",
        },
        currentTassel: {
          attribute_value: "05",
          color: "a76820",
          name: "Tan",
          category: "CALF LEATHER",
          otherTexture: "",
          texture: "/morf_material/FabricLeatherCowhide003_NRM_1K.jpg",
        },
        currentSole: {
          attribute_value: "18",
          color: "a76820",
          name: "Natural",
          category: "Leather",
        },
        // loading: true,
        // currentBase: base,
        // currentBaseURL: modelsData[base][prev.currentModel].url,
      })),
        [state.currentBase];
      setMetirial(null);
    },
    [state.currentPatina]
  );

  const disableMapIntensity = (e) => {
    e.material.envMapIntensity = 0;
    e.material.metalness = 0;
    e.material.roughness = 1;
  };

  const sneakerGroup = (color, category, otherTexture) => {
    group.current.children.map((e) => {
      if (category == "FULL GRAIN" || category == "PATINASUEDE") {
        if (
          "CAPTOE_COUNTER_QUARTER_VAMP_WINGTIP_UPPER_TASSEL_APRON_SADDLE_BINDING".includes(
            e.material.name
          )
        ) {
          //texture => calf & color
          if (category == "FULL GRAIN") {
            const normalMap = textLoder.load(
              `${kurageAssets}/morf/textures/calfLeather/FabricLeatherCowhide003_NRM_1K.jpg`
            );
            normalMap.repeat.set(5, 5);
            normalMap.wrapS = normalMap.wrapT = THREE.RepeatWrapping;

            const roughnessMap = textLoder.load(
              `${kurageAssets}/morf/textures/calfLeather/FabricLeatherCowhide003_GLOSS_1K.jpg`
            );
            roughnessMap.repeat.set(1, 1);
            e.material.normalMap = normalMap;
            e.material.roughnessMap = roughnessMap;
            e.material.map = null;
            // e.material.aoMap = null;
            e.material.color = new THREE.Color(color ? `#${color}` : "");
            e.material.color.convertSRGBToLinear();
            e.material.needsUpdate = true;
            // setMetirial(e.material);
          } else if (category == "PATINASUEDE") {
            setState((prev) => ({
              ...prev,
              isPatinaSuede: true,
            }));
            const map = textLoder.load(
              `${kurageAssets}/morf/textures/suede/suede_canvas_light.jpg`
            );
            map.repeat.set(3, 3);
            map.wrapS = map.wrapT = THREE.RepeatWrapping;
            map.anisotropy = 4;
            e.material.map = map;

            // setting other map to null
            e.material.normalMap = null;
            e.material.roughnessMap = null;

            // setting default values
            // disableMapIntensity(e);

            if (color == "000000") {
              e.material.color = new THREE.Color("#2d2d2d");
              e.material.transparent = true;
              // e.material.opacity = 0.8
              e.material.color.convertSRGBToLinear();
            }

            if (color) {
              e.material.color = new THREE.Color(`#${color}`);
              e.material.color.convertSRGBToLinear();
            }

            e.material.color = new THREE.Color(color ? `#${color}` : "");
            e.material.color.convertSRGBToLinear();
            e.material.needsUpdate = true;
            // setMetirial(e.material);
          }
        }
      } else {
        if (e.material.name === currentSeleted?.name) {
          if (
            "CAPTOE_COUNTER_QUARTER_VAMP_WINGTIP_UPPER_TASSEL_APRON_SADDLE_BINDING".includes(
              e.material.name
            )
          ) {
            if (category === "CALF LEATHER") {
              const normalMap = textLoder.load(
                `${kurageAssets}/morf/textures/calfLeather/FabricLeatherCowhide003_NRM_1K.jpg`
              );
              normalMap.repeat.set(5, 5);
              normalMap.wrapS = normalMap.wrapT = THREE.RepeatWrapping;
              disableMapIntensity(e);
              const roughnessMap = textLoder.load(
                `${kurageAssets}/morf/textures/calfLeather/FabricLeatherCowhide003_GLOSS_1K.jpg`
              );
              roughnessMap.repeat.set(1, 1);
              e.geometry.setAttribute(
                "uv2",
                new THREE.BufferAttribute(e.geometry.attributes.uv.array, 2)
              );

              roughnessMap.wrapS = roughnessMap.wrapT = THREE.RepeatWrapping;

              // updating Map
              e.material.normalMap = normalMap;
              e.material.roughnessMap = roughnessMap;
              e.material.map = null;
              e.material.aoMap = null;
              e.material.color = new THREE.Color(`#${color}`);
              e.material.color.convertSRGBToLinear();
              e.material.needsUpdate = true;
              // setMetirial(e.material);
            } else if (category === "SUEDE") {
              const map = textLoder.load(
                `${kurageAssets}/morf/textures/suede/suede_canvas_light.jpg`
              );
              map.repeat.set(2, 2);
              map.wrapS = map.wrapT = THREE.RepeatWrapping;

              e.material.map = map;

              // setting other map to null
              e.material.normalMap = null;
              e.material.roughnessMap = null;

              // setting default values
              disableMapIntensity(e);

              if (color == "000000") {
                e.material.color = new THREE.Color("#1D1D1D");
                e.material.transparent = true;
                // e.material.opacity = 0.8
                e.material.color.convertSRGBToLinear();
              } else if (color) {
                e.material.color = new THREE.Color(`#${color}`);
                e.material.color.convertSRGBToLinear();
              }
              e.material.needsUpdate = true;
              // setMetirial(e.material);
            } else if (category === "OTHERS") {
              // console.log("OTHERS====>", e.material.name, otherTexture);
              const mapTexture = otherTexture.slice(15);
              disableMapIntensity(e);

              if (mapTexture == "blackPatent.jpg") {
                //map
                const map = textLoder.load(otherTexture);
                map.repeat.set(5, 5);
                map.wrapS = map.wrapT = THREE.RepeatWrapping;

                // setting map
                e.material.map = map;
                e.material.normalMap = null;
                e.material.roughnessMap = null;

                // setting defult value
                e.material.envMapIntensity = 2;
                (e.material.roughness = 0.2), (e.material.metalness = 1);

                // updating color
                e.material.color = new THREE.Color("#8f8f8f");
                e.material.transparent = true;
                e.material.color.convertSRGBToLinear();
              } else if (mapTexture == "blackVelvet.jpg") {
                //map
                const map = textLoder.load(otherTexture);
                map.repeat.set(15, 15);
                map.wrapS = map.wrapT = THREE.RepeatWrapping;

                // updating map
                e.material.map = map;
                e.material.normalMap = null;
                e.material.roughnessMap = null;
                disableMapIntensity(e);
                e.material.color = new THREE.Color(color ? `#${color}` : "");
                e.material.color.convertSRGBToLinear();
                e.material.needsUpdate = true;

                // e.material.needsUpdate = true;
              } else if (mapTexture == "beigeBrocade.jpg") {
                //map
                const map = textLoder.load(otherTexture);
                map.repeat.set(3, 3);
                map.wrapS = map.wrapT = THREE.RepeatWrapping;

                // updating map
                e.material.map = map;
                e.material.normalMap = null;
                e.material.roughnessMap = null;
                disableMapIntensity(e);

                e.material.color = new THREE.Color("");
                e.material.color.convertSRGBToLinear();
                // e.material.opacity = 20;
                e.material.needsUpdate = true;

                // e.material.needsUpdate = true;
              } else {
                //map
                const map = textLoder.load(otherTexture);
                map.repeat.set(3, 3);
                map.wrapS = map.wrapT = THREE.RepeatWrapping;

                //rotating map
                map.rotation = 1.375;

                // updating map
                e.material.map = map;
                e.material.normalMap = null;
                e.material.roughnessMap = null;
                e.material.color = new THREE.Color(color ? `#${color}` : "");
                e.material.color.convertSRGBToLinear();
                disableMapIntensity(e);
                e.material.needsUpdate = true;
              }
              // setMetirial(e.material);
              e.material.needsUpdate = true;
            }

            // e.material.color = new THREE.Color(color ? `#${color}` : "");
            // e.material.color.convertSRGBToLinear();
            // setMetirial(e.material);
          }
          if (
            e.material.name == "SOLE" ||
            e.material.name == "STITCHING" ||
            e.material.name == "LACES"
          ) {
            e.material.color = new THREE.Color(color ? `#${color}` : "");
            e.material.color.convertSRGBToLinear();
            // setMetirial(e.material);
          }
        }
        //  e.material.color = new THREE.Color(color ? `#${color}` : "");
        //  e.material.color.convertSRGBToLinear();
      }
    });
  };

  const handleSizeClick = useCallback((size, name) => {
    setState((prev) => ({
      ...prev,
      currentSize: {
        size: size,
        name: name,
      },
    }));

    setSizeError(false);
  });

  const handleWidthClick = useCallback((width, name) => {
    setState((prev) => ({
      ...prev,
      currentWidth: {
        width: width,
        name: name,
      },
    }));
  });

  // 1
  const handleVampClick = useCallback(
    (
      id,
      color,
      name,
      attribute_value,
      category,
      otherTexture,
      others_value
    ) => {
      setState((prev) => ({
        ...prev,
        currentVamp: {
          id: id,
          color: color,
          name: name,
          attribute_value: attribute_value,
          category: category,
          otherTexture: category == "OTHERS" ? otherTexture : "",
          others_value: category == "OTHERS" ? others_value : "",
          texture:
            category == "OTHERS"
              ? otherTexture
              : category == "SUEDE"
              ? "/morf_material/suede_canvas_light.jpg"
              : "/morf_material/FabricLeatherCowhide003_NRM_1K.jpg",
        },
      }));
      category == "OTHERS"
        ? sneakerGroup(color, category, otherTexture)
        : sneakerGroup(color, category);
    }
  );

  const handleFullGrainClick = useCallback(
    (
      id,
      color,
      name,
      attribute_value,
      category,
      otherTexture,
      others_value
    ) => {
      setState((prev) => ({
        ...prev,
        currentFullGrain: {
          id: id,
          color: color,
          name: name,
          attribute_value: attribute_value,
          category: category,
          otherTexture: category == "OTHERS" ? otherTexture : "",
          others_value: category == "OTHERS" ? others_value : "",
          texture:
            category == "OTHERS"
              ? otherTexture
              : category == "SUEDE"
              ? "/morf_material/suede_canvas_light.jpg"
              : "/morf_material/FabricLeatherCowhide003_NRM_1K.jpg",
        },
        currentSuede: {},
        // currentVamp: {
        //   color: color,
        //   name: name,
        //   attribute_value: attribute_value,
        //   category: "CALF LEATHER",
        // },
      }));
      category == "OTHERS"
        ? sneakerGroup(color, category, otherTexture)
        : sneakerGroup(color, category);
    }
  );

  const handleSuedeClick = useCallback(
    (
      id,
      color,
      name,
      attribute_value,
      category,
      otherTexture,
      others_value
    ) => {
      setState((prev) => ({
        ...prev,

        currentSuede: {
          id: id,
          color: color,
          name: name,
          attribute_value: attribute_value,
          category: category,
          otherTexture: category == "OTHERS" ? otherTexture : "",
          others_value: category == "OTHERS" ? others_value : "",
          texture:
            category == "OTHERS"
              ? otherTexture
              : category == "SUEDE"
              ? "/morf_material/suede_canvas_light.jpg"
              : "/morf_material/FabricLeatherCowhide003_NRM_1K.jpg",
        },
        currentFullGrain: {},
      }));
      category == "OTHERS"
        ? sneakerGroup(color, category, otherTexture)
        : sneakerGroup(color, category);
    }
  );

  const handleWingTipClick = useCallback(
    (
      id,
      color,
      name,
      attribute_value,
      category,
      otherTexture,
      others_value
    ) => {
      setState((prev) => ({
        ...prev,
        currentWingTip: {
          id: id,
          color: color,
          name: name,
          attribute_value: attribute_value,
          category: category,
          otherTexture: category == "OTHERS" ? otherTexture : "",
          others_value: category == "OTHERS" ? others_value : "",
          texture:
            category == "OTHERS"
              ? otherTexture
              : category == "SUEDE"
              ? "/morf_material/suede_canvas_light.jpg"
              : "/morf_material/FabricLeatherCowhide003_NRM_1K.jpg",
        },
      })),
        category == "OTHERS"
          ? sneakerGroup(color, category, otherTexture)
          : sneakerGroup(color, category);
    }
  );

  const handleQuarterClick = useCallback(
    (
      id,
      color,
      name,
      attribute_value,
      category,
      otherTexture,
      others_value
    ) => {
      setState((prev) => ({
        ...prev,
        currentQuarter: {
          id: id,
          color: color,
          name: name,
          attribute_value: attribute_value,
          category: category,
          otherTexture: category == "OTHERS" ? otherTexture : "",
          others_value: category == "OTHERS" ? others_value : "",
          texture:
            category == "OTHERS"
              ? otherTexture
              : category == "SUEDE"
              ? "/morf_material/suede_canvas_light.jpg"
              : "/morf_material/FabricLeatherCowhide003_NRM_1K.jpg",
        },
      })),
        // handleColorClick(color);
        category == "OTHERS"
          ? sneakerGroup(color, category, otherTexture)
          : sneakerGroup(color, category);
    }
  );

  //coment here :->
  const handleSoleClick = useCallback(
    (id, color, name, attribute_value, category) => {
      if (category == "Leather") {
        setState((prev) => ({
          ...prev,
          // currentBaseURL: "models/evaSoleModel/round.glb",
          currentSole: {
            id: id,
            color: color,
            name: name,
            attribute_value: attribute_value,
            category: category,
          },
          // currentModel: state.currentModel,
          // currentDecoration: state.currentDecoration,
          currentBaseURL: modelsData[state.currentBase][state.currentModel].url,
        }));
        sneakerGroup(color, category);
      } else if (category == "Rubber") {
        setState((prev) => ({
          ...prev,
          // currentBaseURL: "models/evaSoleModel/round.glb",
          currentSole: {
            id: id,
            color: color,
            name: name,
            attribute_value: attribute_value,
            category: category,
          },
          // currentModel: state.currentModel,
          // currentDecoration: state.currentDecoration,
          currentBaseURL: modelsData[state.currentBase][state.currentModel].url,
        }));
        sneakerGroup(color, category);
      } else if (category == "Eva") {
        // setMetirial(null);
        setState((prev) => ({
          ...prev,
          // currentModel: state.currentModel,
          // currentDecoration: state.currentDecoration,
          currentSole: {
            id: id,
            color: color,
            name: name,
            attribute_value: attribute_value,
            category: category,
          },
          currentBaseURL:
            modelsData[state.currentBase][state.currentModel].soleUrl,
        }));
        // sneakerGroup(color, category);
      }

      //  console.log("HandleSoleModel=> category", category, state.currentSole);
      // handleColorClick(color);
    }
  );

  const handleLaceClick = useCallback((id, color, name, attribute_value) => {
    setState((prev) => ({
      ...prev,
      currentLace: {
        id: id,
        color: color,
        name: name,
        attribute_value: attribute_value,
      },
    })),
      // handleColorClick(color);
      sneakerGroup(color);
  });

  const handleBindingClick = useCallback(
    (
      id,
      color,
      name,
      attribute_value,
      category,
      otherTexture,
      others_value
    ) => {
      setState((prev) => ({
        ...prev,
        currentBinding: {
          id: id,
          color: color,
          name: name,
          attribute_value: attribute_value,
          category: category,
          otherTexture: category == "OTHERS" ? otherTexture : "",
          others_value: category == "OTHERS" ? others_value : "",
          texture:
            category == "OTHERS"
              ? otherTexture
              : category == "SUEDE"
              ? "/morf_material/suede_canvas_light.jpg"
              : "/morf_material/FabricLeatherCowhide003_NRM_1K.jpg",
        },
      })),
        // handleColorClick(color);
        category == "OTHERS"
          ? sneakerGroup(color, category, otherTexture)
          : sneakerGroup(color, category);
    }
  );

  const handleStitchClick = useCallback((id, color, name, attribute_value) => {
    setState((prev) => ({
      ...prev,
      currentStich: {
        id: id,
        color: color,
        name: name,
        attribute_value: attribute_value,
      },
    })),
      // handleColorClick(color);
      sneakerGroup(color);
  });

  const handleCapToeClick = useCallback(
    (
      id,
      color,
      name,
      attribute_value,
      category,
      otherTexture,
      others_value
    ) => {
      setState((prev) => ({
        ...prev,
        currentCapToe: {
          id: id,
          color: color,
          name: name,
          attribute_value: attribute_value,
          category: category,
          otherTexture: category == "OTHERS" ? otherTexture : "",
          others_value: category == "OTHERS" ? others_value : "",
          texture:
            category == "OTHERS"
              ? otherTexture
              : category == "SUEDE"
              ? "/morf_material/suede_canvas_light.jpg"
              : "/morf_material/FabricLeatherCowhide003_NRM_1K.jpg",
        },
      })),
        // handleColorClick(color);
        category == "OTHERS"
          ? sneakerGroup(color, category, otherTexture)
          : sneakerGroup(color, category);
    }
  );

  const handleCounterClick = useCallback(
    (
      id,
      color,
      name,
      attribute_value,
      category,
      otherTexture,
      others_value
    ) => {
      setState((prev) => ({
        ...prev,
        currentCounter: {
          id: id,
          color: color,
          name: name,
          attribute_value: attribute_value,
          category: category,
          otherTexture: category == "OTHERS" ? otherTexture : "",
          others_value: category == "OTHERS" ? others_value : "",
          texture:
            category == "OTHERS"
              ? otherTexture
              : category == "SUEDE"
              ? "/morf_material/suede_canvas_light.jpg"
              : "/morf_material/FabricLeatherCowhide003_NRM_1K.jpg",
        },
      })),
        // handleColorClick(color);
        category == "OTHERS"
          ? sneakerGroup(color, category, otherTexture)
          : sneakerGroup(color, category);
    }
  );

  const handleUpperClick = useCallback(
    (
      id,
      color,
      name,
      attribute_value,
      category,
      otherTexture,
      others_value
    ) => {
      setState((prev) => ({
        ...prev,
        currentUpper: {
          id: id,
          color: color,
          name: name,
          attribute_value: attribute_value,
          category: category,
          otherTexture: category == "OTHERS" ? otherTexture : "",
          others_value: category == "OTHERS" ? others_value : "",
          texture:
            category == "OTHERS"
              ? otherTexture
              : category == "SUEDE"
              ? "/morf_material/suede_canvas_light.jpg"
              : "/morf_material/FabricLeatherCowhide003_NRM_1K.jpg",
        },
      })),
        // handleColorClick(color);
        category == "OTHERS"
          ? sneakerGroup(color, category, otherTexture)
          : sneakerGroup(color, category);
    }
  );

  const handleApronClick = useCallback(
    (
      id,
      color,
      name,
      attribute_value,
      category,
      otherTexture,
      others_value
    ) => {
      setState((prev) => ({
        ...prev,
        currentApron: {
          id: id,
          color: color,
          name: name,
          attribute_value: attribute_value,
          category: category,
          otherTexture: category == "OTHERS" ? otherTexture : "",
          others_value: category == "OTHERS" ? others_value : "",
          texture:
            category == "OTHERS"
              ? otherTexture
              : category == "SUEDE"
              ? "/morf_material/suede_canvas_light.jpg"
              : "/morf_material/FabricLeatherCowhide003_NRM_1K.jpg",
        },
      })),
        // handleColorClick(color);
        category == "OTHERS"
          ? sneakerGroup(color, category, otherTexture)
          : sneakerGroup(color, category);
    }
  );

  const handlers = useSwipeable({
    trackMouse: true,
    onSwipedUp: () => {
      // console.log("Swiping up");
      setOpenOption(true);
    },
    onSwipedDown: () => {
      // console.log("Swiping Down");
      setOpenOption(false);
    },
  });

  const handleSaddleClick = useCallback(
    (
      id,
      color,
      name,
      attribute_value,
      category,
      otherTexture,
      others_value
    ) => {
      setState((prev) => ({
        ...prev,
        currentSaddle: {
          id: id,
          color: color,
          name: name,
          attribute_value: attribute_value,
          category: category,
          otherTexture: category == "OTHERS" ? otherTexture : "",
          others_value: category == "OTHERS" ? others_value : "",
          texture:
            category == "OTHERS"
              ? otherTexture
              : category == "SUEDE"
              ? "/morf_material/suede_canvas_light.jpg"
              : "/morf_material/FabricLeatherCowhide003_NRM_1K.jpg",
        },
      })),
        // handleColorClick(color);
        category == "OTHERS"
          ? sneakerGroup(color, category, otherTexture)
          : sneakerGroup(color, category);
    }
  );

  const handleTasselClick = useCallback(
    (
      id,
      color,
      name,
      attribute_value,
      category,
      otherTexture,
      others_value
    ) => {
      setState((prev) => ({
        ...prev,
        currentTassel: {
          id: id,
          color: color,
          name: name,
          attribute_value: attribute_value,
          category: category,
          otherTexture: category == "OTHERS" ? otherTexture : "",
          others_value: category == "OTHERS" ? others_value : "",
          texture:
            category == "OTHERS"
              ? otherTexture
              : category == "SUEDE"
              ? "/morf_material/suede_canvas_light.jpg"
              : "/morf_material/FabricLeatherCowhide003_NRM_1K.jpg",
        },
      })),
        // handleColorClick(color);
        category == "OTHERS"
          ? sneakerGroup(color, category, otherTexture)
          : sneakerGroup(color, category);
    }
  );

  const handleResetClick = async () => {
    // console.log("APP => handleVampClick ==> handleResetClick");
    if (typeof window !== "undefined") {
      router.reload(window.location.pathname);
    }

    setShowModal(false);
  };

  useEffect(async () => {
    if (state?.stateCustomeImgstatus) {
      const copyObject = addToCartData;
      const newArray = Object.values(copyObject); // []
      const customiserCode = newArray.join("");

      const dataIntentory = {
        customizer_code: customiserCode,
        images: custImgArray,
        patina: state.currentPatina == "with_patina" ? 1 : 0,
        mirror_gloss: 0,
        engraving: {
          left: state.currentEngrave?.leftShoe,
          right: state.currentEngrave?.rightShoe,
        },
        is_mirror_gloss: 1,
        size: state.currentSize?.name + " " + state?.currentWidth?.name,
      };

      await addOrder();

      async function addOrder() {
        await isActiveCartInOtherState();
        const response = await client.mutate({
          mutation: ADD_ITEM_TO_ORDER,
          variables: {
            customFields: JSON.stringify(dataIntentory),
            productVariantId: "485",
            quantity: 1,
          },
        });
        if (response.data?.addItemToOrder?.__typename == "Order") {
          setshowaddToloader(false);
          router.replace("/cart");
        }
      }
    }
  }, [state?.stateCustomeImgstatus]);

  const handleAddToCart = async () => {
    if (!state.currentSize?.name) {
      setSizeError(true);
      setAccIndex(4);
      if (isBreakPoint) {
        setOpenOption(true);
        setSlideIndex(6);
      }
      handleAccadionClick("SIZE");
    } else {
      setshowaddToloader(true);
      const copyObject = addToCartData;
      const newArray = Object.values(copyObject);
      const customiserCode = newArray.join("");
      axios
        .get(
          `${process.env.NEXT_PUBLIC_S3ASSETS_URL}/customiser_product_images/${customiserCode}/right.png`
        )
        .then((res) => {
          custImgArray.push(
            `${process.env.NEXT_PUBLIC_S3ASSETS_URL}/customiser_product_images/${customiserCode}/right.png`
          );
          custImgArray.push(
            `${process.env.NEXT_PUBLIC_S3ASSETS_URL}/customiser_product_images/${customiserCode}/left.png`
          );
          custImgArray.push(
            `${process.env.NEXT_PUBLIC_S3ASSETS_URL}/customiser_product_images/${customiserCode}/back.png`
          );
          custImgArray.push(
            `${process.env.NEXT_PUBLIC_S3ASSETS_URL}/customiser_product_images/${customiserCode}/top.png`
          );
          setState({ ...state, stateCustomeImgstatus: true });
        })
        .catch((err) => {
          setAddToCart(true);
        });

      //server call
    }
  };

  const saveFile = async (strData, filename) => {
    // console.log(
    //   "add to cart saveFile",
    //   strData,
    //   filename,
    //   Array.isArray(strData),
    //   strData instanceof Array
    // );

    if (Array.isArray(strData)) {
      for (let i = 0; i < strData.length; i++) {
        var link = document.createElement("a");

        var link = document.createElement("a");
        if (typeof link.download === "string") {
          document.body.appendChild(link); //Firefox requires the link to be in the body
          link.download = filename[i];
          link.href = strData[i];
          link.click();
          document.body.removeChild(link); //remove the link when done
        } else {
          location.replace(uri);
        }
      }
    } else {
      var link = document.createElement("a");

      var link = document.createElement("a");
      if (typeof link.download === "string") {
        document.body.appendChild(link); //Firefox requires the link to be in the body
        link.download = filename;
        link.href = strData;
        link.click();
        document.body.removeChild(link); //remove the link when done
      } else {
        location.replace(uri);
      }
    }
  };

  const handleExitCustomiser = () => {
    router.push("/");
  };

  const handleCopyLink = () => {
    // copyToClipboard();
    const copyObject = addToCartData;
    const newArray = Object.values(copyObject);
    const joinArray = newArray.join("");
    //  console.log("joinArray", joinArray);
    copyTextToClipboard(
      `${window.location.origin}/customiser?shoe_design=${joinArray}&shoe_price=${state.currentPrice}`
    )
      .then(() => {
        setLinkCopied("Link Copied");
        setTimeout(() => {
          setLinkCopied("");
        }, 1500);
      })
      .catch((err) => {
        //   console.log(err);
        setLinkCopied("Failed");
        setTimeout(() => {
          setLinkCopied("");
        }, 1500);
      });
  };
  const swipeOpenMenuStyles = {
    float: "left",
    position: "fixed",
    width: "33%",
    height: "100%",
    border: "2px dashed gray",
  };

  const handleDownloadLink = async () => {
    const copyObject = addToCartData;
    const newArray = Object.values(copyObject);
    const customiserCode = newArray.join("");
    await axios
      .get(
        `${process.env.NEXT_PUBLIC_S3ASSETS_URL}/customiser_product_images/${customiserCode}/right.png`
      )
      .then(async (res) => {
        setTimeout(() => {
          saveFile(
            `${process.env.NEXT_PUBLIC_S3ASSETS_URL}/customiser_product_images/${customiserCode}/back.png`,
            "back.png"
          );
        }, 300);

        setTimeout(() => {
          saveFile(
            `${process.env.NEXT_PUBLIC_S3ASSETS_URL}/customiser_product_images/${customiserCode}/right.png`,
            "right.png"
          );
        }, 600);

        setTimeout(() => {
          saveFile(
            `${process.env.NEXT_PUBLIC_S3ASSETS_URL}/customiser_product_images/${customiserCode}/left.png`,
            "left.png"
          );
        }, 900);
        saveFile(
          `${process.env.NEXT_PUBLIC_S3ASSETS_URL}/customiser_product_images/${customiserCode}/top.png`,
          "top.png"
        );
      })
      .catch((err) => {
        setDownload(true);
        setAddToCart(true);
      });
  };

  const AccordionMain = ({
    option,
    id,
    index,
    setIndex,
    showModal,
    setShowModal,
    group,
  }) => {
    // console.log(
    //   "APP => AccordionMain ==>  option,id,index,setIndex, showModal,setShowModal,group,"
    // );
    const modelRef = useRef(null);

    const [activeState, setActiveState] = useState("");

    return (
      <div className="accordionMain">
        <div
          onClick={() => setIndex(option.id === index ? null : option.id)}
          className="accordionMain--head"
          style={{
            backgroundColor: option.id === index ? "#fff" : "",
          }}
        >
          {option?.title && (
            <p
              style={{
                color: option.id === index ? "#000" : "",
                letterSpacing: option.id === index ? "0" : "",
              }}
            >
              {option?.title}
            </p>
          )}

          {option?.sub_title && (
            <p
              className="subtitle"
              style={{
                display: option.id === index ? "block" : "none",
                letterSpacing: option.id === index ? "0" : "",
              }}
            >
              {option?.sub_title}
            </p>
          )}
        </div>

        <div
          ref={modelRef}
          className="accordionMain--body"
          style={{
            maxHeight:
              option?.id === index
                ? `${modelRef?.current?.scrollHeight}px`
                : "0px",

            transition: "maxHeight 0.3s ease",
          }}
        >
          {option?.title === "MODEL, STYLE & DECORATION" && (
            <>
              <BaseModel
                title={option.title}
                state={state}
                setIndex={handleAccadionClick}
                index={currentType}
                handleBaseModelClick={handleBaseModelClick}
              />

              <ModelStyle
                state={state}
                setIndex={handleAccadionClick}
                index={currentType}
                handleModelStyleClick={handleModelStyleClick}
              />

              <Decoration
                state={state}
                setIndex={handleAccadionClick}
                index={currentType}
                handleDecorationClick={handleDecorationClick}
              />
            </>
          )}

          {option?.title === "PATINA" && (
            <>
              <Patina
                state={state}
                index={index}
                setIndex={setIndex}
                handlePatinaClick={handlePatinaClick}
              />
            </>
          )}
          {option?.title === "COLOUR/MATERIAL" &&
            state.currentPatina == "without_patina" && (
              <>
                {decorationsTypeData[state.currentBase][state.currentModel][
                  state.currentDecoration
                ].includes("CAPTOE") && (
                  <CapToe
                    state={state}
                    setIndex={handleAccadionClick}
                    index={currentType}
                    handleColorClick={handleCapToeClick}
                  />
                )}

                {decorationsTypeData[state.currentBase][state.currentModel][
                  state.currentDecoration
                ].includes("WINGTIP") && (
                  <WingTip
                    state={state}
                    setIndex={handleAccadionClick}
                    index={currentType}
                    handleColorClick={handleWingTipClick}
                  />
                )}

                {decorationsTypeData[state.currentBase][state.currentModel][
                  state.currentDecoration
                ].includes("VAMP") && (
                  <Vamp
                    state={state}
                    setIndex={handleAccadionClick}
                    index={currentType}
                    handleColorClick={handleVampClick}
                    group={group}
                  />
                )}

                {decorationsTypeData[state.currentBase][state.currentModel][
                  state.currentDecoration
                ].includes("APRON") && (
                  <Apron
                    state={state}
                    setIndex={handleAccadionClick}
                    index={currentType}
                    handleColorClick={handleApronClick}
                  />
                )}

                {decorationsTypeData[state.currentBase][state.currentModel][
                  state.currentDecoration
                ].includes("UPPER") && (
                  <Upper
                    state={state}
                    setIndex={handleAccadionClick}
                    index={currentType}
                    handleColorClick={handleUpperClick}
                  />
                )}

                {decorationsTypeData[state.currentBase][state.currentModel][
                  state.currentDecoration
                ].includes("QUARTER") && (
                  <Quarter
                    state={state}
                    setIndex={handleAccadionClick}
                    index={currentType}
                    handleColorClick={handleQuarterClick}
                  />
                )}

                {decorationsTypeData[state.currentBase][state.currentModel][
                  state.currentDecoration
                ].includes("TASSEL") && (
                  <Tassel
                    state={state}
                    setIndex={handleAccadionClick}
                    index={currentType}
                    handleColorClick={handleTasselClick}
                  />
                )}

                {decorationsTypeData[state.currentBase][state.currentModel][
                  state.currentDecoration
                ].includes("BINDING") && (
                  <Binding
                    state={state}
                    setIndex={handleAccadionClick}
                    index={currentType}
                    handleColorClick={handleBindingClick}
                  />
                )}

                {decorationsTypeData[state.currentBase][state.currentModel][
                  state.currentDecoration
                ].includes("SADDLE") && (
                  <Saddle
                    state={state}
                    setIndex={handleAccadionClick}
                    index={currentType}
                    handleColorClick={handleSaddleClick}
                  />
                )}

                {decorationsTypeData[state.currentBase][state.currentModel][
                  state.currentDecoration
                ].includes("COUNTER") && (
                  <Counter
                    state={state}
                    setIndex={handleAccadionClick}
                    index={currentType}
                    handleColorClick={handleCounterClick}
                  />
                )}

                {decorationsTypeData[state.currentBase][state.currentModel][
                  state.currentDecoration
                ].includes("LACES") && (
                  <Laces
                    state={state}
                    setIndex={handleAccadionClick}
                    index={currentType}
                    handleColorClick={handleLaceClick}
                  />
                )}

                <Stitching
                  state={state}
                  setIndex={handleAccadionClick}
                  index={currentType}
                  handleColorClick={handleStitchClick}
                />

                <Sole
                  state={state}
                  setIndex={handleAccadionClick}
                  index={currentType}
                  handleColorClick={handleSoleClick}
                />
              </>
            )}
          {option?.title === "COLOUR/MATERIAL" &&
            state.currentPatina == "with_patina" && (
              <>
                <FullGrain
                  state={state}
                  setIndex={handleAccadionClick}
                  index={currentType}
                  handleColorClick={handleFullGrainClick}
                />

                <PatinaSuede
                  state={state}
                  setIndex={handleAccadionClick}
                  index={currentType}
                  handleColorClick={handleSuedeClick}
                />

                {decorationsTypeDataWithPatina[state.currentBase][
                  state.currentModel
                ][state.currentDecoration].includes("LACES") && (
                  <Laces
                    state={state}
                    setIndex={handleAccadionClick}
                    index={currentType}
                    handleColorClick={handleLaceClick}
                  />
                )}

                <Sole
                  state={state}
                  setIndex={handleAccadionClick}
                  index={currentType}
                  handleColorClick={handleSoleClick}
                />
              </>
            )}
          {option?.title === "SIZE & PERSONALIZATION" && (
            <>
              <Size
                state={state}
                setIndex={handleAccadionClick}
                index={currentType}
                handleSizeClick={handleSizeClick}
                showModalSize={showModalSize}
                setShowModalSize={setShowModalSize}
                SizeError={SizeError}
              />

              <Width
                state={state}
                setIndex={handleAccadionClick}
                index={currentType}
                handleWidthClick={handleWidthClick}
              />
              <SoleEngraving
                state={state}
                setState={setState}
                setIndex={handleAccadionClick}
                index={currentType}
                engraving={engraving}
                setEngraving={setEngraving}
                engraveAdded={engraveAdded}
                setEngraveAdded={setEngraveAdded}
              />
            </>
          )}
        </div>
      </div>
    );
  };
  useEffect(() => {
    import("@lottiefiles/lottie-player");
  }, []);
  const lottie = [
    "lottie/Captoe.json",
    "lottie/Derby.json",
    "lottie/Oxford.json",
    "lottie/Loafer.json",
  ];
  const [selectedImage, setSelectedImage] = useState(
    lottie[Math.floor(Math.random() * lottie.length)]
  );
  return (
    <div className="customiser" style={{ position: "relative" }}>
      {/* <p> {progress} % Loading...</p> */}

      <div
        style={{
          zIndex: state.loading || active ? 3000 : 0,
          opacity: state.loading || active ? 1 : 0,
          transition: "all 0.4s",
        }}
        className="loaderWrappers"
      >
        <div className="logo">
          <img src="/icons/morf.svg" className="morf" alt="morf-logo" />
        </div>{" "}
        <div className="loader-container">
          <div className="lottie-loader">
            <lottie-player
              className="lottie-loader"
              autoplay
              loop
              src={selectedImage}
              style={{ height: "500px", width: "3500px" }}
              mode="normal"
            ></lottie-player>{" "}
          </div>
        </div>
        <div className="shoes">
          <div className="loadingText">Loading....</div>
        </div>
      </div>

      {showaddToloader && <AddToCart />}

      {isBreakPoint && (
        <div className="MobCusHeader">
          <div style={{ paddingLeft: "15px" }}>
            <Link href="/">
              <a>
                <img
                  className="mobile-logo"
                  src="/icons/morf.svg"
                  alt="morf-logo"
                />
              </a>
            </Link>
          </div>

          <div className="custmiserShare">
            <span onClick={() => setSocialShare(true)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18.754"
                height="25.619"
                viewBox="0 0 18.754 25.619"
              >
                <g
                  id="Group_1514"
                  data-name="Group 1514"
                  transform="translate(0.1 0.137)"
                >
                  <path
                    id="Path_13353"
                    data-name="Path 13353"
                    d="M768.707,745.186h5.41v1.159h-4.83v15.8h16.235v-15.8h-4.853v-1.159h6.013v18.119H768.127V745.186Z"
                    transform="translate(-768.127 -737.923)"
                    stroke="#000"
                    strokeWidth="0.2"
                  />
                  <path
                    id="Path_13354"
                    data-name="Path 13354"
                    d="M834.8,651.218l-3.07,2.872a.526.526,0,0,1-.68.1.511.511,0,0,1-.094-.809l4.429-4.151,4.429,4.151a.482.482,0,0,1,.155.417.556.556,0,0,1-.192.349.522.522,0,0,1-.734-.052l-3.077-2.879v14.074H834.8Z"
                    transform="translate(-826.058 -649.228)"
                    stroke="#000"
                    strokeWidth="0.2"
                    fillRule="evenodd"
                  />
                </g>
              </svg>
            </span>

            <span onClick={() => setExitCustomiser(true)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18.117"
                height="18.117"
                viewBox="0 0 18.117 18.117"
              >
                <g
                  id="Group_1515"
                  data-name="Group 1515"
                  transform="translate(9.058 -7.998) rotate(45)"
                >
                  <line
                    id="Line_21"
                    data-name="Line 21"
                    x2="24.121"
                    transform="translate(0 12.06)"
                    fill="none"
                    stroke="#000"
                    strokeWidth="1.5"
                  />
                  <line
                    id="Line_22"
                    data-name="Line 22"
                    x2="24.121"
                    transform="translate(12.06) rotate(90)"
                    fill="none"
                    stroke="#000"
                    strokeWidth="1.5"
                  />
                </g>
              </svg>
            </span>
          </div>
        </div>
      )}

      <div
        style={{
          transform: openOption === true ? `translateY(-${slideHeight}) ` : "",
          marginTop: openOption === true ? "120px" : "",
        }}
        className="first"
      >
        <Canvas
          concurrent
          // gl={{  }}
          // camera={{
          //   position: [9, 8, -12],
          //   fov: 20,
          // }}
          ref={canvasRef}
          style={{
            background: "#F3F1F0",
          }}
          gl={{ powerPreference: "low-power", preserveDrawingBuffer: true }}
        >
          <PerspectiveCamera
            ref={cameraRef}
            makeDefault
            position={[9, 8, -12]}
            fov={isMobileBreakPoint ? 30 : 20}
          />
          <ambientLight
            color="#ffffff"
            intensity={0.5}
            // position= {}
            // intensity={1}
          />
          //top
          <spotLight
            intensity={0.5}
            // intensity={1}
            angle={0.1}
            penumbra={1}
            //5, 25, 20
            position={[0, 1000, 0]}
          />
          //right
          <spotLight
            intensity={0.2}
            // intensity={1}
            angle={0.1}
            penumbra={1}
            //5, 25, 20
            position={[1000, 0, 0]}
          />
          //left
          <spotLight
            intensity={0.2}
            // intensity={1}
            angle={0.1}
            penumbra={1}
            //5, 25, 20
            position={[-1000, 0, 0]}
          />
          //front
          <spotLight
            intensity={0.1}
            // intensity={1}
            angle={0.1}
            penumbra={1}
            //5, 25, 20
            position={[0, 0, 1000]}
          />
          // back
          <spotLight
            intensity={0.1}
            // intensity={1}
            angle={0.1}
            penumbra={1}
            //5, 25, 20
            position={[0, 0, -1000]}
          />
          // bottom
          <spotLight
            intensity={0.2}
            // intensity={1}
            angle={0.1}
            penumbra={1}
            //5, 25, 20
            position={[0, -1000, 0]}
          />
          <Suspense fallback={null}>
            <Environment
              files="./morf_material/hdri/studio_small_03_1k.hdr"
              // background
            />
            <Sneaker
              accIndex={accIndex}
              setAccIndex={setAccIndex}
              helperRef={helperRef}
              currentSeleted={currentSeleted}
              setCurrentSeleted={handleSetCurrentSeleted}
              group={group}
              state={state}
              setState={setState}
              modelId={modelId}
              texture={texture}
              setTexture={setTexture}
              material={material}
              setModelId={setModelId}
              isBreakPoint={isBreakPoint}
              addToCart={addToCart}
              setAddToCart={setAddToCart}
              saveFile={saveFile}
              tweenCamera={tweenCamera}
              addToCartData={addToCartData}
              download={download}
              setDownload={setDownload}
              slideIndex={slideIndex}
              setOpenOption={setOpenOption}
              setSlideIndex={setSlideIndex}
              currentMaterial={currentMaterial}
              setCurrentMaterial={setCurrentMaterial}
              // handleMaterialClick={handleMaterialClick}
            />
          </Suspense>
          <OrbitControls
            enableZoom={true}
            enablePan={false}
            minDistance={1.2}
            maxDistance={3.5}
          />
        </Canvas>

        {!isBreakPoint && (
          <div className="customiserLogo">
            <Link href="/">
              <a>
                <img src="/icons/morf.svg" alt="morf-logo" />
              </a>
            </Link>
          </div>
        )}

        <div className="first__bottom">
          <div className="first__bottom--link" onClick={handleCopyLink}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20.195"
              height="20.233"
              viewBox="0 0 20.195 20.233"
            >
              <g
                id="Group_1372"
                data-name="Group 1372"
                transform="translate(802.67 -609.141)"
              >
                <path
                  id="Path_1033"
                  data-name="Path 1033"
                  d="M-763.805,613.825l2.385-2.411a4.292,4.292,0,0,1,6.07-.033h0a4.293,4.293,0,0,1,.033,6.071l-3.456,3.493a4.293,4.293,0,0,1-6.071.033h0c-.389-.385-.791-.827-1.156-1.192"
                  transform="translate(-29.398 0)"
                  fill="none"
                  stroke="#111"
                  strokeMiterlimit="10"
                  strokeWidth="2"
                />
                <path
                  id="Path_1034"
                  data-name="Path 1034"
                  d="M-792,653.6l-2.323,2.348a4.293,4.293,0,0,1-6.07.033h0a4.293,4.293,0,0,1-.033-6.071l3.456-3.493a4.292,4.292,0,0,1,6.07-.033h0c.421.417.912.977,1.306,1.372"
                  transform="translate(0 -28.846)"
                  fill="none"
                  stroke="#111"
                  strokeMiterlimit="10"
                  strokeWidth="2"
                />
              </g>
            </svg>
          </div>

          {linkCopied && (
            <p
              style={{
                opacity: linkCopied ? 1 : 0,
              }}
              className="first__bottom--linkcopied"
            >
              {linkCopied}
            </p>
          )}

          <div className="first__bottom--link" onClick={handleDownloadLink}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20.81"
              height="24.332"
              viewBox="0 0 20.81 24.332"
            >
              <g
                id="Group_1373"
                data-name="Group 1373"
                transform="translate(970.5 -1106.5)"
              >
                <path
                  id="Path_1035"
                  data-name="Path 1035"
                  d="M-949.995,1112.71a6.272,6.272,0,0,1,6.181-5.21,6.249,6.249,0,0,1,4.365,1.769"
                  transform="translate(-16.06)"
                  fill="none"
                  stroke="#000"
                  strokeMiterlimit="10"
                  strokeWidth="2"
                />
                <path
                  id="Path_1036"
                  data-name="Path 1036"
                  d="M-962.529,1145.566h-2.688a4.283,4.283,0,0,1-4.283-4.283h0a4.283,4.283,0,0,1,4.283-4.283"
                  transform="translate(0 -24.29)"
                  fill="none"
                  stroke="#000"
                  strokeMiterlimit="10"
                  strokeWidth="2"
                />
                <path
                  id="Path_1037"
                  data-name="Path 1037"
                  d="M-915,1148.425v-11.657a4.4,4.4,0,0,1,4.454-4.769,4.73,4.73,0,0,1,4.73,4.73v.214a4.593,4.593,0,0,1-4.593,4.593h-2.175"
                  transform="translate(-44.874 -20.173)"
                  fill="none"
                  stroke="#000"
                  strokeMiterlimit="10"
                  strokeWidth="2"
                />
                <path
                  id="Path_1038"
                  data-name="Path 1038"
                  d="M-931.654,1208l-4.415,4.194-4.3-4.194"
                  transform="translate(-23.982 -82.75)"
                  fill="none"
                  stroke="#000"
                  strokeMiterlimit="10"
                  strokeWidth="2"
                />
              </g>
            </svg>
          </div>

          <div
            className="first__bottom--link"
            onClick={() => setExitCustomiser(true)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="19.531"
              height="19.362"
              viewBox="0 0 19.531 19.362"
            >
              <g
                id="Group_910"
                data-name="Group 910"
                transform="translate(-90.892 -240.684)"
              >
                <path
                  id="Path_884"
                  data-name="Path 884"
                  d="M142.762,270.955l-1.319,1.143,2.584,2.981h-9.752v1.745h9.752l-2.584,2.981,1.319,1.143,4.331-5Z"
                  transform="translate(-36.67 -25.587)"
                />
                <path
                  id="Path_885"
                  data-name="Path 885"
                  d="M101.514,258.11H92.828V242.62h8.685v3.933h1.936v-4.777a1.082,1.082,0,0,0-1.069-1.092H91.961a1.082,1.082,0,0,0-1.069,1.092v17.177a1.082,1.082,0,0,0,1.069,1.092h10.419a1.082,1.082,0,0,0,1.069-1.092v-4.777h-1.936Z"
                  transform="translate(0 0)"
                />
              </g>
            </svg>
          </div>
        </div>
      </div>

      <div className="second">
        {isBreakPoint ? (
          // <SwipeableViews enableMouseEvents>
          <div
            style={{ backgroundColor: "#F3F1F0" }}
            className="second__topMob"
            {...handlers}
          >
            <MobileAcc
              state={state}
              setState={setState}
              setIndex={handleAccadionClick}
              mainIndex={currentType}
              currentSeleted={currentSeleted}
              setCurrentSeleted={setCurrentSeleted}
              handleBaseModelClick={{
                handleBaseModelClick,
                handleModelStyleClick,
                handleDecorationClick,
                handlePatinaClick,
                handleCapToeClick,
                handleWingTipClick,
                handleVampClick,
                handleApronClick,
                handleQuarterClick,
                handleStitchClick,
                handleLaceClick,
                handleSoleClick,
                handleUpperClick,
                handleSizeClick,
                handleWidthClick,
                handleSaddleClick,
                handleCounterClick,
                handleBindingClick,
                handleTasselClick,
                handleFullGrainClick,
                handleSuedeClick,
              }}
              handleOptionClick={handleOptionClick}
              openOption={openOption}
              setOpenOption={setOpenOption}
              slideHeight={slideHeight}
              setSlideHeight={setSlideHeight}
              slideIndex={slideIndex}
              setSlideIndex={setSlideIndex}
              currentMaterial={currentMaterial}
              setCurrentMaterial={setCurrentMaterial}
              engraveAdded={engraveAdded}
              setEngraveAdded={setEngraveAdded}
              SizeError={SizeError}
              // handleMaterialClick={handleMaterialClick}
            />
            <div className="second__bottom_mob">
              <div className="second__bottom_mob--btnMain">
                <div
                  style={{ backgroundColor: "transparent" }}
                  className="second__bottom_mob--btnMain--btnOne common-btn-style-alt"
                >
                  <span style={{ fontSize: "20px", fontFamily: "H-Regular" }}>
                    &#x20b9; {updatedPrice}
                  </span>
                  <span>View Details</span>
                </div>

                <div
                  onClick={handleAddToCart}
                  style={{ backgroundColor: "transparent" }}
                  className="second__bottom_mob--btnMain--btnTwo common-btn-style-alt"
                >
                  <span> ADD TO CART </span>
                </div>
              </div>

              <p className="second__bottom_mob--refund">
                *7-10 Days Delivery. | Free Shipping & Returns Worldwide
              </p>
            </div>
          </div>
        ) : (
          // </SwipeableViews>
          <div className="second__top">
            {customiserOption.map((option, index) => {
              return (
                <div key={option.id}>
                  <AccordionMain
                    option={option}
                    i={index}
                    index={accIndex}
                    setIndex={setAccIndex}
                    showModal={showModal}
                    setShowModal={setShowModal}
                    group={group}
                  />
                </div>
              );
            })}
            <div className="resetButton" onClick={() => setShowModal(true)}>
              <p>Reset Customiser</p>
            </div>
          </div>
        )}

        <div className="second__bottom">
          <div className="second__bottom--btnMain">
            <div
              style={{ backgroundColor: "transparent" }}
              className="second__bottom--btnMain--btnOne common-btn-style-alt"
            >
              <span style={{ fontSize: "20px", fontFamily: "H-Regular" }}>
                &#x20b9; {updatedPrice}
              </span>
              <span>View Details</span>
            </div>

            <div
              onClick={handleAddToCart}
              style={{ backgroundColor: "transparent" }}
              className="second__bottom--btnMain--btnTwo common-btn-style-alt"
            >
              <span> ADD TO CART </span>
            </div>
          </div>

          <p className="second__bottom--refund">
            *7-10 Days Delivery. | Free Shipping & Returns Worldwide
          </p>
        </div>
      </div>
      {showModal && (
        <ResetCustomiser
          showModal="Are you sure, you want to reset all the values to default state?"
          handleResetClick={handleResetClick}
          setShowModal={() => setShowModal(false)}
        />
      )}
      {showModalSize && (
        <SizeScanner
          showModal={showModalSize}
          setShowModalSize={setShowModalSize}
        />
      )}

      {exitCustomiser && (
        <ResetCustomiser
          showModal="Are you sure, you want to exit the customiser?"
          handleResetClick={handleExitCustomiser}
          setShowModal={() => setExitCustomiser(false)}
        />
      )}

      {socialShare && (
        <SocialShare
          onClose={() => setSocialShare(false)}
          addToCartData={addToCartData}
        />
      )}
    </div>
  );
}
