import { useRef } from "react";
import dynamic from "next/dynamic";

import CustomizeCard from "@/components/shopCollection/CustomizeCard";
import HowItWorks from "../secondSection/HowItWorks";
import VideoSec from "../thirdSection/VideoSec";
import PerfectFit from "../fourthSection/PerfectFit";
import Design from "components/fifthSection/Design";
import Footer from "components/shared/Footer";

const HomeCustomizer = dynamic(
  () => import("components/homePage/homeCustomiser"),
  { ssr: false }
);

// const { default: CustomizeCard } = require("../shopCollection/CustomizeCard");

function FirstPart({ columns }) {
  return (
    <>
      <div className="list first">
        <h1 className="customise-heading">Customise</h1>
        {/* <CustomizeCard /> */}
        <HomeCustomizer />
      </div>

      <HowItWorks />

      <VideoSec />

      <PerfectFit />

      <Design />

      <Footer />
    </>
  );
}

export default FirstPart;
