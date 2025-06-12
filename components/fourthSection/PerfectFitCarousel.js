import { useRef, useState } from "react";
import Button from "components/Button";
import Slider from "react-slick";

const carouselData = [
  {
    id: 1,
    title: "Find Your Perfect Fit",
    desc: "We use a 3D measurement tool designed for you to virtually find your perfect footwear size from the comfort of your home. A first of its kind, this brand new technology means you get sneakers guaranteed to fit. Sixty percent of people are wearing the wrong size and you don’t have to be one of them. So give it a try!",
    img: "/images/homepageImg/hand.svg",
  },

  {
    id: 2,
    title: "Find Your Perfect Fit",
    desc: "We use a 3D measurement tool designed for you to virtually find your perfect footwear size from the comfort of your home. A first of its kind, this brand new technology means you get sneakers guaranteed to fit. Sixty percent of people are wearing the wrong size and you don’t have to be one of them. So give it a try!",
    img: "/images/homepageImg/hand.svg",
  },

  {
    id: 3,
    title: "Find Your Perfect Fit",
    desc: "We use a 3D measurement tool designed for you to virtually find your perfect footwear size from the comfort of your home. A first of its kind, this brand new technology means you get sneakers guaranteed to fit. Sixty percent of people are wearing the wrong size and you don’t have to be one of them. So give it a try!",
    img: "/images/homepageImg/hand.svg",
  },
];
const settings = {
  dots: false,
  arrows: false,
  infinite: false,
  speed: 1000,
  slidesToShow: 1,
  slidesToScroll: 1,
  initialSlide: 0,

  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        dots: false,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        speed: 200,
        dots: true,
        // initialSlide: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        speed: 200,
        dots: true,
        slidesToScroll: 1,
      },
    },
  ],
};

const PerfectFitCarousel = (props) => {
  const sliderRef = useRef(null);

  // const [currentText, setCurrentText] = useState(carouselData[0].id);

  const { className } = props;

  return (
    <>
      <div className="perfectFitCarousel">
        <Slider ref={sliderRef} {...settings}>
          {carouselData.map((cd) => {
            return (
              <div key={cd.id} className="carouselItem">
                <div className="carouselImage">
                  <img src={cd.img} alt="" />
                </div>

                <div className="carouselIntro">
                  <h3 className="carouselIntro-title">
                    <span> {cd.title} </span>{" "}
                  </h3>
                  <p className="carouselIntro-desc"> {cd.desc} </p>
                  <Button
                    action="Find Your Fit"
                    className="carouselIntro-btn"
                  />
                </div>
              </div>
            );
          })}
        </Slider>
        <div className="perfectFitArrows">
          <div
            className="leftArrow"
            onClick={() => sliderRef.current.slickPrev()}
          >
            <img src="/icons/left-arrow.svg" alt="" />
          </div>

          <div
            className="rightArrow"
            onClick={() => sliderRef.current.slickNext()}
          >
            <img src="/icons/right-arrow.svg" />
          </div>
        </div>
      </div>
    </>
  );
};

export default PerfectFitCarousel;
