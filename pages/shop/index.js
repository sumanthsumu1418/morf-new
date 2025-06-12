import { useState, useRef, useEffect } from "react";
import BaseLayout from "@/components/layout/BaseLayout";
import Footer from "@/components/shared/Footer";
import Link from "next/link";
import RightFit from "@/components/shop/RightFit";
import HomeAnimation from "components/animation/HomeAnimation";
import MorfJourney from "@/components/fifthSection/MorfJourney";
import ProductCard from "@/components/secondSection/ProductCard";
import { shopImage } from "@/lib/grams";
import Slider from "react-slick";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { GET_ACTIVE_WISHLIST, GET_ALL_PRODUCTS } from "graphql/productsqueries";
import SEO from "@/components/layout/SEO";
import ItemFilter from "@/components/ItemFilter";
import { toast } from "react-toastify";
import useMediaQuery from "hooks/useMediaQuery";
import { isUserAuthenticated } from "uitlity";
import LoaderForComponent from "uitlity/loaderForComponent";
import client from "@/components/shared/client";
import { useDispatch } from "react-redux";
import Groomsmen from "@/components/shop/Groomsmen";

// Dummy data for shop page
const dummyShopPageData = {
  attributes: {
    shop_block_1_h1: "Welcome to the Shop!",
    shop_block_1_h2: "Discover our curated collection.",
    shop_block_1_btn_text: "Shop Now",
    shopImages: {
      data: [
        { id: 1, attributes: { url: "/images/shop1.jpg" } },
        { id: 2, attributes: { url: "/images/shop2.jpg" } },
      ],
    },
    shopImages_mob: {
      data: [{ id: 1, attributes: { url: "/images/shop1_mob.jpg" } }],
    },
    personalise_it_title: "Personalise It!",
    personalise_it_image_mobile: {
      data: { attributes: { url: "/images/personalise_mobile.jpg" } },
    },
    personalise_it_image_desktop: {
      data: { attributes: { url: "/images/personalise_desktop.jpg" } },
    },
  },
};
const dummyBlogSecData = { title: "Get Inspired!", posts: [] };
const dummyProductData = [
  {
    id: 1,
    name: "Shoe 1",
    variants: [{ price: 100, createdAt: new Date().toISOString() }],
  },
  {
    id: 2,
    name: "Shoe 2",
    variants: [{ price: 200, createdAt: new Date().toISOString() }],
  },
  {
    id: 3,
    name: "Shoe 3",
    variants: [{ price: 300, createdAt: new Date().toISOString() }],
  },
];

const Shop = () => {
  const [hostname, setHostname] = useState("");
  const isMobileBreakPoint = useMediaQuery(1024);
  const customiserImgDevice = useMediaQuery(600);
  const [shopPageData, setShopPageData] = useState(dummyShopPageData);
  const [blogSecData, setBlogSecData] = useState(dummyBlogSecData);
  const [productData, setProductdata] = useState(dummyProductData);
  const dispatch = useDispatch();
  const scrollRef = useRef(null);
  // Define SecondSliderRef for Slider
  const SecondSliderRef = useRef(null);
  const secondSlider = useRef(null); // Add this line to define secondSlider
  // Define a, b, c for product grid slices
  const a = 3, b = 6, c = 9;

  useEffect(() => {
    if (typeof window !== "undefined") {
      setHostname(window?.location?.href);
    }
  }, []);

  // ...existing code for sort, filter, etc. remains unchanged...
  // Replace all src={process.env.NEXT_PUBLIC_STRAPIURL + ...} with local dummy paths

  // ...existing code...
  // Replace all usages of shopPageData?.attributes?.shopImages?.data and similar with dummy data
  // ...existing code...

  return (
    <>
      <SEO
        title="SHOP - MORF"
        desc="Morf"
        pageUrl={hostname}
        ogImage="/images/og_img.png"
      />
      <BaseLayout>
        <div id="shop-page" ref={scrollRef} className="home_page shop_page">
          <section className="firstSec container">
            <div className="firstSec_content">
              <div className="firstSec_content_front">
                <h2 className="landing_title">
                  {shopPageData?.attributes?.shop_block_1_h1}
                </h2>
                <p className="landing_description">
                  {shopPageData?.attributes?.shop_block_1_h2}
                </p>
                <Link href="/shoes">
                  <a className={`common-btn-style-alt landing_sec_link`}>
                    <span>
                      {shopPageData?.attributes?.shop_block_1_btn_text}
                    </span>
                  </a>
                </Link>
              </div>
              <div className="firstSec_content_back">
                <div className="firstSec_content_back_transparent"></div>
                {isMobileBreakPoint ? (
                  <Slider ref={SecondSliderRef} {...secondSlider}>
                    {shopPageData?.attributes?.shopImages_mob?.data?.map(
                      (item) => (
                        <div key={item.id} className="shop_slider">
                          <img
                            className="shop_slider_image"
                            src={item?.attributes?.url}
                            alt=""
                          />
                        </div>
                      )
                    )}
                  </Slider>
                ) : (
                  <Slider ref={SecondSliderRef} {...secondSlider}>
                    {shopPageData?.attributes?.shopImages?.data?.map((item) => (
                      <div key={item.id} className="shop_slider">
                        <img
                          className="shop_slider_image"
                          src={item?.attributes?.url}
                          alt=""
                        />
                      </div>
                    ))}
                  </Slider>
                )}
              </div>
            </div>
          </section>

          <section className="secondSec container">
            {isMobileBreakPoint ? (
              <div className="secondSec_content">
                <h2 className="secondSec_content_shopCollection">
                  Shop Collection
                </h2>
                <div className="secondSec_content_productList">
                  {productData.slice(0, 8).map((pData) => (
                    <div key={pData.id}>
                      <ProductCard {...pData} />
                    </div>
                  ))}
                </div>
                <div
                  className="secondSec_content_viewMore"
                  // onClick={() => {
                  //   incrementOffset();
                  // }}
                >
                  <Link href="/shoes">
                    <a
                      className={`common-btn-style secondSec_content_viewMore_Link`}
                    >
                      <span>View More</span>
                    </a>
                  </Link>
                </div>
              </div>
            ) : (
              <div className="secondSec_content">
                <h2 className="secondSec_content_shopCollection">
                  Shop Collection
                </h2>

                <div className="product_grid">
                  <div className="product_grid_one">
                    {productData.slice(0, a).map((pData) => {
                      return (
                        <div key={pData.id} className="product_grid_one_image">
                          <ProductCard {...pData} />
                        </div>
                      );
                    })}
                  </div>
                  <div className="product_grid_one">
                    <div className="product_grid-text">
                      A highly curated selection of products we believe in
                    </div>

                    {productData.slice(a, b).map((pData) => {
                      return (
                        <div key={pData.id} className="product_grid_one_image">
                          <ProductCard {...pData} />
                        </div>
                      );
                    })}
                  </div>
                  <div className="product_grid_one">
                    {productData.slice(b, c).map((pData) => {
                      return (
                        <div key={pData.id} className="product_grid_one_image">
                          <ProductCard {...pData} />
                        </div>
                      );
                    })}
                  </div>
                </div>
                <Link href="/shoes" as={`/shoes`} passHref>
                  <div className="secondSec_content_viewMore">
                    <a
                      className={`common-btn-style secondSec_content_viewMore_Link`}
                    >
                      <span>View More</span>
                    </a>
                  </div>
                </Link>
              </div>
            )}
          </section>

          {/* <section className="thirdSec container">
            {isMobileBreakPoint ? (
              <div className="thirdSec_content">
                <div className="thirdSec_content_left">
                  <h2 className="thirdSec_content_left_heading">
                    {shopPageData?.attributes?.right_fit_title}
                  </h2>
                  <h3 className="thirdSec_content_left_subheading">
                    {shopPageData?.attributes?.right_fit_subtitle}
                  </h3>

                  <p className="thirdSec_content_left_description">
                    {shopPageData?.attributes?.right_fit_description}
                  </p>

                  <div className="thirdSec_content_left_insts">
                    <ul className="thirdSec_content_left_insts_ulist">
                      <Slider {...fitSlider}>
                        <li>
                          <img
                            src={
                              `${process.env.NEXT_PUBLIC_STRAPIURL}` +
                              shopPageData?.attributes?.right_fit_step1_img
                                ?.data?.attributes?.url
                            }
                            alt=""
                          />
                          <p>
                            1.&nbsp;
                            {shopPageData?.attributes?.right_fit_step1_text}
                          </p>
                        </li>
                        <li>
                          <img
                            src={
                              `${process.env.NEXT_PUBLIC_STRAPIURL}` +
                              shopPageData?.attributes?.right_fit_step2_img
                                ?.data?.attributes?.url
                            }
                            alt=""
                          />
                          <p>
                            2.&nbsp;
                            {shopPageData?.attributes?.right_fit_step2_text}
                          </p>
                        </li>
                        <li>
                          <img
                            src={
                              `${process.env.NEXT_PUBLIC_STRAPIURL}` +
                              shopPageData?.attributes?.right_fit_step3_img
                                ?.data?.attributes?.url
                            }
                            alt=""
                          />
                          <p>
                            3.&nbsp;
                            {shopPageData?.attributes?.right_fit_step3_text}
                          </p>
                        </li>
                        <li>
                          <img
                            src={
                              `${process.env.NEXT_PUBLIC_STRAPIURL}` +
                              shopPageData?.attributes?.right_fit_step4_img
                                ?.data?.attributes?.url
                            }
                            alt=""
                          />
                          <p>
                            4.&nbsp;
                            {shopPageData?.attributes?.right_fit_step4_text}
                          </p>
                        </li>
                      </Slider>
                    </ul>
                  </div>

                  <Link href="/" passHref>
                    <a className={`common-btn-style findYourFit`}>
                      <span> Find Your Fit </span>
                    </a>
                  </Link>
                </div>
              </div>
            ) : (
              <RightFit shopPageData={shopPageData} />
            )}
          </section> */}

          <Groomsmen shopPageData={shopPageData} />
          <section className="fifthSec container">
            <div className="fifthSec_content">
              <div className="fifthSec_content_top">
                <p className="fifthSec_content_top_title">
                  {shopPageData?.attributes?.personalise_it_title}
                </p>
                <Link href="/customiser" passHref>
                  <a className={`common-btn-style designYours`}>
                    <span> Design Yours </span>
                  </a>
                </Link>
              </div>
              <div className="fifthSec_content_bottom">
                <img
                  src={
                    customiserImgDevice
                      ? `/images/personalise_mobile.jpg`
                      : `/images/personalise_desktop.jpg`
                  }
                  alt=""
                />
              </div>
            </div>
          </section>

          <section className="sixthSec container">
            <MorfJourney blogSecData={blogSecData} />
          </section>
        </div>
        <LoaderForComponent />
      </BaseLayout>
    </>
  );
};

export default Shop;
