import React, { useRef } from "react";
import {
  TransformWrapper,
  TransformComponent,
  getCenterPosition,
} from "react-zoom-pan-pinch";

const ImageZoom = ({ activeImageIndex, slug, onToggle }) => {
  const transformComponentRef = useRef(null);
  const contentRef = useRef(null);

  const handleClickOutside = (e) => {
    if (!contentRef?.current?.contains(e.target)) {
      onToggle();
    }
  };

  const Controls = ({ zoomIn, zoomOut, resetTransform }) => (
    <>
      <button onClick={() => zoomIn()}>
        <span>ZOOM IN</span>
      </button>
      <button onClick={() => zoomOut()}>
        <span>ZOOM OUT</span>
      </button>
      <button onClick={() => resetTransform()}>
        <span>RESET</span>
      </button>
    </>
  );

  return (
    <div onClick={handleClickOutside} className="ImageZoom">
      <div ref={contentRef} className="ImageZoom__content">
        <div className="ImageZoomClose" onClick={onToggle}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32.719"
            height="32.719"
            viewBox="0 0 32.719 32.719"
          >
            <g
              id="Group_1410"
              data-name="Group 1410"
              transform="translate(16.359 -14.945) rotate(45)"
            >
              <line
                id="Line_1277"
                data-name="Line 1277"
                x2="44.271"
                transform="translate(0 22.135)"
                fill="none"
                stroke="#000"
                strokeWidth="2"
              />
              <line
                id="Line_1278"
                data-name="Line 1278"
                x2="44.271"
                transform="translate(22.135 0) rotate(90)"
                fill="none"
                stroke="#000"
                strokeWidth="2"
              />
            </g>
          </svg>
        </div>

        <div style={{ width: "100%", height: "100%" }}>
          <TransformWrapper
            // initialScale={1}
            // initialPositionX={100}
            // initialPositionY={100}
            ref={transformComponentRef}
          >
            {(utils) => (
              <React.Fragment>
                <div className="ImageZoomControls">
                  <Controls {...utils} />
                </div>

                <TransformComponent>
                  <img
                    src={`${process.env.NEXT_PUBLIC_PRODUCTIMAGES}/images/${slug}/product-page/${activeImageIndex}.jpg`}
                    alt="test"
                    id="imgExample"
                  />
                </TransformComponent>
              </React.Fragment>
            )}
          </TransformWrapper>
        </div>
      </div>
    </div>
  );
};

export default ImageZoom;
