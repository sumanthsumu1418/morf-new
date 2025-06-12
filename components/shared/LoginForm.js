import React, { useState } from "react";
import client from "./client";
import {
  ACTIVE_ORDER,
  GET_USER_IDENTIFIER,
  ACTIVE_ORDER_FOR_BILLING,
  CURRENT_USER_DATA,
  Login_User,
  RESET_PASSWORD,
} from "graphql/productsqueries";
import { useDispatch } from "react-redux";
import {
  initialCart,
  initialOrderId,
  isLogin,
  login,
  setState,
} from "store/user/action";
import { toast } from "react-toastify";
import { signIn, signOut } from "next-auth/react";
import { addActiveOrdersToCart } from "uitlity";
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

function NormalLogin({ setstate, handleClose }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passError, setPassError] = useState(false);
  const togglePasswordVisibilty = () => {
    setShowPassword(showPassword ? false : true);
  };

  const dispatch = useDispatch();
  const checkEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };
  const passCheck = () => {
    if (checkEmail(email) && password != "") {
      setPassError(false);
      setError(false);
      return true;
    }
    if (password == "") {
      setPassError(true);
    } else setPassError(false);
    if (checkEmail(email) == false) setError(true);
    else setError(false);
    return false;
  };
  const [error, setError] = useState(false);

  const submitForm = async () => {
    if (!passCheck()) return;
    try {
      const res = await client.mutate({
        mutation: Login_User,
        variables: {
          username: email,
          password: password,
        },
      });

      if (res.data?.login?.__typename == "CurrentUser") {
        const {
          data: { activeCustomer },
        } = await client.query({
          query: CURRENT_USER_DATA,
        });
        const res = await signIn("credentials", {
          redirect: false,
          email: email,
          name: activeCustomer?.firstName,
          password: password,
          callbackUrl: `${window.location.origin}`,
        });
        if (!res.error) {
          //
          const {
            data: { activeOrder },
          } = await client.query({
            query: ACTIVE_ORDER,
          });
          const activeCart = addActiveOrdersToCart(activeOrder?.lines);
          dispatch(initialCart(activeCart));

          localStorage.setItem("cartLength", activeCart.length);
          dispatch({
            type: "CART_SIZE",
            payload: activeCart.length,
          });

          toast.success("Login Sucessfully");
          handleClose();
        } else {
          toast.error("invalid credentials");
        }
      } else {
        toast.error("Invalid Credentials");
      }
    } catch (err) {
      toast.error("some thing went wrong ");
    }
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
        {passError && "Please Check Password !"}
      </div>
      {/* <input
      className="inputDiv"
      placeholder={"Password"}
      type="password"
      style={{ backgroundColor: "white" }}
      onChange={(e) => setPassword(e.target.value)}
    /> */}
      <div className="passwordContainer">
        <input
          className="inputDiv"
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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

      <div
        className="common-btn-style loginButton"
        onClick={(e) => submitForm()}
      >
        <span>LOGIN</span>
      </div>
      <div className="forget_remove" onClick={() => setstate("ForgetPassword")}>
        <span
          style={{
            cursor: "pointer",
          }}
        >
          Forgot your password ?
        </span>
      </div>
    </div>
  );
}

function ForgetComponment({ setstate }) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
  const [ForgetMessage, setForgetMessage] = useState({
    type: "success",
    message: "",
  });
  const resetPassword = async () => {
    setForgetMessage({
      type: "success",
      message: "",
    });
    const checkEmail = (email) => {
      return String(email)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };

    if (checkEmail(email)) {
      const res = await client.mutate({
        mutation: RESET_PASSWORD,
        variables: {
          emailAddress: email,
        },
      });

      setstate("AfterForget");
    } else {
      setForgetMessage({
        type: "error",
        message: "please enter a valid email to reset your password",
      });
    }
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

      <div className="forgotPassText">
        {ForgetMessage.type == "success" ? (
          <p
            style={{
              fontSize: "15px",
              color: "green",
            }}
          >
            {ForgetMessage.message}
          </p>
        ) : (
          <p
            style={{
              fontSize: "15px",
              color: "red",
            }}
          >
            {ForgetMessage.message}
          </p>
        )}
      </div>
      <div className="loginButton" onClick={resetPassword}>
        Confirm
      </div>
    </div>
  );
}

function AfterForgetComponet({ setstate }) {
  return (
    <div
      style={{
        padding: "100px 0px  ",
      }}
    >
      <p
        style={{
          fontSize: "18px",
          lineHeight: "160%",
          fontFamily: "H-Regular",
        }}
      >
        We have sent a password reset link to your registered email address.
      </p>
    </div>
  );
}

const LoginForm = ({ handleClose, setstate, state }) => {
  const switchComponment = () => {
    switch (state) {
      case "signin":
        return <NormalLogin setstate={setstate} handleClose={handleClose} />;
      case "ForgetPassword":
        return <ForgetComponment setstate={setstate} />;
      case "AfterForget":
        return <AfterForgetComponet setstate={setstate} />;

      default:
        return <NormalLogin />;
    }
  };

  return switchComponment();
};

export default LoginForm;
