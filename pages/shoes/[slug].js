import React, { useRef, useState, useEffect, Fragment } from "react";
import useMediaQuery from "../../hooks/useMediaQuery";
import { useRouter } from "next/router";
// NextJs Imports
import Link from "next/link";
import dynamic from "next/dynamic";
import link from "next/link";
// Dependencies Import
import Slider from "react-slick";
import LoaderForComponent from "uitlity/loaderForComponent";

import { components } from "react-select";
const Select = dynamic(() => import("react-select"), {
  ssr: false,
});

// Components Import
import BaseLayout from "components/layout/BaseLayout";
import Card from "components/secondSection/ProductCard";
import AddToCart from "@/components/AddToCart";
import ImageZoom from "@/components/ImageZoom";
import SEO from "@/components/layout/SEO";

// Other Imports
import data from "lib/productData";
// import  from "apollo-client";
// import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
// import {
//   GET_SINGLE_PRODUCT,
//   ADD_ITEM_TO_ORDER,
//   GET_RELATED_PRODUCTS,
//   GET_PRODUCT_TOTAL,
// } from "graphql/productsqueries";
//import { GET_SLUG_PRODUCTS } from "graphql/productsqueries";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  addToWishlist,
  initialCart,
  login,
  setCurrentProduct,
} from "store/user/action";

import client from "@/components/shared/client";
import { addActiveOrdersToCart, isActiveCartInOtherState } from "uitlity";
import { useSession } from "next-auth/react";

import ProductShare from "@/components/ProductShare";

const Menu = (props) => {
  return (
    <Fragment>
      <components.Menu {...props}>
        <div>
          {props.children}
          <div
            style={{
              marginTop: "100px",
              marginLeft: "30px",
            }}
          >
            <p
              style={{
                fontSize: "15px",
                color: "#646464",
                fontFamily: "H-Light",
              }}
            >
              Not Sure About Your Size?
              <span
                style={{
                  marginLeft: "10px",
                  fontSize: "16px",
                  color: "#570707",
                  fontFamily: "H-Regular",
                  cursor: "pointer",
                }}
                onClick={props.handleSizeChartClick}
              >
                Size Chart
              </span>
            </p>
          </div>
        </div>
      </components.Menu>
    </Fragment>
  );
};

const Option = (props) => {
  return (
    <Fragment>
      <components.Option {...props}>
        <div
          className="sizeButton"
          style={{
            display: "flex",
            width: "100%",
            fontSize: "14px",
            backgroundColor: props.isSelected ? "#000" : "#DBD6D4",
            padding: "2px 8px",
            height: "48px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "2px",
            cursor: "pointer",
          }}
        >
          <p
            style={{
              flex: 1,
              fontSize: "14px",
              fontFamily: "H-Light",
              // color: "#646464",
              color: props.isSelected ? "#fff" : "#646464",
              textAlign: "center",
            }}
          >
            {props.data.label}
          </p>
        </div>
      </components.Option>
    </Fragment>
  );
};

const Accordion = ({ e, i, index, setIndex }) => {
  const plane = useRef(null);

  useEffect(() => {
    if (e?.id == 0) {
      setIndex(0);
    }
  }, []);

  return (
    <div className="accComponent">
      <div
        onClick={() => setIndex(e.id === index ? null : e.id)}
        className="accComponent__title"
      >
        <p> {e.title} </p>
        <svg
          style={{
            transform: e?.id === index ? "rotate(45deg)" : "rotate(0deg)",
          }}
          xmlns="http://www.w3.org/2000/svg"
          width="12"
          height="12"
          viewBox="0 0 12 12"
        >
          <g
            id="Group_1389"
            data-name="Group 1389"
            transform="translate(-1707.203 -802.391)"
          >
            <path
              id="Path_1037"
              data-name="Path 1037"
              d="M-6246.8-7284h12"
              transform="translate(7954 8092.392)"
              fill="none"
              stroke="#000"
              strokeWidth="1.5"
            />
            <path
              id="Path_1038"
              data-name="Path 1038"
              d="M0,0H12"
              transform="translate(1713.203 802.391) rotate(90)"
              fill="none"
              stroke="#000"
              strokeWidth="1.5"
            />
          </g>
        </svg>
      </div>

      <div
        ref={plane}
        style={{
          maxHeight:
            e?.id === index ? `${plane?.current?.scrollHeight}px` : "0px",
        }}
        className="accComponent__plane"
      >
        <div dangerouslySetInnerHTML={{ __html: e?.description }}></div>

        {/* <p> {e.description} </p> */}
      </div>
    </div>
  );
};

const productDummyThumbnails = [
  {
    id: 1,
    source:
      "/images/product/aubegine-oxfords/aubegine-oxfords/product-page/thumbnail-1.jpg",
  },
  {
    id: 2,
    source:
      "/images/product/aubegine-oxfords/aubegine-oxfords/product-page/thumbnail-2.jpg",
  },
  {
    id: 3,
    source:
      "/images/product/aubegine-oxfords/aubegine-oxfords/product-page/thumbnail-3.jpg",
  },
  {
    id: 4,
    source:
      "/images/product/aubegine-oxfords/aubegine-oxfords/product-page/thumbnail-4.jpg",
  },
  {
    id: 5,
    source:
      "/images/product/aubegine-oxfords/aubegine-oxfords/product-page/thumbnail-5.jpg",
  },
];

const productDummyImages = [
  {
    id: 1,
    source:
      "/images/product/aubegine-oxfords/aubegine-oxfords/product-page/1.jpg",
  },
  {
    id: 2,
    source:
      "/images/product/aubegine-oxfords/aubegine-oxfords/product-page/2.jpg",
  },
  {
    id: 3,
    source:
      "/images/product/aubegine-oxfords/aubegine-oxfords/product-page/3.jpg",
  },
  {
    id: 4,
    source:
      "/images/product/aubegine-oxfords/aubegine-oxfords/product-page/4.jpg",
  },
  {
    id: 5,
    source:
      "/images/product/aubegine-oxfords/aubegine-oxfords/product-page/5.jpg",
  },
];

function getTheShoesSize(shoesSize) {
  let array = [];
  shoesSize?.map((item) => {
    if (item?.options[0]?.code == "standard") {
      array.push({
        id: item.id,
        label: item.options[1].name,
        value: item.id,
        category: "standard",
      });
    } else if (item.options[1].code == "standard") {
      array.push({
        id: item.id,
        label: item?.options[0]?.name,
        value: item.id,
        category: "standard",
      });
    } else if (item.options[0].code == "wide") {
      array.push({
        id: item.id,
        label: item.options[1].name,
        value: item.id,
        category: "wide",
      });
    } else {
      array.push({
        id: item.id,
        label: item.options[0].name,
        value: item.id,
        category: "wide",
      });
    }
  });

  const shoesSizeS = array.filter((item) => item.category == "standard");
  const shoesSizeW = array.filter((item) => item.category !== "standard");

  return {
    standard: shoesSizeS,
    wide: shoesSizeW,
  };
}

const ShoeDetail = () => {
  const router = useRouter();
  // Define currSlug from router.query.slug with null safety
  const currSlug = router?.query?.slug || "";
  const [product, setProduct] = useState({
    id: 1,
    name: "Dummy Shoe",
    description: "This is a dummy shoe description.",
    price: 100,
    images: [
      "/images/product/aubegine-oxfords/aubegine-oxfords/product-page/thumbnail-1.jpg",
      "/images/product/aubegine-oxfords/aubegine-oxfords/product-page/thumbnail-2.jpg",
    ],
  });
  const [notFound, setNotFound] = useState(false);
  let currentProduct = useSelector((state) => state.user.currentProduct);
  let currentUser = useSelector((state) => state.user.userData);
  const [FMAS, setFMAS] = useState("");
  const [socialShare, setSocialShare] = useState(false);
  const [imageZoom, setImageZoom] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(1);
  const [hostname, setHostname] = useState("");
  const session = useSession();

  const formRef = useRef(null);

  const sizeData = getTheShoesSize(product?.variants);

  const transformComponentRef = useRef(null);

  useEffect(() => {
    const FMAS = localStorage.getItem("FMAS");
    if (FMAS) setFMAS(FMAS);
  }, []);

  useEffect(() => {
    if (!router.isReady) return;
    const currentSlug = router.query.slug;
    // Simulate finding a product by slug in dummy data
    if (currentSlug === "dummy-shoe") {
      setProduct({
        id: 1,
        name: "Dummy Shoe",
        description: "This is a dummy shoe description.",
        price: 100,
        images: [
          "/images/product/aubegine-oxfords/aubegine-oxfords/product-page/thumbnail-1.jpg",
          "/images/product/aubegine-oxfords/aubegine-oxfords/product-page/thumbnail-2.jpg",
        ],
      });
      setNotFound(false);
    } else {
      setNotFound(true);
    }
  }, [router.isReady, router.query.slug]);

  const getUserSize = async () => {
    const userInfo = {
      redirect_url: `${process.env.MORF_DOMAIN}/shoes/${currSlug}`,
      user_name: currentUser?.firstName,
      user_email: session?.data?.email,
      orgid: currentProduct?.id,
      auth_key: "findmeashoe",
      auth_password: "Find123456",
      btncolor: "700707",
      user_provider: "google",
      Geography: "US",
      gender: "M",
      shoesize: "9",
      paper_type_select: "question_type",
      catalog_visibility: "not_visible",
      application: "app",
      privacy_policy_link: "",
      size_scale: "fmas_size",
      uk_visible: "no",
      us_visible: "yes",
      eu_visible: "no",
      fmas_width: "visible",
      desktop_page: "https://shoesizeonline.wordpress.com",
      error_file: "errorcode.csv",
      geo_apis: "yes",
      fit_pref: "yes",
    };

    if (session?.data) {
      await axios
        .get(
          `https://vxvcrmal0h.execute-api.ap-south-1.amazonaws.com/plaeto/compare-with-user/fmas1/${session?.data?.email}/uk/36/bigger`,
          {
            headers: {
              "X-API-Key": "aVs0d3z8ap2aO7h1ZwET4MKDUipUsrtaCYg8zN5b",
            },
          }
        )
        .then((res) => {
          if (res?.data?.data?.error_code == 100) {
            // Form submit

            formRef.current.submit();

            // console.log("formRef", formRef);
          } else {
            setFMAS(res?.data?.data?.sizes);
            localStorage.setItem("FMAS", res?.data?.data?.sizes);
          }
        })
        .catch((err) => {
          console.log("err", err);
        });
    } else {
      dispatch({
        type: "OPEN_POPUP_LOGIN",
      });
    }
  };

  // useEffect(() => {
  //   if (session.status == "authenticated") {
  //     getUserSize();
  //   }
  // }, [session]);

  const HandlerMyFit = async () => {
    if (session.status == "authenticated") {
      const userInfo = {
        redirect_url: `${process.env.MORF_DOMAIN}/shoes/${currSlug}`,
        user_name: currentUser?.firstName,
        user_email: session?.data?.email,
        orgid: currentProduct?.id,
        auth_key: "findmeashoe",
        auth_password: "Find123456",
        btncolor: "700707",
        user_provider: "google",
        Geography: "US",
        gender: "M",
        shoesize: "9",
        paper_type_select: "question_type",
        catalog_visibility: "not_visible",
        application: "app",
        privacy_policy_link: "",
        size_scale: "fmas_size",
        uk_visible: "no",
        us_visible: "yes",
        eu_visible: "no",
        fmas_width: "visible",
        desktop_page: "https://shoesizeonline.wordpress.com",
        error_file: "errorcode.csv",
        geo_apis: "yes",
        fit_pref: "yes",
      };

      let axiosConfig = {
        headers: {
          "X-API-Key": "aVs0d3z8ap2aO7h1ZwET4MKDUipUsrtaCYg8zN5b",
        },
      };

      axios
        .post(
          // "https://morf.findmeashoe.com/",
          `https://vxvcrmal0h.execute-api.ap-south-1.amazonaws.com/plaeto/get-shoesize-and-footdims/rupesh@embizlabs.com/both/36`,
          userInfo,
          axiosConfig
        )
        .then((res) => console.log("res", res))
        .catch((err) => console.log(err));
    }
  };

  const cart = useSelector((state) => state.user.cart);

  const engravingInputRef = useRef(null);

  const engravingBtnRef = useRef(null);

  const [showInput, setShowInput] = useState(false);
  const [opIndex, setOpIndex] = useState("");

  const [sliderRefs, setSliderRefs] = useState({
    first: null,
    second: null,
  });
  const [isWider, setIsWider] = useState(false);

  const [engraving, setEngraving] = useState({
    left: "",
    right: "",
  });

  const [leftState, setLeftState] = useState("");
  const [rightState, setRightState] = useState("");
  const [showSizeModal, setShowSizeModal] = useState(false);

  const [isEngraving, setIsEngraving] = useState(false);

  useEffect(() => {
    if (showSizeModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [showSizeModal]);
  const handleSizeChartClick = () => setShowSizeModal((prev) => !prev);

  const handleLeftChange = (e) => {
    setLeftState(e.target.value);
    setEngravingError("");
  };

  const handleRightChange = (e) => {
    setRightState(e.target.value);
    setEngravingError("");
  };

  const handleCustomise = () => {
    router.push({
      pathname: `/customiser`,
      query: {
        shoe_design: product?.customFields?.customiser_code,
        // shoe_design:
        //   "1320003000003000003000000000000000000000000000000000000000003000000030000",
        shoe_price:
          product?.variants[0]?.price / 100 +
          (leftState ? 500 : 0) +
          (rightState ? 500 : 0),
      },
    });
  };

  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedWidth, setSelectedWidth] = useState("standard");
  const [sizeError, setSizeError] = useState(false);
  const [itemAdded, setItemAdded] = useState(false);
  const [engravingError, setEngravingError] = useState("");

  const [alreadyAdded, setAlreadyAdded] = useState(false);

  const isBreakPoint = useMediaQuery(1024);
  const isMobileBreakPoint = useMediaQuery(600);

  const [accIndex, setAccIndex] = useState(null);

  const mainSlider = useRef(null);
  const secondSlider = useRef(null);

  const handleSizeChange = (e) => {
    setSizeError(false);

    setSelectedSize(e);
  };

  const handleWidthChange = (e) => {
    setSelectedSize(null);

    setSelectedWidth(e.value);
  };

  const selectStyle = {
    container: (base, state) => ({
      ...base,
      // margin: "2% 0",
      height: "42px",
    }),
    control: (base, state) => ({
      ...base,
      borderRadius: "0",
      borderWidth: "1px",
      borderColor: "black",
      boxShadow: "none",
      backgroundColor: state.hasValue ? "#000" : "#F1EFEE",
      color: state.hasValue ? "#F1EFEE" : "#000",
      height: "42px",
      cursor: "pointer",

      "&:hover": {
        borderColor: "none",
      },
    }),

    ValueContainer: (base, state) => ({
      ...base,
      display: "flex",
      justifyContent: "center",
    }),

    placeholder: (base, state) => ({
      ...base,
      color: "#000000",
      fontFamily: "H-Light",
      fontSize: "14px",
      letterSpacing: "1px",
      position: "absolute",
      left: "50%",
      top: "50%",
      whiteSpace: "nowrap",
      transform: "translate(-50%, -50%)",
    }),
    indicatorSeparator: (base, state) => ({
      display: "none",
      color: "black",
    }),
    dropdownIndicator: (base, state) => ({
      ...base,
      color: state.hasValue ? "#fff" : "#000",
    }),
    option: (base, state) => ({
      ...base,
      outline: "none",
      border: "none",
      fontSize: "14px",
      display: "flex",
      justifyContent: "center",

      // margin: "auto",
      padding: state.isSelected && "0",
      backgroundColor: state.isSelected ? "#000" : "#ffffff",
      fontFamily: state.isSelected ? "H-Regular" : "H-Light",

      "&:hover": {
        backgroundColor: "#000",
        color: "#fff",
        letterSpacing: "0.5px",
        transition: "all 0.3s ease-out",
      },
    }),

    menuList: (base, state) => ({
      ...base,
      display: "grid",
      width: "100%",
      height: "100%",
      gap: "15px",
      overflow: "visible",
      padding: "20px 30px",
      gridTemplateColumns: "1fr 1fr 1fr",
    }),

    menu: (base, state) => ({
      ...base,
      width: "100%",
      borderRadius: "0",
      height: "438px",
      overflow: "auto",
    }),
    singleValue: (base, state) => ({
      ...base,
      // color: state.isFocused ? "#ffffff" : "#000000",
      color: "#ffffff",
      fontFamily: "H-Light",
      fontSize: "14px",
      letterSpacing: "1px",
      position: "absolute",
      left: "50%",
      top: "50%",
      transform: "translate(-50%, -50%)",
    }),
  };

  const widthStyle = {
    container: (base, state) => ({
      ...base,
      height: "42px",
    }),
    control: (base, state) => ({
      ...base,
      borderRadius: "0",
      borderWidth: "1px",
      borderColor: "black",
      cursor: "pointer",
      boxShadow: "none",
      backgroundColor: state.hasValue ? "#000" : "#F1EFEE",
      color: state.hasValue ? "#F1EFEE" : "#000",

      height: "42px",

      "&:hover": {
        borderColor: "none",
      },
    }),

    ValueContainer: (base, state) => ({
      ...base,
      display: "flex",
      justifyContent: "center",
    }),

    placeholder: (base, state) => ({
      ...base,
      color: "#000000",
      fontFamily: "H-Light",
      fontSize: "14px",
      letterSpacing: "1px",
      position: "absolute",
      left: "50%",
      top: "50%",
      whiteSpace: "nowrap",
      transform: "translate(-50%, -50%)",
    }),
    indicatorSeparator: (base, state) => ({
      display: "none",
      color: "black",
    }),
    dropdownIndicator: (base, state) => ({
      ...base,
      color: state.hasValue ? "#fff" : "#000",
    }),
    option: (base, state) => ({
      ...base,
      outline: "none",
      border: "none",
      fontSize: "14px",
      display: "flex",
      justifyContent: "center",
      height: "41px",
      alignItems: "center",
      cursor: "pointer",

      // padding: state.isSelected && "0",
      backgroundColor: state.isSelected ? "#000" : "#ffffff",
      fontFamily: state.isSelected ? "H-Regular" : "H-Light",

      "&:hover": {
        backgroundColor: "#000",
        color: "#fff",
        letterSpacing: "0.5px",
        transition: "all 0.3s ease-in",
      },
    }),

    menu: (base, state) => ({
      ...base,
      width: "100%",
      borderRadius: "0",
      paddingTop: "0",
      marginTop: "0px",
    }),
    singleValue: (base, state) => ({
      ...base,
      // color: state.isFocused ? "#ffffff" : "#000000",
      color: "#ffffff",
      fontFamily: "H-Light",
      fontSize: "14px",
      letterSpacing: "1px",
      position: "absolute",
      left: "50%",
      top: "50%",
      transform: "translate(-50%, -50%)",
    }),
  };

  useEffect(() => {
    if (cart.find((e) => e?.id === product?.id)) {
      setAlreadyAdded(true);
    }
  }, [cart]);

  useEffect(() => {
    setSliderRefs((prev) => ({
      first: mainSlider.current,
      second: secondSlider.current,
    }));

    if (typeof window !== "undefined") {
      setHostname(window.location.href);
    }
  }, []);

  useEffect(() => {
    if (itemAdded === true) {
      setTimeout(() => {
        setItemAdded(false);
      }, 2000);
    }
  }, [itemAdded]);

  const handleAddToBag = () => {
    if (selectedSize === null) {
      setSizeError(true);
      return;
    } else {
      setSizeError(false);

      if (cart.find((e) => e.id === product.id)) {
        alert("Already Added");
      } else {
        setItemAdded(true);
        const isMirrorGloss = product?.facetValues.filter(
          (item) => item.category == "Mirror Gloss"
        );

        const dataIntentory = {
          customizer_code: product?.customFields?.customiser_code,
          images: [],
          patina: 0,
          is_mirror_gloss: Boolean(isMirrorGloss.length),
          mirror_gloss: 0,
          engraving: {
            left: leftState,
            right: rightState,
          },
        };

        addOrder();

        async function addOrder() {
          await isActiveCartInOtherState();
          const response = await client.mutate({
            mutation: ADD_ITEM_TO_ORDER,
            variables: {
              customFields: JSON.stringify(dataIntentory),
              productVariantId: selectedSize.value,
              quantity: 1,
            },
          });
          if (response.data?.addItemToOrder?.__typename == "Order") {
            const activeItem = addActiveOrdersToCart(
              response.data?.addItemToOrder?.lines
            );
            dispatch(initialCart(activeItem));
            localStorage.setItem("cartLength", activeItem.length);
            dispatch({
              type: "CART_SIZE",
              payload: activeItem.length,
            });
          }
        }
      }
    }
  };

  // const handleEngravingInput = (e) => {
  //   const value = e.target.value;

  //   console.log(value);

  //   setEngraving({
  //     ...engraving,
  //     [e.target.name]: value,
  //   });
  // };

  const handleEngravingSubmit = () => {
    if (leftState == "" && rightState == "") {
      setEngravingError("Please Add Engraving");
      setShowInput(true);
      setIsEngraving(false);
      return;
    }
    if (leftState || rightState) setIsEngraving(true);
    else setIsEngraving(false);
    setShowInput(false);
  };

  const toggleInput = () => {
    setShowInput((prev) => !prev);
  };

  const handleClickOutside = (event) => {
    if (showInput === true) {
      if (
        // !engravingBtnRef?.current?.contains(event.target) ||
        !engravingInputRef?.current?.contains(event.target)
      ) {
        setShowInput(false);
      }
    }
  };

  const productDesc = [
    {
      id: 0,
      title: "DESCRIPTION",
      description: `${product?.description}`,
    },

    // {
    //   id: 1,
    //   title: "PRODUCT DETAILS",
    //   description: `${newSingleData?.customFields?.ProductDetails ? newSingleData?.customFields?.ProductDetails :
    //   "International shipping costs will automatically be calculated based on the weight of your order. All international orders will be shipped through DHL. The customer is also responsible for any additional local taxes or fees levied upon delivery, by their local jurisdiction, for purchasing items outside their country."}`,
    // },
    {
      id: 2,
      title: "SHIPPING & RETURN",
      description: `${
        product?.customFields?.ShippingAndReturn
          ? product?.customFields?.ShippingAndReturn
          : "International shipping costs will automatically be calculated based on the weight of your order. All international orders will be shipped through DHL. The customer is also responsible for any additional local taxes or fees levied upon delivery, by their local jurisdiction, for purchasing items outside their country."
      }`,
    },
    {
      id: 3,
      title: "MATERIALS & CARE",
      description: `${
        product?.customFields?.MaterialsAndCare
          ? product?.customFields?.MaterialsAndCare
          : "International shipping costs will automatically be calculated based on the weight of your order. All international orders will be shipped through DHL. The customer is also responsible for any additional local taxes or fees levied upon delivery, by their local jurisdiction, for purchasing items outside their country."
      }`,
    },
  ];
  const shorten = (text, maxLength) => {
    if (text && text.length > maxLength) {
      return text.substr(0, maxLength) + "...";
    }

    return text;
  };

  const handleImageZoom = () => {
    setImageZoom(true);
  };
  const handleNavModalClick = () => setShowSizeModal((prev) => !prev);

  if (notFound) {
    return (
      <BaseLayout>
        <div className="container">
          <h1>Shoe not found</h1>
        </div>
      </BaseLayout>
    );
  }

  return (
    <>
      <SEO
        title={`${product?.name || "Shoe"} - MORF`}
        desc={shorten(
          `Buy ${product?.name || "Shoe"} from MORF at ₹${(product?.variants && product?.variants[0]?.price ? product.variants[0].price / 100 : product?.price || 0)}`
        )}
        pageUrl={hostname}
        ogImage={
          `${process.env.NEXT_PUBLIC_PRODUCTIMAGES}/images/${currSlug}/product-page/${(productDummyImages && productDummyImages[0]?.id ? productDummyImages[0].id : "1")}.jpg`
        }
      />
      <BaseLayout
        handleSizeChartClick={handleSizeChartClick}
        showSizeModal={showSizeModal}
        setShowSizeModal={setShowSizeModal}
      >
        <section
          className="productSec productSection"
          onClick={handleClickOutside}
        >
          <div className="container product">
            <div className="product__first">
              <Slider
                infinite={false}
                ref={mainSlider}
                asNavFor={sliderRefs.second}
                arrows={false}
                className="firstSlider"
                fade={true}
                speed={500}
                dots={isBreakPoint && true}
                beforeChange={(oldIndex, newIndex) => {
                  setActiveImageIndex(newIndex + 1);
                }}
              >
                {(productDummyImages || []).map((src) => {
                  return (
                    <img
                      key={src.id}
                      src={`${process.env.NEXT_PUBLIC_PRODUCTIMAGES}/images/${router.query.slug}/product-page/${src.id}.jpg`}
                    />
                  );
                })}
              </Slider>

              <Slider
                className="secondSlider"
                ref={secondSlider}
                asNavFor={sliderRefs.first}
                focusOnSelect={true}
                arrows={false}
                slidesToShow={(productDummyThumbnails || []).length}
                variableWidth={true}
                infinite={false}
              >
                {(productDummyThumbnails || []).map((src) => {
                  return (
                    <img
                      key={src.id}
                      src={`${process.env.NEXT_PUBLIC_PRODUCTIMAGES}/images/${router.query.slug}/product-page/thumbnail-${src.id}.jpg`}
                    />
                  );
                })}
              </Slider>
            </div>
            <div className="product__second">
              <h1 className="product__second--heading">{product?.name || "Shoe"}</h1>
              {isMobileBreakPoint && (
                <div
                  style={{ backgroundColor: "#000" }}
                  className="common-btn-style-alt productShareBtn"
                  onClick={() => setSocialShare(true)}
                >
                  <span>
                    <svg
                      className="wishlistbtn__icon"
                      xmlns="http://www.w3.org/2000/svg"
                      width="14.828"
                      height="20.248"
                      viewBox="0 0 14.828 20.248"
                    >
                      <g
                        id="Group_10825"
                        data-name="Group 10825"
                        transform="translate(0.1 0.137)"
                      >
                        <path
                          id="Path_13353"
                          data-name="Path 13353"
                          d="M768.584,745.186h4.265v.914h-3.808v12.457h12.8V746.1h-3.826v-.914h4.741v14.285H768.127V745.186Z"
                          transform="translate(-768.127 -739.46)"
                          stroke="#fff"
                          strokeWidth="0.2"
                          fill="#fff"
                        />
                        <path
                          id="Path_13354"
                          data-name="Path 13354"
                          d="M833.958,650.8l-2.42,2.264a.415.415,0,0,1-.536.077.4.4,0,0,1-.074-.638l3.492-3.273,3.492,3.273a.38.38,0,0,1,.122.329.438.438,0,0,1-.152.275.412.412,0,0,1-.579-.041l-2.426-2.27v11.1h-.919Z"
                          transform="translate(-827.062 -649.228)"
                          stroke="#fff"
                          strokeWidth="0.2"
                          fill="#fff"
                          fillRule="evenodd"
                        />
                      </g>
                    </svg>
                  </span>
                </div>
              )}
              <h2 className="product__second--price">
                ₹&nbsp;
                {(product?.variants && product?.variants[0]?.price ? product.variants[0].price / 100 : product?.price || 0)}
                <span
                  style={{
                    color: "#646464",
                    fontSize: "16px",
                    fontFamily: "H-Light",
                    padding: "0 15px",
                  }}
                >
                  MRP incl. of all taxes
                </span>
              </h2>
              <div
                dangerouslySetInnerHTML={{ __html: product?.description || "" }}
                className="product__second--discription"
              ></div>
              {/* <p className="product__second--discription">
                {product?.description}
              </p> */}
              <div style={{ paddingTop: "5%" }}>
                {/* <a onClick={HandlerMyFit} className="product__second--fmpf">
                  Find My Perfect Fit
                </a> */}

                <form
                  ref={formRef}
                  action="https://morf.findmeashoe.com/"
                  method="post"
                  autoComplete="off"
                >
                  <input type="hidden" name="auth_key" value="findmeashoe" />
                  <input
                    type="hidden"
                    name="auth_password"
                    value="Find123456"
                  />
                  <input type="hidden" name="btncolor" value="700707" />

                  <input
                    type="hidden"
                    name="redirect_url"
                    value={`${process.env.MORF_DOMAIN}/shoes/${currSlug}`}
                  />

                  <input
                    type="hidden"
                    name="user_name"
                    value={currentUser?.firstName}
                  />

                  <input
                    type="hidden"
                    name="user_email"
                    value={session?.data?.email}
                  />

                  <input type="hidden" name="user_provider" value="google" />
                  <input type="hidden" name="Geography" value="US" />
                  <input type="hidden" name="gender" value="M" />
                  <input
                    type="hidden"
                    name="orgid"
                    value={currentProduct?.id}
                  />
                  <input
                    type="hidden"
                    autocomplete="off"
                    name="shoesize"
                    value="9"
                    id="shoesize"
                  />
                  <input
                    type="hidden"
                    name="paper_type_select"
                    value="questions_type"
                  />
                  <input
                    type="hidden"
                    name="catalog_visibility"
                    value="not_visible"
                  />
                  <input type="hidden" name="application" value="app" />
                  <input
                    type="hidden"
                    name="privacy_policy_link"
                    value="http://findmeashoe.com/terms-of-use/"
                  />
                  <input type="hidden" name="size_scale" value="fmas_size" />
                  <input type="hidden" name="uk_visible" value="no" />
                  <input type="hidden" name="us_visible" value="yes" />
                  <input type="hidden" name="eu_visible" value="no" />
                  <input type="hidden" name="fmas_width" value="visible" />
                  <input
                    type="hidden"
                    name="desktop_page"
                    value="https://shoesizeonline.wordpress.com/"
                  />
                  <input
                    type="hidden"
                    name="error_file"
                    value="errorcode.csv"
                  />
                  <input type="hidden" name="geo_apis" value="yes" />
                  <input type="hidden" name="fit_pref" value="yes" />
                  {/* <input type="submit" value="Find My Perfect Fit" /> */}
                  <div
                    className="product__second--fmpf"
                    onClick={handleSizeChartClick}
                  >
                    Size Chart
                  </div>
                </form>
              </div>

              <div
                onClick={
                  () => setOpIndex("SIZE")
                  // setShowInput(false);
                }
                className="product__second--sizeSelect"
              >
                <Select
                  closeMenuOnSelect={true}
                  options={sizeData[selectedWidth]}
                  components={{
                    Menu: (props) => (
                      <Menu
                        {...props}
                        handleSizeChartClick={handleSizeChartClick}
                      />
                    ),
                    Option: Option,
                  }}
                  value={selectedSize}
                  onChange={handleSizeChange}
                  placeholder="CHOOSE YOUR SIZE"
                  styles={selectStyle}
                  closeOnSelect={true}
                  isSearchable={false}
                />

                {sizeError && (
                  <p className="sizeError"> Please select your size </p>
                )}
              </div>

              <div className="productThreeButtons">
                <div className="customisebtn ">
                  <Select
                    options={[
                      {
                        label: "Standard (E)",
                        value: "standard",
                      },
                      {
                        label: "Wide (EE)",
                        value: "wide",
                      },
                    ]}
                    defaultValue={{ label: "Standard (E)", value: "standard" }}
                    placeholder="WIDTH"
                    onChange={handleWidthChange}
                    styles={widthStyle}
                    isSearchable={false}
                  />
                </div>

                {/* <div
                  className="customisebtn "
                  onClick={() => setIsWider((prev) => !prev)}
                  style={{
                    backgroundColor: isWider === true ? "#570707" : "",
                    color: isWider === true ? "#fff" : "",
                    cursor: "pointer",
                    border: "1px solid #000",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <p className="customisebtn__txt">WIDTH (EE)</p>
                </div> */}

                <div
                  ref={engravingBtnRef}
                  className="customisebtn tbtn"
                  style={{ backgroundColor: isEngraving ? "black" : "" }}
                  onClick={toggleInput}
                >
                  <p
                    style={{ color: isEngraving ? "white" : "" }}
                    className="customisebtn__txt"
                  >
                    {isEngraving ? "ENGRAVING ADDED" : "ADD ENGRAVING"}
                  </p>
                </div>
                {showInput && (
                  <div
                    ref={engravingInputRef}
                    className="addEngravingInputContainer"
                  >
                    <div className="addEngravingInput">
                      <div className="addEngravingInput--headingCon">
                        <p className="addEngravingInput--headingCon--heading">
                          Personalise it further by having engraved soles.
                        </p>
                      </div>
                      <div className="addEngravingInput--inputCon">
                        <input
                          className="addEngravingInput--inputCon--input"
                          type="text"
                          placeholder="Left Shoe (Upto 14 Characters)"
                          onChange={handleLeftChange}
                          value={leftState}
                        />
                        <input
                          className="addEngravingInput--inputCon--input"
                          type="text"
                          placeholder="Right Shoe (Upto 14 Characters)"
                          onChange={handleRightChange}
                          value={rightState}
                        />

                        {engravingError && (
                          <p
                            style={{
                              color: "#aa1515",
                              paddingBottom: "2%",
                              fontSize: "15px",
                            }}
                            className="addEngravingInput--inputCon--txt"
                          >
                            {engravingError}
                          </p>
                        )}

                        <p className="addEngravingInput--inputCon--txt">
                          NOTE : Engraved shoes can’t be returned or exchanged.
                        </p>
                      </div>
                      <div className="addEngravingInput--buttonsCon">
                        <div
                          style={{
                            border: "1px solid #F3F1F0",
                            backgroundColor: "#F3F1F0",
                            cursor: "pointer",
                          }}
                          onClick={toggleInput}
                          className="addEngravingInput--buttonsCon--button common-btn-style-alt"
                        >
                          <span>CANCEL</span>
                        </div>
                        <div
                          style={{
                            border: "1px solid #C8B8A0",
                            backgroundColor: "#C8B8A0",
                            marginLeft: "20px",
                            cursor: "pointer",
                          }}
                          onClick={handleEngravingSubmit}
                          className="addEngravingInput--buttonsCon--button common-btn-style-alt"
                        >
                          <span>CONFIRM</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {!isMobileBreakPoint && (
                  <div
                    style={{ backgroundColor: "transparent" }}
                    className="tbtn common-btn-style-alt productShareBtn"
                    onClick={() => setSocialShare(true)}
                    // onClick={() =>
                    //   dispatch(
                    //     addToWishlist({
                    //       id: product.id,
                    //       src: product.src,
                    //       hoverState: product.hoverState,
                    //       alt: product.alt,
                    //       category: product.category,
                    //       price: product.price,
                    //       quantity: product.quantity,
                    //       name: product.name,
                    //       variants: product.variants,
                    //     })
                    //   )
                    // }
                  >
                    <span>
                      <svg
                        className="wishlistbtn__icon"
                        xmlns="http://www.w3.org/2000/svg"
                        width="14.828"
                        height="20.248"
                        viewBox="0 0 14.828 20.248"
                      >
                        <g
                          id="Group_10825"
                          data-name="Group 10825"
                          transform="translate(0.1 0.137)"
                        >
                          <path
                            id="Path_13353"
                            data-name="Path 13353"
                            d="M768.584,745.186h4.265v.914h-3.808v12.457h12.8V746.1h-3.826v-.914h4.741v14.285H768.127V745.186Z"
                            transform="translate(-768.127 -739.46)"
                            stroke="#000"
                            strokeWidth="0.2"
                            fill="#000"
                          />
                          <path
                            id="Path_13354"
                            data-name="Path 13354"
                            d="M833.958,650.8l-2.42,2.264a.415.415,0,0,1-.536.077.4.4,0,0,1-.074-.638l3.492-3.273,3.492,3.273a.38.38,0,0,1,.122.329.438.438,0,0,1-.152.275.412.412,0,0,1-.579-.041l-2.426-2.27v11.1h-.919Z"
                            transform="translate(-827.062 -649.228)"
                            stroke="#000"
                            strokeWidth="0.2"
                            fill="#000"
                            fillRule="evenodd"
                          />
                        </g>
                      </svg>
                    </span>
                  </div>
                )}
              </div>

              <div className="product__second--twoButtons">
                {product?.customFields?.customiser_code && (
                  <a
                    onClick={handleCustomise}
                    className="product__second--twoButtons--buyBtn"
                    style={{ textDecoration: "none" }}
                  >
                    <p className="txt">CUSTOMISE</p>
                  </a>
                )}

                {alreadyAdded === false ? (
                  <div
                    className="product__second--twoButtons--buyBtn second"
                    onClick={handleAddToBag}
                    style={{
                      width:
                        product?.customFields?.customiser_code === null
                          ? "100%"
                          : "",
                      marginLeft:
                        product?.customFields?.customiser_code === null
                          ? "0"
                          : "",
                    }}
                  >
                    <p className="txt"> ADD TO CART </p>
                  </div>
                ) : (
                  <div
                    className="product__second--twoButtons--buyBtn"
                    onClick={() => router.push("/cart")}
                    style={{
                      marginLeft: "15px",
                      width:
                        product?.customFields?.customiser_code === null
                          ? "100%"
                          : "",
                    }}
                  >
                    <p className="txt"> GO TO CART </p>
                  </div>
                )}
              </div>

              <div className="product__second--accComponent">
                {isBreakPoint ? (
                  <>
                    {productDesc.map((e, i) => {
                      return (
                        <div key={e.id}>
                          <Accordion
                            e={e}
                            i={i}
                            setIndex={setAccIndex}
                            index={accIndex}
                          />
                        </div>
                      );
                    })}
                  </>
                ) : (
                  <>
                    {productDesc.slice(1, 3).map((e, i) => {
                      return (
                        <div key={e.id}>
                          <Accordion
                            e={e}
                            i={i}
                            setIndex={setAccIndex}
                            index={accIndex}
                          />
                        </div>
                      );
                    })}
                  </>
                )}
              </div>
            </div>
          </div>
        </section>
        <section className="suggestionSec">
          <div className="suggestion container">
            <h2 className="suggestion__heading">YOU MAY ALSO LIKE</h2>

            <div className="suggestion__card__product">
              {data.map((e) => {
                return (
                  <div key={e.id} className="suggestedCardWrapper">
                    <Card customClass="suggestedCard" {...e} />
                  </div>
                );
              })}
            </div>

            <div className="suggestion__viewMore">
              <Link href="/shoes">
                <a
                  className={`common-btn-style  fourthSec_content_viewMore_btn`}
                >
                  <span>View More</span>
                </a>
              </Link>
            </div>
          </div>
        </section>
      </BaseLayout>

      {socialShare && (
        <ProductShare
          onClose={() => setSocialShare(false)}
          currSlug={currSlug}
        />
      )}

      {itemAdded && <AddToCart />}

      {/* {imageZoom && (
        <ImageZoom
          activeImageIndex={activeImageIndex}
          slug={router?.query?.slug}
          onToggle={() => setImageZoom(false)}
        />
      )} */}
    </>
  );
};

export default ShoeDetail;
