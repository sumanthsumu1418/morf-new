import React from "react";

const Textlabel = ({ text, removeCategory }) => {
  return (
    <div className="text_label" onClick={(e) => removeCategory(text)}>
      {text == "All" ? <span>{text}</span> : <span>&#10006; {text}</span>}
    </div>
  );
};

export default Textlabel;
