import { useState, useEffect } from "react";
import Link from "next/link";

const RightFit = () => {
  const [activeImage, setActiveImage] = useState("/images/rightfit_step1.jpg");
  const [slideIndex, setSlideIndex] = useState(0);
  const [steps, setSteps] = useState("step1");
  const [pointerIndex, setPointerIndex] = useState({
    one: true,
    two: false,
    three: false,
    four: false,
  });

  // Dummy images for each step
  const stepImages = {
    step1: "/images/rightfit_step1.jpg",
    step2: "/images/rightfit_step2.jpg",
    step3: "/images/rightfit_step3.jpg",
    step4: "/images/rightfit_step4.jpg",
  };

  useEffect(() => {
    setActiveImage(stepImages[steps]);
    if (steps == "step1") {
      setSlideIndex(-0.2);
      setPointerIndex({ one: true, two: false, three: false, four: false });
    } else if (steps == "step2") {
      setSlideIndex(1);
      setPointerIndex({ one: true, two: true, three: false, four: false });
    } else if (steps == "step3") {
      setSlideIndex(2.2);
      setPointerIndex({ one: true, two: true, three: true, four: false });
    } else if (steps == "step4") {
      setSlideIndex(3);
      setPointerIndex({ one: true, two: true, three: true, four: true });
    }
  }, [steps]);

  const handlePrevClick = () => {
    if (steps == "step1") {
      setSteps("step4");
    } else if (steps == "step2") {
      setSteps("step1");
    } else if (steps == "step3") {
      setSteps("step2");
    } else if (steps == "step4") {
      setSteps("step3");
    }
  };

  const handleNextClick = () => {
    if (steps == "step1") {
      setSteps("step2");
    } else if (steps == "step2") {
      setSteps("step3");
    } else if (steps == "step3") {
      setSteps("step4");
    } else if (steps == "step4") {
      setSteps("step1");
    }
  };

  let stepHeight = 100 / 4;

  return (
    <div>
      <div className="thirdSec_content">
        <div className="thirdSec_content_left">
          <h2 className="thirdSec_content_left_heading">Right Fit Title</h2>
          <h3 className="thirdSec_content_left_subheading">
            Right Fit Subtitle
          </h3>

          <p className="thirdSec_content_left_description">
            This is a description for the right fit guide. Follow the steps to
            find your right fit.
          </p>
          <div className="thirdSec_content_left_insts">
            <div className="stepPointers">
              <div className="stepPointers__emptyPipe">
                <div
                  style={{ height: `${stepHeight * (slideIndex + 1)}%` }}
                  className="filledPipe"
                ></div>

                <div className="pointerItems">
                  <span
                    onClick={() => setSteps("step1")}
                    className="pointerItems__circle"
                  >
                    <span
                      style={{
                        transform:
                          pointerIndex.one === true
                            ? "translateY(0)"
                            : "translateY(-100%)",
                      }}
                    ></span>
                  </span>
                  <span
                    onClick={() => setSteps("step2")}
                    className="pointerItems__circle"
                  >
                    <span
                      style={{
                        transform:
                          pointerIndex.two === true
                            ? "translateY(0)"
                            : "translateY(-100%)",
                      }}
                    ></span>
                  </span>
                  <span
                    onClick={() => setSteps("step3")}
                    className="pointerItems__circle"
                  >
                    <span
                      style={{
                        transform:
                          pointerIndex.three === true
                            ? "translateY(0)"
                            : "translateY(-100%)",
                      }}
                    ></span>
                  </span>
                  <span
                    onClick={() => setSteps("step4")}
                    className="pointerItems__circle"
                  >
                    <span
                      style={{
                        transform:
                          pointerIndex.four === true
                            ? "translateY(0)"
                            : "translateY(-100%)",
                      }}
                    ></span>
                  </span>
                </div>
              </div>
            </div>

            <ul className="thirdSec_content_left_insts_ulist">
              <li onClick={() => setSteps("step1")}>Step 1: Measure Yourself</li>
              <li onClick={() => setSteps("step2")}>Step 2: Choose a Fit</li>
              <li onClick={() => setSteps("step3")}>Step 3: Select Size</li>
              <li onClick={() => setSteps("step4")}>Step 4: Review & Adjust</li>
            </ul>
          </div>

          <Link href="/" passHref>
            <a className={`common-btn-style findYourFit`}>
              <span> Find Your Fit </span>
            </a>
          </Link>
        </div>

        <div className="thirdSec_content_right">
          <img src={activeImage} alt="" />
          <div className="buttonOnImage">
            <span className="buttonOnImage__left" onClick={handlePrevClick}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20.832"
                height="38.027"
                viewBox="0 0 20.832 38.027"
              >
                <path
                  id="Path_1035"
                  data-name="Path 1035"
                  d="M-5551.47-6061.2l17.988,17.539L-5551.47-6026"
                  transform="translate(5552.884 6062.611)"
                  fill="none"
                  stroke="#000"
                  stroke-linecap="round"
                  stroke-width="2"
                ></path>
              </svg>
            </span>
            <span className="buttonOnImage__right" onClick={handleNextClick}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20.832"
                height="38.027"
                viewBox="0 0 20.832 38.027"
              >
                <path
                  id="Path_1035"
                  data-name="Path 1035"
                  d="M-5551.47-6061.2l17.988,17.539L-5551.47-6026"
                  transform="translate(5552.884 6062.611)"
                  fill="none"
                  stroke="#000"
                  stroke-linecap="round"
                  stroke-width="2"
                ></path>
              </svg>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightFit;
