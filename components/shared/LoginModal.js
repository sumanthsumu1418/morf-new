import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import client, { AUTH_TOKEN_KEY } from "./client";
import Afterlogin from "./Afterlogin";
import { signIn, signOut, useSession } from "next-auth/react";
import {
  ADD_ITEM_TO_ORDER,
  AUTHENTICATE_WITH_FACEBOOK,
  AUTHENTICATE_WITH_GOOGLE,
  CURRENT_USER_DATA,
} from "graphql/productsqueries";
import { toast, ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { isLogin } from "store/user/action";

const style = {
  position: "absolute",
  top: "90%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function LoginModal({ open, handleClose, form, setForm }) {
  const isLoginUser = useSelector((state) => state.user.isLogin);
  const dispatch = useDispatch();
  const [state, setstate] = React.useState("signin");

  return (
    <div>
      {/* <ToastContainer /> */}

      {/* <div onClick={handleOpen}>
        <img src="/icons/user.svg" />
      </div> */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {/* <Box sx={style}> */}
        {!isLoginUser ? (
          <div className="regModalContainer">
            <div className="regModalClose" onClick={handleClose}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32.719"
                height="32.719"
                viewBox="0 0 32.719 32.719"
              >
                <g
                  id="Group_1410"
                  data-name="Group 1410"
                  transform="translate(16.359 -14.945) rotate(45)"
                >
                  <line
                    id="Line_1277"
                    data-name="Line 1277"
                    x2="44.271"
                    transform="translate(0 22.135)"
                    fill="none"
                    stroke="#fff"
                    stroke-width="2"
                  />
                  <line
                    id="Line_1278"
                    data-name="Line 1278"
                    x2="44.271"
                    transform="translate(22.135 0) rotate(90)"
                    fill="none"
                    stroke="#fff"
                    stroke-width="2"
                  />
                </g>
              </svg>
            </div>

            <div className="regModal">
              {state == "signin" ? (
                <div className="sign_in-up" role="button">
                  <span
                    onClick={() => setForm("signin")}
                    className={`sign_in-up--span ${
                      form == "signin" ? "textBlack" : ""
                    }`}
                  >
                    Sign In
                  </span>
                  <span className="sign_in-up--seperator"></span>

                  <span
                    onClick={() => setForm("signup")}
                    className={`sign_in-up--span ${
                      form == "signup" ? "textBlack" : ""
                    }`}
                  >
                    Sign Up
                  </span>
                </div>
              ) : (
                <div className="sign_in-up" role="button">
                  <span className={"sign_in-up--span        textBlack"}>
                    Reset Password
                  </span>
                </div>
              )}
              {form == "signin" ? (
                <LoginForm
                  handleClose={handleClose}
                  setstate={setstate}
                  state={state}
                />
              ) : (
                <SignupForm handleClose={handleClose} setForm={setForm} />
              )}
              <div className="signUpWith">
                <span></span>
                <div>Sign {form == "signin" ? "In" : "Up"} With</div>
                <span></span>
              </div>
              <div className="facebookGoogleAuth">
                <div
                  className="facebookContainer"
                  onClick={() => {
                    localStorage.setItem("ISAUTH", true);

                    signIn("google");
                  }}
                >
                  <svg
                    id="Group_1404"
                    dataName="Group 1404"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    width="71.213"
                    height="23.442"
                    viewBox="0 0 71.213 23.442"
                  >
                    <defs>
                      <clipPath id="clip-path">
                        <rect
                          id="Rectangle_1915"
                          dataName="Rectangle 1915"
                          width="71.213"
                          height="23.442"
                          fill="none"
                        />
                      </clipPath>
                    </defs>
                    <g
                      id="Group_1403"
                      dataName="Group 1403"
                      transform="translate(0 0)"
                      clip-path="url(#clip-path)"
                    >
                      <path
                        id="Path_1052"
                        dataName="Path 1052"
                        d="M82.643,30.388a5.876,5.876,0,1,1-5.876-5.858,5.786,5.786,0,0,1,5.876,5.858m-2.572,0a3.312,3.312,0,1,0-6.608,0,3.312,3.312,0,1,0,6.608,0"
                        transform="translate(-52.168 -18.052)"
                        fill="#ea4335"
                      />
                      <path
                        id="Path_1053"
                        dataName="Path 1053"
                        d="M130.643,30.388a5.876,5.876,0,1,1-5.876-5.858,5.786,5.786,0,0,1,5.876,5.858m-2.572,0a3.312,3.312,0,1,0-6.608,0,3.312,3.312,0,1,0,6.608,0"
                        transform="translate(-87.491 -18.052)"
                        fill="#fbbc05"
                      />
                      <path
                        id="Path_1054"
                        dataName="Path 1054"
                        d="M178.1,24.884V35.4c0,4.326-2.551,6.093-5.567,6.093a5.578,5.578,0,0,1-5.192-3.452l2.24-.932a3.236,3.236,0,0,0,2.95,2.078c1.931,0,3.127-1.191,3.127-3.433v-.842h-.09a3.988,3.988,0,0,1-3.085,1.331,5.862,5.862,0,0,1,0-11.713,4.059,4.059,0,0,1,3.085,1.31h.09v-.953H178.1Zm-2.261,5.525a3.3,3.3,0,0,0-3.127-3.571,3.387,3.387,0,0,0-3.262,3.571,3.362,3.362,0,0,0,3.262,3.528,3.274,3.274,0,0,0,3.127-3.528"
                        transform="translate(-122.799 -18.052)"
                        fill="#4285f4"
                      />
                      <rect
                        id="Rectangle_1914"
                        dataName="Rectangle 1914"
                        width="2.509"
                        height="17.167"
                        transform="translate(56.819 0.668)"
                        fill="#34a853"
                      />
                      <path
                        id="Path_1055"
                        dataName="Path 1055"
                        d="M237.427,32.308l2,1.331a5.831,5.831,0,0,1-4.881,2.6,5.731,5.731,0,0,1-5.813-5.858,5.567,5.567,0,0,1,5.525-5.858,5.44,5.44,0,0,1,5.013,3.726l.267.666L231.7,32.155a2.981,2.981,0,0,0,2.839,1.775A3.343,3.343,0,0,0,237.427,32.308ZM231.281,30.2l5.235-2.174a2.268,2.268,0,0,0-2.174-1.241,3.213,3.213,0,0,0-3.061,3.415"
                        transform="translate(-168.322 -18.044)"
                        fill="#ea4335"
                      />
                      <path
                        id="Path_1056"
                        dataName="Path 1056"
                        d="M9.225,10.812V8.327H17.6a8.235,8.235,0,0,1,.124,1.5,8.207,8.207,0,0,1-2.152,5.813,8.317,8.317,0,0,1-6.344,2.551A9.223,9.223,0,0,1,0,9.1,9.223,9.223,0,0,1,9.228,0a8.667,8.667,0,0,1,6.233,2.506L13.707,4.26A6.335,6.335,0,0,0,9.225,2.485,6.525,6.525,0,0,0,2.7,9.1a6.525,6.525,0,0,0,6.523,6.611,6.085,6.085,0,0,0,4.593-1.82,5.151,5.151,0,0,0,1.347-3.077Z"
                        transform="translate(0 0)"
                        fill="#4285f4"
                      />
                    </g>
                  </svg>
                </div>
                <div
                  className="facebookContainer"
                  onClick={(e) => {
                    localStorage.setItem("ISAUTH", true);
                    signIn("facebook");
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="100"
                    width="1200"
                    viewBox="-150 -48.38625 1300 290.3175"
                    style={{ scale: "0.7" }}
                  >
                    <path
                      d="M63.35 190.562H25.669V96.628H0V66.045h25.668V44.283C25.668 18.495 37.021 0 74.6 0c7.948 0 20.426 1.602 20.426 1.602V30H81.92c-13.354 0-18.568 4.062-18.568 15.292v20.753h31.174L91.75 96.628H63.351zm86.46-126.961c-.549 0-1.114.02-1.673.034-34.94 0-50.926 26.282-50.926 63.59 0 46.998 20.736 65.808 51.199 65.808 17.429 0 28.88-7.336 35.84-21.026v18.568h35.84V66.058h-35.84v19.149c-5.683-12.32-17.454-21.46-34.44-21.606zm9.113 29.423c14.675 0 23.483 10.236 23.483 27.647l.034 17.783c0 11.735-7.275 25.464-23.517 25.464-24.97 0-24.303-26.962-24.303-35.942 0-30.207 13.304-34.952 24.303-34.952zm75.641 35.299c0-15.131-.724-64.641 63.78-64.641 25.893 0 36.705 8.233 36.705 8.233l-8.69 26.953s-10.798-5.946-24.868-5.946c-18.021 0-29.52 10.447-29.52 28.828l.02 13.18c0 17.662 11.095 29.452 29.537 29.452 12.818 0 24.632-6.002 24.632-6.002l8.668 26.39s-9.886 8.285-36.303 8.285c-61.418 0-63.96-44.42-63.96-64.732zm310.628-64.688c34.941 0 51.179 26.282 51.179 63.59 0 46.998-20.737 65.808-51.2 65.808-17.429 0-30.313-7.335-37.273-21.026v18.568l-35.389-.014V3.786L510.083.509V83.52c5.423-14.523 23.245-19.885 35.11-19.885zm-10.534 29.389c-14.675 0-24.575 10.236-24.575 27.647l-.035 17.783c-.022 11.735 6.856 25.464 24.61 25.464 24.97 0 24.303-26.962 24.303-35.942 0-30.207-13.303-34.952-24.303-34.952zM400.243 63.738c-39.63 0-60.552 21.607-60.552 60.005v7.134c0 49.837 29.381 62.668 64.409 62.668 34.047 0 49.458-9.523 49.458-9.523l-7.031-25.36s-18.128 7.713-37.922 7.713c-20.52 0-29.345-5.23-31.607-24.95h79.564V121.08c0-41.652-23.481-57.343-56.32-57.343zm.955 25.394c13.718 0 22.607 8.412 22.119 27.921h-46.25c.802-20.533 10.388-27.92 24.131-27.92zm270.094-25.565c-40.697 0-62.122 22.934-62.122 64.033 0 56.39 36.932 65.467 62.19 65.467 36.976 0 61.576-19.907 61.576-64.955 0-46.887-27.66-64.545-61.644-64.545zm-.512 29.559c17.895 0 24.986 13.393 24.986 28.638v13.107c0 18.468-9.922 29.15-25.054 29.15-14.152 0-24.098-9.992-24.098-29.15v-13.107c0-20.432 11.835-28.638 24.166-28.638zm137.01-29.559c-40.697 0-62.122 22.934-62.122 64.033 0 56.39 36.932 65.467 62.19 65.467 36.975 0 61.576-19.907 61.576-64.955 0-46.887-27.661-64.545-61.644-64.545zm-.512 29.559c17.895 0 24.985 13.393 24.985 28.638v13.107c0 18.468-9.922 29.15-25.053 29.15-14.152 0-24.098-9.992-24.098-29.15v-13.107c0-20.432 11.835-28.638 24.166-28.638zm76.355 97.436V3.786L921.316.51v125.189l37.386-59.653h39.796l-39 61.783L1000 190.562h-39.909l-38.775-60.914v60.914z"
                      fill="#1877f2"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="regModal">
            {isLoginUser && <Afterlogin handleClose={handleClose} />}
          </div>
        )}
        {/* </Box> */}
      </Modal>
    </div>
  );
}
