import { useState, useEffect } from "react";
import BaseLayout from "@/components/layout/BaseLayout";
import Accordion from "@/components/shipping/Accordion";
import { TimelineMax, Power3 } from "gsap";
import { useRouter } from "next/router";
import SEO from "@/components/layout/SEO";


const ShippingInfo = () => {
  const [hostname, setHostname] = useState("");
  const [accIndex, setAccIndex] = useState(null);
  const [accIndex2, setAccIndex2] = useState(null);
  const [accIndex3, setAccIndex3] = useState(null);
  const [accIndex4, setAccIndex4] = useState(null);
  const [accIndex5, setAccIndex5] = useState(null);
  const router = useRouter();
  const shippingInfo = router?.query?.id;

  function animation() {
    var shipping = new TimelineMax();

    shipping.fromTo(
      ".shippingOver",
      1.4,
      { scaleX: 1, transformOrigin: "right", ease: Power3.easeOut },
      { scaleX: 0 },
      0.5
    );
  }

  useEffect(() => {
    animation();
    if (typeof window !== "undefined") {
      setHostname(window?.location?.href);
    }
  }, []);

  return (
    <>
      <SEO
        title="SHIPPING-INFO - MORF"
        desc="Morf"
        pageUrl={hostname}
        ogImage="/images/og_img.png"
      />

      <BaseLayout>
        <div className="container">
          <div className="shippingInfo">
            <h1 className="shippingInfo-title"> Support </h1>

            <div className="accordion">
              {/* {shippingData.map((d, index) => { */}
                {/* return ( */}
                  {/* <div key={d.id}> */}
                    <Accordion
                      // {...d}
                      index={accIndex}
                      index2={accIndex2}
                      index3={accIndex3}
                      index4={accIndex4}
                      index5={accIndex5}
                      setIndex2={setAccIndex2}
                      setIndex3={setAccIndex3}
                      setIndex4={setAccIndex4}
                      setIndex5={setAccIndex5}
                      setIndex={setAccIndex}
                      shippingInfo={shippingInfo}
                    />
                  {/* </div> */}
                {/* ); */}
              {/* })} */}
            </div>
            <div className="shippingOver"> </div>
          </div>
        </div>
      </BaseLayout>
    </>
  );
};

export default ShippingInfo;
