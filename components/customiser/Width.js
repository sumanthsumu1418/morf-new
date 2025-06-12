import { useRef } from "react";
import useMediaQuery from "../../hooks/useMediaQuery";

const widthData = [
  { id: 0, name: "Standard (E)", value: "standardE" },
  { id: 1, name: "Wide (EE)", value: "wideEE" },
];

const Width = ({ index, setIndex, state, handleWidthClick }) => {
  const plane = useRef(null);

  const isBreakPoint = useMediaQuery(1024);

  return (
    <div className="accordionWrapper">
      <div
        className="accordion"
        onClick={() => setIndex("WIDTH" === index ? null : "WIDTH")}
        style={{ display: isBreakPoint ? "none" : "" }}
      >
        <p>Width</p>
        <div className="accordion__icontxt">
          {state?.currentWidth.name ? (
            <p className="accordion__icontxt--txt">
              {state?.currentWidth?.name}
            </p>
          ) : (
            <p className="accordion__icontxt--txt" style={{ color: "#646464" }}>
              Select Size
            </p>
          )}
        </div>
      </div>
      <div
        ref={plane}
        className={`panel ${"WIDTH" === index && "padding"}`}
        style={{
          maxHeight:
            "WIDTH" === index || isBreakPoint
              ? `${plane?.current?.scrollHeight}px`
              : "0px",
        }}
      >
        <div className="panelSizes panelWidth">
          {widthData.map((e) => {
            return (
              <div
                key={e.id}
                className="panelSizeContainer Width"
                onClick={() => handleWidthClick(e?.value, e?.name)}
                style={{
                  backgroundColor:
                    state.currentWidth.name === e.name ? "#570707" : "",
                }}
              >
                <div className="panelSizeMainContainer">
                  <div className="panelSizeMain">
                    <p
                      className="widthName"
                      style={{
                        color:
                          state.currentWidth.name === e.name ? "#ffffff" : "",
                      }}
                    >
                      {e.name}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Width;
