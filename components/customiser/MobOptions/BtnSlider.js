import React from "react";
// import "./Slider.css";

export default function BtnSlider({
  direction,
  moveSlide,
  slideIndex,
  custMobOptions,
}) {
  return (
    <>
      {direction === "next" ? (
        <div
          className="slideBtnWrap"
          onClick={moveSlide}
          style={{
            opacity: slideIndex === custMobOptions.length ? 0.5 : 1,
            pointerEvents: slideIndex === custMobOptions.length ? "none" : "",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25.029"
            height="15.893"
            viewBox="0 0 25.029 15.893"
          >
            <g
              id="Group_1507"
              data-name="Group 1507"
              transform="translate(-357.577 -660.133)"
            >
              <path
                id="Path_4674"
                data-name="Path 4674"
                d="M-1259.59,797.331h24.3"
                transform="translate(1617.167 -129.247)"
                fill="none"
                stroke="#646464"
                strokeWidth="1"
              />
              <path
                id="Path_4675"
                data-name="Path 4675"
                d="M-1249.1,789.755l7.979,7.4-7.979,7.764"
                transform="translate(1623 -129.255)"
                fill="none"
                stroke="#646464"
                strokeWidth="1"
              />
            </g>
          </svg>
        </div>
      ) : (
        <div
          onClick={moveSlide}
          className="slideBtnWrap"
          style={{
            opacity: slideIndex === 1 ? 0.5 : 1,
            pointerEvents: slideIndex === 1 ? "none" : "",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25.029"
            height="15.893"
            viewBox="0 0 25.029 15.893"
          >
            <g
              id="Group_1508"
              data-name="Group 1508"
              transform="translate(0.726 0.367)"
            >
              <path
                id="Path_4674"
                data-name="Path 4674"
                d="M-1235.288,797.331h-24.3"
                transform="translate(1259.59 -789.747)"
                fill="none"
                stroke="#646464"
                strokeWidth="1"
              />
              <path
                id="Path_4675"
                data-name="Path 4675"
                d="M-1241.121,789.755l-7.979,7.4,7.979,7.764"
                transform="translate(1249.1 -789.755)"
                fill="none"
                stroke="#646464"
                strokeWidth="1"
              />
            </g>
          </svg>
        </div>
      )}
    </>
  );
}
