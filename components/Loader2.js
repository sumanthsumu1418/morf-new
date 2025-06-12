import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const Loading = () => {
  useEffect(() => {
    import("@lottiefiles/lottie-player");
  }, []);

  const lottie = [
    "lottie/Captoe.json",
    "lottie/Derby.json",
    "lottie/Oxford.json",
    "lottie/Loafer.json",
  ];
  const [selectedImage, setSelectedImage] = useState(
    lottie[Math.floor(Math.random() * lottie.length)]
  );

  return (
    <motion.div style={{ transition: "all 0.4s" }} className="loaderWrappers">
      <div className="logo">
        <img src="/icons/morf.svg" className="morf" alt="morf-logo" />
      </div>{" "}
      <motion.div className="loader-container">
        <div className="lottie-loader">
          <lottie-player
            className="lottie-loader"
            autoplay
            loop
            src={selectedImage}
            style={{ height: "500px", width: "3500px" }}
            mode="normal"
          ></lottie-player>{" "}
        </div>
      </motion.div>
      <div className="shoes">
        <div className="loadingText">Loading....</div>
      </div>
    </motion.div>
  );
};
export default Loading;
