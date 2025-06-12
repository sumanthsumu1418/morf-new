import BaseLayout from "@/components/layout/BaseLayout";
import client from "@/components/shared/client";
import { RESET_PASSWORD_WITH_TOKEN } from "graphql/productsqueries";
import { useSession } from "next-auth/react";
import router from "next/router";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Success from "@/components/success";
import { isUserAuthenticated } from "uitlity";
import SEO from "@/components/layout/SEO";

export default function Passwordreset() {
  const [hostname, setHostname] = useState("");
  const [password, setpassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [errorPassword, seterrorPassword] = useState("");
  const [passworderror, setpassworderror] = useState("");
  const [passwordConfirmerror, setpasswordConfirerror] = useState("");
  const [showSuccess, setshowSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [open, setopen] = useState(true);
  const dispatch = useDispatch();

  const session = useSession();
  const handlePassword = async () => {
    seterrorPassword("");
    if (router.query?.token) {
      setpassworderror("");

      setpasswordConfirerror("");
      if (!password.length) {
        setpassworderror("Please enter a valid password!");
        return;
      }
      if (!confirmPassword.length) {
        setpasswordConfirerror("Please enter a valid confirm password!");
        return;
      }
      if (password !== confirmPassword) {
        seterrorPassword("Password & confirm password do not match!");
        return;
      }
      const res = await client.mutate({
        mutation: RESET_PASSWORD_WITH_TOKEN,
        variables: {
          token: router.query?.token,
          password: password,
        },
      });
      if (res.data.resetPassword?.__typename == "CurrentUser") {
        setshowSuccess(true);
        setopen(false);
        if (session.status == "unauthenticated" && isUserAuthenticated()) {
          setTimeout(() => {
            {
              dispatch({
                type: "OPEN_POPUP_LOGIN",
              });
            }
            router.replace("/");
          }, 1000);
        } else {
          setTimeout(() => {
            router.replace("/profile");
          }, 1000);
        }
      } else {
        seterrorPassword(res.data.resetPassword?.message);
      }
    } else {
      seterrorPassword("Invalid Request ");
    }
  };

  const togglePasswordVisibilty = () => {
    setShowPassword(showPassword ? false : true);
  };
  const togglePasswordVisibilty2 = () => {
    setShowPassword2(showPassword2 ? false : true);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      setHostname(window?.location?.href);
    }
  }, []);

  return (
    <>
      <SEO
        title="PASSWORD RESET - MORF"
        desc="Morf"
        pageUrl={hostname}
        ogImage="/images/og_img.png"
      />
      {showSuccess && (
        <Success message={"Your password have been reset successfully."} />
      )}
      <div
        style={{ backgroundColor: "#000" }}
        className="MuiModal-root css-79ws1d-MuiModal-root"
      >
        <div style={{ transition: "all 0.4s" }} className="loaderWrappers">
          <div className="logo">
            <img src="/icons/morf.svg" className="morf" alt="morf-logo" />
          </div>{" "}
          <div className="loader-container">
            <div className="regModalContainer">
              {/* <div className="regModalClose" >
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
            </div> */}

              <div className="regModal">
                <div className="sign_in-up" role="button">
                  <span
                    onClick={() => {}}
                    className={`sign_in-up--span textBlack `}
                  >
                    Reset Password
                  </span>
                </div>
                <div>
                  <p className="error_text">{passworderror}</p>
                  <p className="error_text">{passwordConfirmerror}</p>
                  <p className="error_text">{errorPassword}</p>
                  <div className="passwordContainer">
                    <input
                      className="inputDiv"
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setpassword(e.target.value)}
                      style={{ marginTop: "0px", marginBottom: "0px" }}
                    />

                    {!showPassword ? (
                      <span onClick={togglePasswordVisibilty}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="30.484"
                          height="24.69"
                          viewBox="0 0 30.484 24.69"
                          style={{ scale: "0.8" }}
                        >
                          <g transform="translate(-667 -691.467)">
                            <g transform="translate(-871.133 -256.225)">
                              <path
                                d="M1568.421,960.469c-4.074,5.086-9.32,8.149-15.047,8.149s-10.972-3.062-15.045-8.147a.875.875,0,0,1,0-1.1c8.677-10.855,21.467-10.855,30.094,0a.875.875,0,0,1,0,1.1Zm-15.046-7.06a6.512,6.512,0,1,1-6.512,6.512,6.512,6.512,0,0,1,6.512-6.512Z"
                                transform="translate(0 0)"
                                fill-rule="evenodd"
                                fill="#C1C1C1"
                              />
                              <path
                                d="M2217.377,1212.826a4.562,4.562,0,0,1,.961.1,1.879,1.879,0,1,0,2.915,2.063,4.551,4.551,0,1,1-3.876-2.165Z"
                                transform="translate(-664.002 -257.456)"
                                fill-rule="evenodd"
                                fill="#C1C1C1"
                              />
                            </g>
                            <g transform="translate(-6.536 0.5)">
                              <path
                                d="M676.536,12301l23.918,23.624"
                                transform="translate(-2 -11609.5)"
                                fill="none"
                                stroke="#C1C1C1"
                                stroke-width="1.5"
                              />
                              <path
                                d="M676.536,12301l22.629,22.478"
                                transform="translate(0 -11609.5)"
                                fill="none"
                                stroke="#C1C1C1"
                                stroke-width="1.5"
                              />
                            </g>
                          </g>
                        </svg>
                      </span>
                    ) : (
                      <span onClick={togglePasswordVisibilty}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="30.484"
                          height="17.392"
                          viewBox="0 0 30.484 17.392"
                          style={{ scale: "0.8" }}
                        >
                          <g transform="translate(-1538.133 -951.225)">
                            <path
                              d="M1568.421,960.469c-4.074,5.086-9.32,8.149-15.047,8.149s-10.972-3.062-15.045-8.147a.875.875,0,0,1,0-1.1c8.677-10.855,21.467-10.855,30.094,0a.875.875,0,0,1,0,1.1Zm-15.046-7.06a6.512,6.512,0,1,1-6.512,6.512,6.512,6.512,0,0,1,6.512-6.512Z"
                              transform="translate(0 0)"
                              fill-rule="evenodd"
                              fill="#C1C1C1"
                            />
                            <path
                              d="M2217.377,1212.826a4.562,4.562,0,0,1,.961.1,1.879,1.879,0,1,0,2.915,2.063,4.551,4.551,0,1,1-3.876-2.165Z"
                              transform="translate(-664.002 -257.456)"
                              fill-rule="evenodd"
                              fill="#C1C1C1"
                            />
                          </g>
                        </svg>
                      </span>
                    )}
                  </div>

                  <div className="passwordContainer">
                    <input
                      className="inputDiv"
                      type={showPassword2 ? "text" : "password"}
                      placeholder="Confirm  Password"
                      value={confirmPassword}
                      onChange={(e) => setconfirmPassword(e.target.value)}
                      style={{ marginTop: "0px", marginBottom: "0px" }}
                    />
                    {!showPassword2 ? (
                      <span onClick={togglePasswordVisibilty2}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="30.484"
                          height="24.69"
                          viewBox="0 0 30.484 24.69"
                          style={{ scale: "0.8" }}
                        >
                          <g transform="translate(-667 -691.467)">
                            <g transform="translate(-871.133 -256.225)">
                              <path
                                d="M1568.421,960.469c-4.074,5.086-9.32,8.149-15.047,8.149s-10.972-3.062-15.045-8.147a.875.875,0,0,1,0-1.1c8.677-10.855,21.467-10.855,30.094,0a.875.875,0,0,1,0,1.1Zm-15.046-7.06a6.512,6.512,0,1,1-6.512,6.512,6.512,6.512,0,0,1,6.512-6.512Z"
                                transform="translate(0 0)"
                                fill-rule="evenodd"
                                fill="#C1C1C1"
                              />
                              <path
                                d="M2217.377,1212.826a4.562,4.562,0,0,1,.961.1,1.879,1.879,0,1,0,2.915,2.063,4.551,4.551,0,1,1-3.876-2.165Z"
                                transform="translate(-664.002 -257.456)"
                                fill-rule="evenodd"
                                fill="#C1C1C1"
                              />
                            </g>
                            <g transform="translate(-6.536 0.5)">
                              <path
                                d="M676.536,12301l23.918,23.624"
                                transform="translate(-2 -11609.5)"
                                fill="none"
                                stroke="#C1C1C1"
                                stroke-width="1.5"
                              />
                              <path
                                d="M676.536,12301l22.629,22.478"
                                transform="translate(0 -11609.5)"
                                fill="none"
                                stroke="#C1C1C1"
                                stroke-width="1.5"
                              />
                            </g>
                          </g>
                        </svg>
                      </span>
                    ) : (
                      <span onClick={togglePasswordVisibilty2}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="30.484"
                          height="17.392"
                          viewBox="0 0 30.484 17.392"
                          style={{ scale: "0.8" }}
                        >
                          <g transform="translate(-1538.133 -951.225)">
                            <path
                              d="M1568.421,960.469c-4.074,5.086-9.32,8.149-15.047,8.149s-10.972-3.062-15.045-8.147a.875.875,0,0,1,0-1.1c8.677-10.855,21.467-10.855,30.094,0a.875.875,0,0,1,0,1.1Zm-15.046-7.06a6.512,6.512,0,1,1-6.512,6.512,6.512,6.512,0,0,1,6.512-6.512Z"
                              transform="translate(0 0)"
                              fill-rule="evenodd"
                              fill="#C1C1C1"
                            />
                            <path
                              d="M2217.377,1212.826a4.562,4.562,0,0,1,.961.1,1.879,1.879,0,1,0,2.915,2.063,4.551,4.551,0,1,1-3.876-2.165Z"
                              transform="translate(-664.002 -257.456)"
                              fill-rule="evenodd"
                              fill="#C1C1C1"
                            />
                          </g>
                        </svg>
                      </span>
                    )}
                  </div>
                  <div></div>
                  <div
                    onClick={handlePassword}
                    className={`loginButton ${
                      confirmPassword && password
                        ? "submitBlack common-btn-style"
                        : "common-btn-style"
                    } `}
                  >
                    <span>Confirm</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
