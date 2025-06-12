import { useState } from "react";
import { useSelector } from "react-redux";
import Link from "next/link";
import client from "../shared/client";
import {
  CURRENT_USER_DATA,
  CURRENT_USER_ORDER_DATA,
} from "graphql/productsqueries";
import { useEffect } from "react";
import moment from "moment/moment";
import Moment from "react-moment";
import { addActiveOrdersToCart, getDiscount } from "uitlity";

const SingleProduct = ({ data, setshowDetails, setshowDetailsData }) => {
  const orderDate = moment(data.createdAt);

  function getOrderStatus() {
    switch (data?.state) {
      case "PaymentAuthorized":
        return <span style={{ color: "#00c2ff" }}>Order Placed</span>;
      case "Payment settled":
        return <span style={{ color: "#00c2ff" }}>Order Placed</span>;
      case "Delivered":
        return <span style={{ color: "rgb(0 218 95)" }}>Delivered</span>;
      case "Cancelled":
        return <span style={{ color: "red" }}>Cancelled</span>;
      default:
        return <span style={{ color: "#00c2ff" }}>Order Placed</span>;
    }
  }

  return (
    <div className="purchaseContainer">
      <div className="purchaseData">
        <div className="purchaseLeftSide">
          <div className="shoeImage" style={{ backgroundColor: "#EFEEED" }}>
            {data?.lines[0]?.productVariant?.id == "485" ? (
              <img
                src={`https://morf-vendure.kurage.store/assets/preview/15/morf_logo__preview.png`}
                alt=""
                style={{ padding: "20px 10px", margin: "auto" }}
              />
            ) : (
              <img
                src={`${process.env.NEXT_PUBLIC_PRODUCTIMAGES}/images/${data?.lines[0]?.productVariant?.product?.slug}/cover-1.jpg`}
                alt=""
              />
            )}
          </div>
          <div className="shoeDetail">
            <div className="orderNo">
              <p>ORDER NO : {data.id}</p>
            </div>
            <div className="dateAndTime">
              <Moment format="DD MMMM YYYY | hh:mm A">{data.createdAt}</Moment>
            </div>
            <div className="shoeType">
              <p>{data?.lines[0]?.productVariant?.product?.name}</p>
            </div>
            <div className="quantity">
              <p> ITEMS : {data?.totalQuantity} </p>
              <p className="MoborderStatus">
                STATUS : <span>{getOrderStatus()}</span>
              </p>
            </div>
            <div className="Mob_purchaseRightSide">
              <div
                className="Mob_detailsContainer common-btn-style-alt"
                onClick={() => {
                  setshowDetailsData(data);
                  setshowDetails(true);
                }}
              >
                <span>View Details</span>
              </div>
              <div className="rightMob">
                <p className="price">
                  {data?.currencyCode} {data?.total / 100}/-
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="purchaseRightSide">
          <div
            className="detailsContainer common-btn-style-alt"
            onClick={() => {
              setshowDetailsData(data);
              setshowDetails(true);
            }}
          >
            <span>View Details</span>
          </div>
          <p>
            {data?.currencyCode} {data?.total / 100}/-
          </p>
          <p className="orderStatus">
            STATUS : <span>{getOrderStatus()}</span>
          </p>
        </div>
      </div>
      <div className="purchaseBodyDivider"></div>
    </div>
  );
};

const ORDERDETAILS = ({ data, setshowDetails }) => {
  const cartItems = addActiveOrdersToCart(data?.lines);

  const cartItemsDetails = getDiscount(data);
  function getOrderStatus() {
    switch (data?.state) {
      case "PaymentAuthorized":
        return <span style={{ color: "#00c2ff" }}>Order Placed</span>;
      case "Payment settled":
        return <span style={{ color: "#00c2ff" }}>Order Placed</span>;
      case "Delivered":
        return <span style={{ color: "rgb(0 218 95)" }}>Delivered</span>;
      case "Cancelled":
        return <span style={{ color: "red" }}>Cancelled</span>;
      default:
        return <span style={{ color: "#00c2ff" }}>Order Placed</span>;
    }
  }
  return (
    <>
      <div className="cart__headingdiv">
        <div className="cart__headingdiv__profileCart">
          <div className="purchasesHeader">
            <h2 className="heading">ORDER NO: &nbsp;{data?.id}</h2>

            <div className="rightside">
              <div className="top">
                <p className="price">
                  Subtotal{" "}
                  <span>
                    &#8377;{" "}
                    {Number(cartItemsDetails?.subTotal) -
                      Number(cartItemsDetails?.totalDiscounts)}
                  </span>
                </p>
                <p className="price">
                  Discounts
                  <span>&#8377; {cartItemsDetails?.totalDiscounts}</span>
                </p>
                <p className="price">
                  Shipping Charge
                  <span>
                    &#8377; {Number(data?.shippingWithTax / 100).toFixed(2)}
                  </span>
                </p>
              </div>
              <div className="bottom">
                <p className="price">
                  Total <span>&#8377; {cartItemsDetails?.Total}</span>
                </p>
              </div>
            </div>
          </div>
          <div className="secondHeader">
            <div className="Subheading">
              <p className="first">
                your order placed at &nbsp;
                <Moment format="DD MMMM YYYY | hh:mm A">
                  {data.createdAt}
                </Moment>
              </p>

              <div className="second">
                <p>Items : {data?.totalQuantity}</p>{" "}
                <p>
                  Status : <span>{getOrderStatus()}</span>
                </p>
              </div>
            </div>
            <button
              style={{ color: "blue" }}
              onClick={() => {
                setshowDetails(false);
              }}
              className="backToList  common-btn-style"
            >
              <span> Back To Invoices List</span>
            </button>
          </div>
          <div className="MobpurchasesHeader">
            <div className="top">
              <p className="price">
                Subtotal{" "}
                <span>
                  &#8377;{" "}
                  {Number(cartItemsDetails?.subTotal) -
                    Number(cartItemsDetails?.totalDiscounts)}
                </span>
              </p>
              <p className="price">
                Discounts<span>&#8377; {cartItemsDetails?.totalDiscounts}</span>
              </p>
              <p className="price">
                Deliver Charges<span>&#8377; {data?.shippingWithTax}</span>
              </p>
            </div>

            <div className="bottom">
              <p className="price">
                Total <span>&#8377; {cartItemsDetails?.Total}</span>
              </p>
            </div>
          </div>
          <div className="MobsecondHeader">
            <div className="dec">
              <p>Order No:{data?.id} </p>
              <span className="line">|</span>{" "}
              <p>Items : {data?.totalQuantity} </p>
              <span className="line">|</span>
              <p>
                {" "}
                <Moment format="DD MMM YYYY | hh:mm A">{data.createdAt}</Moment>
              </p>{" "}
              <span className="line">|</span>{" "}
              <p>
                Status : <span>{getOrderStatus()}</span>
              </p>
            </div>
            <button
              onClick={() => {
                setshowDetails(false);
              }}
              className="backToList common-btn-style-alt"
            >
              <span> Back To Invoices List</span>
            </button>
          </div>
        </div>
        <div className="purchaseBodyDivider"></div>
      </div>
      {cartItems?.map((e) => {
        return (
          <div key={e.id} className="cart__purchaseItem">
            <div className="purchaseContainer">
              <div className="purchaseData">
                <div className="purchaseLeftSide">
                  <div className="shoeImage">
                    {e?.id == "485" ? (
                      <Link href={`/${e.slug}`}>
                        <a target="blank">
                          <img
                            src={e?.src}
                            alt=""
                            style={{ backgroundColor: "#EFEEED" }}
                          />
                        </a>
                      </Link>
                    ) : (
                      <Link href={`/shoes/${e.slug}`}>
                        <a target="blank">
                          <img
                            src={`${process.env.NEXT_PUBLIC_PRODUCTIMAGES}/images/${e?.slug}/cover-1.jpg`}
                            alt=""
                          />
                        </a>
                      </Link>
                    )}
                  </div>
                  <div className="shoeDetail">
                    {e?.id == "485" ? (
                      <>
                        <Link href={`/${e.slug}`}>
                          <a
                            style={{
                              textDecoration: "none",
                              color: "#000",
                            }}
                            target="blank"
                            className="orderNo"
                          >
                            Morf By You
                          </a>
                        </Link>
                        <p className="Dec">
                          Created by you, using Morf Customiser
                        </p>
                      </>
                    ) : (
                      <Link href={`/shoes/${e.slug}`}>
                        <a
                          style={{
                            textDecoration: "none",
                            color: "#000",
                          }}
                          target="blank"
                          className="orderNo"
                        >
                          {e?.name}
                        </a>
                      </Link>
                    )}

                    <p className="size">
                      Size&nbsp;: <span>{e.size}</span>
                    </p>
                    <div className="quantity">
                      <p className="title">QTY :&nbsp; </p>

                      <p className="count"> {e.quantity}</p>
                    </div>
                  </div>
                </div>
                <div className="purchaseRight">
                  <p>&#8377; {e.price / 100}/-</p>
                </div>
              </div>
            </div>
            <div className="purchaseHeaderDivider"></div>
          </div>
        );
      })}
    </>
  );
};

const Invoices = () => {
  const [purchasesData, setpurchasesData] = useState([]);
  const [showDetails, setshowDetails] = useState(false);
  const [showDetailsData, setshowDetailsData] = useState({});

  const [showLoader, setshowLoader] = useState(false);
  useEffect(() => {
    async function getTheOrder() {
      setshowLoader(true);
      const res = await client.query({
        query: CURRENT_USER_ORDER_DATA,
      });
      if (res.data?.activeCustomer?.__typename == "Customer") {
        //
        const item = res.data?.activeCustomer?.orders?.items;
        setpurchasesData(item);
        setshowLoader(false);
      } else {
        setpurchasesData([]);
        setshowLoader(false);
      }
    }
    getTheOrder();
  }, []);

  return (
    <div className="purchases">
      {showDetails ? (
        <></>
      ) : (
        <div className="purchasesHeader">
          <p className="purchaseHeading">INVOICES</p>
          <p className="purchaseSubheading">
            Check the status and information regarding your online orders. You
            can also cancel the order or request a refund.
          </p>
          <div className="purchaseHeaderDivider"></div>
        </div>
      )}
      {showLoader ? (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* <p>Loading...</p> */}
        </div>
      ) : (
        <>
          <div className="purchasesList">
            {purchasesData?.length < 1 ? (
              <div className="notFound">
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
                  <p>No invoices have been found.</p>
                  <Link href="/shoes" passHref>
                    <a className="startShopping">START SHOPPING</a>
                  </Link>
                </div>
              </div>
            ) : (
              <>
                {showDetails ? (
                  <ORDERDETAILS
                    data={showDetailsData}
                    setshowDetails={setshowDetails}
                  />
                ) : (
                  <>
                    {purchasesData?.map((x) => {
                      return (
                        <SingleProduct
                          data={x}
                          setshowDetails={setshowDetails}
                          setshowDetailsData={setshowDetailsData}
                        />
                      );
                    })}
                  </>
                )}
              </>
            )}
          </div>
          {/* {purchasesData && (
            <div className="purchaseFooter">
              <p className="purchasePageName">Page</p>
              <p className="purchasePageNumber">1 of 7</p>
              <div className="purchasePageButtons">
                <div className="purchasePageButton">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="9.529"
                    height="17.559"
                    viewBox="0 0 9.529 17.559"
                  >
                    <g
                      id="Component_157_1"
                      data-name="Component 157 – 1"
                      transform="translate(0.75 1.061)"
                    >
                      <path
                        id="Path_4539"
                        data-name="Path 4539"
                        d="M-1297.4,14601.93l-7.719,7.719,7.719,7.719"
                        transform="translate(1305.115 -14601.93)"
                        fill="none"
                        stroke="#191919"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="1.5"
                      />
                    </g>
                  </svg>
                </div>
                <div
                  className="purchasePageButton"
                  style={{ marginRight: "0px" }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="9.529"
                    height="17.559"
                    viewBox="0 0 9.529 17.559"
                  >
                    <g
                      id="Component_158_1"
                      data-name="Component 158 – 1"
                      transform="translate(1.061 1.061)"
                    >
                      <path
                        id="Path_4539"
                        data-name="Path 4539"
                        d="M-1305.115,14601.93l7.719,7.719-7.719,7.719"
                        transform="translate(1305.115 -14601.93)"
                        fill="none"
                        stroke="#191919"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="1.5"
                      />
                    </g>
                  </svg>
                </div>
              </div>
            </div>
          )} */}
        </>
      )}
    </div>
  );
};

export default Invoices;
