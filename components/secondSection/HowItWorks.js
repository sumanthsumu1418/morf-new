import { useRouter } from "next/router";
import Button from "components/Button";
import Link from "next/link";
import useMediaQuery from "hooks/useMediaQuery";
import Slider from "react-slick";

const HowItWorks = () => {
  const isBreakPoint = useMediaQuery(1024);
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  // Dummy data for steps
  const steps = [
    {
      img: "/images/howitworks1.jpg",
      stepIcon: "/icons/step_1.svg",
      text: "Choose your style",
    },
    {
      img: "/images/howitworks2.jpg",
      stepIcon: "/icons/step_2.svg",
      text: "Customize your fit",
    },
    {
      img: "/images/howitworks3.jpg",
      stepIcon: "/icons/step_3.svg",
      text: "Place your order",
    },
  ];
  return (
    <div className={`how-it-works ${!isBreakPoint && "container"} `}>
      <div className="how-it-works-title">
        <h1>How It Works</h1>
        <Link href="/customiser">
          <a className={`common-btn-style designYours`}>
            <span>Design Yours</span>
          </a>
        </Link>
      </div>
      {isBreakPoint ? (
        <div className="how-it-works-images-mob">
          {steps.map((step, idx) => (
            <div className="how-it-works-firstContainer" key={idx}>
              <Link href="/customiser">
                <img
                  className="firstStepImg"
                  style={{ width: "100%" }}
                  src={step.img}
                  alt=""
                />
              </Link>
              <div className="how-it-works-images-first-step1">
                <Link href="/customiser">
                  <img
                    className="how-it-works-images-first-step1-svg"
                    src={step.stepIcon}
                    alt=""
                  />
                </Link>
                <p className="how-it-works-images-first-step1-para">
                  {step.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="how-it-works-images-desktop">
          {steps.map((step, idx) => (
            <div className="how-it-works-firstContainer" key={idx}>
              <Link href="/customiser">
                <img
                  className="firstStepImg"
                  style={{ width: "100%" }}
                  src={step.img}
                  alt=""
                />
              </Link>
              <div className="how-it-works-images-first-step1">
                <Link href="/customiser">
                  <img
                    className="how-it-works-images-first-step1-svg"
                    src={step.stepIcon}
                    alt=""
                  />
                </Link>
                <p className="how-it-works-images-first-step1-para">
                  {step.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HowItWorks;
