import { useRef } from "react";
import useMediaQuery from "../../hooks/useMediaQuery";

const modelStyleData = [
  { id: 1, name: "Oxford", value: "oxford" },
  { id: 2, name: "Derby", value: "derby" },
  { id: 3, name: "Monk Strap", value: "monkStrap" },
  { id: 4, name: "Loafer", value: "loafer" },
];

const getModelStyle = (value) => {
  if (value == "oxford") return "/models/Model_style_oxford.svg";
  if (value == "derby") return "/models/Model_style_derby.svg";
  if (value == "monkStrap") return "/models/Model_style_monkstrap.svg";
  if (value == "loafer") return "/models/Model_style_loafer.svg";
};

const ModelStyle = ({ index, setIndex, state, handleModelStyleClick }) => {
  const plane = useRef(null);
  const isBreakPoint = useMediaQuery(1024);
  return (
    <div className="accordionWrapper">
      <div
        className="accordion"
        style={{
          backgroundColor: index === "MODELSTYLE" ? "#ffffff" : "",
          display: isBreakPoint ? "none" : "",
        }}
        onClick={() => setIndex("MODELSTYLE" === index ? null : "MODELSTYLE")}
      >
        <p>Model Style</p>
        <div className="accordion__icontxt">
          <p className="accordion__icontxt--txt">
            {modelStyleData.find((e) => e.value === state.currentModel).name}
          </p>
        </div>
      </div>
      <div
        ref={plane}
        className={`panel ${"MODELSTYLE" === index && "padding"}`}
        style={{
          maxHeight:
            "MODELSTYLE" === index
              ? `${plane?.current?.scrollHeight}px`
              : "0px",
          // background: "black",
        }}
      >
        <div className="modalStylePanel">
          {modelStyleData.map((e) => {
            return (
              <div
                data-attribute="model-style"
                data-value={e.id}
                key={e.id}
                onClick={() => handleModelStyleClick(e.value)}
                className="panel__iconText"
                style={{
                  height: "100%",
                  width: "100%",
                  backgroundColor:
                    state.currentModel === e.value ? "#DBD6D4" : "transparent",
                  border:
                    state.currentModel === e.value
                      ? "1px solid #C8B8A0"
                      : "1px solid transparent",
                  borderRadius: "5px",
                }}
              >
                <img src={getModelStyle(e.value)}></img>
                <p
                  className="text"
                  style={{
                    pointerEvents: "none",
                    margin: "0",
                    color:
                      state.currentModel === e.value ? "#000000" : "#646464",
                    fontFamily:
                      state.currentModel === e.value ? "H-Regular" : "H-Light",
                  }}
                >
                  {e.name}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ModelStyle;
