import router from "next/router";
import React, { useState } from "react";
import AddNewAddress from "./AddNewAddress";
import AuthCheckoutForm from "./AuthCheckoutForm";

export default function AuthenticatedCheckout({
  isAddressSame,
  setisAddressSame,
  ShipmentID,
  BillingID,
  setShipmentID,
  setBilingAddressID,
checkoutError
}) {
  const [currentState, setState] = useState("default");
  const handlestate = () => {
    router.reload();
  };
  return (
    <>
      {currentState == "default" && (
        <AuthCheckoutForm
          handlestate={() => setState("AddNewAdd")}
          isAddressSame={isAddressSame}
          setisAddressSame={setisAddressSame}
          ShipmentID={ShipmentID}
          setShipmentID={setShipmentID}
          BillingID={BillingID}
          setBilingAddressID={setBilingAddressID}
          checkoutError={checkoutError}
        />
      )}
      {currentState == "AddNewAdd" && (
        <AddNewAddress handlestate={handlestate} />
      )}
    </>
  );
}
