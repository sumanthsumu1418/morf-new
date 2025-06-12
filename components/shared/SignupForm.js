import React, { useState } from "react";
import { ApolloClient, InMemoryCache, useMutation } from "@apollo/client";
import { REGISTER_USER, Login_User } from "graphql/productsqueries";
import client from "./client";
import { toast } from "react-toastify";
import Link from "next/link";
import router from "next/router";
const ToastNotify = (props) => {
  switch (props) {
    case "CurrentUser":
      return toast.success("Success");
      break;
    case "InvalidCredentialsError":
      toast.error("Kindly Check All Fields Again");
      break;
    case "NotVerifiedError":
      toast.error("User not Verified");
      break;
    case "Success":
      return toast.success("Success");
      break;
    case "MissingPasswordError":
      toast.error("Password Field Missing!");
      break;
    case "PasswordValidationError":
      toast.error("Password error!");
      break;
  }
};
const SignupForm = ({ handleClose, setForm }) => {
  const [pass, setPass] = useState("");
  const [email, setEmail] = useState("");
  const [confmPass, setConfmPass] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfPass, setShowConfPass] = useState(false);

  const [termUse, setTermsUse] = useState(false);

  const [termUseError, setTermUseError] = useState(false);

  const togglePasswordVisibilty = () => {
    setShowPassword(showPassword ? false : true);
  };

  const toggleConfPasswordVisibilty = () => {
    setShowConfPass(showConfPass ? false : true);
  };

  // const [signup] = useMutation(REGISTER_USER);
  // newtest2343
  const [error, setError] = useState(false);

  const handleTermsClick = () => {
    setTermsUse(!termUse);
  };

  const submitForm = async () => {
    if (!passCheck()) return;
    if (!termUse) {
      setTermUseError(true);
      return;
    }
    try {
      const res = await client.mutate({
        mutation: REGISTER_USER,
        variables: {
          input: {
            emailAddress: email,
            password: pass,
            firstName: email.split("@")[0],
          },
        },
      });
      setForm("signin");
      ToastNotify(res?.data?.registerCustomerAccount?.__typename);
    } catch (err) {
      if (err) console.log("error ", err);
    }
    // signup({
    //   variables: {
    //     email: email,
    //     password: pass,
    //     username: email.substr(0, email.indexOf("@")),
    //   },
    // });
  };
  const checkEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };
  const validateEmail = (email) => {
    if (checkEmail(email)) return true;
    else {
      setError(true);
      return false;
    }
  };
  const [passError, setPassError] = useState(false);
  const passCheck = () => {
    if (pass === confmPass && validateEmail(email) && pass != "") {
      return true;
    }
    if (pass == "" || pass != confmPass) {
      setPassError(true);
    } else setPassError(false);
    if (validateEmail(email) == false) setError(true);
    else setError(false);
    return false;
  };
  return (
    <div>
      <div className="error_text login-form">
        {error && "Please Check Email !"}
      </div>
      <input
        className="inputDiv"
        placeholder={"Email"}
        style={{ backgroundColor: "white", marginBottom: "8px" }}
        onChange={(e) => setEmail(e.target.value)}
      />
      <div className="error_text login-form">
        {passError && "Please Check Passwords !"}
      </div>

      <div className="passwordContainer" style={{ marginBottom: "0" }}>
        <input
          className="inputDiv"
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          style={{ marginTop: "0px", marginBottom: "0px" }}
        />
        {!showPassword ? (
          <span onClick={togglePasswordVisibilty}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30.484"
              height="24.69"
              viewBox="0 0 30.484 24.69"
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

      <div className="passwordContainer" style={{ marginTop: "23px" }}>
        <input
          className="inputDiv"
          type={showConfPass ? "text" : "password"}
          placeholder="Confirm Password"
          value={confmPass}
          onChange={(e) => setConfmPass(e.target.value)}
          style={{ marginTop: "0px", marginBottom: "0px" }}
        />
        {!showConfPass ? (
          <span onClick={toggleConfPasswordVisibilty}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30.484"
              height="24.69"
              viewBox="0 0 30.484 24.69"
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
          <span onClick={toggleConfPasswordVisibilty}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30.484"
              height="17.392"
              viewBox="0 0 30.484 17.392"
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

      <div className="termsCondition" onClick={handleTermsClick}>
        {termUseError && (
          <p style={{ color: "red", fontSize: "10px" }}>
            Please agree with Terms Of Use and Privacy Policy to continue
          </p>
        )}

        {/* <div style={{ display: "flex" }}>
          <div
            style={{ backgroundColor: termUse === true ? "#000" : "#fff" }}
            className="termsCheckBox"
          ></div>

          <p className="termsCheckText">
            By Signing up, you agree to the{" "}
           
              <p onClick={()=>router.route("/shipping-info?id=4")} style={{ textDecoration: "none", color: "black" }}>
                {" "}
                <span>TERMS OF USE</span>{" "}
              </p>
            
            &nbsp;&&nbsp;
            
              <p onClick={()=>router.route("/shipping-info?id=4")} style={{ textDecoration: "none", color: "black" }}>
                <span>Privacy policy</span>
              </p>
          </p>
        </div> */}
        <div style={{ display: "flex" }}>
          <div
            style={{ backgroundColor: termUse === true ? "#000" : "#fff" }}
            className="termsCheckBox"
          ></div>

          <p className="termsCheckText">
            By Signing up, you agree to the{" "}
            <Link href="/shipping-info?id=4">
              <a
                targert="blank"
                style={{ textDecoration: "none", color: "black" }}
              >
                {" "}
                <span>TERMS OF USE</span>{" "}
              </a>
            </Link>{" "}
            &nbsp;&&nbsp;
            <Link href="/shipping-info?id=3">
              <a
                targert="blank"
                style={{ textDecoration: "none", color: "black" }}
              >
                <span>Privacy policy</span>
              </a>
            </Link>
          </p>
        </div>
      </div>
      <div
        style={{ marginBottom: "25px" }}
        className="loginButton common-btn-style"
        onClick={(e) => submitForm()}
      >
        <span>SIGN UP</span>
      </div>
    </div>
  );
};

export default SignupForm;
