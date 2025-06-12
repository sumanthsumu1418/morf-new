import { useState, useEffect, useRef } from "react";
import BaseLayout from "@/components/layout/BaseLayout";
import SEO from "@/components/layout/SEO";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import LoaderForComponent from "uitlity/loaderForComponent";

const About = () => {
  const textRef = useRef(null);
  const scarabRef = useRef(null);
  const [hostname, setHostname] = useState("");
  // Dummy data for about page
  const [aboutData] = useState({
    attributes: {
      about_firstSec_text1: "About MORF",
      about_firstSec_text2: "Crafted for you",
      about_firstSec_text3: "Discover our story.",
      about_firstSec_image: { data: { attributes: { url: "/images/og_img.png" } } },
      about_secondSec_image: { data: { attributes: { url: "/images/og_img.png" } } },
      about_secondSec_logo: { data: { attributes: { url: "/images/og_img.png" } } },
      about_secondSec_title: "Our Mission",
      about_secondSec_description: "We are dedicated to quality and style.",
      about_thirdSec_title: "Core Features",
      about_thirdSec_description: "What makes us unique.",
      about_fourthSec_banner: { data: { attributes: { url: "/images/og_img.png" } } },
      about_fifthSec_title: "Craftsmanship",
      about_fifthSec_subtitle: "Tradition meets innovation.",
      about_fifthSec_description: "Handcrafted excellence in every pair.",
    },
  });
  const [coreFeatures] = useState([
    { id: 1, title: "Premium Materials", description: "Only the best for you.", image: { data: { attributes: { url: "/images/og_img.png" } } } },
    { id: 2, title: "Expert Craftsmanship", description: "Attention to every detail.", image: { data: { attributes: { url: "/images/og_img.png" } } } },
  ]);
  const [craftsItems] = useState([
    { id: 1, title: "Hand Stitched", description: "Each pair is hand stitched.", image: { data: { attributes: { url: "/images/og_img.png" } } } },
    { id: 2, title: "Custom Fit", description: "Made to fit you perfectly.", image: { data: { attributes: { url: "/images/og_img.png" } } } },
  ]);
  const [loading] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setHostname(window?.location?.href);
    }

    gsap.registerPlugin(ScrollTrigger);
    let pinSpacer = 100;
    if (window.innerWidth < 1600) {
      pinSpacer = 80;
    }
    if (window.innerWidth < 600) {
      pinSpacer = 60;
    }
    gsap.set("aboutPanel", { autoAlpha: 0 });
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#pin-section",
        pin: true,
        scrub: 1,
        start: `top ${pinSpacer}px`,
        end: "+=1500",
      },
    });
    tl.to(".aboutSecOne", { autoAlpha: 1, duration: 0.2 })
      .to(".firstSecText span", {
        backgroundPositionX: "0%",
        stagger: 0.2,
        duration: 0.2,
      })
      .to(".aboutSecOne", { autoAlpha: 0, duration: 0.5 })
      .to({}, { autoAlpha: 0.5, duration: 0.1 }) // a little pause in between
      .to(".aboutSecTwo", { autoAlpha: 1, duration: 0.3 });

    gsap.to(".aboutSecThree", {
      yPercent: -60,
      scrollTrigger: {
        trigger: ".aboutSecThree",
        scrub: true,
      },
    });
  }, []);

  return (
    <>
      <SEO title="ABOUT - MORF" desc="MORF" pageUrl={hostname} />
      <BaseLayout>
        <div id="pin-section" className="pinSection">
          <section ref={textRef} className="aboutPanel aboutSecOne">
            <div className="aboutSecOne__content container">
              <div className="firstSecContent">
                <div className="firstSecText">
                  <span>{aboutData?.attributes?.about_firstSec_text1}</span>
                  <span> {aboutData?.attributes?.about_firstSec_text2} </span>
                  <span>{aboutData?.attributes?.about_firstSec_text3}</span>
                </div>
              </div>
              <div className="firstSecImg">
                <img
                  src={aboutData?.attributes?.about_firstSec_image?.data?.attributes?.url || "/images/og_img.png"}
                  alt=""
                />
              </div>
            </div>
          </section>

          <section ref={scarabRef} className="aboutPanel aboutSecTwo">
            <div className="aboutSecTwo--bgImage">
              <img
                src={aboutData?.attributes?.about_secondSec_image?.data?.attributes?.url || "/images/og_img.png"}
                alt=""
              />
            </div>

            <div className="aboutSecTwo__content container">
              <div className="secondSecImage">
                <img
                  src={aboutData?.attributes?.about_secondSec_logo?.data?.attributes?.url || "/images/og_img.png"}
                  alt=""
                />
              </div>
              <div className="secondSecLine"></div>
              <h2 className="secondSecTitle">
                {aboutData?.attributes?.about_secondSec_title}
              </h2>
              <p className="secondSecDesc">
                {aboutData?.attributes?.about_secondSec_description}
              </p>
            </div>
          </section>
        </div>

        <section className="aboutSecThree">
          <div className="aboutSecThree__content container">
            <h2 className="thirdSecTitle">
              {aboutData?.attributes?.about_thirdSec_title}
            </h2>
            <p className="thirdSecDesc">
              {aboutData?.attributes?.about_thirdSec_description}
            </p>
            <div className="thirdSecItems">
              {coreFeatures?.map((item) => {
                return (
                  <div key={item.id} className="thirdSecItems__item">
                    <h3 className="itemTitle"> {item?.title} </h3>
                    <p className="itemDesc">{item?.description}</p>
                    <img
                      src={item?.image?.data?.attributes?.url || "/images/og_img.png"}
                      alt={item?.title}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="beforefourthSec" style={{ marginTop: "-25%" }}>
          <img
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center",
            }}
            src={aboutData?.attributes?.about_fourthSec_banner?.data?.attributes?.url || "/images/og_img.png"}
            alt="img"
          />
        </section>

        <section className="aboutSecFour">
          <div className="aboutSecFour__HeadingContainer container">
            <div className="aboutSecFour__HeadingContainer--First">
              <p className="aboutSecFour__HeadingContainer--First--Heading">
                {aboutData?.attributes?.about_fifthSec_title}
              </p>
              <p className="aboutSecFour__HeadingContainer--First--SubHeading">
                {aboutData?.attributes?.about_fifthSec_subtitle}
              </p>
            </div>

            <div className="aboutSecFour__HeadingContainer--Second">
              <p>{aboutData?.attributes?.about_fifthSec_description}</p>
            </div>
          </div>

          <div className="aboutSecFour__CardsContainer">
            <div className="aboutSecFour__CardsContainer--Left">
              <div className="aboutSecFour__CardsContainer--Left--Cards">
                {craftsItems?.map((item) => {
                  return (
                    <div
                      key={item.id}
                      className="aboutSecFour__CardsContainer--Left--Cards--One"
                    >
                      <img
                        src={item?.image?.data?.attributes?.url || "/images/og_img.png"}
                        alt={item?.title}
                      />
                      <div className="aboutSecFour__CardsContainer--Left--Cards--One--TextContainer">
                        <p className="aboutSecFour__CardsContainer--Left--Cards--One--TextContainer--Heading">
                          {item?.title}
                        </p>
                        <p className="aboutSecFour__CardsContainer--Left--Cards--One--TextContainer--Text">
                          {item?.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
        <LoaderForComponent />
      </BaseLayout>
    </>
  );
};

export default About;
