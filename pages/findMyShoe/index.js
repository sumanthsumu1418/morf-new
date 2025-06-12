import Head from "next/head";
import dynamic from "next/dynamic";
// import FindMyShoe from "components/FindMyShoe";

const FindMyShoe = dynamic(() => import("../../components/FindMyShoe"), {
  ssr: false,
});

const App = () => {
  return (
    <>
      <Head>
        <link
          href="https://cdnfmas.s3-accelerate.amazonaws.com/assets-g-20190228/web/fmas-s2s-latest-min.css"
          title="uwstyle"
          type="text/css"
          rel="stylesheet"
          media="all"
        />

        <link
          href="https://cdnfmas.s3-accelerate.amazonaws.com/assets-g-20190228/web/fmas-universal-widget-latest-min.css"
          type="text/css"
          rel="stylesheet"
          media="all"
        />

        <script
          src="https://cdnfmas.s3-accelerate.amazonaws.com/assets-g-20190228/web/jquery.min.js"
          type="text/javascript"
        ></script>

        <script
          src="https://cdnfmas.s3-accelerate.amazonaws.com/assets-g-20190228/web/md5.js"
          type="text/javascript"
        ></script>

        <script
          src="https://cdnfmas.s3-accelerate.amazonaws.com/assets-g-20190228/web/fmas-universal-widget-latest-min.js"
          type="text/javascript"
        ></script>
      </Head>
      <div>
        <FindMyShoe />
        <style jsx>
          {`
            // FMA

            #fmas-parent,
            #fmas-parent *,
            #fmas-parent *:before,
            #fmas-parent *:after {
              -webkit-box-sizing: content-box !important;
              -moz-box-sizing: content-box !important;
              box-sizing: content-box !important;
            }
          `}
        </style>
      </div>
    </>
  );
};

export default App;
