import { useRef, useState ,useEffect} from "react";
import useMediaQuery from "../../hooks/useMediaQuery";
import BaseLayout from "@/components/layout/BaseLayout";
import classes from "./size.module.scss"
import SizeChartModal from "../shared/SizeChartModal";
const sizeData = [
  { id: 0, name: "UK 5", value: "uk5" },
  { id: 1, name: "UK 6", value: "uk6" },
  { id: 2, name: "UK 6.5", value: "uk6.5" },
  { id: 3, name: "UK 7", value: "uk7" },
  { id: 4, name: "UK 7.5", value: "uk7.5" },
  { id: 5, name: "UK 8", value: "uk8" },
  { id: 6, name: "UK 8.5", value: "uk8.5" },
  { id: 7, name: "UK 9", value: "uk9" },
  { id: 8, name: "UK 9.5", value: "uk9.5" },
  { id: 9, name: "UK 10", value: "uk10" },
  { id: 10, name: "UK 10.5", value: "uk10.5" },
  { id: 11, name: "UK 11", value: "uk11" },
  { id: 12, name: "UK 11.5", value: "uk11.5" },
  { id: 13, name: "UK 12", value: "uk12" },
  { id: 14, name: "UK 13", value: "uk13" },
  { id: 15, name: "UK 14", value: "uk14" },
];

const Size = ({
  index,
  setIndex,
  state,
  handleSizeClick,
  SizeError,

}) => {
  const plane = useRef(null);

  const isBreakPoint = useMediaQuery(1024);
  const [showSizeModal, setShowSizeModal] = useState(false);
  useEffect(() => {
    if (showSizeModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [showSizeModal]);
  const handleSizeChartClick = () => setShowSizeModal((prev) => !prev);
  return (
    <div className="accordionWrapper">
        <div style={{display:showSizeModal ?"":"none"}}>
            <SizeChartModal handleSizeChartClick={handleSizeChartClick} classes={classes} showSizeModal={showSizeModal} setShowSizeModal={setShowSizeModal}/>
            </div>
      <div
        className={`accordion ${
          !state.currentSize.name && SizeError && "redBorder"
        }`}
        onClick={() => setIndex("SIZE" === index ? null : "SIZE")}
        style={{ display: isBreakPoint ? "none" : "" }}
      >
        <p>Size</p>
        <div className="accordion__icontxt">
          {state.currentSize.name ? (
            <p className="accordion__icontxt--txt">{state.currentSize.name}</p>
          ) : (
            <p className="accordion__icontxt--txt" style={{ color: "#646464" }}>
              Select Size
            </p>
          )}
        </div>
      </div>
      <div
        ref={plane}
        className={`panel Size ${"SIZE" === index && "padding"}`}
        style={{
          maxHeight:
            "SIZE" === index || isBreakPoint
              ? `${plane?.current?.scrollHeight}px`
              : "0px",
        }}
      >
        <div className="panelSizes">
          {sizeData.map((e) => {
            return (
              <div
                key={e.id}
                className="panelSizeContainer"
                style={{
                  backgroundColor:
                    state.currentSize.size === e.value ? "#570707" : "",
                }}
                onClick={() => {
                  handleSizeClick(e.value, e.name);
                  setIndex(null);
                }}
              >
                <div className="panelSizeMainContainer">
                  <div
                    className="panelSizeMain"
                    style={{
                      color: state.currentSize.size === e.value ? "#fff" : "",
                    }}
                  >
                    {e.name}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* {isBreakPoint && SizeError && (
          <div className="sizeTxt">
            <p
              style={{ marginLeft: "0", color: "red" }}
              className="sizeFitFind"
            >
              Please select your size
            </p>
          </div>
        )} */}

        <div className="sizeTxt">
          <p>Not Sure About Your Size?</p>
          <div
          // onClick={() => setShowModalSize(false)}
          >
            <p className="sizeFitFind" style={{cursor:"pointer"}}  onClick={handleSizeChartClick}>Size Chart</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Size;
