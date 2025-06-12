import { useState, useRef, useEffect } from "react";
// NextJS Imports
import dynamic from "next/dynamic";

// Components Import
import BaseLayout from "components/layout/BaseLayout";
import LoaderForComponent from "uitlity/loaderForComponent";
import SEO from "@/components/layout/SEO";
const BestPicks = dynamic(() => import("components/secondSection/BestPicks"), {
  ssr: false,
});

const collectionTypes = [
  { id: 0, name: "ALL", value: "all" },
  { id: 1, name: "EVENTS", value: "events" },
  { id: 2, name: "BUSINESS", value: "business" },
  { id: 3, name: "CASUAL", value: "casual" },
];
const styleTypes = [
  { id: 1, name: "OXFORD", value: "oxford" },
  { id: 2, name: "DERBY", value: "derby" },
  { id: 3, name: "LOAFER", value: "loafer" },
  { id: 4, name: "MONK STRAP", value: "monk strap" },
  { id: 5, name: "SLIP ON", value: "slip on" },
];
const decorationTypes = [
  { id: 1, name: "CLASSIC", value: "classic" },
  { id: 2, name: "CAP TOE", value: "cap toe" },
  { id: 3, name: "HALF BROGUE", value: "half brogue" },
  { id: 4, name: "FULL BROGUE", value: "full brogue" },
  { id: 5, name: "CLASSIC BROGUE", value: "classic brogue" },
  { id: 6, name: "WING TIP", value: "wing tip" },
  { id: 7, name: "WING TIP FULL BROGUE", value: "wing tip full brogue" },
];
const colorsTypes = [
  { id: 1, name: "#111111", value: "#111111" },
  { id: 2, name: "#FFFFFF", value: "#FFFFFF" },
  { id: 3, name: "#AD3929", value: "#AD3929" },
  { id: 4, name: "#6B352E", value: "#6B352E" },
  { id: 5, name: "#3F4052", value: "#3F4052" },
  { id: 6, name: "#C2C2C2", value: "#C2C2C2" },
  { id: 7, name: "#424236", value: "#424236" },
  { id: 8, name: "#2E3833", value: "#2E3833" },
  { id: 9, name: "#D5943E", value: "#D5943E" },
  { id: 10, name: "#4B3C48", value: "#4B3C48" },
  { id: 11, name: "#3E412E", value: "#3E412E" },
  { id: 12, name: "#42423D", value: "#42423D" },
];
const Collections = () => {
  const [hostname, setHostname] = useState("");
  useEffect(() => {
    if (typeof window !== "undefined") {
      setHostname(window?.location?.href);
    }
  }, []);
  const [state, setState] = useState({
    categoryType: collectionTypes[0].id,
    categoryTypeShow: false,
    sale: false,
    style: [],
    styleShow: false,
    decoration: [],
    decorationShow: false,
    colors: [],
  });

  const styleBody = useRef(null);
  const decorationBody = useRef(null);

  // Category Functions

  const handleCategoryTypeClick = (e) => {
    const id = e.target.dataset.id;
    setState((prev) => ({
      ...prev,
      categoryType: parseInt(id),
      categoryTypeShow: false,
    }));
  };
  const handleCategory = () => {
    setState((prev) => ({ ...prev, categoryTypeShow: !prev.categoryTypeShow }));
  };

  // Sale Function

  const handleSaleClick = () => {
    setState((prev) => ({ ...prev, sale: !prev.sale }));
  };

  // Style Function

  const handleStyleClick = () => {
    setState((prev) => ({ ...prev, styleShow: !prev.styleShow }));
  };

  const handleStyleItemClick = (e) => {
    const id = parseInt(e.target.dataset.id);
    const idExists = state.style.find((e) => e === id);
    const filteredArray = state.style.filter((e) => e !== id);

    if (idExists) {
      setState((prev) => ({ ...prev, style: [...filteredArray] }));
      handleStyleClick();
    } else {
      setState((prev) => ({ ...prev, style: [...prev.style, id] }));
      handleStyleClick();
    }
  };

  const handleSelectedCrossClick = (e) => {
    const id = parseInt(e.target.dataset.id);
    const filteredArray = state.style.filter((e) => e !== id);
    setState((prev) => ({ ...prev, style: [...filteredArray] }));
  };

  // Decoration Function

  const handleDecorationClick = () => {
    setState((prev) => ({ ...prev, decorationShow: !prev.decorationShow }));
  };

  const handleDecorationItemClick = (e) => {
    const id = parseInt(e.target.dataset.id);
    const idExists = state.decoration.find((e) => e === id);
    const filteredArray = state.decoration.filter((e) => e !== id);

    if (idExists) {
      setState((prev) => ({ ...prev, decoration: [...filteredArray] }));
      handleDecorationClick();
    } else {
      setState((prev) => ({ ...prev, decoration: [...prev.decoration, id] }));
      handleDecorationClick();
    }
  };

  const handleDecorationSelectedCrossClick = (e) => {
    const id = parseInt(e.target.dataset.id);
    const filteredArray = state.decoration.filter((e) => e !== id);
    setState((prev) => ({ ...prev, decoration: [...filteredArray] }));
  };

  // Color Functions

  const handleColorClick = (e) => {
    const id = e.target.dataset.id;
    const idExists = state.colors.find((e) => e === id);
    const filteredArray = state.colors.filter((e) => e !== id);

    if (idExists) {
      setState((prev) => ({ ...prev, colors: [...filteredArray] }));
    } else {
      setState((prev) => ({ ...prev, colors: [...prev.colors, id] }));
    }
  };

  return (
    <>
      <SEO
        title="COLLECTIONS - MORF"
        desc="Morf"
        pageUrl={hostname}
        ogImage="/images/og_img.png"
      />
      <BaseLayout>
        <section className="container collections">
          <div className="collections__first">
            <div className="categoryDropdown">
              <div className="head" onClick={handleCategory}>
                <p className="head__title">CATEGORY</p>
                <svg
                  width="10.828"
                  height="6.191"
                  viewBox="0 0 10.828 6.191"
                  className="head__arrow"
                >
                  <path
                    d="M11.6,15.571l4.094-4.1a.771.771,0,0,1,1.093,0,.78.78,0,0,1,0,1.1l-4.639,4.642a.772.772,0,0,1-1.067.023L6.413,12.573a.774.774,0,0,1,1.093-1.1Z"
                    transform="translate(-6.188 -11.246)"
                    fill="#707070"
                  />
                </svg>
              </div>
              <ul className="body">
                {collectionTypes.map((e) => {
                  return (
                    <li
                      onClick={handleCategoryTypeClick}
                      data-id={e.id}
                      key={e.id}
                      className={`${
                        !state.categoryTypeShow && e.id !== state.categoryType
                          ? "closeli"
                          : ""
                      }`}
                    >
                      {e.name}
                    </li>
                  );
                })}
              </ul>
            </div>
            <p className="filterby">FILTER BY</p>
            <div className="sale" onClick={handleSaleClick}>
              <p className="sale__title">SALE</p>

              {state.sale && (
                <svg
                  className="sale__icon"
                  width="6.384"
                  height="6.403"
                  viewBox="0 0 6.384 6.403"
                >
                  <g transform="translate(0 0)">
                    <path
                      d="M13.831,13.161l2.417-2.394a.479.479,0,0,0,.046-.616.433.433,0,0,0-.684-.046l-2.417,2.417-2.417-2.417a.433.433,0,0,0-.684.046.479.479,0,0,0,.046.616l2.417,2.394-2.417,2.394a.479.479,0,0,0-.046.616.433.433,0,0,0,.684.046L13.193,13.8l2.417,2.417a.433.433,0,0,0,.684-.046.479.479,0,0,0-.046-.616Z"
                      transform="translate(-10.001 -9.959)"
                      fill="#d3c5b0"
                    />
                  </g>
                </svg>
              )}
            </div>

            <div className="style">
              <div className="head">
                <p className="head__title" onClick={handleStyleClick}>
                  STYLE
                </p>
                {!state.style.length && <p className="head__all">All</p>}
                <div className="head__selected">
                  {styleTypes.map((e) => {
                    return state.style.includes(e.id) ? (
                      <div className="head__selected--select" key={e.id}>
                        <div
                          className="icon"
                          data-id={e.id}
                          onClick={handleSelectedCrossClick}
                        >
                          <svg
                            width="6.384"
                            height="6.403"
                            viewBox="0 0 6.384 6.403"
                            style={{ pointerEvents: "none" }}
                          >
                            <g transform="translate(0 0)">
                              <path
                                d="M13.831,13.161l2.417-2.394a.479.479,0,0,0,.046-.616.433.433,0,0,0-.684-.046l-2.417,2.417-2.417-2.417a.433.433,0,0,0-.684.046.479.479,0,0,0,.046.616l2.417,2.394-2.417,2.394a.479.479,0,0,0-.046.616.433.433,0,0,0,.684.046L13.193,13.8l2.417,2.417a.433.433,0,0,0,.684-.046.479.479,0,0,0-.046-.616Z"
                                transform="translate(-10.001 -9.959)"
                                fill="#d3c5b0"
                              />
                            </g>
                          </svg>
                        </div>
                        <p className="text">{e.name}</p>
                      </div>
                    ) : null;
                  })}
                </div>
              </div>

              <ul
                className={`body`}
                ref={styleBody}
                style={{
                  maxHeight: state.styleShow
                    ? `${styleBody.current.scrollHeight}px`
                    : 0,
                }}
              >
                {styleTypes.map((e) => {
                  return (
                    <li
                      data-id={e.id}
                      key={e.id}
                      onClick={handleStyleItemClick}
                    >
                      <svg
                        className="dot"
                        width="7.391"
                        height="7.391"
                        viewBox="0 0 7.391 7.391"
                        style={{ opacity: state.style.includes(e.id) ? 1 : 0 }}
                      >
                        <path
                          d="M4.258.563a3.7,3.7,0,1,0,3.7,3.7A3.7,3.7,0,0,0,4.258.563Zm1.192,3.7A1.192,1.192,0,1,1,4.258,3.066,1.193,1.193,0,0,1,5.45,4.258Z"
                          transform="translate(-0.563 -0.563)"
                          fill="#c8b8a0"
                        />
                      </svg>

                      <p className="text">{e.name}</p>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="decoration">
              <div className="head">
                <p className="head__title" onClick={handleDecorationClick}>
                  DECORATION
                </p>
                {!state.decoration.length && <p className="head__all">All</p>}
                <div className="head__selected">
                  {decorationTypes.map((e) => {
                    return state.decoration.includes(e.id) ? (
                      <div className="head__selected--select" key={e.id}>
                        <div
                          className="icon"
                          data-id={e.id}
                          onClick={handleDecorationSelectedCrossClick}
                        >
                          <svg
                            width="6.384"
                            height="6.403"
                            viewBox="0 0 6.384 6.403"
                            style={{ pointerEvents: "none" }}
                          >
                            <g transform="translate(0 0)">
                              <path
                                d="M13.831,13.161l2.417-2.394a.479.479,0,0,0,.046-.616.433.433,0,0,0-.684-.046l-2.417,2.417-2.417-2.417a.433.433,0,0,0-.684.046.479.479,0,0,0,.046.616l2.417,2.394-2.417,2.394a.479.479,0,0,0-.046.616.433.433,0,0,0,.684.046L13.193,13.8l2.417,2.417a.433.433,0,0,0,.684-.046.479.479,0,0,0-.046-.616Z"
                                transform="translate(-10.001 -9.959)"
                                fill="#d3c5b0"
                              />
                            </g>
                          </svg>
                        </div>
                        <p className="text">{e.name}</p>
                      </div>
                    ) : null;
                  })}
                </div>
              </div>

              <ul
                className={`body`}
                ref={decorationBody}
                style={{
                  maxHeight: state.decorationShow
                    ? `${decorationBody.current.scrollHeight}px`
                    : 0,
                }}
              >
                {decorationTypes.map((e) => {
                  return (
                    <li
                      data-id={e.id}
                      key={e.id}
                      onClick={handleDecorationItemClick}
                    >
                      <svg
                        className="dot"
                        width="7.391"
                        height="7.391"
                        viewBox="0 0 7.391 7.391"
                        style={{
                          opacity: state.decoration.includes(e.id) ? 1 : 0,
                        }}
                      >
                        <path
                          d="M4.258.563a3.7,3.7,0,1,0,3.7,3.7A3.7,3.7,0,0,0,4.258.563Zm1.192,3.7A1.192,1.192,0,1,1,4.258,3.066,1.193,1.193,0,0,1,5.45,4.258Z"
                          transform="translate(-0.563 -0.563)"
                          fill="#c8b8a0"
                        />
                      </svg>

                      <p className="text">{e.name}</p>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="colors">
              <div className="head">
                <p className="head__title">COLORS</p>
              </div>

              <ul className="body">
                {colorsTypes.map((e) => {
                  return (
                    <li
                      onClick={handleColorClick}
                      data-id={e.value}
                      className="color"
                      key={e.id}
                      style={{ backgroundColor: e.value }}
                    >
                      {state.colors.includes(e.value) && (
                        <span className="color__selected"></span>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          <div className="collections__second">
            <BestPicks columns={3} />
          </div>
        </section>
        <LoaderForComponent />
      </BaseLayout>
    </>
  );
};

export default Collections;
