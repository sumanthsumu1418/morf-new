import Router from "next/router";
import { useEffect } from "react";
import classes from "../styles/components/_success.module.scss";

export default function Success({ message,route }) {
  useEffect(() => {
    setTimeout(() => {
      if(route)    Router.push(`${route}`);
      else Router.push('/')
    }, 2000);
  });

  return (
    // <div className={classes.successMsg}>
    //   <div className={classes.successMsg__content}>
    //     <button
    //       type="button"
    //       id="closeSignUp"
    //       className={classes.close_btn}
    //       onClick={()=>Router.push("/")}
    //     >
    //       <svg
    //         xmlns="http://www.w3.org/2000/svg"
    //         width="26.03"
    //         height="26.032"
    //         viewBox="0 0 26.03 26.032"
    //       >
    //         <g
    //           id="Group_10720"
    //           data-name="Group 10720"
    //           transform="translate(1238.454 -1734.166) rotate(45)"
    //         >
    //           <path
    //             id="Path_1875"
    //             data-name="Path 1875"
    //             d="M14972.9,1153.042h33.813"
    //             transform="translate(-14620.882 948.921)"
    //             fill="none"
    //             stroke="#ffff"
    //             strokeLinecap="round"
    //             strokeWidth="1.5"
    //           />
    //           <path
    //             id="Path_1876"
    //             data-name="Path 1876"
    //             d="M0,0H33.811"
    //             transform="translate(368.927 2085.055) rotate(90)"
    //             fill="none"
    //             stroke="#ffff"
    //             strokeLinecap="round"
    //             strokeWidth="1.5"
    //           />
    //         </g>
    //       </svg>
    //     </button>
    //     <div className={classes.container}>
    //       <div className={classes.lottie}>
    //         {" "}
    //         {/* <lottie-player
    //   autoplay
    //   loop
    //   src="/lottie/plane.json"
    //   style={{ width: "100%", height: "100%" }}
    //   mode="normal"
    // ></lottie-player> */}
    //         <img src="../images/sucesstick.jpg" alt="" />
    //       </div>
    //       <p className={classes.title}>
    //        Your order  has been  placed successfully

    //       </p>
    //     </div>
    //   </div>
    // </div>
    <div className="addressModal">
      <div className="addressModal__Container">
        <div className="Bottom">
          <div className="bottomContainer">
            <div
              className="checkIcon"
              style={{ background: "url(/icons/successfulIcon.svg)" }}
            ></div>
            <div className="text">
              <p>{message}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
