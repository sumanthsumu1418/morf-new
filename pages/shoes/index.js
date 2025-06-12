import { useState, useRef, useEffect } from "react";
import BaseLayout from "@/components/layout/BaseLayout";
import ProductCard from "@/components/secondSection/ProductCard";
import dynamic from "next/dynamic";
import { toast } from "react-toastify";
import ProductFilter from "@/components/ProductFilter";
import {
  GET_ACTIVE_WISHLIST,
  GET_ALL_FILTER_PRODUCT,
  GET_FILTER_CUSTOM_FIELD,
} from "graphql/productsqueries";
import { mergeTwoArray } from "@/lib/mergeTwoArray";
import useMediaQuery from "hooks/useMediaQuery";
import ProductSort from "@/components/ProductSort";
import Loader from "@/components/Loader";
import LoaderForComponent from "uitlity/loaderForComponent";
import SEO from "@/components/layout/SEO";
import client from "@/components/shared/client";
import { useDispatch } from "react-redux";

const Select = dynamic(() => import("react-select"), {
  ssr: false,
});

const sortOptions = [
  {
    value: "recommended",
    label: "Recommended",
  },

  {
    label: "Name (A - Z)",
    value: "name_asc",
  },
  {
    label: "Name (Z - A)",
    value: "name_desc",
  },

  // {
  //   value: "bestSelling",
  //   label: "Best Selling",
  // },

  // {
  //   value: "sale",
  //   label: "Sale",
  // },

  {
    value: "price_asc",
    label: "Price: Low To High",
  },

  {
    value: "price_desc",
    label: "Price: High to Low",
  },
];

const customStyle = {
  control: (base, state) => ({
    ...base,
    borderRadius: "0",
    // borderColor: "#D3C5B0",
    outline: "none",
    border: "none",
    cursor: "pointer",
    backgroundColor: "#F3F1F0",
    boxShadow: "none",
    height: "45px",
    width: "230px",
    fontSize: "15px",
    border: "1px solid #E3DFDD",
    borderLeft: "none",
    "@media only screen and (min-width:320px) and (max-width: 600px)": {
      fontSize: "12px",
    },

    "&:hover": {
      outline: "none",
      // backgroundColor: "black",
      // color: "white",
    },
  }),
  placeholder: (base, state) => ({
    ...base,
    display: "none",
    fontFamily: "H-Light",
    fontSize: "15px",

    "@media only screen and (min-width:320px) and (max-width: 600px)": {
      fontSize: "12px",
    },

    "@media only screen and (min-width:601px) and (max-width: 1024px)": {
      fontSize: "12px",
    },
  }),
  indicatorSeparator: (base, state) => ({
    display: "none",
  }),
  option: (base, state) => ({
    ...base,
    outline: "none",
    border: "none",
    cursor: "pointer",
    fontFamily: "H-Light",
    color: state.isSelected ? "white" : "black",
    backgroundColor: state.isSelected ? "black" : "#F3F1F0",
    "&:hover": {
      color: "white",
      backgroundColor: "black",
    },
  }),
  menu: (base, state) => ({
    ...base,
    borderRadius: "0",
  }),
  singleValue: (base, state) => ({
    ...base,
    color: "#000",
    fontFamily: "H-Light",
    fontSize: "15px",
    outline: "none",
    "@media only screen and (min-width:320px) and (max-width: 600px)": {
      fontSize: "12px",
    },
    "@media only screen and (min-width:601px) and (max-width: 1024px)": {
      fontSize: "12px",
    },
  }),
};

const Filter = ({ productFilter, dataRestValues }) => {
  const [hostname, setHostname] = useState("");
  const { facetValues = [], totalItems = 0, items = [] } =
    productFilter?.search || {};
  const { data } = dataRestValues || {};
  const scrollRef = useRef();
  const [valueObtained, setValueObtained] = useState(
    mergeTwoArray(items, data?.products?.items, "slug")
  );
  const isMobileBreakPoint = useMediaQuery(1024);
  const dispatch = useDispatch();

  useEffect(async () => {
    const res = await client.query({
      query: GET_ACTIVE_WISHLIST,
    });
    if (
      res.data?.activeCustomer?.customFields?.__typename ==
      "CustomerCustomFields"
    ) {
      dispatch({
        type: "ADD_TO_WISHLIST",
        payload: res.data?.activeCustomer?.customFields?.wishlist,
      });
    }
  }, []);

  const [openFilter, setOpenFilter] = useState(false);
  const sortClick = () => setOpen((prev) => !prev);
  const filterClick = () => setOpenFilter((prev) => !prev);
  const [open, setOpen] = useState();

  const [loader, setLoader] = useState(false);
  const [filterValues, setFilterValues] = useState([]);
  const [filtervalueArray, setFilterValueArray] = useState([]);

  //For Filtering
  const [state, setState] = useState({
    currentOccasions: [],
    currentColors: [],
    currentPatina: [],
    currentMaterial: [],
    currentStyle: [],
    currentDecoration: [],
  });

  useEffect(() => {
    const dataCheck = facetValues.reduce((acc, cur) => {
      acc[cur.facetValue.facet.name] ??= [];
      const currentElement = {
        name: cur.facetValue.name,
        id: cur.facetValue.id,
        type: cur.facetValue.facet.name,
        code: cur?.facetValue?.code,
      };
      acc[cur.facetValue.facet.name].push(currentElement);
      return acc;
    }, {});
    setFilterValues(dataCheck);
    if (typeof window !== "undefined") {
      setHostname(window.location.href);
    }
  }, []);

  const handleFilterValue = async () => {
    setLoader(false);
    const client = new ApolloClient({
      uri: process.env.GRAPHQL,
      cache: new InMemoryCache(),
    });

    const dataFilter = await client.query({
      query: GET_ALL_FILTER_PRODUCT,
      variables: {
        groupByProduct: true,
        facetArray: [],
        facetValueOperator: "OR",
        facetValueFilters: [
          { or: state.currentColors },
          { or: state.currentDecoration },
          { or: state.currentOccasions },
          { or: state.currentStyle },
          { or: state.currentMaterial },
          { or: state.currentPatina },
        ],
      },
    });

    const valueObtainedInner = mergeTwoArray(
      dataFilter.data.search.items,
      data.products.items,
      "slug"
    );
    setValueObtained(valueObtainedInner);
    setLoader(false);
  };

  const handleResetFilter = () => {
    // setLoader(true);
    setState({
      currentOccasions: [],
      currentColors: [],
      currentPatina: [],
      currentMaterial: [],
      currentStyle: [],
      currentDecoration: [],
    });
    setFilterValueArray([]);
    handleFilterValue();
  };

  useEffect(() => {
    async function filterChange() {
      await handleFilterValue();
    }

    filterChange();
  }, [filtervalueArray]);

  //For Sorting Mobile/iPad Options
  const [mobSortOption, setMobSortOption] = useState("");

  const handlecomFilter = (title, id) => {
    switch (title) {
      case "OCCASION": {
        FilterClickHelper("currentOccasions", id);
        break;
      }
      case "COLOUR": {
        FilterClickHelper("currentColors", id);
        break;
      }
      case "DECORATION": {
        FilterClickHelper("currentDecoration", id);
        break;
      }
      case "PATINA": {
        FilterClickHelper("currentPatina", id);
        break;
      }
      case "MATERIAL": {
        FilterClickHelper("currentMaterial", id);
        break;
      }
      case "STYLE": {
        FilterClickHelper("currentStyle", id);
        break;
      }
    }
  };

  const handleFilterClick = (title, id) => {
    handlecomFilter(title, id);
    if (filtervalueArray.includes(id)) {
      const filterValueObtain = filtervalueArray.filter((e) => e !== id);
      setFilterValueArray(filterValueObtain);
    } else {
      setFilterValueArray([...filtervalueArray, id]);
    }
  };

  const FilterClickHelper = (title, id) => {
    if (state[title].includes(id)) {
      const filterValueObtain = state[title].filter((e) => e !== id);
      setState({ ...state, [title]: filterValueObtain });
    } else {
      setState({ ...state, [title]: [...state[title], id] });
    }
  };

  const handlePFAccordionClick = () => {
    if (isPSAccordion) setIsPFAccordion(false);
    setIsPFAccordion((prev) => !prev);
  };

  const sortData = (value) => {
    let recommended = [];
    let name_asc = [];
    let name_desc = [];
    let price_asc = [];
    let price_desc = [];

    switch (value) {
      case "recommended":
        handleFilterValue();
        // recommended = valueObtained.sort((a, b) =>
        //   a.productName > b.productName ? 1 : 1
        // );

        // setValueObtained(() => [...recommended]);
        break;

      case "name_asc":
        name_asc = valueObtained.sort((a, b) =>
          a.productName > b.productName ? 1 : -1
        );

        setValueObtained(() => [...name_asc]);
        break;

      case "name_desc":
        name_desc = valueObtained.sort((a, b) =>
          a.productName > b.productName ? -1 : 1
        );
        setValueObtained(() => [...name_desc]);
        break;

      case "price_asc":
        price_asc = valueObtained.sort((a, b) => {
          return a.variants[0].price / 100 > b.variants[0].price / 100 ? 1 : -1;
        });
        setValueObtained(() => [...price_asc]);
        break;

      case "price_desc":
        price_desc = valueObtained.sort((a, b) => {

          return a.variants[0].price / 100 > b.variants[0].price / 100 ? -1 : 1;
        });
        setValueObtained(() => [...price_desc]);
        break;

      default: {
        setValueObtained(
          valueObtained.sort((a, b) => (a.productName < b.productName ? 1 : -1))
        );
        break;
      }
    }
  };

  const handleFilterToggle = (prev) => setOpenFilter(!prev);

  return (
    <>
      <SEO
        title="PRODUCT - MORF"
        desc="Morf"
        pageUrl={hostname}
        ogImage="/images/og_img.png"
      />
      <BaseLayout hideFooter>
        <div id="shoes-page" ref={scrollRef} className="home_page ">
          {/* {isMobileBreakPoint ? (
          <section className="secondSec container">
            <div className="secondSec_content">
              <div className="secondSec_content--leftSide">
                {isPFAccordion || isPSAccordion ? (
                  <div className="secondSec_content--leftSide--top">
                    <div
                      onClick={handleResetClick}
                      className="secondSec_content--leftSide--top--headingCon"
                    >
                      <p className="secondSec_content--leftSide--top--headingCon--heading">
                        RESET
                      </p>
                    </div>
                    <div
                      onClick={handleApplyClick}
                      style={{ borderLeft: "1px solid white" }}
                      className="secondSec_content--leftSide--top--headingCon"
                    >
                      <p className="secondSec_content--leftSide--top--headingCon--heading">
                        APPLY
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="secondSec_content--leftSide--top">
                    <div className="secondSec_content--leftSide--top--headingCon">
                      <p className="secondSec_content--leftSide--top--headingCon--heading">
                        SORT
                      </p>
                    </div>
                    <div
                      style={{ borderLeft: "1px solid white" }}
                      className="secondSec_content--leftSide--top--headingCon"
                    >
                      <p className="secondSec_content--leftSide--top--headingCon--heading">
                        FILTER
                      </p>
                    </div>
                  </div>
                )}

                {isPSAccordion && (
                  <div className="mobileProductFilterContainer">
                    <ProductSort
                      handlePSAccordionClick={handlePSAccordionClick}
                      setIsPSAccordion={setIsPSAccordion}
                      setMobSortOption={setMobSortOption}
                      mobSortOption={mobSortOption}
                    />
                  </div>
                )}

                {isPFAccordion && (
                  <div className="mobileProductFilterContainer">
                    <ProductFilter
                      handleOccasionClick={handleOccasionClick}
                      handleDecorationClick={handleDecorationClick}
                      handleMaterialClick={handleMaterialClick}
                      handleStyleClick={handleStyleClick}
                      handleColorClick={handleColorClick}
                      handlePatinaClick={handlePatinaClick}
                      handleResetClick={handleResetClick}
                      handlePFAccordionClick={handlePFAccordionClick}
                      setIsPFAccordion={setIsPFAccordion}
                      state={state}
                    />
                  </div>
                )}
              </div>

              <div className="product_grid shoes-product-grid">
                <div className="product_grid--GridsContainer">
                  <div className="product_grid_one">
                    {productData.slice(0, c).map((pData) => {
                      return (
                        <div key={pData.id} className="product_grid_one_image">
                          <ProductCard {...pData} />
                        </div>
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
                  <a
                    className={`common-btn-style secondSec_content_viewMore_Link`}
                  >
                    <span>Load More</span>
                  </a>
                </div>
              </div>
            </div>
          </section>
        ) : ( */}
          <section className="secondSec container">
            <div className="secondSec_content">
              <div className="secondSec_content--leftSide">
                <div className="secondSec_content--leftSide--top--headingCon">
                  <p className="secondSec_content--leftSide--top--headingCon--heading">
                    FILTERS
                  </p>
                </div>
                <ProductFilter
                  filterValueData={filterValues}
                  handleFilterClick={handleFilterClick}
                  filtervalueArray={filtervalueArray}
                  handleResetFilter={handleResetFilter}
                />
                <div className="secondSec_content--leftSide--bottom"></div>
              </div>

              {isMobileBreakPoint && (
                <>
                  <div className="secondSec_content--leftSide--top">
                    <div
                      className="secondSec_content--leftSide--top--headingCon"
                      // onClick={handlePSAccordionClick}
                      onClick={sortClick}
                    >
                      <p className="secondSec_content--leftSide--top--headingCon--heading">
                        SORT
                      </p>
                    </div>
                    <div
                      style={{ borderLeft: "1px solid white" }}
                      className="secondSec_content--leftSide--top--headingCon"
                      // onClick={handleFilterToggle}
                      onClick={filterClick}
                    >
                      <p className="secondSec_content--leftSide--top--headingCon--heading">
                        FILTER
                      </p>
                    </div>
                  </div>
                  <div
                    className="sort_nav"
                    style={{
                      transform: open ? "translateY(0)" : "translateY(100%)",
                    }}
                  >
                    <div className="closebtn">
                      <div className="closeBtn" onClick={sortClick}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="32.719"
                          height="32.719"
                          viewBox="0 0 32.719 32.719"
                        >
                          <g
                            id="Group_1679"
                            data-name="Group 1679"
                            transform="translate(16.359 -14.945) rotate(45)"
                          >
                            <line
                              id="Line_1277"
                              data-name="Line 1277"
                              x2="44.271"
                              transform="translate(0 22.135)"
                              fill="none"
                              stroke="#000"
                              strokeWidth="2"
                            />
                            <line
                              id="Line_1278"
                              data-name="Line 1278"
                              x2="44.271"
                              transform="translate(22.135 0) rotate(90)"
                              fill="none"
                              stroke="#000"
                              strokeWidth="2"
                            />
                          </g>
                        </svg>
                      </div>
                      <div
                        style={{
                          transform: open
                            ? "translateY(0)"
                            : "translateY(100%)",
                        }}
                        className="nav "
                      >
                        <ProductSort
                          onSort={sortData}
                          mobSortOption={mobSortOption}
                          setMobSortOption={setMobSortOption}
                        />
                      </div>
                    </div>
                  </div>
                  {openFilter && (
                    <div
                      style={{
                        transform: openFilter
                          ? "translateX(0)"
                          : "translateX(100%)",
                      }}
                      className="sort_nav"
                    >
                      <div
                        style={{
                          transform: openFilter
                            ? "translateY(0)"
                            : "translateY(100%)",
                        }}
                        className="nav"
                      >
                        <ProductFilter
                          handleFilterToggle={handleFilterToggle}
                          filterValueData={filterValues}
                          handleFilterClick={handleFilterClick}
                          filtervalueArray={filtervalueArray}
                          handleResetFilter={handleResetFilter}
                        />{" "}
                      </div>
                    </div>
                  )}
                </>
              )}
              <div className="product_grid_Main shoes-product-grid container">
                <div className="product_grid shoes-product-grid">
                  {/* Desktop Sort */}
                  <div className="product_grid--selection">
                    <div className="product_grid--selection--text">
                      <p>Sort By : </p>
                    </div>
                    <Select
                      className="product_grid--selection--select"
                      styles={customStyle}
                      options={sortOptions}
                      defaultValue={sortOptions[0]}
                      onChange={(e) => {
                        sortData(e.value);
                      }}
                    ></Select>
                  </div>

                  <div className="product_grid--GridsContainer">
                    {valueObtained.length === 0 && (
                      <p className="nothingToShow"> Nothing to show! </p>
                    )}

                    {valueObtained.map((pData) => {
                      return (
                        <div key={pData.id} className="product_grid_one_image">
                          <ProductCard {...pData} />
                        </div>
                      );
                    })}
                  </div>
                  {/* <div
                  className="secondSec_content_viewMore"
                  onClick={() => {
                    incrementOffset();
                  }}
                >
                  <a
                    className={`common-btn-style secondSec_content_viewMore_Link`}
                  >
                    <span>Load More</span>
                  </a>
                </div> */}
                </div>
              </div>
            </div>
          </section>
          {/* )} */}
        </div>

        <LoaderForComponent />
      </BaseLayout>
    </>
  );
};

export default Filter;
