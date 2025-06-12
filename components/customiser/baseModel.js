import { useEffect, useRef } from "react";
import { useRouter } from "next/router";
import useMediaQuery from "../../hooks/useMediaQuery";

const baseModelData = {
  round: "Round",
  almond: "Almond",
  square: "Square",
};

const BaseModel = ({ index, setIndex, state, handleBaseModelClick }) => {
  const plane = useRef(null);
  const router = useRouter();

  // const handleEncoding = (baseModel, value) => {
  //   console.log("baseModel", baseModel);
  //   console.log("value", value);

  //   router.push({
  //     pathname: "/customiser",
  //     query: { baseModel: encodeURI(value) },
  //   });
  // };

  const isBreakPoint = useMediaQuery(1024);

  return (
    <div className="accordionWrapper">
      <div
        className="accordion"
        onClick={() => setIndex("BASEMODEL" === index ? null : "BASEMODEL")}
        style={{
          backgroundColor: index === "BASEMODEL" ? "#ffffff" : "",
          borderTop: "1.5px solid #F3F1F0",
          display: isBreakPoint ? "none" : "",
        }}
      >
        <p className="accordion__text">Base Model</p>
        <div className="accordion__icontxt">
          <p className="accordion__icontxt--txt">
            {baseModelData[state.currentBase]}
          </p>
        </div>
      </div>
      <div
        ref={plane}
        className={`panel ${"BASEMODEL" === index && "padding"}`}
        style={{
          maxHeight:
            "BASEMODEL" === index || isBreakPoint
              ? `${plane?.current?.scrollHeight}px`
              : "0px",
          transition: "maxHeight 0.3s ease-out",
          // background: "black",
        }}
      >
        <div className="BaseModalPanel BaseModalPanelMob">
          <div
            data-attribute="base-model"
            data-value="1"
            onClick={() => {
              handleBaseModelClick("round");
            }}
            className="panel__iconText"
            style={{
              backgroundColor:
                state.currentBase === "round" ? "#DBD6D4" : "transparent",
              border:
                state.currentBase === "round"
                  ? "1px solid #C8B8A0"
                  : "1px solid transparent",
            }}
          >
            <img src="/models/Base_model_round.svg" alt="" />

            <p
              className="text"
              style={{
                pointerEvents: "none",
                color: state.currentBase === "round" ? "#000000" : "#646464",
                fontFamily:
                  state.currentBase === "round" ? "H-Regular" : "H-Light",
              }}
            >
              Round
            </p>
          </div>

          <div
            data-attribute="base-model"
            data-value="2"
            onClick={() => {
              handleBaseModelClick("almond");
            }}
            className="panel__iconText"
            style={{
              backgroundColor:
                state.currentBase === "almond" ? "#DBD6D4" : "transparent",
              border:
                state.currentBase === "almond"
                  ? "1px solid #C8B8A0"
                  : "1px solid transparent",
            }}
          >
            <img src="/models/Base_model_almond.svg" alt="" />
            <p
              className="text"
              style={{
                pointerEvents: "none",
                color: state.currentBase === "almond" ? "#000000" : "#646464",
                fontFamily:
                  state.currentBase === "almond" ? "H-Regular" : "H-Light",
              }}
            >
              Almond
            </p>
          </div>

          <div
            data-attribute="base-model"
            data-value="3"
            onClick={() => handleBaseModelClick("square")}
            className="panel__iconText"
            style={{
              backgroundColor:
                state.currentBase === "square" ? "#DBD6D4" : "transparent",
              border:
                state.currentBase === "square"
                  ? "1px solid #C8B8A0"
                  : "1px solid transparent",
            }}
          >
            <img src="/models/Base_model_square.svg" alt="" />
            <p
              className="text"
              style={{
                pointerEvents: "none",
                color: state.currentBase === "square" ? "#000000" : "#646464",
                fontFamily:
                  state.currentBase === "square" ? "H-Regular" : "H-Light",
              }}
            >
              Square
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BaseModel;
