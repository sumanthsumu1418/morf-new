import { useRef } from "react";
import useMediaQuery from "../../hooks/useMediaQuery";
import { modelsData } from "lib/data";

const decorationData = [
  { id: 1, name: "Classic", value: "classic" },
  { id: 2, name: "Classic Brogue", value: "classicBrogue" },
  { id: 3, name: "Cap Toe", value: "capToe" },
  { id: 4, name: "Full Brogue", value: "fullBrogue" },
  { id: 5, name: "Whole Cut", value: "wholeCut" },
  { id: 6, name: "Wing Tip", value: "wingTip" },
  { id: 7, name: "Wing Tip Full Brogue", value: "wingTipFullBrogue" },
  { id: 8, name: "Tassel", value: "tassel" },
  { id: 9, name: "Penny", value: "penny" },
];

const getDecoration = (value, state) => {
  if (state.currentModel === "oxford") {
    if (value === "classic") {
      return "/models/decoration/oxford/oxford_classic.svg";
    }
    if (value === "capToe") {
      return "/models/decoration/oxford/oxford_captoe.svg";
    }
    if (value === "fullBrogue") {
      return "/models/decoration/oxford/oxford_fullBrogue.svg";
    }
    if (value === "wholeCut") {
      return "/models/decoration/oxford/oxford_wholeCut.svg";
    }
    if (value === "wingTip") {
      return "/models/decoration/oxford/oxford_wingtip.svg";
    }
    if (value === "wingTipFullBrogue") {
      return "/models/decoration/oxford/oxford_wingtipFullBrogue.svg";
    }
  }

  if (state.currentModel === "derby") {
    if (value === "classic") {
      return "/models/decoration/derby/derby_classic.svg";
    }
    if (value === "capToe") {
      return "/models/decoration/derby/derby_capToe.svg";
    }
    if (value === "fullBrogue") {
      return "/models/decoration/derby/derby_fullBrogue.svg";
    }
    if (value === "wholeCut") {
      return "/models/decoration/derby/derby_wholeCut.svg";
    }
    if (value === "wingTip") {
      return "/models/decoration/derby/derby_wingtip.svg";
    }
    if (value === "wingTipFullBrogue") {
      return "/models/decoration/derby/derby_wingtipFullBrogue.svg";
    }
  }

  if (state.currentModel === "monkStrap") {
    if (value === "classic") {
      return "/models/decoration/monkstrap/monkStrap_classic.svg";
    }
    if (value === "capToe") {
      return "/models/decoration/monkstrap/monkStrap_capToe.svg";
    }
    if (value === "fullBrogue") {
      return "/models/decoration/monkstrap/monkStrap_fullBrogue.svg";
    }
    if (value === "wholeCut") {
      return "/models/decoration/monkstrap/monkStrap_wholeCut.svg";
    }
    if (value === "wingTip") {
      return "/models/decoration/monkstrap/monkStrap_wingTip.svg";
    }
    if (value === "wingTipFullBrogue") {
      return "/models/decoration/monkstrap/monkStrap_wingTipFullBrogue.svg";
    }
  }

  if (state.currentModel === "loafer") {
    if (value === "classic") {
      return "/models/decoration/loafer/loafer_classic.svg";
    }

    if (value === "classicBrogue") {
      return "/models/decoration/loafer/loafer_classicBrogue.svg";
    }

    if (value === "tassel") {
      return "/models/decoration/loafer/loafer_tessel.svg";
    }

    if (value === "penny") {
      return "/models/decoration/loafer/loafer_penny.svg";
    }

    if (value === "wingTip") {
      return "/models/decoration/loafer/loafer_wingTip.svg";
    }

    if (value === "wingTipFullBrogue") {
      return "/models/decoration/loafer/loafer_wingTipFullBrogue.svg";
    }
  }
};

const Decoration = ({ index, setIndex, state, handleDecorationClick }) => {
  const plane = useRef(null);

  const isBreakPoint = useMediaQuery(1024);

  return (
    <div className="accordionWrapper">
      <div
        className="accordion"
        style={{
          backgroundColor: index === "DECORATION" ? "#ffffff" : "",
          display: isBreakPoint ? "none" : "",
        }}
        onClick={() => setIndex("DECORATION" === index ? null : "DECORATION")}
      >
        <p>Decoration</p>
        <div className="accordion__icontxt">
          <p className="accordion__icontxt--txt">
            {
              decorationData.find((e) => e.value === state.currentDecoration)
                .name
            }
          </p>
        </div>
      </div>
      <div
        ref={plane}
        className={`panel ${"DECORATION" === index && "padding"}`}
        style={{
          maxHeight:
            "DECORATION" === index
              ? `${plane?.current?.scrollHeight}px`
              : "0px",
          // background: "black",
        }}
      >
        <div className="modalStylePanel">
          {decorationData.map((e) => {
            return modelsData[state.currentBase][
              state.currentModel
            ].decorations.includes(e.value) ? (
              <div
                data-attribute="decoration"
                data-value={e.id}
                key={e.id}
                onClick={() => handleDecorationClick(e.value)}
                className="panel__iconText"
                style={{
                  height: "100%",
                  width: "100%",
                  backgroundColor:
                    state.currentDecoration === e.value
                      ? "#DBD6D4"
                      : "transparent",
                  border:
                    state.currentDecoration === e.value
                      ? "1px solid #C8B8A0"
                      : "1px solid transparent",
                  borderRadius: "5px",
                }}
              >
                <img src={getDecoration(e.value, state)}></img>
                <p
                  className="text"
                  style={{
                    pointerEvents: "none",
                    margin: "0",
                    color:
                      state.currentDecoration === e.value
                        ? "#000000"
                        : "#646464",
                    fontFamily:
                      state.currentDecoration === e.value
                        ? "H-Regular"
                        : "H-Light",
                  }}
                >
                  {e.name}
                </p>
              </div>
            ) : null;
          })}
        </div>
      </div>
    </div>
  );
};

export default Decoration;
