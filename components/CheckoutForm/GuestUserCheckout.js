import Select from "react-select";
import { useSession } from "next-auth/react";
import React, { useState } from "react";

const options = [
  {
    value: "India",
    label: "India",
  },
  {
    value: "USA",
    label: "USA",
  },
  {
    value: "Canada",
    label: "Canada",
  },
  {
    value: "Japan",
    label: "Japan",
  },
];

const customStyles = {
  control: (base, state) => ({
    ...base,
    borderRadius: "0",
    // borderColor: "#D3C5B0",
    outline: "none",
    border: "none",
    cursor: "pointer",
    backgroundColor: "#EBEBEB",
    boxShadow: "none",
    height: "45px",

    "&:hover": {
      borderColor: "none",
    },
  }),
  placeholder: (base, state) => ({
    ...base,
    color: "#7D7D7D",
    backgroundColor: "#EBEBEB",
    textTransform: "uppercase",
  }),
  indicatorSeparator: (base, state) => ({
    display: "none",
  }),
  option: (base, state) => ({
    ...base,
    outline: "none",
    border: "none",
    cursor: "pointer",
    fontFamily: "H-Light",
    color: state.isSelected ? "white" : "black",
    backgroundColor: state.isSelected ? "black" : "#F3F1F0",
    "&:hover": {
      color: "white",
      backgroundColor: "black",
    },
  }),
  menu: (base, state) => ({
    ...base,
    borderRadius: "0",
  }),
  singleValue: (base, state) => ({
    ...base,
    color: "#000",
    fontFamily: "H-Light",
    fontSize: "15px",
    outline: "none",
    "@media only screen and (min-width:320px) and (max-width: 600px)": {
      fontSize: "12px",
    },
    "@media only screen and (min-width:601px) and (max-width: 1024px)": {
      fontSize: "12px",
    },
  }),
};

export default function GuestUserCheckout({
  currentCountry,
  setCountryCode,
  formData,
  setFormData,
  emailError,
  phoneError,
  AnotherphoneError,
  setErrorTrigger,
  errorTrigger,
  errorMsg,
  createAccCheckbox,
  setcreateAccCheckbox,
  createAnotherShipAdd,
  setcreateAnotherShipAdd,
  checkoutError,
  AnothererrorTrigger,
  AnotherformData,
  setAnotherErrorTrigger,
  setAnotherFormData,
}) {
  // const [currentCountry, setcurrentCountry] = useState({
  //   value: "India",
  //   label: "India",
  // });
  const setform = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const setAnotherform = (name, value) => {
    setAnotherFormData({
      ...AnotherformData,
      [name]: value,
    });
  };

  const session = useSession();
  const isLoginUser = session.status == "authenticated";

  return (
    <>
      <div className="checkout__content--first">
        <h2 className="billingDetail"> Billing Detail </h2>
        <p className="error_text">{checkoutError}</p>

        <form className="checkoutForm">
          <div className="countryDiv">
            <label className="checkoutLabel">
              {" "}
              Country
              <span className="error_text">
                {!formData.countryCode && errorTrigger.countryCode && errorMsg}
              </span>
            </label>

            <Select
      options={options}
      closeMenuOnSelect={true}
      className="customSelect"
      placeholder="Select Country"
      value={currentCountry}
      styles={customStyles}
      onChange={(selectedOption) => {
        setErrorTrigger({
          ...errorTrigger,
          countryCode: true,
        });
        setCountryCode(selectedOption);
      }}
    />
          </div>

          <div className="nameDiv">
            <div className="firstNameDiv">
              <label className="checkoutLabel">
                {" "}
                First Name{" "}
                <span className="error_text">
                  {!formData.firstName && errorTrigger.firstName && errorMsg}
                </span>
              </label>
              <input
                className="inputDiv"
                type="text"
                name="firstName"
                onChange={(e) => {
                  setErrorTrigger({
                    ...errorTrigger,
                    [e.target.name]: true,
                  });
                  setform(e.target.name, e.target.value);
                }}
              />
            </div>
            <div className="firstNameDiv">
              <label className="checkoutLabel">
                {" "}
                Last Name
                <span className="error_text">
                  {!formData.lastName && errorTrigger.lastName && errorMsg}
                </span>
              </label>
              <input
                className="inputDiv"
                type="text"
                name="lastName"
                onChange={(e) => {
                  setErrorTrigger({
                    ...errorTrigger,
                    [e.target.name]: true,
                  });
                  setform(e.target.name, e.target.value);
                }}
              />
            </div>
          </div>

          <div className="addressDiv">
            <label className="checkoutLabel">
              {" "}
              Address{" "}
              <span className="error_text">
                {!formData.address && errorTrigger.address && errorMsg}
              </span>{" "}
            </label>
            <input
              className="inputDiv"
              type="text"
              name="address"
              onChange={(e) => {
                setErrorTrigger({
                  ...errorTrigger,
                  [e.target.name]: true,
                });
                setform(e.target.name, e.target.value);
              }}
            />
          </div>

          <div className="cityDiv">
            <label className="checkoutLabel">
              {" "}
              City/Town
              <span className="error_text">
                {!formData.city && errorTrigger.city && errorMsg}
              </span>{" "}
            </label>
            <input
              className="inputDiv"
              type="text"
              name="city"
              onChange={(e) => {
                setErrorTrigger({
                  ...errorTrigger,
                  [e.target.name]: true,
                });
                setform(e.target.name, e.target.value);
              }}
            />
          </div>

          <div className="nameDiv ">
            <div className="firstNameDiv">
              <label className="checkoutLabel">
                {" "}
                Country/State
                <span className="error_text">
                  {!formData.country && errorTrigger.country && errorMsg}
                </span>
              </label>

              <input
                className="inputDiv"
                type="text"
                name="country"
                onChange={(e) => {
                  setErrorTrigger({
                    ...errorTrigger,
                    [e.target.name]: true,
                  });
                  setform(e.target.name, e.target.value);
                }}
              />
            </div>

            <div className="firstNameDiv">
              <label className="checkoutLabel">
                {" "}
                Postcode/ZIP
                <span className="error_text">
                  {!formData.postcode && errorTrigger.postcode && errorMsg}
                </span>
              </label>
              <input
                className="inputDiv"
                type="text"
                name="postcode"
                onChange={(e) => {
                  setErrorTrigger({
                    ...errorTrigger,
                    [e.target.name]: true,
                  });
                  setform(e.target.name, e.target.value);
                }}
              />
            </div>
          </div>

          <div className="nameDiv contactDiv">
            {isLoginUser ? null : (
              <div className="firstNameDiv emailDiv">
                <label className="checkoutLabel">
                  {" "}
                  Email{" "}
                  <span className="error_text">
                    {((!formData.email && errorTrigger.email) || emailError) &&
                      errorMsg}
                  </span>
                </label>
                <input
                  className="inputDiv"
                  type="email"
                  name="email"
                  onChange={(e) => {
                    setErrorTrigger({
                      ...errorTrigger,
                      [e.target.name]: true,
                    });
                    setform(e.target.name, e.target.value);
                  }}
                />
              </div>
            )}
            <div className="firstNameDiv phoneDiv">
              <label className="checkoutLabel">
                {" "}
                Phone{" "}
                <span className="error_text">
                  {((!formData.phone && errorTrigger.phone) || phoneError) &&
                    errorMsg}
                </span>
              </label>
              <input
                className="inputDiv"
                type="text"
                name="phone"
                onChange={(e) => {
                  setErrorTrigger({
                    ...errorTrigger,
                    [e.target.name]: true,
                  });
                  setform(e.target.name, e.target.value);
                }}
              />
            </div>
          </div>

          {isLoginUser ? null : (
            <div className="createAccDiv">
              <div
                // ref={selectedRef}
                className={`checkBox ${createAccCheckbox ? "selected" : null}`}
                onClick={() => setcreateAccCheckbox(!createAccCheckbox)}
              >
                <span className="innerBox"> &nbsp; </span>
              </div>
              <span className="createAcc"> Create an account? </span>
            </div>
          )}
          {isLoginUser ? null : (
            <div className="passwordDiv">
              <label className="checkoutLabel"> Account Password </label>
              <span className="error_text">
                {errorTrigger.pass && errorMsg}
              </span>
              <input
                className="inputDiv"
                type="text"
                name="pass"
                onChange={(e) => {
                  setErrorTrigger({
                    ...errorTrigger,
                    [e.target.name]: true,
                  });
                  setform(e.target.name, e.target.value);
                }}
              />
            </div>
          )}

          <div className="createAccDiv anotherAddDiv">
            <div
              className={`checkBox ${createAnotherShipAdd ? "selected" : null}`}
              onClick={() => setcreateAnotherShipAdd(!createAnotherShipAdd)}
            >
              <span className="innerBox"> &nbsp; </span>
            </div>

            <span className="createAcc"> Ship to another address </span>
          </div>
        </form>

        {createAnotherShipAdd && (
          <>
            <h2 className="billingDetail"> Shipping Detail </h2>
            <p className="error_text">{checkoutError}</p>

            <form className="checkoutForm">
              <div className="nameDiv">
                <div className="firstNameDiv">
                  <label className="checkoutLabel">
                    {" "}
                    First Name{" "}
                    <span className="error_text">
                      {!AnotherformData.firstName &&
                        AnothererrorTrigger.firstName &&
                        errorMsg}
                    </span>
                  </label>
                  <input
                    className="inputDiv"
                    type="text"
                    name="firstName"
                    onChange={(e) => {
                      setAnotherErrorTrigger({
                        ...AnothererrorTrigger,
                        [e.target.name]: true,
                      });
                      setAnotherform(e.target.name, e.target.value);
                    }}
                  />
                </div>
                <div className="firstNameDiv">
                  <label className="checkoutLabel">
                    {" "}
                    Last Name
                    <span className="error_text">
                      {!AnotherformData.lastName &&
                        AnothererrorTrigger.lastName &&
                        errorMsg}
                    </span>
                  </label>
                  <input
                    className="inputDiv"
                    type="text"
                    name="lastName"
                    onChange={(e) => {
                      setAnotherErrorTrigger({
                        ...AnothererrorTrigger,
                        [e.target.name]: true,
                      });
                      setAnotherform(e.target.name, e.target.value);
                    }}
                  />
                </div>
              </div>

              <div className="addressDiv">
                <label className="checkoutLabel">
                  {" "}
                  Address{" "}
                  <span className="error_text">
                    {!AnotherformData.address &&
                      AnothererrorTrigger.address &&
                      errorMsg}
                  </span>{" "}
                </label>
                <input
                  className="inputDiv"
                  type="text"
                  name="address"
                  onChange={(e) => {
                    setAnotherErrorTrigger({
                      ...AnothererrorTrigger,
                      [e.target.name]: true,
                    });
                    setAnotherform(e.target.name, e.target.value);
                  }}
                />
              </div>

              <div className="cityDiv">
                <label className="checkoutLabel">
                  {" "}
                  City/Town
                  <span className="error_text">
                    {!AnotherformData.city &&
                      AnothererrorTrigger.city &&
                      errorMsg}
                  </span>{" "}
                </label>
                <input
                  className="inputDiv"
                  type="text"
                  name="city"
                  onChange={(e) => {
                    setAnotherErrorTrigger({
                      ...AnothererrorTrigger,
                      [e.target.name]: true,
                    });
                    setAnotherform(e.target.name, e.target.value);
                  }}
                />
              </div>

              <div className="nameDiv ">
                <div className="firstNameDiv">
                  <label className="checkoutLabel">
                    {" "}
                    Country/State
                    <span className="error_text">
                      {!AnotherformData.country &&
                        AnothererrorTrigger.country &&
                        errorMsg}
                    </span>
                  </label>

                  <input
                    className="inputDiv"
                    type="text"
                    name="country"
                    onChange={(e) => {
                      setAnotherErrorTrigger({
                        ...AnothererrorTrigger,
                        [e.target.name]: true,
                      });
                      setAnotherform(e.target.name, e.target.value);
                    }}
                  />
                </div>

                <div className="firstNameDiv">
                  <label className="checkoutLabel">
                    {" "}
                    Postcode/ZIP
                    <span className="error_text">
                      {!AnotherformData.postcode &&
                        AnothererrorTrigger.postcode &&
                        errorMsg}
                    </span>
                  </label>
                  <input
                    className="inputDiv"
                    type="text"
                    name="postcode"
                    onChange={(e) => {
                      setAnotherErrorTrigger({
                        ...AnothererrorTrigger,
                        [e.target.name]: true,
                      });
                      setAnotherform(e.target.name, e.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="firstNameDiv phoneDiv">
                <label className="checkoutLabel">
                  {" "}
                  Phone{" "}
                  <span className="error_text">
                    {((!AnotherformData.phone && AnothererrorTrigger.phone) ||
                      AnotherphoneError) &&
                      errorMsg}
                  </span>
                </label>
                <input
                  className="inputDiv"
                  type="text"
                  name="phone"
                  onChange={(e) => {
                    setAnotherErrorTrigger({
                      ...AnothererrorTrigger,
                      [e.target.name]: true,
                    });
                    setAnotherform(e.target.name, e.target.value);
                  }}
                />
              </div>
            </form>
          </>
        )}
      </div>
    </>
  );
}
