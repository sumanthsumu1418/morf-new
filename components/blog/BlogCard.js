import { useRef, useEffect } from "react";
import Link from "next/link";
import { TweenMax, TimelineMax } from "gsap";
import { ScrollMagicPluginGsap } from "scrollmagic-plugin-gsap";

const BlogCard = (props) => {
  const blogRef = useRef(null);
  const imgRef = useRef(null);
  // Dummy image fallback
  const imageUrl = props?.attributes?.listing_image?.data?.attributes?.url || "/images/blog_default.jpg";

  useEffect(() => {
    if (window.innerWidth >= 1024) {
      const Scrollmagic = require("scrollmagic");
      ScrollMagicPluginGsap(Scrollmagic, TweenMax, TimelineMax);

      const controller = new Scrollmagic.Controller();

      //   Timeline

      const blogTimeline = new TimelineMax().fromTo(
        blogRef.current,
        { y: 40 },
        { y: 150, duration: 4, ease: 0.05 }
      );

      // Scene

      const blogScene = new Scrollmagic.Scene({
        triggerElement: blogRef.current,
        triggerHook: "onLeave",
        duration: "200%",
      })
        .setTween(blogTimeline)
        .addTo(controller);

      // Timeline
      const imgTimeline = new TimelineMax().fromTo(
        imgRef.current,
        { y: 40 },
        { y: -30, ease: 0.9, duration: 8 }
      );

      // Scene

      const imgScene = new Scrollmagic.Scene({
        triggerElement: imgRef.current,
        triggerHook: "onEnter",
        duration: "400%",
      })
        .setTween(imgTimeline)
        .addTo(controller);

      return () => {
        blogScene.destroy(true);
        imgScene.destroy(true);
      };
    }
  }, []);

  return (
    <div ref={blogRef} className="blogCard">
      <div className="blogCard-img">
        <img
          ref={imgRef}
          src={imageUrl}
          alt={props?.attributes?.title}
        />
      </div>
      <div className="blogCard-detail">
        <p className="blogCard-detail-desc">{props?.attributes?.title}</p>
        <p className="blogCard-detail-read">
          <span> Read </span>
        </p>
      </div>
    </div>
  );
};
export default BlogCard;
