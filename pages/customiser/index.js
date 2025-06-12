import dynamic from "next/dynamic";
import CustomiserHeader from "components/shared/customiserHeader";
import { useEffect, useState } from "react";
import SEO from "@/components/layout/SEO";
import { useRouter } from "next/router";

const Canvas = dynamic(() => import("components/customiser"), {
  ssr: false,
});

const Customiser = () => {
  const [hostname, setHostname] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      setHostname(window?.location?.href);
    }
  }, []);

  // useEffect(() => {
  //   if (router.pathname === "/") {
  //     window.location.reload();
  //   } else if (router.pathname === "/customiser") {
  //     const styleElement = document.createElement("style");
  //     styleElement.innerHTML = `
  //       .footer {
  //         display: none;
  //       }
  //       .header-container {
  //         display: none;
  //       }
  //       .mainWrapper {
  //         padding-top: 0px;
  //       }
  //     `;
  //     document.head.appendChild(styleElement);
  //   } else {
  //     const styleElement = document.querySelector("#customiser-page-style");
  //     if (styleElement) {
  //       document.head.removeChild(styleElement);
  //     }
  //   }
  // }, [router.pathname]);

  return (
    <>
      {" "}
      <SEO
        title="CUSTOMISER - MORF"
        desc="Morf"
        pageUrl={hostname}
        ogImage="/images/og_img.png"
      />
      <section className="customiserSection">
        {/* <CustomiserHeader /> */}
        <Canvas />
      </section>
    </>
  );
};

export default Customiser;
