import React, { useEffect, useRef } from "react";
import { vampData } from "lib/data";
import useMediaQuery from "../../hooks/useMediaQuery";

const Vamp = ({ index, setIndex, state, handleColorClick }) => {
  const plane = useRef(null);
  const isBreakPoint = useMediaQuery(1024);

  return (
    <div className="accordionWrapper">
      <div
        className="accordion"
        onClick={() => setIndex("VAMP" === index ? null : "VAMP")}
        style={{ display: isBreakPoint ? "none" : "" }}
      >
        <p className="accordion__headText">Vamp</p>
        <div className="accordion__icontxt">
          <p className="accordion__icontxt--txt">{state.currentVamp.name}</p>
          <div
            className="accordion__icontxt--color"
            style={{
              background:
                state.currentVamp.category == "OTHERS"
                  ? state?.currentVamp?.others_value
                  : `#${state.currentVamp.color}`,
            }}
          ></div>
        </div>
      </div>
      <div
        ref={plane}
        className={`panel colorAndMaterial ${"VAMP" === index && "padding"}`}
        style={{
          maxHeight:
            "VAMP" === index ? `${plane?.current?.scrollHeight}px` : "0px",
          // height: isBreakPoint && `315px`,
        }}
      >
        {vampData.map((e) => {
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
                              x?.id,
                              x?.value,
                              x?.name,
                              x?.attribute_value,
                              x?.category,
                              x?.vampTexture,
                              x?.others_value
                            )
                          }
                        >
                          <div
                            className={`panelColor`}
                            style={{
                              background: `#${x.value}`,
                              boxShadow:
                                state.currentVamp.name === x.name &&
                                state.currentVamp.category === x.category
                                  ? "0 0 0 3px #fff, 0 0 0 4px #c8b8a0"
                                  : "",
                            }}
                          ></div>

                          <p
                            style={{
                              color:
                                state.currentVamp.name === x.name &&
                                state.currentVamp.category === x.category
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
                                state?.currentVamp?.name === x?.name &&
                                state?.currentVamp?.category === x?.category
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
      {/* <div
        ref={plane}
        className={`panel ${"VAMP" === index && "padding"}`}
        style={{
          maxHeight:
            "VAMP" === index ? `${plane?.current?.scrollHeight}px` : "0px",
        }}
      >
        {vampData.map((e) => {
          return (
            <div
              key={e.id}
              className="panel__color"
              style={{ background: `#${e.value}` }}
              onClick={() => handleColorClick(e.value)}
            ></div>
          );
        })}
      </div> */}
    </div>
  );
};

export default Vamp;
