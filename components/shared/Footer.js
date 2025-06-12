import { useRef, useEffect } from "react";

import Link from "next/link";
import { TweenMax, TimelineMax, Power3 } from "gsap";
import LoginModal from "./LoginModal";
import { ScrollMagicPluginGsap } from "scrollmagic-plugin-gsap";
import Button from "../Button";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import {
  FacebookShareButton,
  WhatsappShareButton,
  WhatsappIcon,
  FacebookIcon,
} from "next-share";
import MailchimpSubscribe from "react-mailchimp-subscribe";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";

const Footer = () => {
  const session = useSession();
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const socialRef = useRef(null);
  const vrRef = useRef(null);
  const isLoginPop = useSelector((state) => state.user.isLoginPop);
  const dispatch = useDispatch();

  useEffect(() => {
    const Scrollmagic = require("scrollmagic");
    ScrollMagicPluginGsap(Scrollmagic, TweenMax, TimelineMax);

    const controller = new Scrollmagic.Controller();

    // First Timeline
    const linkTimeline = new TimelineMax().fromTo(
      ".facebookOver",
      0.8,
      { scaleX: 1, transformOrigin: "right", ease: Power3.easeOut },
      { scaleX: 0 },
      0.05
    );

    const linkScene = new Scrollmagic.Scene({
      triggerElement: socialRef.current,
      triggerHook: 0.9,

      // duration: "40%",
    })
      .setTween(linkTimeline)
      .addTo(controller);

    // Second Timeline
    const leftTimeline = new TimelineMax().fromTo(
      ".leftOver",
      0.8,
      { scaleX: 1, transformOrigin: "left", ease: Power3.easeOut },
      { scaleX: 0 },
      0.05
    );

    const leftScene = new Scrollmagic.Scene({
      triggerElement: leftRef.current,
      triggerHook: 0.8,
      // duration: "60%",
    })

      .setTween(leftTimeline)
      .addTo(controller);

    // Third Timeline
    const rightTimeline = new TimelineMax().fromTo(
      ".rightOver",
      0.8,
      { scaleX: 1, transformOrigin: "right", ease: Power3.easeOut },
      { scaleX: 0 },
      0.05
    );

    const rightScene = new Scrollmagic.Scene({
      triggerElement: rightRef.current,
      triggerHook: 0.8,
      // duration: "60%",
    })
      .setTween(rightTimeline)
      .addTo(controller);

    // Fourth Timeline
    const fourthTimeline = new TimelineMax().fromTo(
      ".vrlineOver",
      0.8,
      { scaleY: 1, transformOrigin: "bottom", ease: Power3.easeOut },
      { scaleY: 0 },
      0.01
    );

    const vrlineScene = new Scrollmagic.Scene({
      triggerElement: vrRef.current,
      triggerHook: 1,
      // duration: "60%",
    })
      .setTween(fourthTimeline)
      .addTo(controller);

    return () => {
      leftScene.destroy(true);
      rightScene.destroy(true);
      linkScene.destroy(true);
      vrlineScene.destroy(true);
    };
  }, []);

  const [open, setOpen] = useState(false);
  const [form, setForm] = useState("signin");
  const [email, setEmail] = useState("");
  const [state, setState] = useState("IDLE");
  const [errorMessage, setErrorMessage] = useState(null);

  const subscribe = async () => {
    setState("LOADING");
    setErrorMessage(null);
    try {
      // Dummy function to replace axios call
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          // Simulate success response
          resolve({ data: { error: null } });
          // Simulate error response
          // reject({ response: { data: { error: "Subscription failed" } } });
        }, 1000);
      });
      setState("SUCCESS");
    } catch (e) {
      setErrorMessage(e.response.data.error);
      setState("ERROR");
    }
  };
  const checkEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };
  const validateEmail = (email) => {
    if (checkEmail(email)) {
      setError(false);
      return true;
    } else {
      setError(true);
      return false;
    }
  };
  let year = new Date().getFullYear();
  let facebook = "https://www.facebook.com/kuragestudio";
  let whatsapp = "";
  let instagram = "https://www.instagram.com";
  const [error, setError] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    dispatch({
      type: "CLOSE_POPUP_LOGIN",
    });
  };

  const handleLoginClick = () => {
    handleOpen();
    setForm("signin");
  };

  const handleSignupClick = () => {
    handleOpen();
    setForm("signup");
  };

  return (
    <div className="container">
      <footer className="footer">
        <div className="footer-divider">
          <div ref={leftRef} className="horizontal-line left">
            <div className="leftOver"> </div>
          </div>
          <div className="footer-logo">
            <Link href="/">
              <a className="morf">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="67.155"
                  height="77.418"
                  viewBox="0 0 67.155 77.418"
                >
                  <g
                    id="Group_1374"
                    data-name="Group 1374"
                    transform="translate(346.051 -116.35)"
                  >
                    <path
                      id="Path_1032"
                      data-name="Path 1032"
                      d="M-339.789,255.518c4.236,5.365,10.829,9.769,20.005,13.5l1.666.637,0-4.836c-8.417-3.434-14.395-7.38-18.124-12.1-3.212-4.069-4.83-8.77-5.092-14.795-.077-1.771-.2-4.733-.2-5.135v-3.254l2.5,1.3c-.006,1.463-.009,4.266.055,5.62.029.6.141,3.043.141,3.043l.006.084c1.2,14.414,14.677,20.121,25.507,24.706l.855.346h0l.855-.346c10.829-4.585,24.307-10.292,25.507-24.706l.006-.084s.112-2.443.141-3.043c.064-1.354.062-4.156.055-5.619l2.5-1.3v3.254c0,.4-.122,3.364-.2,5.136-.261,6.025-1.879,10.726-5.091,14.794-3.73,4.724-9.708,8.67-18.125,12.1l0,4.837,1.666-.637c9.176-3.735,15.77-8.139,20.005-13.5,3.777-4.783,5.759-10.474,6.059-17.4.034-.782.2-4.712.2-5.331V222.1l-33.577,17.468h0l-33.577-17.468v10.695c0,.62.169,4.549.2,5.331C-345.548,245.044-343.566,250.735-339.789,255.518Zm49.364-22.333c0,1.157-.018,2.347-.051,3.056-.027.555-.124,2.679-.139,3.007-.9,10.567-9.588,15.258-21.857,20.5-12.269-5.237-20.956-9.928-21.857-20.5-.015-.328-.113-2.452-.139-3.007-.034-.709-.047-1.9-.051-3.057l22.048,11.47Z"
                      transform="translate(0 -75.892)"
                    />
                    <path
                      id="Path_1033"
                      data-name="Path 1033"
                      d="M-312.472,157.855-278.9,140.39l-.009-16.211-4.5-2.2-.008,15.673-2.5,1.3V121.975l-8.2,3.991a27.443,27.443,0,0,0-2.538-2.291l4.971-2.334v-4.99l-9.482,4.451a25.254,25.254,0,0,0-11.312-2.593h0a25.252,25.252,0,0,0-11.312,2.593l-9.482-4.451v4.99l4.971,2.334a27.5,27.5,0,0,0-2.538,2.291l-8.2-3.991v16.974l-2.5-1.3-.009-15.673-4.5,2.205-.009,16.21,33.577,17.464Zm0-35.129h0a20.341,20.341,0,0,1,14.035,5.345l-14.035,6.833h0l-14.036-6.833A20.343,20.343,0,0,1-312.474,122.725Zm-22.043,6.471,22.043,10.731h0L-290.43,129.2v12.1l-22.043,11.465h0L-334.517,141.3Z"
                      transform="translate(0 0)"
                    />
                  </g>
                </svg>
              </a>
            </Link>
          </div>
          <div ref={rightRef} className="horizontal-line right">
            <div className="rightOver"> </div>
          </div>
        </div>

        <div className="footer-links">
          <div className="first-Col">
            <div className="first-Col-items">
              <Link href="/customiser">
                <a className="underline privacy-policy"> Customise </a>
              </Link>

              <Link href="/shoes">
                <a className="underline privacy-policy"> Shop </a>
              </Link>

              <Link href="/shop">
                <a className="underline privacy-policy"> Collection </a>
              </Link>

              <Link href="/about">
                <a className="underline privacy-policy"> About </a>
              </Link>

              <Link href="/">
                <a className="underline privacy-policy"> Home </a>
              </Link>

              <Link href="/blog">
                <a className="underline privacy-policy"> Blogs </a>
              </Link>
            </div>
          </div>

          <div className="second-Col">
            <div ref={socialRef} className="second-Col-items">
              <a
                href="https://www.facebook.com/morfcustomshoes"
                target="blank"
                className="facebook"
              >
                {/* <FacebookShareButton
                  url={"https://github.com/Bunlong/next-share"}
                  quote={
                    "next-share is a social media share buttons for your next React apps."
                  }
                  hashtag={"#nextshare"}
                > */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="13.286"
                  height="25.588"
                  viewBox="0 0 13.286 25.588"
                >
                  <g
                    id="Group_311"
                    data-name="Group 311"
                    transform="translate(13.286) rotate(90)"
                  >
                    <path
                      id="f"
                      d="M25.586,4.663H13.915V.746L9.364.159v4.5h-2.9c-1.319,0-2.214-.365-2.214-2.255V0H.179A33.246,33.246,0,0,0,0,3.508c0,3.473,2.121,5.85,6.013,5.85H9.368v3.927h4.551V9.359H25.588Z"
                      transform="translate(0)"
                    />
                  </g>
                </svg>
                {/* </FacebookShareButton> */}
              </a>

              <a
                href="https://wa.me/918178720162"
                targert="blank"
                className="whatsapp"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25.465"
                  height="25.587"
                  viewBox="0 0 25.465 25.587"
                >
                  <g
                    id="whatsapp.46d36d08"
                    transform="translate(25.465) rotate(90)"
                  >
                    <path
                      id="Path_8"
                      data-name="Path 8"
                      d="M25.587,25.465l-6.573-1.8a12.678,12.678,0,1,1,6.353-10.987h0a12.7,12.7,0,0,1-1.543,6.06Zm-4.06-7.033.227-.385a10.52,10.52,0,0,0,1.47-5.364h0A10.549,10.549,0,1,0,18.286,21.6l.4-.251,3.887,1.064Z"
                      transform="translate(0 0)"
                    />
                    <path
                      id="Path_9"
                      data-name="Path 9"
                      d="M8.872.038C8.738.118,8.663.329,8.5.646S7.579,2.521,7.473,2.81s-.16.5.159.712,1.031.819,1.24,1,.24.369.08.687A8.645,8.645,0,0,1,7.38,7.76,9.517,9.517,0,0,1,5.188,9.524c-.318.184-.49.02-.646-.135s-.371-.316-.555-.475A2.163,2.163,0,0,0,3.455,8.6a.58.58,0,0,0-.553.027c-.16.079-1.72.712-2.354.976s-.538.519-.538.712-.01.4-.01.607a1.159,1.159,0,0,0,.4.845,3.554,3.554,0,0,0,2.642,1.108,6.152,6.152,0,0,0,3.277-1.295A14.1,14.1,0,0,0,11.1,6.168a17.787,17.787,0,0,0,.673-1.806,4.331,4.331,0,0,0,.128-2A3.266,3.266,0,0,0,10.4.227,2.658,2.658,0,0,0,8.872.038Z"
                      transform="translate(6.829 6.252)"
                      fillRule="evenodd"
                    />
                  </g>
                </svg>
              </a>

              <a
                href="https://www.instagram.com/morfcustomshoes/"
                target="blank"
                className="instagram"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path
                    id="Path_924"
                    data-name="Path 924"
                    d="M5559.127,5442.125c3.2,0,3.6,0,4.8.1,3.3.1,4.8,1.7,4.9,4.9.1,1.3.1,1.6.1,4.8s0,3.6-.1,4.8c-.1,3.2-1.7,4.8-4.9,4.9-1.3.1-1.6.1-4.8.1s-3.6,0-4.8-.1c-3.3-.1-4.8-1.7-4.9-4.9-.1-1.3-.1-1.6-.1-4.8s0-3.6.1-4.8c.1-3.2,1.7-4.8,4.9-4.9C5555.527,5442.125,5555.927,5442.125,5559.127,5442.125Zm0-2.2c-3.3,0-3.7,0-4.9.1-4.4.2-6.8,2.6-7,7-.1,1.2-.1,1.6-.1,4.9s0,3.7.1,4.9c.2,4.4,2.6,6.8,7,7,1.2.1,1.6.1,4.9.1s3.7,0,4.9-.1c4.4-.2,6.8-2.6,7-7,.1-1.2.1-1.6.1-4.9s0-3.7-.1-4.9c-.2-4.4-2.6-6.8-7-7C5562.827,5439.925,5562.427,5439.925,5559.127,5439.925Zm0,5.8a6.2,6.2,0,1,0,6.2,6.2A6.231,6.231,0,0,0,5559.127,5445.725Zm0,10.2a4,4,0,1,1,4-4A4.012,4.012,0,0,1,5559.127,5455.925Zm6.4-11.8a1.4,1.4,0,1,0,1.4,1.4A1.367,1.367,0,0,0,5565.527,5444.125Z"
                    transform="translate(-5547.127 -5439.925)"
                  />
                </svg>
                <div className="facebookOver"> </div>
              </a>
            </div>
          </div>

          <div className="third-Col">
            <div className="third-Col-items">
              <Link href="/contact">
                <a className="underline contact"> Contact </a>
              </Link>

              <Link href="/shipping-info?id=1">
                <a className="underline shipping-info"> Shipping Info </a>
              </Link>

              <Link href="/shipping-info?id=2">
                <a className="underline return/exchange"> Return/Exchange </a>
              </Link>

              <Link href="/shipping-info?id=4">
                <a className="underline terms-conditions">Terms & Conditions</a>
              </Link>

              <Link href="/shipping-info?id=3">
                <a className="underline privacy-policy">Privacy Policy</a>
              </Link>

              {session.status == "authenticated" ? (
                <>
                  <Link href="/profile">
                    <a
                      className="underline privacy-policy"
                      style={{ cursor: "pointer" }}
                    >
                      {/* {username} */}
                      my account
                    </a>
                  </Link>
                </>
              ) : (
                <>
                  <a
                    onClick={handleLoginClick}
                    className="underline itemThree--linkOne"
                    style={{ cursor: "pointer" }}
                  >
                    Login
                  </a>

                  <a
                    onClick={handleSignupClick}
                    className="underline itemThree--linkOne"
                    style={{ cursor: "pointer" }}
                  >
                    sign up
                  </a>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="bottom">
          <div ref={vrRef} className="vertical-line">
            <div className="vrlineOver"> </div>
          </div>
          <MailchimpSubscribe
            url={`${process.env.MAILCHIMP_POST_API}?u=${process.env.MAILCHIMP_U_VALUE}&amp;id=${process.env.MAILCHIMP_FORM_ID}`}
            method="post"
            id="mc-embedded-subscribe-form"
            render={(props) => {
              const { subscribe, status, message } = props || {};

              return (
                <div className="news-letter">
                  <p
                    style={{ color: "black", fontWeight: "bold" }}
                    className="weekly-newsletter"
                  >
                    Weekly Newsletter
                  </p>

                  <div className="input">
                    <input
                      type="email"
                      placeholder="NAME@EMAIL.COM"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    {/* <button className="subscribe"> Subscribe </button> */}
                    <Button
                      className="subscribe"
                      action="Subscribe"
                      diabled={state == "LOADING"}
                      // onClick={subscribe}
                      onClick={() => {
                        if (validateEmail(email)) {
                          subscribe({
                            EMAIL: email,
                            "group[480490][1]": 1,
                            " group[480490][2]": 1,
                          });
                          toast.success("Subscribed Successfully!");
                          setEmail("");
                        }
                      }}
                    />

                    {state == "ERROR" && <p>{errorMessage}</p>}
                    {state == "SUCCESS" && <p>Success!!</p>}
                  </div>

                  {error && (
                    <div
                      style={{
                        fontFamily: "H-Regular",
                        fontSize: "12px",
                        padding: "10px 0",
                      }}
                      className="error_text"
                    >
                      Please Check Email !
                    </div>
                  )}
                </div>
              );
            }}
          />

          <div className="copyright">
            <p
              style={{
                color: "black",
                fontSize: "14px",
                fontFamily: "H-Regular",
              }}
            >
              &copy;{year}Morf
            </p>
            <Link href="https://www.kurage.in/">
              <a
                style={{
                  color: "#D6D6D6",
                  fontSize: "16px",
                  fontFamily: "H-Regular",
                  marginTop: "10px",
                  cursor: "pointer",
                  textDecoration: "none",
                }}
                target="blank"
              >
                Designed & Developed by&nbsp;
                {/* <a style={{ textDecoration: "none", color: "#D6D6D6" }}> */}
                Kurage
                {/* </a> */}
              </a>
            </Link>
          </div>
        </div>
      </footer>

      {(open || isLoginPop) && (
        <LoginModal
          open={open || isLoginPop}
          handleClose={handleClose}
          form={form}
          setForm={setForm}
        />
      )}
    </div>
  );
};

export default Footer;
