import { useEffect } from "react";

const AddToCart = () => {
  useEffect(() => {
    import("@lottiefiles/lottie-player");
  }, []);

  return (
    <div className="addedToCart">
      <div className="addedToCart__content">
        <div className="addedToCart__content--lottieWrapper">
          <lottie-player
            autoplay
            loop
            src="/lottie/added_to_cart.json"
            style={{ width: "100%", height: "100%" }}
            mode="normal"
          ></lottie-player>
        </div>
        <p className="addedToCart__content--text">Adding to cart...</p>
      </div>
    </div>
  );
};

export default AddToCart;
