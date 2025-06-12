import { useEffect, useRef } from "react";
import BlogCard from "@/components/blog/BlogCard";
import BaseLayout from "@/components/layout/BaseLayout";
import { TweenMax, TimelineMax, Back } from "gsap";
import { ScrollMagicPluginGsap } from "scrollmagic-plugin-gsap";
import Button from "@/components/Button";
import useMediaQuery from "hooks/useMediaQuery";
import MailchimpSubscribe from "react-mailchimp-subscribe";
import { toast } from "react-toastify";
import { useState } from "react";
import SEO from "@/components/layout/SEO";

const dummyBlogs = [
  {
    id: 1,
    attributes: {
      title: "How to Style Your Shoes",
      listing_image: { data: { attributes: { url: "/images/blog1.jpg" } } },
    },
  },
  {
    id: 2,
    attributes: {
      title: "The Morf Journey",
      listing_image: { data: { attributes: { url: "/images/blog2.jpg" } } },
    },
  },
  {
    id: 3,
    attributes: {
      title: "Groomsmen Looks",
      listing_image: { data: { attributes: { url: "/images/blog3.jpg" } } },
    },
  },
];

const BlogList = () => {
  const [hostname, setHostname] = useState("");
  const [email, setEmail] = useState("");
  const [state, setState] = useState("IDLE");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

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

  const titleRef = useRef(null);
  const morfRef = useRef(null);
  const journeyRef = useRef(null);
  const gridRef = useRef(null);
  const isMobileBreakPoint = useMediaQuery(600);

  useEffect(() => {
    if (window.innerWidth >= 1024) {
      const Scrollmagic = require("scrollmagic");
      ScrollMagicPluginGsap(Scrollmagic, TweenMax, TimelineMax);

      const controller = new Scrollmagic.Controller();

      // Morf Timeline

      const morfTimeline = new TimelineMax().fromTo(
        morfRef.current,
        { x: "0%" },
        { x: "-30%", ease: 0.04, duration: 3 }
      );

      const morfScene = new Scrollmagic.Scene({
        triggerElement: morfRef.current,
        triggerHook: "onStart",
        duration: "200%",
      })
        .setTween(morfTimeline)
        .addTo(controller);

      // Journey Timeline

      const journeyTimeline = new TimelineMax().fromTo(
        journeyRef.current,
        { x: "0%" },
        { x: "20%", ease: 0.04, duration: 3 }
      );

      const journeyScene = new Scrollmagic.Scene({
        triggerElement: journeyRef.current,
        triggerHook: "onStart",
        duration: "200%",
      })
        .setTween(journeyTimeline)
        .addTo(controller);

      return () => {
        morfScene.destroy(true);
        journeyScene.destroy(true);
      };
    }
    if (typeof window !== "undefined") {
      setHostname(window?.location?.href);
    }
  }, []);

  function animation() {
    var oddLetter = new TimelineMax();
    var evenLetter = new TimelineMax();
    var blogGrid = new TimelineMax();

    oddLetter.fromTo(
      ".odd",
      1.2,
      { ease: Back.easeOut.config(1), y: 100, opacity: 0 },
      { ease: Back.easeOut.config(1), y: 0, opacity: 1 },
      0.3
    );

    evenLetter.fromTo(
      ".even",
      1.2,
      { ease: Back.easeOut.config(1), y: -100, opacity: 0 },
      { ease: Back.easeOut.config(1), y: 0, opacity: 1 },
      0.3
    );

    blogGrid.fromTo(
      ".blogGrid",
      0.8,
      {
        ease: Back.easeOut.config(1),
        y: "100%",
        opacity: 0,
      },
      { ease: Back.easeOut.config(1), y: 0, opacity: 1 },
      0.5
    );
  }

  useEffect(() => {
    animation();
  }, []);
  const [showicon, setShowIcon] = useState(false);

  return (
    <>
      <SEO
        title="BLOG - MORF"
        desc="Morf"
        pageUrl={hostname}
        ogImage="/images/og_img.png"
      />
      <BaseLayout>
        <div className="blog">
          <div className="container">
            <div ref={titleRef} className="blog-title">
              <div
                ref={morfRef}
                style={{ display: "flex", alignSelf: "flex-start" }}
              >
                <span className="odd"> M </span>
                <span className="even"> E </span>
                <span className="odd"> T </span>
                <span className="even"> A </span>
              </div>
              {/* <br /> */}

              <div
                ref={journeyRef}
                style={{
                  display: "flex",
                  alignSelf: "flex-end",

                  // marginLeft: "30%",
                }}
              >
                <span className="odd"> M </span>
                <span className="even"> O </span>
                <span className="odd"> R </span>
                <span className="even"> F </span>
                {/* <span className="odd"> N </span>
                <span className="even"> E </span>
                <span className="odd"> Y </span> */}
              </div>
            </div>
            {isMobileBreakPoint ? (
              <div className="blogGrid">
                {dummyBlogs.map((c) => {
                  return (
                    <div ref={gridRef} key={c.id} className="blogGrid-item">
                      {c?.attributes?.type === "blog" && (
                        <Link
                          href="/blog/[slug]"
                          as={`/blog/${c?.attributes?.slug}`}
                        >
                          <a style={{ textDecoration: "none" }}>
                            <BlogCard {...c} />
                          </a>
                        </Link>
                      )}
                    </div>
                  );
                })}

                <MailchimpSubscribe
                  url={`${process.env.MAILCHIMP_POST_API}?u=${process.env.MAILCHIMP_U_VALUE}&amp;id=${process.env.MAILCHIMP_FORM_ID}`}
                  method="post"
                  id="mc-embedded-subscribe-form"
                  render={(props) => {
                    const { subscribe, status, message } = props || {};

                    return (
                      <div className="news-letter blogNewsGrid">
                        <div className="weeklyText">
                          <img
                            className="weeklyIcon"
                            src={
                              showicon
                                ? "/icons/newsletter-icon.svg"
                                : "/icons/newsletter-icon2.svg"
                            }
                            alt=""
                          />
                          <p className="weekly-newsletter ">
                            Weekly Newsletter
                          </p>
                        </div>

                        <div className="input blogNewsletter">
                          <input
                            type="email"
                            placeholder="NAME@EMAIL.COM"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />

                          <Button
                            className="subscribe blogBtn"
                            action="Subscribe"
                            diabled={state == "LOADING"}
                            onClick={() => {
                              if (validateEmail(email)) {
                                toast.success("Subscribed Successfully!");
                                setEmail("");
                                setShowIcon(true);
                                setTimeout(() => {
                                  setShowIcon(false);
                                }, 6000);
                                subscribe({ EMAIL: email });
                              }
                            }}
                          />

                          <div
                            style={{ padding: "10px 0" }}
                            className="error_text"
                          >
                            {error && "Please Check Email !"}
                          </div>

                          {state == "ERROR" && <p>{errorMessage}</p>}
                          {state == "SUCCESS" && <p>Success!!</p>}
                        </div>
                      </div>
                    );
                  }}
                />
              </div>
            ) : (
              <div className="blogGrid">
                {dummyBlogs.map((c) => {
                  return (
                    <div ref={gridRef} key={c.id} className="blogGrid-item">
                      {c?.attributes?.type === "blog" ? (
                        <Link
                          href="/blog/[slug]"
                          as={`/blog/${c?.attributes?.slug}`}
                        >
                          <a style={{ textDecoration: "none" }}>
                            <BlogCard {...c} />
                          </a>
                        </Link>
                      ) : (
                        <MailchimpSubscribe
                          url={`${process.env.MAILCHIMP_POST_API}?u=${process.env.MAILCHIMP_U_VALUE}&amp;id=${process.env.MAILCHIMP_FORM_ID}`}
                          method="post"
                          id="mc-embedded-subscribe-form"
                          render={(props) => {
                            const { subscribe, status, message } = props || {};

                            return (
                              <div className="news-letter blogNewsGrid">
                                <div className="weeklyText">
                                  <img
                                    className="weeklyIcon"
                                    src={
                                      showicon
                                        ? "/icons/newsletter-icon.svg"
                                        : "/icons/newsletter-icon2.svg"
                                    }
                                    alt=""
                                  />
                                  <p className="weekly-newsletter ">
                                    Weekly Newsletter
                                  </p>
                                </div>

                                <div className="input blogNewsletter">
                                  <div className="error_text">
                                    {error && "Please Check Email !"}
                                  </div>
                                  <input
                                    type="email"
                                    placeholder="NAME@EMAIL.COM"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                  />

                                  <Button
                                    className="subscribe blogBtn"
                                    action="Subscribe"
                                    diabled={state == "LOADING"}
                                    onClick={() => {
                                      if (validateEmail(email)) {
                                        toast.success(
                                          "Subscribed Successfully!"
                                        );
                                        setEmail("");
                                        setShowIcon(true);
                                        setTimeout(() => {
                                          setShowIcon(false);
                                        }, 6000);
                                        subscribe({ EMAIL: email });
                                      }
                                    }}
                                  />
                                  {state == "ERROR" && <p>{errorMessage}</p>}
                                  {state == "SUCCESS" && <p>Success!!</p>}
                                </div>
                              </div>
                            );
                          }}
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            )}
            {/* {!isMobileBreakPoint && (
            <div className="loadMoreDiv">
              <div className="vrLine"> </div>

              <Button action="View More" />
            </div>
          )} */}
          </div>
        </div>
      </BaseLayout>
    </>
  );
};

export default BlogList;
