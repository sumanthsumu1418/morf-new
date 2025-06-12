import { useRef } from "react";
import Head from "next/head";
import Loader from "../Loader2";
import { toast, ToastContainer, useToast } from "react-toastify";

import Header from "../shared/Header";
import Footer from "../shared/Footer";
import { useSession } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const BaseLayout = ({
  title = "",
  description = "",
  hideFooter = false,
  smooth = true,
  setShowSizeModal,
  handleSizeChartClick,
  showSizeModal,
  classes,
  ...props
}) => {
  const containerRef = useRef(null);
  const router = useRouter();

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cartSize = localStorage.getItem("cartLength");
    if (cartSize) {
      dispatch({
        type: "CART_SIZE",
        payload: cartSize,
      });
    }
  }, []);
  useEffect(() => {
    // Loading function to load data or
    const loadData = async () => {
      await new Promise((r) => setTimeout(r, 1800));

      // Toggle loading state
      setLoading((loading) => !loading);
    };

    loadData();
  }, []);
  // if (
  //   loading &&
  //   router.asPath !== "/about" &&
  //   router.asPath !== "/shipping-info?id=4" &&
  //   router.asPath !== "/shipping-info?id=3" &&
  //   router.asPath !== "/shipping-info?id=2" &&
  //   router.asPath !== "/shipping-info?id=1" &&
  //   router.asPath !== "/contact" &&
  //   router.asPath !== "/blog" &&
  //   router.asPath !== "/shoes/"
  // ) {
  //   return <Loader />;
  // } else {
  return (
    <>
      {/* <Head>
        <title> {title} </title>
        <meta charSet="utf-8" />
        <meta httpEquiv="content-language" content="eng-us" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="description" content={description} />
        <meta href="" type="image/png" />
      </Head> */}

      <Header
        setShowSizeModal={setShowSizeModal}
        handleSizeChartClick={handleSizeChartClick}
        showSizeModal={showSizeModal}
        classes={classes}
      />
      <main data-scroll-container ref={containerRef} className="mainWrapper">
        {props.children}
        {!hideFooter && <Footer />}
      </main>
    </>
  );
};
// };

export default BaseLayout;
