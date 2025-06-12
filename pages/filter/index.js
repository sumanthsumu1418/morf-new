import { useState, useRef, useEffect } from "react";
import BaseLayout from "@/components/layout/BaseLayout";
import Footer from "@/components/shared/Footer";
import Link from "next/link";
import HomeAnimation from "components/animation/HomeAnimation";
import MorfJourney from "@/components/fifthSection/MorfJourney";
import productData from "@/lib/productData";
import ProductCard from "@/components/secondSection/ProductCard";
import { shopImage } from "@/lib/grams";
import Slider from "react-slick";
import { toast } from "react-toastify";
import ItemFilter from "@/components/ItemFilter";

const Filter = () => {
  // Use dummy data for product items
  const [productitems, setProductItems] = useState([
    {
      id: 1,
      name: "Filtered Shoe 1",
      variants: [{ price: 100, createdAt: new Date().toISOString() }],
    },
    {
      id: 2,
      name: "Filtered Shoe 2",
      variants: [{ price: 200, createdAt: new Date().toISOString() }],
    },
  ]);
  const [offset, setOffset] = useState(3);
  const [categories, setCategories] = useState([]);
  const [currCategories, setCurrCategories] = useState([]);
  const removeCategory = (category) => {
    let cats = currCategories.filter((cat) => cat != category);
    setCurrCategories(cats);
  };

  useEffect(() => {
    let temp = new Set();
    for (let i = 0; i < productitems.length; i++) {
      if (productitems[i]?.facetValues[0]?.category?.length)
        temp.add(productitems[i]?.facetValues[0]?.category);
    }
    let tempArr = Array.from(temp);
    setCurrCategories(tempArr);
    setCategories(tempArr);

    // code for product data
    // let pData=[]
    // for(let i=0;i<product)
  }, []);
  const [productData, setProductdata] = useState([]);
  const showInRange = (range) => {
    // console.log(productData);
    let items = productitems;
    let finalItems = [];
    finalItems = items.filter(
      (item) =>
        item?.variants[0]?.price >= range[0] &&
        item?.variants[0]?.price <= range[1]
    );
    setProductdata(finalItems);
  };
  const [sortByVal, setSortByVal] = useState("LtoH");
  useEffect(() => {
    sortBy();
  }, []);
  const sortBy = (val) => {
    setSortByVal(val);
    let items = productitems;
    let finalItems = [];
    if (sortByVal == "LtoH")
      finalItems = items.sort((a, b) => {
        return b?.variants[0]?.price - a?.variants[0]?.price;
      });
    else if (sortByVal == "HtoL")
      finalItems = items.sort((a, b) => {
        return a?.variants[0]?.price - b?.variants[0]?.price;
      });
    else if (sortByVal == "NtoO")
      finalItems = items.sort((a, b) => {
        return (
          new Date(b?.variants[0]?.createdAt) -
          new Date(a?.variants[0]?.createdAt)
        );
      });
    else if (sortByVal == "OtoN")
      finalItems = items.sort((a, b) => {
        return (
          new Date(a?.variants[0]?.createdAt) -
          new Date(b?.variants[0]?.createdAt)
        );
      });
    setProductdata(finalItems);
  };
  const scrollRef = useRef();
  const SecondSliderRef = useRef(null);

  const secondSlider = {
    infinite: false,
    dots: false,
    arrows: false,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplaySpeed: 5000,
    swipeToSlide: false,
    lazyLoad: true,
    autoplay: true,
    infinite: true,
    cssEase: "ease-out",
    // beforeChange: (current, next) => setSlideIndex(next),
  };
  const clearFilter = () => {
    setCurrCategories(categories);
  };
  const getCount = () => {
    let count = 0;
    for (let i = 0; i < productData.length; i++)
      if (currCategories?.includes(productData[i]?.facetValues[0]?.category))
        count++;
    return count;
  };
  const [a, setA] = useState(3);
  const [b, setB] = useState(6);
  const [c, setC] = useState(9);
  const incrementOffset = () => {
    let len = 0;
    for (let i = 0; i < productData.length; i++) {
      if (currCategories?.includes(productData[i].facetValues[0]?.category))
        len++;
    }
    if (c >= len) toast.error("No more items present!");
    else {
      let diff = len - c;
      let count = 0;
      while (diff && count < 3) {
        count++;
        if (diff > 0) {
          setC(c + 1);
          diff--;
        }
        if (c >= len) return;
        if (diff > 0) {
          setB(b + 1);
          diff--;
        }
        if (diff > 0) {
          setA(a + 1);
          diff--;
        }
      }
    }
  };
  return (
    <BaseLayout>
      {/* <HomeAnimation /> */}

      <div id="shop-page" ref={scrollRef} className="home_page shop_page">
        {/* <section className="firstSec container">
          <div className="firstSec_content">
            <div className="firstSec_content_front">
              <h2 className="landing_title"> NEW COLLECTION </h2>
              <p className="landing_description">
                Life is too short to look like others
              </p>
              <Link href="/">
                <a className={`common-btn-style-alt landing_sec_link`}>
                  <span>SHOP NOW</span>
                </a>
              </Link>
            </div>
            <div className="firstSec_content_back">
              <div className="firstSec_content_back_transparent"></div>

              <Slider ref={SecondSliderRef} {...secondSlider}>
                {shopImage.map((item) => {
                  return (
                    <div key={item.id} className="shop_slider">
                      <img
                        className="shop_slider_image"
                        src={item.image}
                        alt=""
                      />
                    </div>
                  );
                })}
              </Slider>
            </div>
          </div>
        </section> */}

        <section
          className="secondSec container"
          style={{ padding: "100px 50px !important" }}
        >
          <div className="secondSec_content">
            <h2 className="secondSec_content_shopCollection">
              FILTER Collection
            </h2>
            <div className="product_grid">
              <ItemFilter
                showInRange={showInRange}
                currCategories={currCategories}
                sortBy={sortBy}
                removeCategory={removeCategory}
                clearFilter={clearFilter}
              />{" "}
              {}
              <div
                className="product_grid_one"
                data-scroll
                data-scroll-speed="1"
              >
                {productData.slice(0, a).map((pData) => {
                  return (
                    currCategories?.includes(
                      pData.facetValues[0]?.category
                    ) && (
                      <div key={pData.id} className="product_grid_one_image">
                        <ProductCard {...pData} />
                      </div>
                    )
                  );
                })}
              </div>
              <div
                className="product_grid_one"
                data-scroll
                data-scroll-speed="2.5"
              >
                <div className="product_grid-text">
                  A highly curated selection of products we believe in
                </div>

                {productData.slice(a, b).map((pData) => {
                  return (
                    currCategories?.includes(
                      pData.facetValues[0]?.category
                    ) && (
                      <div key={pData.id} className="product_grid_one_image">
                        <ProductCard {...pData} />
                      </div>
                    )
                  );
                })}
              </div>
              <div
                className="product_grid_one"
                data-scroll
                data-scroll-speed="1"
              >
                {productData.slice(b, c).map((pData) => {
                  return (
                    currCategories?.includes(
                      pData.facetValues[0]?.category
                    ) && (
                      <div key={pData.id} className="product_grid_one_image">
                        <ProductCard {...pData} />
                      </div>
                    )
                  );
                })}
              </div>
            </div>
            <div
              className="secondSec_content_viewMore"
              onClick={() => {
                incrementOffset();
              }}
            >
              {/* <Link href="/"> */}
              <a className={`common-btn-style secondSec_content_viewMore_Link`}>
                <span>View More</span>
              </a>
              {/* </Link> */}
            </div>
          </div>
        </section>

        <section className="thirdSec container">
          <div className="thirdSec_content">
            <div className="thirdSec_content_left">
              <h2 className="thirdSec_content_left_heading">A RIGHT FIT</h2>
              <h3 className="thirdSec_content_left_subheading =">
                for you and the environment
              </h3>

              <p className="thirdSec_content_left_description">
                Customisation doesn’t stop there. Our new 3D size calculator
                tool enables you to find your shoe size at the click of a
                button, and ensures that your new style statement is a right
                fit, all round.
              </p>
              <div className="thirdSec_content_left_insts">
                {/* <ul className="stepPointers">
                  <li>
                    <span
                      style={{
                        backgroundColor: "#570707",

                      }}
                    ></span>
                    <span></span>
                  </li>
                  <li>
                    <span></span>
                    <span></span>
                  </li>
                  <li>
                    <span></span>
                    <span></span>
                  </li>
                  <li>
                    <span></span>
                    <span style={{ display: "none" }}></span>
                  </li>
                </ul> */}

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="277.477"
                  viewBox="0 0 25 277.477"
                >
                  <path
                    id="Path_1043"
                    data-name="Path 1043"
                    d="M-15283.5-3764.5v251.2"
                    transform="translate(15296 3777)"
                    fill="none"
                    stroke="#ebe6df"
                    strokeWidth="4"
                  />
                  <path
                    id="Path_1044"
                    data-name="Path 1044"
                    d="M-15283.5-3764.5v39.492"
                    transform="translate(15296 3777)"
                    fill="none"
                    stroke="#570707"
                    strokeWidth="4"
                  />
                  <g
                    id="Ellipse_134"
                    data-name="Ellipse 134"
                    fill="#570707"
                    stroke="#ebe6df"
                    strokeWidth="4"
                  >
                    <circle cx="12.5" cy="12.5" r="12.5" stroke="none" />
                    <circle cx="12.5" cy="12.5" r="10.5" fill="none" />
                  </g>
                  <g
                    id="Ellipse_135"
                    data-name="Ellipse 135"
                    transform="translate(0 85)"
                    fill="#fff"
                    stroke="#ece6de"
                    strokeWidth="4"
                  >
                    <circle cx="12.5" cy="12.5" r="12.5" stroke="none" />
                    <circle cx="12.5" cy="12.5" r="10.5" fill="none" />
                  </g>
                  <g
                    id="Ellipse_136"
                    data-name="Ellipse 136"
                    transform="translate(0 169.238)"
                    fill="#fff"
                    stroke="#ece6de"
                    strokeWidth="4"
                  >
                    <circle cx="12.5" cy="12.5" r="12.5" stroke="none" />
                    <circle cx="12.5" cy="12.5" r="10.5" fill="none" />
                  </g>
                  <g
                    id="Ellipse_137"
                    data-name="Ellipse 137"
                    transform="translate(0 252.477)"
                    fill="#fff"
                    stroke="#ece6de"
                    strokeWidth="4"
                  >
                    <circle cx="12.5" cy="12.5" r="12.5" stroke="none" />
                    <circle cx="12.5" cy="12.5" r="10.5" fill="none" />
                  </g>
                </svg>

                <ul className="thirdSec_content_left_insts_ulist">
                  <li>Put your bare feet on A4 sheet of paper</li>
                  <li>Click on “FIND MY FIT” button</li>
                  <li>Allow your phone camera to open.</li>
                  <li>Now, you know your perfect fit size.</li>
                </ul>
              </div>

              <Link href="/" passHref>
                <a className={`common-btn-style findYourFit`}>
                  <span> Find Your Fit </span>
                </a>
              </Link>
            </div>

            <div className="thirdSec_content_right">
              <img src="/images/shop/fit-my-size-img.jpg" alt="" />
            </div>
          </div>
        </section>

        <section className="fourthSec container">
          <div className="fourthSec_content">
            <div className="fourthSec_content_top">
              <img
                data-scroll
                data-scroll-speed="-2"
                src="/images/shop/groomsmen-img.jpg"
                alt=""
              />
            </div>

            <div className="fourthSec_content_bottom">
              <h2 className="fourthSec_content_bottom_title">Groomsmen 101</h2>
              <p className="fourthSec_content_bottom_desc">
                Get your Groom Squad game on point with custom shoes for each of
                your groomsmen.
              </p>
              <Link href="/" passHref>
                <a className={`common-btn-style getInTouch`}>
                  <span>Get In Touch</span>
                </a>
              </Link>
            </div>
          </div>
        </section>

        <section className="fifthSec container">
          <div className="fifthSec_content">
            <div className="fifthSec_content_top">
              <h2 className="fifthSec_content_top_title">
                PERSONALISE it, YOUR way
              </h2>
              <Link href="/customiser" passHref>
                <a className={`common-btn-style designYours`}>
                  <span> Design Yours </span>
                </a>
              </Link>
            </div>
            <div className="fifthSec_content_bottom">
              <img src="/images/shop/customiser_2.png" alt="" />
            </div>
          </div>
        </section>

        <section className="sixthSec container">
          <MorfJourney />
        </section>
        {/* 
        <footer>
          <Footer />
        </footer> */}
      </div>
    </BaseLayout>
  );
};

export default Filter;
