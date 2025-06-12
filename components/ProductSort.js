import useMediaQuery from "hooks/useMediaQuery";
import { useState } from "react";
import { useRef } from "react";

const sortDesc1 = [
  {
    value: "recommended",
    label: "Recommended",
  },
];
const sortDesc = [
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

const ProductSort = ({
  handlePSAccordionClick,
  onSort,
  mobSortOption,
  setMobSortOption,
}) => {
  const [accIndex, setAccIndex] = useState(null);
  const isMobileBreakPoint = useMediaQuery(1024);

  return (
    <div className="productSort">
      <div className="productSort--top">
        {isMobileBreakPoint && (
          <div
            onClick={handlePSAccordionClick}
            className="productSort--top--closeButton"
          >
            {/* <svg
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
            </svg> */}
          </div>
        )}
        <div className="productSort--top--accComponent">
          <div style={{ marginTop: "15px" }}>
            {/* {sortDesc1.map((e, i) => {
              return (
                <div key={e.value} className="Single1">
                  <p
                    className="Single1--Text1"
                    style={{
                      color: mobSortOption === e.value ? "" : "black",
                    }}
                    onClick={() => {
                      setMobSortOption(e.value);
                      onSort(e.value);
                    }}
                  >
                    {e.label}
                  </p>
                  <div
                    style={{
                      borderColor: mobSortOption === e.value ? "black" : "",
                    }}
                    onClick={() => {
                      setMobSortOption(e.value);
                      onSort(e.value);
                    }}
                    className="Single1--OuterCircle1"
                  >
                    {mobSortOption === e.value1 && (
                    <div
                      style={{
                        backgroundColor:
                          mobSortOption === e.value ? "black" : "",
                      }}
                      className="Single1--OuterCircle1--Inner1"
                    ></div>
                   )}
                  </div>
                </div>
              );
            })} */}
            {sortDesc.map((e, i) => {
              return (
                <div
                  className="productSort--top--accComponent--Single"
                  key={e.value}
                >
                  <p
                    style={{ color: mobSortOption === e.value ? "black" : "" }}
                    onClick={() => {
                      setMobSortOption(e.value);
                      onSort(e.value);
                    }}
                    className="productSort--top--accComponent--Single--Text"
                  >
                    {e.label}
                  </p>
                  <div
                    style={{
                      borderColor: mobSortOption === e.value ? "black" : "",
                    }}
                    onClick={() => {
                      setMobSortOption(e.value);
                      onSort(e.value);
                    }}
                    className="productSort--top--accComponent--Single--OuterCircle"
                  >
                    {mobSortOption === e.value && (
                      <div className="productSort--top--accComponent--Single--OuterCircle--Inner"></div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductSort;
