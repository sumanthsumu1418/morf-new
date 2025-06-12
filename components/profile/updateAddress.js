import countries from "@/lib/countries";
import Select from "react-select";
import { useState } from "react";
import client from "../shared/client";
import { UPDATE_CUSTOMER_ADDRESS } from "graphql/productsqueries";

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
    width: "100%",
    marginBottom: "20px",
    fontFamily: "Helvetica",
    fontSize: "15px",

    "@media only screen and (max-width: 1600px)": {
      fontSize: "15px",
      width: "100%",
      height: "20px",
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
    fontSize: "15px",

    "@media only screen and (max-width: 1600px)": {
      fontSize: "15px",
      width: "100%",
    },
    "@media only screen and (min-width:601px) and (max-width: 1024px)": {
      width: "100%",
    },
  }),
  indicatorSeparator: (base, state) => ({
    display: "none",
  }),
  option: (base, state) => ({
    ...base,
    outline: "none",
    border: "none",
    cursor: "pointer",
    fontFamily: "Helvetica",
    padding: "15px 10px 15px 10px",

    "@media only screen and (max-width: 1600px)": {
      fontSize: "15px",
    },
    "&:hover": {
      color: "#0B0754",
      backgroundColor: "#fff",
    },
  }),
  menu: (base, state) => ({
    ...base,
    borderRadius: "0",
  }),
  singleValue: (base, state) => ({
    ...base,
    color: "#000",
    fontFamily: "Helvetica",
    fontSize: "20px",
    "@media only screen and (max-width: 1600px)": {
      fontSize: "12px",
      width: "80%",
    },
  }),
};

const UpdateAddress = ({ setAddressChangeModal, addressId }) => {
  const [saveAddress, setSaveAddress] = useState("");
  const [country, setCountry] = useState("");
  const [fullName, setFullName] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [flatNo, setFlatNo] = useState("");
  const [locality, setLocality] = useState("");
  const [pincode, setPincode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleAddressEditClick = async () => {
    const res = await client.mutate({
      mutation: UPDATE_CUSTOMER_ADDRESS,
      variables: {
        input: {
          id: addressId,
          fullName,
          company: saveAddress,
          streetLine1: flatNo,
          streetLine2: locality,
          city,
          province: state,
          postalCode: pincode,
          countryCode: country,
          phoneNumber,
        },
      },
    });
  };

  return (
    <div className="updateAddress">
      <div className="updateAddress--Top">
        <div
          classsName="updateAddress--Top--crossButton"
          onClick={() => {
            setAddressChangeModal(false);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32.719"
            height="32.719"
            viewBox="0 0 32.719 32.719"
          >
            <g
              id="Group_1679"
              data-name="Group 1679"
              transform="translate(16.359 -14.945) rotate(45)"
            >
              <line
                id="Line_1277"
                data-name="Line 1277"
                x2="44.271"
                transform="translate(0 22.135)"
                fill="none"
                stroke="#fff"
                strokeWidth="2"
              />
              <line
                id="Line_1278"
                data-name="Line 1278"
                x2="44.271"
                transform="translate(22.135 0) rotate(90)"
                fill="none"
                stroke="#fff"
                strokeWidth="2"
              />
            </g>
          </svg>
        </div>
      </div>

      <div className="updateAddress--Bottom">
        <div className="updateAddress--Bottom--Inputs">
          <input
            type="text"
            className="updateAddress--Bottom--Inputs--Input"
            placeholder="Save Address As (Home, Office Etc)"
            value={saveAddress}
            onChange={(e) => {
              setSaveAddress(e.target.value);
            }}
          />
          <input
            type="text"
            className="updateAddress--Bottom--Inputs--Input"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => {
              setFullName(e.target.value);
            }}
          />
          <input
            type="text"
            className="updateAddress--Bottom--Inputs--Input"
            placeholder="Flat No."
            value={flatNo}
            onChange={(e) => {
              setFlatNo(e.target.value);
            }}
          />
          <input
            type="text"
            className="updateAddress--Bottom--Inputs--Input"
            placeholder="Locality No."
            value={locality}
            onChange={(e) => {
              setLocality(e.target.value);
            }}
          />
          <input
            type="text"
            className="updateAddress--Bottom--Inputs--Input"
            placeholder="City"
            value={city}
            onChange={(e) => {
              setCity(e.target.value);
            }}
          />
          <input
            type="text"
            className="updateAddress--Bottom--Inputs--Input"
            placeholder="State"
            value={state}
            onChange={(e) => {
              setState(e.target.value);
            }}
          />
          <input
            type="text"
            className="updateAddress--Bottom--Inputs--Input"
            placeholder="Pincode"
            value={pincode}
            onChange={(e) => {
              setPincode(e.target.value);
            }}
          />
          <Select
            placeholder={"Select Your Country"}
            styles={customStyle}
            options={countries}
            onChange={(e) => {
              setCountry(e.value);
            }}
          />
          <input
            className="updateAddress--Bottom--Inputs--Input"
            placeholder="Phone Number"
            type="number"
            value={phoneNumber}
            maxLength={10}
            onChange={(e) => {
              setPhoneNumber(e.target.value);
            }}
          />
        </div>
        <div
          onClick={handleAddressEditClick}
          className="updateAddress--Bottom--Button"
        >
          <p> UPDATE ADDRESS </p>
        </div>
      </div>
    </div>
  );
};

export default UpdateAddress;
