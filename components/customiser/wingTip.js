import React, { useRef } from "react";
import { wingTipData } from "lib/data";
import useMediaQuery from "../../hooks/useMediaQuery";

const WingTip = ({ index, setIndex, state, handleColorClick }) => {
  const plane = useRef(null);
  const isBreakPoint = useMediaQuery(1024);

  return (
    <div className="accordionWrapper">
      <div
        className="accordion"
        onClick={() => setIndex("WINGTIP" === index ? null : "WINGTIP")}
        style={{ display: isBreakPoint ? "none" : "" }}
      >
        <p className="accordion__headText"> Wing Tip </p>
        <div className="accordion__icontxt">
          <p className="accordion__icontxt--txt">{state.currentWingTip.name}</p>
          <div
            className="accordion__icontxt--color"
            style={{
              background:
                state.currentWingTip.category == "OTHERS"
                  ? state?.currentWingTip?.others_value
                  : `#${state.currentWingTip.color}`,
            }}
          ></div>
        </div>
      </div>
      <div
        ref={plane}
        className={`panel colorAndMaterial ${"WINGTIP" === index && "padding"}`}
        style={{
          maxHeight:
            "WINGTIP" === index ? `${plane?.current?.scrollHeight}px` : "0px",
        }}
      >
        {wingTipData.map((e) => {
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
                    <React.Fragment key={x.value}>
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
                                state.currentWingTip.name === x.name &&
                                state.currentWingTip.category === x.category
                                  ? "0 0 0 3px #fff, 0 0 0 4px #c8b8a0"
                                  : "",
                            }}
                          ></div>

                          <p
                            style={{
                              color:
                                state.currentWingTip.name === x.name &&
                                state.currentWingTip.category === x.category
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
                    <React.Fragment key={x.value}>
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
                                state?.currentWingTip?.name === x?.name &&
                                state?.currentWingTip?.category === x?.category
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

export default WingTip;
