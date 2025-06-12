import { CURRENT_USER_DATA } from "graphql/productsqueries";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "store/user/action";
import client from "../shared/client";
import Select from "react-select";
import { useSession } from "next-auth/react";
import Button from "../Button";

function DeliveryAddressComponment(props) {
  return (
    <div className="secondheader">
      {" "}
      <div className="addressBody">
        <div className="addressList">
          {props.AddressBook?.length > 0
            ? props.AddressBook?.map((e) => (
                <div
                  key={e.id}
                  className="addressSingleContainer"
                  style={{
                    backgroundColor: props.SelectedID == e.id ? "black" : null,
                    color: props.SelectedID == e.id ? "white" : null,
                  }}
                >
                  <div className="addressSingle">
                    <div className="addressDetails">
                      <div className="addressName">
                        <p
                          style={{
                            color: props.SelectedID == e.id ? "#fff" : null,
                          }}
                        >
                          {e?.company}
                        </p>
                      </div>
                      <div className="addressComplete">
                        <p
                          style={{
                            color: props.SelectedID == e.id ? "#fff" : null,
                          }}
                        >
                          {e?.streetLine1}, {e?.streetLine2}
                        </p>
                        <p
                          style={{
                            color: props.SelectedID == e.id ? "#fff" : null,
                          }}
                        >
                          {e?.province}, {e?.city}, {e?.country?.name},{" "}
                          {e?.postalCode}
                        </p>
                      </div>
                      <div className="addressMobile">
                        <p
                          style={{
                            color: props.SelectedID == e.id ? "#fff" : null,
                          }}
                        >
                          {e?.phoneNumber}
                        </p>
                      </div>
                    </div>
                    <div className="addressButtons">
                      <div
                        style={{
                          display: props.SelectedID == e.id ? "none" : null,
                        }}
                        onClick={() => {
                          props?.setSelectedID(e.id);
                        }}
                        className="addressEditButton common-btn-style-alt"
                      >
                        <span>Deliver here</span>
                      </div>
                    </div>
                  </div>
                  <div className="addressDividerLine"></div>
                </div>
              ))
            : <div className="notFoundAddress">
            <div className="notFoundIcon">
              <svg
                width="57.799"
                height="51.939"
                viewBox="0 0 57.799 51.939"
              >
                <g
                  id="Group_6407"
                  data-name="Group 6407"
                  transform="translate(-945.5 -526.97)"
                >
                  <path
                    id="Path_4529"
                    data-name="Path 4529"
                    d="M955.483,536.991a2.491,2.491,0,1,1-2.491-2.491A2.492,2.492,0,0,1,955.483,536.991Zm0,9.965a2.491,2.491,0,1,1-2.491-2.491A2.492,2.492,0,0,1,955.483,546.957Zm-2.491,12.457a2.491,2.491,0,1,0-2.491-2.491A2.492,2.492,0,0,0,952.991,559.413Z"
                    transform="translate(4.965 7.478)"
                  />
                  <path
                    id="Path_4530"
                    data-name="Path 4530"
                    d="M998.376,576.8,948.549,526.97l-2.113,2.113,4.923,4.923h-1.873a3.985,3.985,0,0,0-3.986,3.986v31.889a3.985,3.985,0,0,0,3.986,3.986h41.735l5.042,5.042Zm-10.145-5.919-4.983-4.983H967.424V562.9h12.835l-6.976-6.976h-5.86v-2.99h2.87L954.349,537h-4.863a1,1,0,0,0-1,1v31.889a1,1,0,0,0,1,1Z"
                    transform="translate(0 0)"
                    fill-rule="evenodd"
                  />
                  <path
                    id="Path_4531"
                    data-name="Path 4531"
                    d="M956.957,535l2.956,2.99h20.05V535Zm23.006,9.965H966.809l2.956,2.99h10.2Zm0,9.965h-3.3l2.956,2.99h.347Z"
                    transform="translate(11.377 7.974)"
                  />
                  <path
                    id="Path_4532"
                    data-name="Path 4532"
                    d="M992.352,567.372H988.96l2.954,2.99h.438a3.985,3.985,0,0,0,3.986-3.986V534.486a3.985,3.985,0,0,0-3.986-3.986H952.509l2.956,2.99h36.888a1,1,0,0,1,1,1v31.889A1,1,0,0,1,992.352,567.372Z"
                    transform="translate(6.96 3.506)"
                  />
                </g>
              </svg>
            </div>
            <div className="notFoundText">
              <p>No Address  have been found.</p>
             
            </div>
            
          </div>}
        </div>
        <div className="bottom_button">
          <div onClick={props.handlestate} className="newAdd common-btn-style">
            <span>ADD A NEW ADDRESS</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AuthCheckoutForm({
  handlestate,
  isAddressSame,
  setisAddressSame,
  ShipmentID,
  BillingID,
  setShipmentID,
  setBilingAddressID,
  checkoutError
  
}) {
  const [AddressBook, setAddressBook] = useState([]);
  const [AddressState, setAddressState] = useState("Shiping");
  const user = useSelector((state) => state.user.userData);
  const dispatch = useDispatch();
  const session = useSession();

  // const AddressReverse = [...addresses].reverse();
  useEffect(() => {
   
    setAddressBook(
      [
        ...(user?.addresses ? user?.addresses : []),
      ].reverse()
    );
   
  }, [user]);
  

  return (
    <div>
      <div className="checkout__content--rightone">
        <div className="firstheader">
          <p className="top">
            <span>Welcome </span>
            <span style={{textTransform:"capitalize",color:"black"}}>{user?.firstName}</span>, Please select an address to proceed.
          </p>
          <div className="bottom">
            <p>Are billing address and delivery address same?</p>
            
            <div className="options">
              <div className="createAccDiv">
                <div
                  // ref={selectedRef}
                  className={`checkBox ${isAddressSame ? "selected" : null}`}
                  onClick={() => {
                    setBilingAddressID("");
                    setShipmentID("");
                    setisAddressSame(!isAddressSame);
                  }}
                >
                  <span className="innerBox"> &nbsp; </span>
                </div>
                <span
                  className="createAcc"
                  style={{
                    marginRight: "15px",
                  }}
                >
                  {" "}
                  Yes{" "}
                </span>
              </div>
              <div className="createAccDiv">
                <div
                  // ref={selectedRef}
                  className={`checkBox ${isAddressSame ? null : "selected"}`}
                  onClick={() => {
                    setBilingAddressID("");
                    setShipmentID("");
                    setisAddressSame(!isAddressSame);
                  }}
                >
                  <span className="innerBox"> &nbsp; </span>
                </div>
                <span className="createAcc"> No </span>
              </div>
            </div>
          </div>
         <div style={{marginBottom:"5px"}}> <p className="error_text">{checkoutError}</p></div>
        </div>
        {isAddressSame ? (
          <div className="secondheader">
            {" "}
            <div className="addressBody">
              <div className="addressList">
                {AddressBook?.length > 0
                  ? AddressBook?.map((e) => (
                      <div
                        key={e.id}
                        className="addressSingleContainer"
                        style={{
                          backgroundColor: ShipmentID == e.id ? "black" : null,
                        }}
                      >
                        <div className="addressSingle">
                          <div className="addressDetails">
                            <div className="addressName">
                              <p
                                style={{
                                  color: ShipmentID == e.id ? "white" : null,
                                }}
                              >
                                {e?.company}
                              </p>
                            </div>
                            <div className="addressComplete">
                              <p
                                style={{
                                  color: ShipmentID == e.id ? "white" : null,
                                }}
                              >
                                {e?.streetLine1}, {e?.streetLine2}
                              </p>
                              <p
                                style={{
                                  color: ShipmentID == e.id ? "white" : null,
                                }}
                              >
                                {e?.province}, {e?.city}, {e?.country?.name},{" "}
                                {e?.postalCode}
                              </p>
                            </div>
                            <div className="addressMobile">
                              <p
                                style={{
                                  color: ShipmentID == e.id ? "white" : null,
                                }}
                              >
                                {e?.phoneNumber}
                              </p>
                            </div>
                          </div>
                          <div className="addressButtons">
                            <div
                              style={{
                                display: ShipmentID == e.id ? "none" : null,
                              }}
                              onClick={() => {
                                if (isAddressSame) {
                                  setBilingAddressID(e.id);
                                  setShipmentID(e.id);
                                } else {
                                  setShipmentID(e.id);
                                }
                              }}
                              className="addressEditButton common-btn-style-alt"
                            >
                              <span>Deliver here</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  : <div className="notFoundAddress">
                  <div className="notFoundIcon">
                    <svg
                      width="57.799"
                      height="51.939"
                      viewBox="0 0 57.799 51.939"
                    >
                      <g
                        id="Group_6407"
                        data-name="Group 6407"
                        transform="translate(-945.5 -526.97)"
                      >
                        <path
                          id="Path_4529"
                          data-name="Path 4529"
                          d="M955.483,536.991a2.491,2.491,0,1,1-2.491-2.491A2.492,2.492,0,0,1,955.483,536.991Zm0,9.965a2.491,2.491,0,1,1-2.491-2.491A2.492,2.492,0,0,1,955.483,546.957Zm-2.491,12.457a2.491,2.491,0,1,0-2.491-2.491A2.492,2.492,0,0,0,952.991,559.413Z"
                          transform="translate(4.965 7.478)"
                        />
                        <path
                          id="Path_4530"
                          data-name="Path 4530"
                          d="M998.376,576.8,948.549,526.97l-2.113,2.113,4.923,4.923h-1.873a3.985,3.985,0,0,0-3.986,3.986v31.889a3.985,3.985,0,0,0,3.986,3.986h41.735l5.042,5.042Zm-10.145-5.919-4.983-4.983H967.424V562.9h12.835l-6.976-6.976h-5.86v-2.99h2.87L954.349,537h-4.863a1,1,0,0,0-1,1v31.889a1,1,0,0,0,1,1Z"
                          transform="translate(0 0)"
                          fill-rule="evenodd"
                        />
                        <path
                          id="Path_4531"
                          data-name="Path 4531"
                          d="M956.957,535l2.956,2.99h20.05V535Zm23.006,9.965H966.809l2.956,2.99h10.2Zm0,9.965h-3.3l2.956,2.99h.347Z"
                          transform="translate(11.377 7.974)"
                        />
                        <path
                          id="Path_4532"
                          data-name="Path 4532"
                          d="M992.352,567.372H988.96l2.954,2.99h.438a3.985,3.985,0,0,0,3.986-3.986V534.486a3.985,3.985,0,0,0-3.986-3.986H952.509l2.956,2.99h36.888a1,1,0,0,1,1,1v31.889A1,1,0,0,1,992.352,567.372Z"
                          transform="translate(6.96 3.506)"
                        />
                      </g>
                    </svg>
                  </div>
                  <div className="notFoundText">
                    <p>No Address  have been found.</p>
                   
                  </div>
                 
                </div>}
              </div>
              <div className="bottom_button">
                <div onClick={handlestate} className="newAdd common-btn-style">
                  <span>ADD A NEW ADDRESS</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div className="topSubheading">
              <div
                className="newAdd2 "
                onClick={() => setAddressState("Shiping")}
              >
                <span
                  style={{
                    borderBottom:
                      AddressState == "Shiping" ? "2px solid black" : null,
                    fontFamily: AddressState == "Shiping" ? "H-Bold" : null,
                    color: AddressState == "Shiping" ? "#000" : null,
                    marginTop: "20px",
                  }}
                >
                  Delivery Address
                </span>
              </div>
              <div
                className="newAdd2 "
                onClick={() => setAddressState("Billing")}
              >
                <span
                  style={{
                    borderBottom:
                      AddressState == "Billing" ? "2px solid black" : null,
                    fontFamily: AddressState == "Billing" ? "H-Bold" : null,
                    color: AddressState == "Billing" ? "#000" : null,
                    marginTop: "20px",
                  }}
                >
                  {" "}
                  Billing Address
                </span>
              </div>
            </div>
            {AddressState == "Shiping" && (
              <DeliveryAddressComponment
                handlestate={handlestate}
                SelectedID={ShipmentID}
                setSelectedID={setShipmentID}
                AddressBook={AddressBook}
              />
            )}
            {AddressState == "Billing" && (
              <DeliveryAddressComponment
                handlestate={handlestate}
                SelectedID={BillingID}
                setSelectedID={setBilingAddressID}
                AddressBook={AddressBook}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
