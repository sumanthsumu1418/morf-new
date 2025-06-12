import { useRef } from "react";
import { stitchingData } from "lib/data";
import useMediaQuery from "../../hooks/useMediaQuery";

const Stitching = ({ index, setIndex, state, handleColorClick }) => {
  const plane = useRef(null);
  const isBreakPoint = useMediaQuery(1024);
  return (
    <div className="accordionWrapper">
      <div
        className="accordion"
        onClick={() => setIndex("STITCHING" === index ? null : "STITCHING")}
        style={{ display: isBreakPoint ? "none" : "" }}
      >
        <p> Stitching </p>
        <div className="accordion__icontxt">
          <p className="accordion__icontxt--txt">{state.currentStich.name}</p>
          <div
            className="accordion__icontxt--color"
            style={{ background: `#${state.currentStich.color}` }}
          ></div>
        </div>
      </div>
      <div
        ref={plane}
        className={`panel ${
          "STITCHING" === index && "padding"
        } colorAndMaterial`}
        style={{
          maxHeight:
            "STITCHING" === index ? `${plane?.current?.scrollHeight}px` : "0px",
        }}
      >
        <div
          className="panelContainer"
          style={{ minWidth: isBreakPoint && "100%" }}
        >
          <div
            className="panelContainer__Header"
            style={{ background: "#570707" }}
          >
            <p> STITCHING </p>
          </div>
          <div className={`panelMainContainer`}>
            {stitchingData.map((x, index) => {
              return (
                <div
                  className={`panelMain`}
                  key={x.id}
                  onClick={() =>
                    handleColorClick(x.id, x.value, x.name, x.attribute_value)
                  }
                >
                  <div
                    className={`panelColor`}
                    style={{
                      background: `#${x.value}`,
                      boxShadow:
                        state.currentStich.name === x.name
                          ? "0 0 0 3px #fff, 0 0 0 4px #c8b8a0"
                          : "",
                      border: x.name === "White" && "1px solid #C8B8A0",
                    }}
                  ></div>

                  <p
                    style={{
                      color: state.currentStich.name === x.name ? "#000" : "",
                    }}
                    className="colorName"
                  >
                    {x.name}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stitching;
