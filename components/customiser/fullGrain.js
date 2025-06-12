import React, { useRef } from "react";
import { patinaFullGrainData } from "lib/data";
import useMediaQuery from "../../hooks/useMediaQuery";

const FullGrain = ({ index, setIndex, state, handleColorClick }) => {
  const plane = useRef(null);
  const isBreakPoint = useMediaQuery(1024);
  return (
    <div className="accordionWrapper">
      <div
        className="accordion"
        onClick={() => setIndex("FULLGRAIN" === index ? null : "FULLGRAIN")}
        style={{ display: isBreakPoint ? "none" : "" }}
      >
        <p>Full Grain</p>
        <div className="accordion__icontxt">
          <p className="accordion__icontxt--txt">
            {state.currentFullGrain.name}
          </p>
          <div
            className="accordion__icontxt--color"
            style={{
              background:
                state.currentFullGrain.category == "OTHERS"
                  ? state?.currentFullGrain?.others_value
                  : `#${state.currentFullGrain.color}`,
            }}
          ></div>
        </div>
      </div>
      <div
        ref={plane}
        className={`panel colorAndMaterial ${
          "FULLGRAIN" === index && "padding"
        }`}
        style={{
          maxHeight:
            isBreakPoint || "FULLGRAIN" === index
              ? `${plane?.current?.scrollHeight}px`
              : "0px",
        }}
      >
        {patinaFullGrainData.map((e) => {
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
                                state.currentFullGrain.name === x.name &&
                                state.currentFullGrain.category === x.category
                                  ? "0 0 0 3px #fff, 0 0 0 4px #c8b8a0"
                                  : "",
                            }}
                          ></div>

                          <p
                            style={{
                              color:
                                state.currentFullGrain.name === x.name &&
                                state.currentFullGrain.category === x.category
                                  ? "#000"
                                  : "",
                            }}
                            className="colorName"
                          >
                            {x.name}
                          </p>
                        </div>
                      )}

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
                                state?.currentFullGrain?.name === x?.name &&
                                state?.currentFullGrain?.category ===
                                  x?.category
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

export default FullGrain;
