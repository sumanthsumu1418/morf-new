import { useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Button from "components/Button";
import { TweenMax, TimelineMax } from "gsap";
import { ScrollMagicPluginGsap } from "scrollmagic-plugin-gsap";
import useMediaQuery from "hooks/useMediaQuery";

const MorfJourney = () => {
  const morfRef = useRef(null);
  const morfRef2 = useRef(null);
  const journeyRef = useRef(null);
  const journeyRef2 = useRef(null);
  const isMobileBreakPoint = useMediaQuery(600);

  const router = useRouter();
  const blogPage = () => {
    router.push("/blog");
  };

  useEffect(() => {
    const Scrollmagic = require("scrollmagic");
    ScrollMagicPluginGsap(Scrollmagic, TweenMax, TimelineMax);

    const controller = new Scrollmagic.Controller();

    // Timeline

    const morfTimeline = new TimelineMax().fromTo(
      morfRef.current,
      { x: "0%" },
      { x: `${isMobileBreakPoint ? "250%" : "50%"}`, duration: 5 }
    );

    // Scene

    const morfScene = new Scrollmagic.Scene({
      triggerElement: morfRef.current,
      triggerHook: "onEnter",
      duration: "400%",
    })
      .setTween(morfTimeline)
      .addTo(controller);

    // morf2 Timeline
    const morfTimeline2 = new TimelineMax().fromTo(
      morfRef2.current,
      { x: "0%" },
      { x: `${isMobileBreakPoint ? "100%" : "50%"}`, duration: 5 }
    );

    // Scene

    const morfScene2 = new Scrollmagic.Scene({
      triggerElement: morfRef2.current,
      triggerHook: "onEnter",
      duration: "400%",
    })
      .setTween(morfTimeline2)
      .addTo(controller);

    // second Timeline
    const journeyTimeline = new TimelineMax().fromTo(
      journeyRef.current,
      { x: "0%" },
      { x: `${isMobileBreakPoint ? "-200%" : "-50%"}`, duration: 5 }
    );

    // Scene

    const journeyScene = new Scrollmagic.Scene({
      triggerElement: journeyRef.current,
      triggerHook: "onEnter",
      duration: "400%",
    })
      .setTween(journeyTimeline)
      .addTo(controller);

    // Journey2 Timeline

    const journeyTimeline2 = new TimelineMax().fromTo(
      journeyRef2.current,
      { x: "0%" },
      { x: `${isMobileBreakPoint ? "-100%" : "-50%"}`, duration: 5 }
    );

    // Scene

    const journeyScene2 = new Scrollmagic.Scene({
      triggerElement: journeyRef2.current,
      triggerHook: "onEnter",
      duration: "400%",
    })
      .setTween(journeyTimeline2)
      .addTo(controller);

    return () => {
      morfScene.destroy(true);
      morfScene2.destroy(true);
      journeyScene.destroy(true);
      journeyScene2.destroy(true);
    };
  }, []);

  return (
    <div className="morfJourney">
      <div className="morfJourney-items">
        <div className="weekly-inspiration-text">
          <p> Dummy Title </p>
        </div>
        <div className="vr-line"></div>

        <Link href="/blog" passHref>
          <a className="weekly-inspiration-image">
            <div
              style={{ overflow: "hidden", zIndex: 5, position: "relative" }}
            >
              <img src="/images/morf_journey.jpg" alt="" />

              <h2 ref={morfRef} className="morf1" style={{ color: "white" }}>
                Dummy Heading One
              </h2>
              <h2
                ref={journeyRef}
                className="journey1"
                style={{ color: "white" }}
              >
                Dummy Heading Two
              </h2>
            </div>
            <h2 ref={morfRef2} className="morf1" style={{ color: "black" }}>
              Dummy Heading One
            </h2>
            <h2
              ref={journeyRef2}
              className="journey1"
              style={{ color: "black" }}
            >
              Dummy Heading Two
            </h2>
          </a>
        </Link>

        <Button
          onClick={blogPage}
          className="morfJourney__Button"
          action="Read the Blog"
        />
      </div>
    </div>
  );
};

export default MorfJourney;
