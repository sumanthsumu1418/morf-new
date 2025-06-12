import React, { useRef } from "react";
import { bindingData } from "lib/data";
import useMediaQuery from "../../hooks/useMediaQuery";

const Binding = ({ index, setIndex, state, handleColorClick }) => {
  const plane = useRef(null);

  const isBreakPoint = useMediaQuery(1024);

  return (
    <div className="accordionWrapper">
      <div
        className="accordion"
        onClick={() => setIndex("BINDING" === index ? null : "BINDING")}
        style={{ display: isBreakPoint ? "none" : "" }}
      >
        <p> Binding </p>
        <div className="accordion__icontxt">
          <p className="accordion__icontxt--txt">{state.currentBinding.name}</p>
          <div
            className="accordion__icontxt--color"
            style={{
              background:
                state.currentBinding.category == "OTHERS"
                  ? state?.currentBinding?.others_value
                  : `#${state.currentBinding.color}`,
            }}
          ></div>
        </div>
      </div>
      <div
        ref={plane}
        className={`panel colorAndMaterial ${"BINDING" === index && "padding"}`}
        style={{
          maxHeight:
            "BINDING" === index ? `${plane?.current?.scrollHeight}px` : "0px",
        }}
      >
        {/* <div className={`panelMainContainer`}> */}
        {bindingData.map((e, index) => {
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
                                state.currentBinding.name === x.name &&
                                state.currentBinding.category === x.category
                                  ? "0 0 0 3px #fff, 0 0 0 4px #c8b8a0"
                                  : "",
                            }}
                          ></div>

                          <p
                            style={{
                              color:
                                state.currentBinding.name === x.name &&
                                state.currentBinding.category === x.category
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
                            //  handleTextureClick()
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
                                state?.currentBinding?.name === x?.name &&
                                state?.currentBinding?.category === x?.category
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

export default Binding;
