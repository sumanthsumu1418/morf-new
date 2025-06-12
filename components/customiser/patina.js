import useMediaQuery from "hooks/useMediaQuery";
import { useEffect, useRef } from "react";

const Patina = ({
  state,
  index,
  setIndex,
  handlePatinaClick,
  setModelHeight,
  modelHeight,
  openOption,
}) => {
  const plane = useRef(null);

  const isBreakPoint = useMediaQuery(600);

  return (
    <div className="patinaWrapper" ref={plane}>
      <div className="patinaWrapper__patina">
        <div
          className="withoutPatina"
          onClick={() => handlePatinaClick("without_patina")}
          style={{
            border:
              state.currentPatina === "without_patina"
                ? "1px solid #c8b8a0"
                : "1px solid transparent",
          }}
        >
          <img src="/images/customiser/Without_Patina.jpg" alt="" />
          <p
            style={{
              backgroundColor:
                state.currentPatina === "without_patina"
                  ? "#dbd6d4"
                  : "transparent",
            }}
          >
            Without Patina
          </p>
        </div>

        <div
          className="withoutPatina"
          onClick={() => handlePatinaClick("with_patina")}
          style={{
            border:
              state.currentPatina === "with_patina"
                ? "1px solid #c8b8a0"
                : "1px solid transparent",
          }}
        >
          <img src="/images/customiser/With_Patina.jpg" alt="" />
          <p
            style={{
              backgroundColor:
                state.currentPatina === "with_patina"
                  ? "#dbd6d4"
                  : "transparent",
            }}
          >
            With Patina <br /> + ₹1,500/-
          </p>
        </div>
      </div>

      <p className="patinaWrapper__text">
        *Patina is lustrous hand-painted look with burnished highlights.
      </p>
    </div>
  );
};

export default Patina;
