import React, { useRef } from "react";
import { quarterData } from "lib/data";
import useMediaQuery from "../../hooks/useMediaQuery";

const Quarter = ({ index, setIndex, state, handleColorClick }) => {
  const plane = useRef(null);
  const isBreakPoint = useMediaQuery(1024);
  return (
    <div className="accordionWrapper">
      <div
        className="accordion"
        onClick={() => setIndex("QUARTER" === index ? null : "QUARTER")}
        style={{ display: isBreakPoint ? "none" : "" }}
      >
        <p>Quarter</p>
        <div className="accordion__icontxt">
          <p className="accordion__icontxt--txt">{state.currentQuarter.name}</p>
          <div
            className="accordion__icontxt--color"
            style={{
              background:
                state.currentQuarter.category == "OTHERS"
                  ? state?.currentQuarter?.others_value
                  : `#${state.currentQuarter.color}`,
            }}
          ></div>
        </div>
      </div>
      <div
        ref={plane}
        className={`panel colorAndMaterial ${"QUARTER" === index && "padding"}`}
        style={{
          maxHeight:
            isBreakPoint || "QUARTER" === index
              ? `${plane?.current?.scrollHeight}px`
              : "0px",
        }}
      >
        {quarterData.map((e) => {
          return (
            <div className="panelContainer" key={e.category}>
              <div
                className="panelContainer__Header"
                style={{ background: e.url }}
              >
                <p>{e.category}</p>
              </div>
              <div className="panelMainContainer">
                {e.colors.map((x) => {
                  return (
                    <React.Fragment key={x.id}>
                      {x.category !== "OTHERS" && (
                        <div
                          className={`panelMain`}
                          key={x.name}
                          onClick={() =>
                            handleColorClick(
                              x.id,
                              x.value,
                              x.name,
                              x.attribute_value,
                              x.category
                            )
                          }
                        >
                          <div
                            className={`panelColor`}
                            style={{
                              background: `#${x.value}`,
                              boxShadow:
                                state.currentQuarter.name === x.name &&
                                state.currentQuarter.category === x.category
                                  ? "0 0 0 3px #fff, 0 0 0 4px #c8b8a0"
                                  : "",
                            }}
                          ></div>

                          <p
                            style={{
                              color:
                                state.currentQuarter.name === x.name &&
                                state.currentQuarter.category === x.category
                                  ? "#000"
                                  : "",
                            }}
                            className="colorName"
                          >
                            {x.name}
                          </p>
                        </div>
                      )}
                    </React.Fragment>
                  );
                })}
              </div>
              <div className={`panelMainContainerOthers`}>
                {e.colors.map((x) => {
                  return (
                    <React.Fragment key={x.id}>
                      {x?.category === "OTHERS" && (
                        <div
                          key={x.name}
                          className="othersPanel"
                          onClick={() =>
                            handleColorClick(
                              x?.id,
                              x?.value,
                              x?.name,
                              x?.attribute_value,
                              x?.category,
                              x?.otherTexture,
                              x?.others_value
                            )
                          }
                        >
                          <div
                            className="othersOptions"
                            style={{
                              background: x?.others_value,
                              boxShadow:
                                state?.currentQuarter?.name === x?.name &&
                                state?.currentQuarter?.category === x?.category
                                  ? "0 0 0 3px #fff, 0 0 0 4px #c8b8a0"
                                  : "",
                            }}
                          ></div>
                          <p className="colorName">{x.name}</p>
                        </div>
                      )}
                    </React.Fragment>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Quarter;
