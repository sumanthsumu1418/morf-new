import { useRef, useState } from "react";
import useMediaQuery from "../../hooks/useMediaQuery";

const soleData = [
  {
    category: "Leather",
    colors: [
      { id: 1, name: "Black", value: "000000" },
      { id: 2, name: "Brown", value: "573419" },
      { id: 3, name: "Natural", value: "573419" },
    ],
  },
  {
    category: "Rubber",
    colors: [{ id: 1, name: "Black", value: "000000" }],
  },
];

const SoleEngraving = ({
  index,
  setIndex,
  state,
  setState,
  setOpenOption,
  engraveAdded,
  setEngraveAdded,
}) => {
  const plane = useRef(null);
  const isBreakPoint = useMediaQuery(1024);
  const [leftState, setLeftState] = useState(state.currentEngrave.leftShoe);
  const [rightState, setRightState] = useState(state.currentEngrave.rightShoe);

  const handleLeftChange = (e) => {
    setLeftState(e.target.value);
  };

  const handleRightChange = (e) => {
    setRightState(e.target.value);
  };

  const handleEngravingClick = (e) => {
    e.preventDefault();
    const data = { leftShoe: leftState, rightShoe: rightState };

    setState((prev) => ({
      ...prev,
      currentEngrave: data,
    }));

    if (leftState || rightState) {
      setEngraveAdded("Your engraving text has been submitted.");
    } else {
      setEngraveAdded("");
    }

    // setIndex("ENGRAVING" === index ? null : "ENGRAVING");
  };

  const handleUpdateEngrave = (e) => {
    e.preventDefault();

    setEngraveAdded("");
  };

  return (
    <div className="accordionWrapper">
      <div
        className="accordion"
        onClick={() => setIndex("ENGRAVING" === index ? null : "ENGRAVING")}
        style={{ display: isBreakPoint ? "none" : "" }}
      >
        <p>Engraving</p>
        <div className="accordion__icontxt">
          {state.currentEngrave?.leftShoe || state.currentEngrave?.rightShoe ? (
            <p className="accordion__icontxt--txt">Yes</p>
          ) : (
            <p>No</p>
          )}
        </div>
      </div>
      <div
        ref={plane}
        className={`panel colorAndMaterial customiserEngraving ${
          "ENGRAVING" === index && "padding"
        }`}
        style={{
          maxHeight:
            "ENGRAVING" === index ? `${plane?.current?.scrollHeight}px` : "0px",
          // height: isBreakPoint && `${plane?.current?.scrollHeight}px`,
        }}
      >
        <div className="engravingWrapper">
          <div className="engraving">
            <div className="engravingImage">
              <img
                style={{ height: "100%", width: "100%" }}
                src="/images/customiser/Sole-engraving.jpg"
                alt=""
              />
            </div>
            <div className="engravingTextFields">
              <div className="upperTextContainer">
                <p className="engravingUpperText">
                  Personalise it further by having engraved soles
                </p>
              </div>
              <div style={{ width: "75%" }}>
                <div className="engravingTxtFieldsContainer">
                  {engraveAdded ? (
                    <p style={{ textAlign: "center" }}> {engraveAdded} </p>
                  ) : (
                    <div className="engravingUpperTextContainer">
                      <input
                        id="left"
                        className="engravingInputLeft"
                        type="text"
                        value={leftState}
                        name="left"
                        onChange={handleLeftChange}
                        placeholder="Left Shoe (Max 14 Characters)"
                        maxLength={14}
                      />

                      <input
                        id="right"
                        className="engravingInputRight"
                        type="text"
                        value={rightState}
                        name="right"
                        onChange={handleRightChange}
                        placeholder="Right Shoe (Max 14 Characters)"
                        maxLength={14}
                      />
                    </div>
                  )}
                </div>
                <div className="engravingNoticeContainer">
                  <p
                    style={{ textAlign: "center" }}
                    className="engravingNotice"
                  >
                    NOTE: Engraved shoes can't be returned or exchanged
                  </p>
                </div>

                <div className="engravingButtons">
                  <div
                    className="button-in-center common-btn-style"
                    onClick={
                      engraveAdded ? handleUpdateEngrave : handleEngravingClick
                    }
                  >
                    <span> {engraveAdded ? "UPDATE" : "CONFIRM"} </span>
                  </div>
                  <div
                    style={{
                      border: "1px solid #000",
                    }}
                    className="button-in-center common-btn-style-alt"
                    onClick={() => {
                      setIndex("ENGRAVING" === index ? null : "ENGRAVING");
                      isBreakPoint && setOpenOption(false);
                    }}
                  >
                    <span>CANCEL</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SoleEngraving;
