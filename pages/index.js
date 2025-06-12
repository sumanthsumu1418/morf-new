import { useState, useEffect, useRef } from "react";
import BaseLayout from "@/components/layout/BaseLayout";
import Footer from "@/components/shared/Footer";
import Link from "next/link";
import HomeAnimation from "components/animation/HomeAnimation";
import HowItWorks from "@/components/secondSection/HowItWorks";
import MorfJourney from "@/components/fifthSection/MorfJourney";
import productData from "@/lib/productData";
import ProductCard from "@/components/secondSection/ProductCard";
import LoaderForComponent from "uitlity/loaderForComponent";
import SEO from "@/components/layout/SEO";
import { grams } from "@/lib/grams";
import Slider from "react-slick";

import useMediaQuery from "hooks/useMediaQuery";
import { useSession } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";
import { isLogin, login } from "store/user/action";
import client from "@/components/shared/client";
import Groomsmen from "@/components/shop/Groomsmen";
import { useRouter } from "next/router";

const Index = () => {
  // Dummy data for all Strapi-dependent state
  const [homePageData] = useState({
    attributes: {
      home_block_1_h1: "Welcome to MORF!",
      home_block_1_h2: "Discover your perfect fit.",
      home_block_1_btn_text: "Get Started",
      home_block_1_bg_video_poster: { data: { attributes: { url: "/images/og_img.png" } } },
      home_block_1_bg_video: { data: { attributes: { url: "/video/dummy.mp4" } } },
      home_block_3_h1: "Perfect Fit, Every Time",
      home_block_3_h2: "Our shoes are crafted for you.",
      home_block_3_btn_text: "Find Your Fit",
      home_block_3_img: { data: { attributes: { url: "/images/og_img.png" } } },
    },
  });
  const [shopPageData] = useState({
    attributes: {
      shop_title: "Shop the Collection",
      shop_description: "Browse our exclusive range.",
    },
  });
  const [blogSecData] = useState({
    title: "MORF Journey",
    description: "Stories, tips, and more from the world of MORF.",
    posts: [
      { id: 1, title: "How to Style", summary: "Tips for every occasion." },
      { id: 2, title: "Our Craft", summary: "Behind the scenes at MORF." },
    ],
  });
  const [joinInsta] = useState({
    title: "Join the ‘GRAM",
    sub_title: "Follow us on Instagram for the latest inspiration!",
    instagram_link: "https://instagram.com/morf",
    instagram_link_text: "@morf",
    posts: {
      data: [
        { id: 1, instagram_link: "https://instagram.com/morf/1", attributes: { url: "/images/og_img.png" } },
        { id: 2, instagram_link: "https://instagram.com/morf/2", attributes: { url: "/images/og_img.png" } },
      ],
    },
  });
  const [getInspiredPro] = useState([
    { id: 1, name: "Classic Oxford", price: 199, image: "/images/og_img.png" },
    { id: 2, name: "Modern Derby", price: 179, image: "/images/og_img.png" },
    { id: 3, name: "Elegant Loafer", price: 159, image: "/images/og_img.png" },
    { id: 4, name: "Bold Boot", price: 219, image: "/images/og_img.png" },
  ]);
  const [loading] = useState(false);
  const [strapiError] = useState(false);
  const router = useRouter();
  const [hostname, setHostname] = useState("");
  let currentUser = useSelector((state) => state.user.userData);
  const isMobileBreakPoint = useMediaQuery(600);
  const [slideIndex, setSlideIndex] = useState(0);
  const FirstSliderRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (typeof window !== "undefined") {
      setHostname(window?.location?.href);
    }
  }, []);

  // Wishlist fetch (unchanged)
  useEffect(() => {
    async function fetchWishlist() {
      try {
        const res = await client.query({
          query: GET_ACTIVE_WISHLIST,
        });
        if (
          res.data?.activeCustomer?.customFields?.__typename ===
          "CustomerCustomFields"
        ) {
          dispatch({
            type: "ADD_TO_WISHLIST",
            payload: res.data?.activeCustomer?.customFields?.wishlist,
          });
        }
      } catch (e) {}
    }
    fetchWishlist();
  }, [dispatch]);

  useEffect(() => {
    import("@lottiefiles/lottie-player");
  }, []);

  let per = 100 / grams?.length;

  const firstSlider = {
    infinite: false,
    speed: 400,
    slidesToShow: 5,
    slidesToScroll: 5,
    swipeToSlide: true,
    infinite: true,
    speed: 1500,
    beforeChange: (current, next) => setSlideIndex(next),
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: false,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1.6,
          slidesToScroll: 1,
          infinite: false,
          dots: false,
        },
      },
    ],
  };

  // const HandlerMyFit = async () => {
  //   if (session.status == "authenticated") {
  //     const userInfo = {
  //       redirect_url: `${process.env.MORF_DOMAIN}/shoes/${currSlug}`,
  //       user_name: currentUser?.firstName,
  //       user_email: session?.data?.email,
  //       orgid: currentProduct?.id,
  //       auth_key: "findmeashoe",
  //       auth_password: "Find123456",
  //       btncolor: "700707",
  //       user_provider: "google",
  //       Geography: "US",
  //       gender: "M",
  //       shoesize: "9",
  //       paper_type_select: "question_type",
  //       catalog_visibility: "not_visible",
  //       application: "app",
  //       privacy_policy_link: "",
  //       size_scale: "fmas_size",
  //       uk_visible: "no",
  //       us_visible: "yes",
  //       eu_visible: "no",
  //       fmas_width: "visible",
  //       desktop_page: "https://shoesizeonline.wordpress.com",
  //       error_file: "errorcode.csv",
  //       geo_apis: "yes",
  //       fit_pref: "yes",
  //     };
  //     if (session?.data) {
  //       await axios
  //         .get(
  //           `http://backend.fr.findmeashoe.com/services/get-size-recommendations/48/${session?.data?.email}`
  //         )
  //         .then((res) => {
  //           if (res.data?.recommended_size) {
  //             setFMAS(res?.data?.recommended_size);
  //             localStorage.setItem("FMAS", res?.data?.recommended_size);
  //           } else {
  //             axios
  //               .post("https://morf.findmeashoe.com/", userInfo)
  //               .then((res) => console.log(res))
  //               .catch((err) => console.log(err));
  //           }
  //         })
  //         .catch((err) => {
  //           axios
  //             .post("https://morf.findmeashoe.com/", userInfo)
  //             .then((res) => console.log(res))
  //             .catch((err) => console.log(err));
  //         });
  //     }
  //   } else {
  //     dispatch({
  //       type: "OPEN_POPUP_LOGIN",
  //     });
  //   }
  // };

  return (
    <>
      <SEO
        title="HOME - MORF"
        desc="Morf"
        pageUrl={hostname}
        ogImage="/images/og_img.png"
      />
      <BaseLayout>
        <div className="home_page">
          <section className="firstSec container">
            <div className="firstSec_content">
              <div className="firstSec_content_front">
                <h2 className="landing_title">
                  {homePageData.attributes.home_block_1_h1 || ""}
                </h2>
                <p className="landing_description">
                  {homePageData.attributes.home_block_1_h2 || ""}
                </p>
                <Link href={`/customiser`}>
                  <a className={`common-btn-style-alt landing_sec_link`}>
                    <span>
                      {homePageData.attributes.home_block_1_btn_text || "Get Started"}
                    </span>
                  </a>
                </Link>
              </div>
              <div className="firstSec_content_back">
                <div className="firstSec_content_back_transparent"></div>
                <video
                  className="firstSec_content_back_video"
                  autoPlay
                  playsInline
                  loop={true}
                  muted={true}
                  poster={homePageData?.attributes?.home_block_1_bg_video_poster?.data?.attributes?.url}
                >
                  <source
                    src={homePageData?.attributes?.home_block_1_bg_video?.data?.attributes?.url}
                    type="video/mp4"
                  />
                </video>
              </div>
            </div>
          </section>

          <section className="secondSec">
            <HowItWorks homePageData={homePageData} />
          </section>

          {/* <section className="thirdSec ">
            <div className="thirdSec_content">
              <div className="thirdSec_content_top">
                {homePageData?.attributes?.home_block_3_lottie?.data?.attributes
                  ?.url ? (
                  <div className="homeLottieWrapper">
                    <lottie-player
                      autoplay
                      loop
                      src={
                        strAPI_endpoint +
                        homePageData?.attributes?.home_block_3_lottie?.data
                          ?.attributes?.url
                      }
                      style={{ width: "100%", height: "100%" }}
                      mode="normal"
                    ></lottie-player>
                  </div>
                ) : (
                  <img
                    src={
                      strAPI_endpoint +
                      homePageData?.attributes?.home_block_3_img?.data
                        ?.attributes?.url
                    }
                    alt=""
                  />
                )}
              </div>

              <div className="thirdSec_content_bottom">
                <h1 className="perfect-fit-heading">
                  {homePageData.attributes.home_block_3_h1}
                </h1>

                <p className="perfect-fit-description container">
                  {homePageData.attributes.home_block_3_h2}
                </p>
                <div
                // onClick={HandlerMyFit}
                >
                  <a className={`common-btn-style findFitBtn`}>
                    <span>
                      {" "}
                      {homePageData.attributes.home_block_3_btn_text}
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </section> */}
          <Groomsmen shopPageData={shopPageData} />

          <section className="fourthSec container">
            <div className="fourthSec_content">
              <div className="fourthSec_content_heading">
                <div className="fourthSec_content_heading_hr"></div>
                <div className="fourthSec_content_heading_title">
                  <h2>
                    Get <span> INSPIRED </span>
                  </h2>
                </div>
                <div className="fourthSec_content_heading_hr"></div>
              </div>

              <p className="fourthSec_content_subheading">
                Shop Our Collection
              </p>

              <div className="fourthSec_content_productList">
                {getInspiredPro.map((pData) => (
                  <div key={pData.id}>
                    <ProductCard {...pData} />
                  </div>
                ))}
              </div>
              <div className="fourthSec_content_viewMore">
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
          {joinInsta && Object.keys(joinInsta).length > 0 ? (
            <section className="fifthSec container">
              <div className="fifthSec_content">
                <div className="fifthSec_content_top">
                  <h2>
                    {joinInsta?.title}

                    {/* Join the <span>‘GRAM</span> */}
                  </h2>
                  <p>
                    {joinInsta?.sub_title} <br />
                    <a
                      href={joinInsta?.instagram_link}
                      className="fifthSec_content_top_anchor"
                      target="_blank"
                    >
                      {joinInsta?.instagram_link_text}
                    </a>
                  </p>
                </div>

                <div className="fifthSec_content_slider">
                  {/* <!-- SnapWidget --> */}

                  {/* <iframe
                title="insta"
                src="https://snapwidget.com/embed/1009917"
                className="snapwidget-widget 1004285"
                allowtransparency="true"
                frameBorder="0"
                scrolling="no"
                style={{
                  border: "none",
                  overflow: "hidden",
                  width: "1300px",
                  height: "260px",
                }}
              ></iframe> */}
                  <Slider ref={FirstSliderRef} {...firstSlider}>
                    {joinInsta?.posts?.data?.map((item) => {
                      return (
                        <a
                          href={item.instagram_link}
                          target="_blank"
                          key={item.id}
                          className="fifthSec_content_slider_card"
                        >
                          <img
                            src={item?.attributes?.url || "/images/og_img.png"}
                            alt=""
                          />
                        </a>
                      );
                    })}
                  </Slider>
                  <div className="slidesControls">
                    <div
                      onClick={() => FirstSliderRef.current.slickPrev()}
                      className="slidesControls_left"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20.832"
                        height="38.027"
                        viewBox="0 0 20.832 38.027"
                      >
                        <path
                          id="Path_926"
                          data-name="Path 926"
                          d="M-5533.481-6061.2l-17.988,17.539,17.988,17.66"
                          transform="translate(5552.899 6062.611)"
                          fill="none"
                          stroke="#d3c5b0"
                          strokeLinecap="round"
                          strokeWidth="2"
                        />
                      </svg>
                    </div>
                    <div
                      onClick={() => FirstSliderRef.current.slickNext()}
                      className="slidesControls_right"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20.832"
                        height="38.027"
                        viewBox="0 0 20.832 38.027"
                      >
                        <path
                          id="Path_1035"
                          data-name="Path 1035"
                          d="M-5551.47-6061.2l17.988,17.539L-5551.47-6026"
                          transform="translate(5552.884 6062.611)"
                          fill="none"
                          stroke="#d3c5b0"
                          strokeLinecap="round"
                          strokeWidth="2"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="slidesControls_dots">
                  <div
                    style={{ width: `${per * (slideIndex + 1)}%` }}
                    className="slidesControls_dots_dot"
                  ></div>
                </div>
              </div>
            </section>
          ) : null}
          {blogSecData ? (
            <section className="sixthSec container">
              <MorfJourney blogSecData={blogSecData} />
            </section>
          ) : null}
        </div>
        <LoaderForComponent />
      </BaseLayout>
    </>
  );
};

export default Index;
