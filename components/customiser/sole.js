import { useRef, useState } from "react";
import { soleData } from "lib/data";
import { patinaSoleData } from "lib/data";
import useMediaQuery from "../../hooks/useMediaQuery";

const getBackground = (value) => {
  if (value == "Leather") return "/images/customiser/leather-sole-side.jpg";
  if (value == "Rubber") return "";
};

const Sole = ({ index, setIndex, state, handleColorClick }) => {
  const plane = useRef(null);
  const isBreakPoint = useMediaQuery(1024);
  const isPatina = state.currentPatina == "with_patina";
  const data = isPatina ? patinaSoleData : soleData;

  return (
    <div className="accordionWrapper">
      <div
        className="accordion"
        onClick={() => setIndex("SOLE" === index ? null : "SOLE")}
        style={{ display: isBreakPoint ? "none" : "" }}
      >
        <p className="accordion__headText">Sole</p>
        <div className="accordion__icontxt">
          <p className="accordion__icontxt--txt">{state.currentSole.name}</p>
          <div
            className="accordion__icontxt--color"
            style={{ background: `#${state.currentSole.color}` }}
          ></div>
        </div>
      </div>
      <div
        ref={plane}
        className={`panel colorAndMaterial ${"SOLE" === index && "padding"}`}
        style={{
          maxHeight:
            "SOLE" === index ? `${plane?.current?.scrollHeight}px` : "0px",
        }}
      >
        {data.map((e) => {
          return (
            <div className="panelContainer" key={e.category}>
              <div
                className="panelContainer__Header soleHeader"
                // style={{
                //   background: e.url,
                // }}
              >
                <img src={e.url} alt="" />

                <p className="soleHeader__category">{e.category}</p>
              </div>
              <div className="panelMainContainerSole soleMainContainer">
                {e.colors.map((x) => {
                  return (
                    <div
                      className="panelMain soleMain"
                      // style={{ margin: "0px 10%", display: "flex" }}
                      key={x.id}
                    >
                      <div className="panelMainLaces">
                        <div
                          className="panelColor"
                          style={{
                            background: `#${x.value}`,
                            boxShadow:
                              state.currentSole.name === x.name &&
                              state.currentSole.category === e.category
                                ? "0 0 0 3px #fff, 0 0 0 4px #c8b8a0"
                                : "",
                          }}
                          onClick={() =>
                            handleColorClick(
                              x.id,
                              x.value,
                              x.name,
                              x.attribute_value,
                              x.category
                            )
                          }
                        ></div>

                        <p
                          className="colorName"
                          style={{
                            color:
                              state.currentSole.name === x.name &&
                              state.currentSole.category === e.category
                                ? "#000"
                                : "",
                          }}
                        >
                          {x.name}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
      {/* <div
        ref={plane}
        className={`panel ${"SOLE" === index && "padding"}`}
        style={{
          maxHeight:
            "SOLE" === index ? `${plane?.current?.scrollHeight}px` : "0px",
        }}
      >
        {soleData.map((e) => {
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

export default Sole;
