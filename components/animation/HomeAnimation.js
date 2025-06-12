import { useRef, useEffect, useState } from "react";

import FirstPart from "./firstPart";
import SecondPart from "./secondPart";
// import Card from 'components/Card'

// import './style.css'

function HomeAnimation() {
  const firstPart = useRef(null);
  const secondPart = useRef(null);

  const [firstClm, setFirstClm] = useState(0);
  const [secondClm, setSecondClm] = useState(1);

  const onFirstHover = () => {
    firstPart.current.style.width = "70%";
    secondPart.current.style.width = "30%";
    secondPart.current.scrollTop = 0;

    setFirstClm((prev) => 1);
    setSecondClm((prev) => 1);
  };

  const onSecondHover = () => {
    firstPart.current.style.width = "30%";
    secondPart.current.style.width = "70%";
    firstPart.current.scrollTop = 0;
    setFirstClm((prev) => 1);
    setSecondClm((prev) => 3);
  };

  // const ScrollToTop = () => {
  //   window.scrollTo({ top: 0, behavior: "smooth" });
  // };

  return (
    <div
      className="main-container"
      style={{
        display: "flex",
        width: "100vw",
        height: "100vh",
        paddingTop: "100px",
        overflowY: "hidden",
      }}
    >
      <div
        className="first-part"
        ref={firstPart}
        onMouseOver={onFirstHover}
        style={{
          width: "70%",
          overflowY: "auto",
          borderRight: "1px solid #EBE6DF",
          padding: "0px 30px",
        }}
      >
        <FirstPart columns={firstClm} />
      </div>

      <div
        className="second-part"
        ref={secondPart}
        onMouseOver={onSecondHover}
        style={{
          width: "30%",
          overflowY: "auto",
        }}
      >
        <SecondPart columns={secondClm} />
      </div>
    </div>
  );
}

export default HomeAnimation;
