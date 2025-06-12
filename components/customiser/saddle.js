import React, { useRef } from "react";
import { saddleData } from "lib/data";
import useMediaQuery from "../../hooks/useMediaQuery";

const Saddle = ({ index, setIndex, state, handleColorClick }) => {
  const plane = useRef(null);

  const isBreakPoint = useMediaQuery(1024);

  return (
    <div className="accordionWrapper">
      <div
        className="accordion"
        onClick={() => setIndex("SADDLE" === index ? null : "SADDLE")}
        style={{ display: isBreakPoint ? "none" : "" }}
      >
        <p> Saddle </p>
        <div className="accordion__icontxt">
          <p className="accordion__icontxt--txt">{state.currentSaddle.name}</p>
          <div
            className="accordion__icontxt--color"
            style={{
              background:
                state.currentSaddle.category == "OTHERS"
                  ? state?.currentSaddle?.others_value
                  : `#${state.currentSaddle.color}`,
            }}
          ></div>
        </div>
      </div>
      <div
        ref={plane}
        className={`panel colorAndMaterial ${"SADDLE" === index && "padding"}`}
        style={{
          maxHeight:
            "SADDLE" === index ? `${plane?.current?.scrollHeight}px` : "0px",
        }}
      >
        {/* <div className={`panelMainContainer`}> */}
        {saddleData.map((e, index) => {
          return (
            <div className="panelContainer" key={e.category}>
              <div
                className="panelContainer__Header"
                style={{ background: e.url }}
              >
                <p>{e.category}</p>
              </div>
              <div className={`panelMainContainer`}>
                {e.colors.map((x, index) => {
                  return (
                    <React.Fragment key={x.id}>
                      {x.category !== "OTHERS" && (
                        <div
                          className={`panelMain`}
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
                                state.currentSaddle.name === x.name &&
                                state.currentSaddle.category === x.category
                                  ? "0 0 0 3px #fff, 0 0 0 4px #c8b8a0"
                                  : "",
                            }}
                          ></div>

                          <p
                            style={{
                              color:
                                state.currentSaddle.name === x.name &&
                                state.currentSaddle.category === x.category
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
                {e.colors.map((x, index) => {
                  return (
                    <React.Fragment key={x.id}>
                      {x?.category === "OTHERS" && (
                        <div
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
                                state?.currentSaddle?.name === x?.name &&
                                state?.currentSaddle?.category === x?.category
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
        {/* </div> */}
      </div>
    </div>
  );
};

export default Saddle;
