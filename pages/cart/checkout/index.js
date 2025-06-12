import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import BaseLayout from "components/layout/BaseLayout";
import Header from "@/components/shared/Header";
import Button from "@/components/Button";
import { useDispatch, useSelector } from "react-redux";
import LoaderForComponent from "uitlity/loaderForComponent";
import SEO from "@/components/layout/SEO";

import { toast } from "react-toastify";
import {
  initialCart,
  login,
  setState,
  userActionTypes,
} from "store/user/action";
import { useRouter, withRouter } from "next/router";
// import LoginModal from "./LoginModal";
import { isLogin } from "store/user/action";
import useRazorpay from "react-razorpay";
import Success from "@/components/success";
import { useSession } from "next-auth/react";
import { addActiveOrdersToCart, isUserAuthenticated } from "uitlity";
import GuestUserCheckout from "@/components/CheckoutForm/GuestUserCheckout";
import AuthenticatedCheckout from "@/components/CheckoutForm/AuthenticatedCheckout";
// REMOVE: nookies import
// REMOVE: LoaderLayout and EmptyCheckout imports
const DOLLAR_LATEST = 79.77;

const Checkout = () => {
  const [hostname, setHostname] = useState("");
  // Dummy cart/order data for static export
  const [activeOrder, setActiveOrder] = useState({
    lines: [
      { id: 1, name: "Product 1", price: 100, quantity: 1 },
      { id: 2, name: "Product 2", price: 200, quantity: 2 }
    ],
    discounts: [
      { code: "DUMMY10", amount: 50, description: "10% off" }
    ],
    couponCodes: ["DUMMY10"],
    subTotalWithTax: 500,
    totalWithTax: 450,
    shippingWithTax: 50
  });
  const [items, setitems] = useState([
    { id: 1, name: "Product 1", price: 100, quantity: 1 },
    { id: 2, name: "Product 2", price: 200, quantity: 2 }
  ]);
  const [currentOrder, setCurrentOrder] = useState({
    discounts: [
      { code: "DUMMY10", amount: 50, description: "10% off" }
    ],
    totalDiscounts: 50,
    subTotal: 500,
    Total: 450,
    shippingWithTax: 50
  });
  const [createAccCheckbox, setcreateAccCheckbox] = useState(false);
  const [createAnotherShipAdd, setcreateAnotherShipAdd] = useState(false);
  const [CuponSuccessMessage, setCuponSuccessMessage] = useState("");
  const [CuponErrorMessage, setCuponErrorMessage] = useState("");
  const [isAddressSame, setisAddressSame] = useState(true);
  const [ShipmentID, setShipmentID] = useState("");
  const [BilingAddressID, setBilingAddressID] = useState("");
  const [checkoutError, setcheckoutError] = useState("");

  const [formData, setFormData] = useState({});
  const [AnotherformData, setAnotherFormData] = useState({});
  const addresses = useSelector((state) => state?.user?.userData?.addresses);
  const router = useRouter();
  const Razorpay = useRazorpay();
  const [showSuccess, setshowSuccess] = useState(false);
  const dispatch = useDispatch();

  const CheckoutHandlerforGuestUser = async () => {
    setcheckoutError("");
    setCuponSuccessMessage("");
    setCuponErrorMessage("");
    const data = {
      fullName: formData.firstName + formData.lastName,
      streetLine1: formData.address,
      city: formData.city,
      province: formData.country,
      postalCode: formData.postcode,
      countryCode: "In",
      phoneNumber: formData.phone,
    };
    const Anotherdata = {
      fullName: AnotherformData.firstName + AnotherformData.lastName,
      streetLine1: AnotherformData.address,
      city: AnotherformData.city,
      province: AnotherformData.country,
      postalCode: AnotherformData.postcode,
      countryCode: "In",
      phoneNumber: AnotherformData.phone,
    };

    if (createAnotherShipAdd) {
      if (validateForm() && validateAnotherForm()) {
        AfterValidationrequest();
      } else setcheckoutError("Please Check All fields Again!");
    } else {
      if (validateForm()) {
        AfterValidationrequest();
      } else setcheckoutError("Please Check All fields Again!");
    }
  };

  const AfterValidationrequest = async () => {
    try {
      if (createAccCheckbox) {
        paymentHandller();
      } else {
        paymentHandller();
      }
    } catch (error) {
      setcheckoutError(error.message);
    }
  };

  const checkoutFormforAuthUser = async () => {
    try {
      setcheckoutError("");
      setCuponSuccessMessage("");
      setCuponErrorMessage("");
      if (!ShipmentID) throw new Error("Please Select the Shiping Address!");
      if (!BilingAddressID)
        throw new Error("Please Select the Biling Address!");
      const shippingAddress = addresses?.filter(
        (item) => item.id == ShipmentID
      );
      const billingAddress = addresses?.filter(
        (item) => item.id == BilingAddressID
      );
      if (!shippingAddress.length)
        throw new Error("Please Select the Shiping Address!");
      if (!billingAddress.length)
        throw new Error("Please Select the Billing Address!");
      //3.
      paymentHandller();
    } catch (error) {
      setcheckoutError(error.message);
    }
  };

  // Example dummy coupon handler
  const handleCupon = () => {
    setCuponErrorMessage("");
    setCuponSuccessMessage("");
    setcheckoutError("");
    if (couponCode === "DUMMY10") {
      setCuponSuccessMessage("Coupon applied successfully");
      setCurrentOrder((prev) => ({ ...prev, totalDiscounts: 50, Total: 450, discounts: [{ code: "DUMMY10", amount: 50, description: "10% off" }] }));
    } else {
      setCuponErrorMessage("Invalid coupon code!");
    }
  };
  // Example dummy remove coupon
  const handleRemoveCuponCode = (code) => {
    setCuponErrorMessage("");
    setCuponSuccessMessage("");
    setCurrentOrder((prev) => ({ ...prev, totalDiscounts: 0, discounts: [], Total: 500 }));
  };
  // Example dummy payment handler
  const paymentHandller = () => {
    setshowSuccess(true);
    setitems([]);
    setCurrentOrder({ discounts: [], totalDiscounts: 0, subTotal: 0, Total: 0, shippingWithTax: 0 });
  };

  const [currentCountry, setCurrentCountry] = useState([]);
  const setCountryCode = (selectedCountry) => {
    let countryCode = null;
    switch (selectedCountry.value) {
      case "India":
        // setCurrency("Rupee");
        countryCode = "IN";
        break;
      case "USA":
        // setCurrency("Dollar");
        countryCode = "US";
        break;
      case "Canada":
        countryCode = "CA";
        break;
      case "Japan":
        countryCode = "JP";
        break;
      default:
        break;
    }

    setFormData({
      ...formData,
      countryCode,
    });

    setCurrentCountry(selectedCountry);
  };
  const [currency, setCurrency] = useState("Rupee");
  const [emailError, setEmailError] = useState(false);
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
      setMailError(true);
      return false;
    }
  };
  const validateForm = (e) => {
    // if (e) e.preventDefault();
    // window.location.href("/payments");
    setErrorTrigger({});
    setErrorTrigger({
      firstName: true,
      lastName: true,
      address: true,
      city: true,
      country: true,
      postcode: true,
      countryCode: false,
      phone: true,
      email: true,
      pass: createAccCheckbox ? true : false,
    });
    if (
      formData?.firstName?.length &&
      formData?.lastName?.length &&
      formData?.address?.length &&
      formData?.city?.length &&
      formData?.postcode?.length &&
      formData?.phone?.length == 10 &&
      !isNaN(formData?.phone) &&
      validateEmail(formData.email ? formData.email : session.data?.email) &&
      (createAccCheckbox ? formData?.pass?.length : true)
    )
      return true;
    else {
      if (!validateEmail(formData.email)) setEmailError(true);
      else setEmailError(false);
      if (!(formData?.phone?.length == 10) || isNaN(formData?.phone))
        setPhoneError(true);
      else setPhoneError(false);
      return false;
    }
  };
  const validateAnotherForm = (e) => {
    // if (e) e.preventDefault();
    // window.location.href("/payments");
    setAnotherErrorTrigger({});
    setAnotherErrorTrigger({
      firstName: true,
      lastName: true,
      address: true,
      city: true,
      country: true,
      postcode: true,
      phone: true,
    });
    if (
      AnotherformData?.firstName?.length &&
      AnotherformData?.lastName?.length &&
      AnotherformData?.address?.length &&
      AnotherformData?.city?.length &&
      AnotherformData?.postcode?.length &&
      AnotherformData?.phone?.length == 10 &&
      !isNaN(AnotherformData?.phone)
    )
      return true;
    else {
      if (
        !(AnotherformData?.phone?.length == 10) ||
        isNaN(AnotherformData?.phone)
      )
        setAnotherPhoneError(true);
      else setAnotherPhoneError(false);
      return false;
    }
  };
  const session = useSession();

  const [phoneError, setPhoneError] = useState(false);
  const [AnotherphoneError, setAnotherPhoneError] = useState(false);
  const [errorTrigger, setErrorTrigger] = useState({});
  const [AnothererrorTrigger, setAnotherErrorTrigger] = useState({});
  const [couponCode, setcouponCode] = useState("");
  const [mailError, setMailError] = useState(false);
  const errorMsg = "Please check this field!";

  return (
    <>
      <SEO
        title="CHECKOUT - MORF"
        desc="Morf"
        pageUrl={hostname}
        ogImage="/images/og_img.png"
      />
      {/* <LoaderLayout> */}
      <Header />
      {/* <EmptyCheckout cart={items}> */}
      <section className="container checkout">
        <h1 className="checkout__heading">Checkout</h1>

        {session.status == "authenticated" && isUserAuthenticated() ? (
          <div></div>
        ) : (
          <div
            className="checkout__loginDiv"
            onClick={() => {
              localStorage.setItem("Checkout_Login_pop", true);
              dispatch({
                type: "OPEN_POPUP_LOGIN",
              });
            }}
          >
            <span className="returning"> Returning Customer? </span>
            <p className="loginText">Click here to login</p>
          </div>
        )}

        {showSuccess && (
          <Success
            message={"Payment Done Successfully"}
            route={session.status == "authenticated" ? "/profile" : null}
          />
        )}

        <div className="checkout__content">
          {session.status == "authenticated" && isUserAuthenticated() ? (
            <AuthenticatedCheckout
              isAddressSame={isAddressSame}
              setisAddressSame={setisAddressSame}
              ShipmentID={ShipmentID}
              setShipmentID={setShipmentID}
              setBilingAddressID={setBilingAddressID}
              BillingID={BilingAddressID}
              checkoutError={checkoutError}
            />
          ) : (
            <GuestUserCheckout
              setCountryCode={setCountryCode}
              currentCountry={currentCountry}
              formData={formData}
              setFormData={setFormData}
              emailError={emailError}
              phoneError={phoneError}
              setErrorTrigger={setErrorTrigger}
              errorTrigger={errorTrigger}
              errorMsg={errorMsg}
              createAccCheckbox={createAccCheckbox}
              setcreateAccCheckbox={setcreateAccCheckbox}
              createAnotherShipAdd={createAnotherShipAdd}
              setcreateAnotherShipAdd={setcreateAnotherShipAdd}
              checkoutError={checkoutError}
              AnotherformData={AnotherformData}
              setAnotherErrorTrigger={setAnotherErrorTrigger}
              setAnotherFormData={setAnotherFormData}
              AnothererrorTrigger={AnothererrorTrigger}
              AnotherphoneError={AnotherphoneError}
            />
          )}

          <div className="checkout__content--second">
            <div className="orderBox">
              <h3 className="orderBox-title"> Your Order </h3>

              <div className="orderBox-hrLine"></div>
              <div className="orderSummary">
                <p
                  style={{ color: "#000" }}
                  className="orderSummary-product"
                >
                  {" "}
                  Products ({items.length || 0}){" "}
                </p>

                <ul className="orderItemList">
                  {items?.map((item) => (
                    <li className="singleItem">
                      <p className="singleItem-itemName">{item?.name}</p>{" "}
                      <p className="singleItem-price">
                        {" "}
                        {currency == "Rupee" ? "₹" : "$"}
                        {currency == "Rupee"
                          ? (item.price * item.quantity).toFixed(2) / 100
                          : Math.round(
                              (item.price * item.quantity) /
                                (DOLLAR_LATEST * 100)
                            )}{" "}
                      </p>
                    </li>
                  ))}
                </ul>

                <ul className="orderTotal">
                  <li className="subTotal">
                    <p> Subtotal </p>
                    <p style={{ color: "#000" }}>
                      {" "}
                      {currency == "Rupee" ? "₹" : "$"}{" "}
                      {currency == "Rupee"
                        ? (
                            currentOrder?.subTotal -
                            currentOrder?.totalDiscounts
                          ).toFixed(2)
                        : Math.round(
                            (currentOrder?.subTotal -
                              currentOrder?.totalDiscounts) /
                              DOLLAR_LATEST
                          ).toFixed(2)}{" "}
                    </p>
                  </li>

                  {currentOrder?.discounts?.map((items) => {
                    return (
                      <li className="subTotal disCount">
                        <p>
                          {" "}
                          Discount {items?.code
                            ? `(${items?.code})`
                            : " "}{" "}
                        </p>
                        <div>
                          <p style={{ color: "#000" }}>
                            {" "}
                            {currency == "Rupee" ? "₹" : "$"}{" "}
                            {currency == "Rupee"
                              ? items?.amount?.toFixed(2)
                              : (items?.amount / DOLLAR_LATEST)?.toFixed(
                                  2
                                )}{" "}
                          </p>
                          <p
                            style={{
                              fontSize: "10px",
                              margin: "0px 0 0px 0px",
                              color: "crimson",
                              textAlign: "right",
                              cursor: "pointer",
                            }}
                            className="forget_remove2"
                            onClick={() =>
                              handleRemoveCuponCode(items?.code)
                            }
                          >
                            <span style={{ color: "crimson" }}>REMOVE</span>
                          </p>
                        </div>
                      </li>
                    );
                  })}
                  <li className="subTotal">
                    <p className="price">Shipping Charge</p>
                    <p style={{ color: "#000" }}>
                      {items.length ? (
                        <>
                          {currency == "Rupee" ? "₹" : "$"}{" "}
                          {currency == "Rupee"
                            ? (
                                Number(currentOrder?.shippingWithTax) / 100
                              )?.toFixed(2)
                            : (
                                Number(currentOrder?.shippingWithTax) /
                                (DOLLAR_LATEST * 100)
                              )?.toFixed(2)}{" "}
                        </>
                      ) : (
                        <>
                          {currency == "Rupee" ? "₹" : "$"}{" "}
                          {Number(0).toFixed(2)}
                        </>
                      )}
                    </p>
                  </li>
                </ul>

                <div className="totalPrice">
                  <p className="totalPrice-total"> Total </p>
                  <p className="totalPrice-price">
                    {" "}
                    {currency == "Rupee" ? "₹" : "$"}{" "}
                    {currency == "Rupee"
                      ? currentOrder?.Total?.toFixed(2)
                      : Math.round(
                          currentOrder?.Total?.toFixed(2) / DOLLAR_LATEST
                        )}{" "}
                  </p>
                </div>

                <div className="couponCode">
                  <input
                    className="couponCode-input"
                    type="text"
                    placeholder="Coupon Code"
                    value={couponCode}
                    onChange={(e) => setcouponCode(e.target.value)}
                  />
                  <button
                    className="couponCode-button"
                    onClick={handleCupon}
                    type="button"
                  >
                    {" "}
                    <span>Apply</span>
                  </button>
                </div>
                <div>
                  <p
                    style={{
                      fontSize: "12px",
                      color: "Red",
                      marginTop: CuponErrorMessage ? "10px" : null,
                    }}
                  >
                    {CuponErrorMessage}
                  </p>
                  <p
                    style={{
                      fontSize: "12px",
                      color: "Green",
                      marginTop: "10px",
                    }}
                  >
                    {CuponSuccessMessage}
                  </p>
                </div>
                <div>
                  <p className="error_text">{checkoutError}</p>
                </div>

                <div className="payment">
                  <Button
                    className="payment-Btn"
                    action="Proceed To payment"
                    onClick={(e) => {
                      if (items.length) {
                        if (
                          session.status == "authenticated" &&
                          isUserAuthenticated()
                        ) {
                          checkoutFormforAuthUser();
                        } else {
                          CheckoutHandlerforGuestUser();
                        }
                      } else {
                        setcheckoutError("Please add items to cart !");
                      }
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* </EmptyCheckout> */}
      {/* </LoaderLayout> */}
    </>
  );
};

export default Checkout;
