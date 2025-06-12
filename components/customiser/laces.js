import { useRef } from "react";
import { lacesData } from "@/lib/data";
import useMediaQuery from "../../hooks/useMediaQuery";

const Laces = ({ index, setIndex, state, handleColorClick }) => {
  const plane = useRef(null);

  const isBreakPoint = useMediaQuery(1024);

  return (
    <div className="accordionWrapper">
      <div
        className="accordion"
        onClick={() => setIndex("LACES" === index ? null : "LACES")}
        style={{ display: isBreakPoint ? "none" : "" }}
      >
        <p>Lace</p>
        <div className="accordion__icontxt">
          <p className="accordion__icontxt--txt">{state.currentLace.name}</p>
          <div
            className="accordion__icontxt--color"
            style={{ background: `#${state.currentLace.color}` }}
          ></div>
        </div>
      </div>
      <div
        ref={plane}
        className={`panel ${"LACES" === index && "padding"}`}
        style={{
          maxHeight:
            "LACES" === index ? `${plane?.current?.scrollHeight}px` : "0px",

          padding: isBreakPoint && "0 10px",
        }}
      >
        <div className="panelContainer">
          <div
            className="panelContainer__Header"
            style={{ background: "#570707" }}
          >
            <p> LACE </p>
          </div>
          <div className={`panelMainContainer`}>
            {lacesData.map((x, index) => {
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
                        state.currentLace.name === x.name
                          ? "0 0 0 3px #fff, 0 0 0 4px #c8b8a0"
                          : "",
                      border: x.name === "White" && "1px solid #C8B8A0",
                    }}
                  ></div>

                  <p
                    style={{
                      color: state.currentLace.name === x.name ? "#000" : "",
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

export default Laces;
