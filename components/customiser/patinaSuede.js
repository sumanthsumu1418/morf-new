import React, { useRef } from "react";
import { patinaSuedeData } from "lib/data";
import useMediaQuery from "../../hooks/useMediaQuery";

const PatinaSuede = ({ index, setIndex, state, handleColorClick }) => {
  const plane = useRef(null);
  const isBreakPoint = useMediaQuery(1024);
  return (
    <div className="accordionWrapper">
      <div
        className="accordion"
        onClick={() => setIndex("SUEDE" === index ? null : "SUEDE")}
        style={{ display: isBreakPoint ? "none" : "" }}
      >
        <p>Suede</p>
        <div className="accordion__icontxt">
          <p className="accordion__icontxt--txt">{state.currentSuede.name}</p>
          <div
            className="accordion__icontxt--color"
            style={{
              background:
                state.currentSuede.category == "OTHERS"
                  ? state?.currentSuede?.others_value
                  : `#${state.currentSuede.color}`,
            }}
          ></div>
        </div>
      </div>
      <div
        ref={plane}
        className={`panel colorAndMaterial ${"SUEDE" === index && "padding"}`}
        style={{
          maxHeight:
            isBreakPoint || "SUEDE" === index
              ? `${plane?.current?.scrollHeight}px`
              : "0px",
        }}
      >
        {patinaSuedeData.map((e) => {
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
                                state.currentSuede.name === x.name &&
                                state.currentSuede.category === x.category
                                  ? "0 0 0 3px #fff, 0 0 0 4px #c8b8a0"
                                  : "",
                            }}
                          ></div>

                          <p
                            style={{
                              color:
                                state.currentSuede.name === x.name &&
                                state.currentSuede.category === x.category
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
                                state?.currentSuede?.name === x?.name &&
                                state?.currentSuede?.category === x?.category
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

export default PatinaSuede;
