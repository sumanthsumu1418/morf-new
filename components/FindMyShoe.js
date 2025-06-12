import { useEffect } from "react";
import Head from "next/head";

const FindMyShoe = () => {
  useEffect(() => {
    $(function () {
      FmasUW.MainController.initWidget({
        parent: "fmas-parent",
        orgId: "8",
        gender: "M",
      });
    });
  }, []);
  return (
    <section>
      <div id="fmas-parent"></div>
    </section>
  );
};

export default FindMyShoe;
