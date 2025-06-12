import {
  CREATE_CUSTOMER_ADDRESS,
  CURRENT_USER_DATA,
  UPDATE_CUSTOMER_ADDRESS,
} from "graphql/productsqueries";
import { useState } from "react";
import Select from "react-select";
import client from "../shared/client";
import countries from "@/lib/countries";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "store/user/action";
import { toast } from "react-toastify";

const PersonalDetails = ({
  setAddressModal,
  setModalText,
  addressId,
  setIndex,
  setAddressId,
}) => {
  const [addressType, setAddressType] = useState("PERSONAL");
  const [country, setCountry] = useState(countries[0]);
  const [mobPrefix, setMobPrefix] = useState("+ 91");
  const Mobile = /^(\+\d{1,3}[- ]?)?\d{10}$/;
  const PINCODE = /^(\d{4}|\d{6})$/;
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({});
  const [errorTrigger, setErrorTrigger] = useState({});
  const setform = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
    // console.log(formData);
  };

  const errorMsg = "Please check this field!";
  const [pincodeError, setpincodeError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);

  const addresses = useSelector((state) => state.user?.userData?.addresses);
  useEffect(() => {
    if (addressId) {
      const currentEdit = addresses?.filter((item) => item.id == addressId);
      setFormData({
        saveAddress: currentEdit[0]?.company,
        city: currentEdit[0]?.city,
        flatNo: currentEdit[0]?.streetLine1,
        locality: currentEdit[0]?.streetLine2,
        pincode: currentEdit[0]?.postalCode,
        state: currentEdit[0]?.province,
        name: currentEdit[0]?.fullName,
        phone: currentEdit[0]?.phoneNumber,
      });
      setAddressType(currentEdit[0]?.company);

      const getCountry = countries.filter(
        (item) => item.label == currentEdit[0]?.country?.name
      );

      setCountry(getCountry);
    }
  }, [addressId]);

  const HandleUpdate = async () => {
    if (validateForm()) {
      const res = await client.mutate({
        mutation: UPDATE_CUSTOMER_ADDRESS,
        variables: {
          input: {
            id: addressId,
            fullName: formData?.name,
            company: formData?.saveAddress,
            streetLine1: formData?.flatNo,
            streetLine2: formData?.locality,
            city: formData?.city,
            province: formData?.state,
            postalCode: formData?.pincode,
            countryCode: country?.value,
            phoneNumber: formData?.phone,
          },
        },
      });
      //

      const {
        data: { activeCustomer },
      } = await client.query({
        query: CURRENT_USER_DATA,
      });
      dispatch(login(activeCustomer));
      setFormData({
        saveAddress: "",
        city: "",
        flatNo: "",
        locality: "",
        pincode: "",
        state: "",
        name: "",
        phone: "",
      });
      setErrorTrigger({});
      setPhoneError(false);
      setpincodeError(false);

      setIndex("ADDRESS BOOK");
      setAddressId(null);
      toast.success("Address Update successfully!!");
    }
  };

  const customStyle = {
    control: (base, state) => ({
      ...base,
      borderRadius: "0",
      outline: "none",
      border: "none",
      cursor: "pointer",
      backgroundColor: "#fff",
      boxShadow: "none",
      height: "45px",
      borderBottom: "1px solid black",
      width: "100%",
      fontFamily: "Helvetica",

      "@media only screen and (max-width: 1600px)": {
        fontSize: "20px",
        width: "100%",
        height: "20px",
      },
      "@media only screen and (min-width: 320px) and (max-width: 600px)": {
        fontSize: "15px",
      },
      "&:hover": {
        borderColor: "none",
      },
    }),
    placeholder: (base, state) => ({
      ...base,
      color: "#9B9B9B",
      backgroundColor: "#fff",
      fontFamily: "Helvetica",
      fontSize: "20px",

      "@media only screen and (max-width: 1600px)": {
        fontSize: "20px",
        width: "100%",
      },
      "@media only screen and (min-width:601px) and (max-width: 1024px)": {
        width: "100%",
      },
    }),
    indicatorSeparator: (base, state) => ({
      display: "none",
    }),
    dropdownIndicator: (base) => ({
      ...base,
      color: "#000",
      fontSize: "50px",
      scale: "1",
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
      fontFamily: "H-Bold",
      fontSize: "20px",
      outline: "none",
      marginLeft: "-8px",
      marginTop: " 5px",
      "@media only screen and (min-width:320px) and (max-width: 600px)": {
        fontSize: "15px",
      },
      "@media only screen and (min-width:601px) and (max-width: 1024px)": {
        fontSize: "18px",
      },
    }),
  };

  const countryOptions = countries;

  const validatePhone = (phone) => {
    if (phone?.match(Mobile)) return true;
    else return false;
  };
  const validatePincode = (pincode) => {
    if (pincode?.match(PINCODE)) return true;
    else return false;
  };
  const validateForm = (e) => {
    setErrorTrigger({
      city: true,
      flatNo: true,
      locality: false,
      name: true,
      phone: true,
      pincode: true,
      saveAddress: true,
      state: true,
    });
    if (
      formData?.city?.length &&
      formData?.flatNo?.length &&
      formData?.name?.length &&
      formData?.phone?.length &&
      formData?.pincode?.length &&
      formData?.saveAddress?.length &&
      formData?.state?.length &&
      validatePhone(formData?.phone) &&
      validatePincode(formData?.pincode)
    )
      return true;
    else {
      if (!validatePincode(formData?.pincode)) setpincodeError(true);
      else setpincodeError(false);
      if (!validatePhone(formData?.phone)) setPhoneError(true);
      else setPhoneError(false);
      return false;
    }
  };

  const handleSubmitClick = async () => {
    if (validateForm()) {
      const res = await client.mutate({
        mutation: CREATE_CUSTOMER_ADDRESS,
        variables: {
          input: {
            fullName: formData?.name,
            company: formData?.saveAddress,
            streetLine1: formData?.flatNo,
            streetLine2: formData?.locality,
            city: formData?.city,
            province: formData?.state,
            postalCode: formData?.pincode,
            countryCode: country?.value,
            phoneNumber: formData?.phone,
          },
        },
      });
      const {
        data: { activeCustomer },
      } = await client.query({
        query: CURRENT_USER_DATA,
      });
      dispatch(login(activeCustomer));
      setFormData({
        saveAddress: "",
        city: "",
        flatNo: "",
        locality: "",
        pincode: "",
        state: "",
        name: "",
        phone: "",
      });
      setErrorTrigger({});
      setPhoneError(false);
      setpincodeError(false);
      setModalText("Address");
      setAddressModal(true);
    }
  };

  return (
    <div className="personalDetails">
      <div className="detailsHeader">
        <p className="detailsHeading">PERSONAL DETAILS</p>
        <p className="detailsSubheading">
          You can access and modify your personal details (Name, billing
          address, contact number etc. ) in order to facilitate your future
          purchases and to notify us of any change in your contact details.
        </p>
        <div className="detailsHeaderDivider"></div>
      </div>
      <div className="AddressCheckoutDetails">
        <div className="detailsBody">
          <div className="First">
            <div
              className="personalContainer"
              onClick={() => setAddressType("PERSONAL")}
            >
              <div
                className={`circle ${
                  addressType === "PERSONAL" && "filledCircle"
                }`}
              ></div>
              <p
                style={{
                  color: addressType === "PERSONAL" ? "#000" : "#9B9B9B",
                }}
              >
                PERSONAL
              </p>
            </div>
            <div
              className="companyContainer"
              onClick={() => setAddressType("COMPANY")}
            >
              <div
                className={`circle ${
                  addressType === "COMPANY" && "filledCircle"
                }`}
              ></div>
              <p
                style={{
                  color: addressType === "COMPANY" ? "#000" : "#9B9B9B",
                }}
              >
                COMPANY
              </p>
            </div>
          </div>
          <div className="Second">
            <div className="firstLine">
              <div className="addressCategory">
                <p>
                  save Address As
                  <span className="error_text">
                    {!formData?.saveAddress &&
                      errorTrigger?.saveAddress &&
                      errorMsg}
                  </span>
                </p>
                <input
                  type="text"
                  name="saveAddress"
                  value={formData?.saveAddress}
                  onChange={(e) => {
                    setErrorTrigger({
                      ...errorTrigger,
                      [e.target.name]: true,
                    });
                    setform(e.target.name, e.target.value);
                  }}
                  placeholder="Home, Office etc."
                />
              </div>
              <div className="country">
                <p>
                  Country
                  <span className="error_text">
                    {!formData?.country && errorTrigger.country && errorMsg}
                  </span>
                </p>
                <Select
                  placeholder={"Select Your Country"}
                  styles={customStyle}
                  options={countryOptions}
                  value={country}
                  onChange={(e) => {
                    setErrorTrigger({
                      ...errorTrigger,
                      countryCode: true,
                    });
                    setCountry(e);
                  }}
                />
              </div>
            </div>
            <div className="secondLine">
              <div className="name">
                <p>
                  Name
                  <span className="error_text">
                    {!formData?.name && errorTrigger.name && errorMsg}
                  </span>
                </p>
                <input
                  type="text"
                  name="name"
                  value={formData?.name}
                  onChange={(e) => {
                    setErrorTrigger({
                      ...errorTrigger,
                      [e.target.name]: true,
                    });
                    setform(e.target.name, e.target.value);
                  }}
                  placeholder="Enter Name"
                />
              </div>
              <div className="state">
                <p>
                  State
                  <span className="error_text">
                    {!formData?.state && errorTrigger.state && errorMsg}
                  </span>
                </p>
                <input
                  type="text"
                  name="state"
                  value={formData?.state}
                  onChange={(e) => {
                    setErrorTrigger({
                      ...errorTrigger,
                      [e.target.name]: true,
                    });
                    setform(e.target.name, e.target.value);
                  }}
                  placeholder="Enter State"
                />
              </div>
            </div>
            <div className="thirdLine">
              <div className="address">
                <p>
                  Address
                  <span className="error_text">
                    {!formData?.flatNo && errorTrigger.flatNo && errorMsg}
                  </span>
                </p>
                <input
                  type="text"
                  name="flatNo"
                  value={formData?.flatNo}
                  onChange={(e) => {
                    setErrorTrigger({
                      ...errorTrigger,
                      [e.target.name]: true,
                    });
                    setform(e.target.name, e.target.value);
                  }}
                  placeholder="Flat No, Floor"
                />
                <input
                  type="text"
                  name="locality"
                  value={formData?.locality}
                  onChange={(e) => {
                    setErrorTrigger({
                      ...errorTrigger,
                      [e.target.name]: true,
                    });
                    setform(e.target.name, e.target.value);
                  }}
                  placeholder="Locality, Landmark etc."
                />
              </div>
              <div className="city">
                <p>
                  City
                  <span className="error_text">
                    {!formData?.city && errorTrigger.city && errorMsg}
                  </span>
                </p>
                <input
                  type="text"
                  name="city"
                  value={formData?.city}
                  onChange={(e) => {
                    setErrorTrigger({
                      ...errorTrigger,
                      [e.target.name]: true,
                    });
                    setform(e.target.name, e.target.value);
                  }}
                  placeholder="Enter City"
                />
              </div>
            </div>
            <div className="fourthLine">
              <div className="phoneNumber">
                <div className="prefix">
                  <p>Prefix</p>
                  <input
                    type="text"
                    value={mobPrefix}
                    maxLength={3}
                    placeholder="00"
                    onChange={(e) => {
                      setMobPrefix(e.target.value);
                    }}
                  />
                </div>
                <div className="number">
                  <p>
                    Mobile Number
                    <span className="error_text">
                      {((!formData?.phone && errorTrigger.phone) ||
                        phoneError) &&
                        errorMsg}
                    </span>
                  </p>
                  <input
                    type="text"
                    name="phone"
                    maxLength={10}
                    value={formData?.phone}
                    onChange={(e) => {
                      setErrorTrigger({
                        ...errorTrigger,
                        [e.target.name]: true,
                      });
                      setform(e.target.name, e.target.value);
                    }}
                    placeholder="Enter Mobile Number"
                  />
                </div>
              </div>
              <div className="pincode">
                <p>
                  Pincode
                  <span className="error_text">
                    {((!formData?.pincode && errorTrigger.pincode) ||
                      pincodeError) &&
                      errorMsg}
                  </span>
                </p>
                <input
                  type="text"
                  name="pincode"
                  value={formData?.pincode}
                  maxLength={6}
                  onChange={(e) => {
                    setErrorTrigger({
                      ...errorTrigger,
                      [e.target.name]: true,
                    });
                    setform(e.target.name, e.target.value);
                  }}
                  placeholder="Enter Area Pin Code"
                />
              </div>
            </div>
          </div>
          <div
            onClick={addressId ? HandleUpdate : handleSubmitClick}
            style={{
              backgroundColor:
                formData?.city?.length &&
                formData?.flatNo?.length &&
                formData?.name?.length &&
                formData?.phone?.length &&
                formData?.pincode?.length &&
                formData?.saveAddress?.length &&
                formData?.state?.length &&
                "#000000",
            }}
            className={`Third `}
          >
            <span className="saveAddress">
              {" "}
              {addressId ? "Update Address" : "Save Address"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalDetails;
