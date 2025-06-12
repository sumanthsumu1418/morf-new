import useMediaQuery from "hooks/useMediaQuery";
import { useState } from "react";
import { useRef } from "react";

const filtersDesc = [
  {
    id: 1,
    title: "OCCASION",
  },
  {
    id: 2,
    title: "COLOUR",
  },
  {
    id: 3,
    title: "PATINA",
  },
  {
    id: 4,
    title: "MATERIAL",
  },
  {
    id: 5,
    title: "STYLE",
  },
  {
    id: 6,
    title: "DECORATION",
  },
];

const Accordion = ({
  e,
  i,
  index,
  setIndex,
  filterValueData,
  filtervalueArray,
  handleFilterClick,
}) => {
  const plane = useRef(null);

  return (
    <div className="PF__accComponent">
      <div
        onClick={() => setIndex(e.id === index ? null : e.id)}
        className="PF__accComponent__title"
      >
        <p> {e.title} </p>

        <svg
          style={{
            transform: e?.id === index ? "rotate(45deg)" : "rotate(0deg)",
          }}
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="15.999"
          viewBox="0 0 16 15.999"
        >
          <g
            id="Group_11741"
            data-name="Group 11741"
            transform="translate(-351.523 -2084.555)"
          >
            <path
              id="Path_1875"
              data-name="Path 1875"
              d="M14972.9,1153.042h15"
              transform="translate(-14620.882 939.514)"
              fill="none"
              stroke="#646464"
              strokeLinecap="round"
              strokeWidth="1"
            />
            <path
              id="Path_1876"
              data-name="Path 1876"
              d="M0,0H15"
              transform="translate(359.522 2085.055) rotate(90)"
              fill="none"
              stroke="#646464"
              strokeLinecap="round"
              strokeWidth="1"
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
        className="PF__accComponent__plane"
      >
        {e.title === "OCCASION" && (
          <div className="PF__OccasionContainer">
            {filterValueData?.Occasion?.map((e, index) => {
              return (
                <div
                  key={e.id}
                  onClick={() => {
                    handleFilterClick("OCCASION", e.id);
                  }}
                  className="PF__OccasionContainer--OccasionOne"
                >
                  <p
                    style={{
                      color: filtervalueArray.includes(e.id) ? "black" : "",
                    }}
                  >
                    {e.name}
                  </p>
                  <div
                    style={{
                      borderColor: filtervalueArray.includes(e.id)
                        ? "black"
                        : "",
                    }}
                    className="PF__OccasionContainer--OccasionOne--Cirlce"
                  >
                    {filtervalueArray.includes(e.id) && (
                      <div className="PF__OccasionContainer--OccasionOne--Cirlce--InnerCircle"></div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {e.title === "COLOUR" && (
          <div className="PF__ColourContainer">
            <div className="PF__ColourContainer--colorList">
              {filterValueData?.Colour?.map((x) => {
                return (
                  <div
                    className="PF__ColourContainer--colorList--singleColor"
                    key={x.id}
                    onClick={() => {
                      handleFilterClick("COLOUR", x.id);
                    }}
                  >
                    <div
                      className="PF__ColourContainer--colorList--singleColor--Circle"
                      style={{
                        background: `#${x.code}`,
                        boxShadow: filtervalueArray.includes(x?.id)
                          ? "0 0 0 3px #fff, 0 0 0 4px #c8b8a0"
                          : "",
                      }}
                    ></div>
                    <p
                      style={{
                        color: filtervalueArray.includes(x.id) ? "black" : "",
                      }}
                      className="PF__ColourContainer--colorList--singleColor--text"
                    >
                      {x?.name}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {e.title === "PATINA" && (
          <div className="PF__ColourContainer">
            <div className="PF__ColourContainer--colorList">
              {filterValueData?.Patina?.map((x) => {
                return (
                  <div
                    onClick={() => {
                      handleFilterClick("PATINA", x.id);
                    }}
                    className="PF__ColourContainer--colorList--singleColor"
                    key={x.id}
                  >
                    <div
                      className="PF__ColourContainer--colorList--singleColor--Circle"
                      style={{
                        background: `#${x?.code}`,
                        boxShadow: filtervalueArray.includes(x?.id)
                          ? "0 0 0 3px #fff, 0 0 0 4px #c8b8a0"
                          : "",
                      }}
                    ></div>
                    <p
                      style={{
                        color: filtervalueArray.includes(x.id) ? "black" : "",
                      }}
                      className="PF__ColourContainer--colorList--singleColor--text"
                    >
                      {x?.name}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {e.title === "MATERIAL" && (
          <div className="PF__OccasionContainer">
            {filterValueData?.Material?.map((x) => {
              return (
                <div
                  key={x.id}
                  onClick={() => {
                    handleFilterClick("MATERIAL", x.id);
                  }}
                  className="PF__OccasionContainer--OccasionOne"
                >
                  <p
                    style={{
                      color: filtervalueArray.includes(x.id) ? "black" : "",
                    }}
                  >
                    {x.name}
                  </p>
                  <div
                    style={{
                      borderColor: filtervalueArray.includes(x.id)
                        ? "black"
                        : "",
                    }}
                    className="PF__OccasionContainer--OccasionOne--Cirlce"
                  >
                    {filtervalueArray.includes(x.id) && (
                      <div className="PF__OccasionContainer--OccasionOne--Cirlce--InnerCircle"></div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {e.title === "STYLE" && (
          <div className="PF__ModelStyleContainer">
            <div className="PF__ModelStyleContainer--styleList">
              {filterValueData?.Style?.map((x) => {
                let updatedStyles = {
                  ...x,
                  imgSrc: `/models/Model_style_${x?.code}.svg`,
                };

                return (
                  <div
                    className="shoesFilterStyle"
                    key={x.id}
                    onClick={() => handleFilterClick("STYLE", x.id)}
                  >
                    <div
                      className="shoesFilterStyle--singleItem"
                      style={{
                        height: "100%",
                        padding: "10%",
                        width: "100%",
                        backgroundColor: filtervalueArray.includes(
                          updatedStyles.id
                        )
                          ? "#DBD6D4"
                          : "white",
                        border: filtervalueArray.includes(updatedStyles.id)
                          ? "1px solid #C8B8A0"
                          : "1px solid transparent",
                        borderRadius: "5px",
                      }}
                    >
                      <img src={updatedStyles?.imgSrc}></img>
                      <p
                        className="PF__ModelStyleContainer--styleList--singleItem--text"
                        style={{
                          pointerEvents: "none",
                          margin: "0",
                        }}
                      >
                        {updatedStyles?.name}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {e.title === "DECORATION" && (
          <div className="PF__OccasionContainer">
            {filterValueData?.Decoration?.map((x) => {
              return (
                <div
                  key={x.id}
                  onClick={() => {
                    handleFilterClick("DECORATION", x.id);
                  }}
                  className="PF__OccasionContainer--OccasionOne"
                >
                  <p
                    style={{
                      color: filtervalueArray.includes(x.name) ? "black" : "",
                    }}
                  >
                    {x.name}
                  </p>
                  <div
                    style={{
                      borderColor: filtervalueArray.includes(x.id)
                        ? "black"
                        : "",
                    }}
                    className="PF__OccasionContainer--OccasionOne--Cirlce"
                  >
                    {filtervalueArray.includes(x.id) && (
                      <div className="PF__OccasionContainer--OccasionOne--Cirlce--InnerCircle"></div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

const ProductFilter = ({
  filterValueData,
  state,
  handleFilterClick,
  filtervalueArray,
  handleFilterToggle,
  handleResetFilter,
}) => {
  const [accIndex, setAccIndex] = useState(null);
  const isMobileBreakPoint = useMediaQuery(1024);
  return (
    <div className="productFilter">
      <div className="productFilter--top">
        {isMobileBreakPoint && (
          <div
            onClick={handleFilterToggle}
            className="productFilter--top--closeButton"
          >
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
        )}
        <div className="productFilter--top--accComponent">
          {filtersDesc.map((e, i) => {
            return (
              <div key={e.id}>
                <Accordion
                  e={e}
                  i={i}
                  setIndex={setAccIndex}
                  index={accIndex}
                  filterValueData={filterValueData}
                  filtervalueArray={filtervalueArray}
                  state={state}
                  handleFilterClick={handleFilterClick}
                  handleResetFilter={handleResetFilter}
                />
              </div>
            );
          })}
          <div className="secondSec_content--leftSide--bottomPart">
            {" "}
            <div
              onClick={handleResetFilter}
              className="secondSec_content--leftSide--bottomPart--bottom--buttons common-btn-style-alt"
            >
              <span>RESET</span>
            </div>
            <div
              onClick={handleFilterToggle}
              className="secondSec_content--leftSide--bottomPart--bottom--buttonss  common-btn-style-alt"
            >
              <span>
                <span>APPLY</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductFilter;
