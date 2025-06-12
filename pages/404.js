import Button from "@/components/Button";
import useMediaQuery from "hooks/useMediaQuery";
import { useRouter } from "next/router";
import { useRef, useState, useEffect } from "react";
import SEO from "@/components/layout/SEO";

const FourOFour = () => {
  const [hostname, setHostname] = useState("");
  const router = useRouter();
  const ref = useRef(null);
  const [imageSrc, setImageSrc] = useState(
    "/images/error-image-laptop-desktop.jpg"
  );

  const isMobileBreakPoint = useMediaQuery(600);
  const isIpadBreakPoint = useMediaQuery(1024);

  useEffect(() => {
    if (isIpadBreakPoint) {
      setImageSrc("/images/error-image-ipad.jpg");
    }

    if (isMobileBreakPoint) {
      setImageSrc("/images/error-image-mobile.jpg");
    }
  }, [isMobileBreakPoint, isIpadBreakPoint]);
  useEffect(() => {
    if (typeof window !== "undefined") {
      setHostname(window?.location?.href);
    }
  }, []);
  const backToHome = () => {
    router.push("/");
  };

  return (
    <>
      <SEO
        title="404 - MORF"
        desc="Morf"
        pageUrl={hostname}
        ogImage="/images/og_img.png"
      />
      <div ref={ref} className="fourOFour">
        <img src={imageSrc} alt="" />

        <div className="fourOFour-footer">
          <p className="fourOFour-footer-tagLine">OOPS… YOU’RE LOST!</p>

          <Button
            onClick={backToHome}
            className="backToHome"
            action="Back To Home"
          />
        </div>
      </div>
    </>
  );
};

export default FourOFour;
