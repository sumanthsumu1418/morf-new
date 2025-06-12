import { useRef } from "react";

const SizeChartModal = ({
  showSizeModal,
  handleSizeChartClick,
  setShowSizeModal,
}) => {
  const modalContentRef = useRef(null);
  const handleClickOutside = (e) => {
    if (!modalContentRef?.current?.contains(e.target)) {
      setShowSizeModal(false);
    }
  };

  return (
    <div className="sizeModal" onClick={handleClickOutside}>
      <div
        ref={modalContentRef}
        className="sizeModal__content"
        style={{
          transform: showSizeModal ? "translateX(0%)" : "translateX(100%)",
        }}
      >
                <div className="sizeModal__content--close" onClick={handleSizeChartClick}>
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="26.538"
            height="26.538"
            viewBox="0 0 26.538 26.538"
          >
            <g
              id="Group_1410"
              data-name="Group 1410"
              transform="translate(13.269 -11.854) rotate(45)"
            >
              <line
                id="Line_1277"
                data-name="Line 1277"
                x2="35.53"
                transform="translate(0 17.765)"
                fill="none"
                stroke="#fff"
                strokeWidth="2"
              />
              <line
                id="Line_1278"
                data-name="Line 1278"
                x2="35.53"
                transform="translate(17.765 0) rotate(90)"
                fill="none"
                stroke="#fff"
                strokeWidth="2"
              />
            </g>
          </svg>
        </div>
        <div className="pdf-preview">
          <style>
            {`
              .pdf-preview {
                position: relative;
                width: 100%;
                height: 100%;
                overflow: hidden;
              }

              .pdf-preview iframe {
                position: absolute;
                top: -59px; 
                left: 0;
                width: 100%;
                height: calc(100% + 59px); 
                border: none;
              }
            `}
          </style>
          <iframe
            src="/pdf/MORF_size_guide.pdf"
            title="PDF Preview"
            width="100%"
            height="100%"
            frameBorder="0"
          />
        </div>
      </div>
    </div>
  );
};

export default SizeChartModal;

