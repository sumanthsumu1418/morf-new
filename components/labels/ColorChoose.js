import React from "react";

const ColorChoose = ({ color, setSelectedColor, currColor }) => {
  return (
    <div
      style={{ backgroundColor: color ? color : "white" }}
      onClick={() => setSelectedColor(color)}
      className={`colorChoose ${currColor == color ? "selectedColor" : ""}`}
    ></div>
  );
};

export default ColorChoose;
