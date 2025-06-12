import { useState, useEffect, useRef } from "react";
import LoaderForComponent from "uitlity/loaderForComponent";
import SEO from "@/components/layout/SEO";

// Components Import
import BaseLayout from "components/layout/BaseLayout";
import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import {
  decrementCart,
  incrementCart,
  initialCart,
  initialOrderId,
  removeFromCart,
} from "store/user/action";
import client from "@/components/shared/client";
import {
  ACTIVE_ORDER,
  ADJUST_ORDER_LINE,
  GET_ORDER_BY_CODE,
  REMOVE_ITEM_FROM_ORDER,
} from "graphql/productsqueries";
import { addActiveOrdersToCart, isActiveCartInOtherState } from "uitlity";
import RemoveWishList from "@/components/profile/removeWishlist";

import useMediaQuery from "hooks/useMediaQuery";

function CartItems(props) {
  const isMobileBreakPoint = useMediaQuery(1024);
  const mobileRes = useMediaQuery(600);
  const glossRef = useRef(null);

  const [isMirrorGlossToShown, setisMirrorGlossToShown] = useState(
    props.e?.is_mirror_gloss
  );
  const [isAddMirrorGlossClick, setisAddMirrorGlossClick] = useState(
    props.e?.customFields?.mirror_gloss
  );
  const [mirrorGlossModal, setMirrorGlossModal] = useState(false);

  useEffect(() => {
    setisMirrorGlossToShown(props.e?.is_mirror_gloss);
    setisAddMirrorGlossClick(props.e?.customFields?.mirror_gloss);
  }, []);

  const dispatch = useDispatch();

  const AddMirrorGloss = async (qty, is_mirror_gloss, lineId) => {
    await client.resetStore();

    const customFieldsdata = {
      ...props.e.customFields,
      mirror_gloss: is_mirror_gloss ? 1 : 0,
    };

    const res = await client.mutate({
      mutation: ADJUST_ORDER_LINE,
      variables: {
        orderLineId: lineId,
        quantity: qty,
        customFields: JSON.stringify(customFieldsdata),
      },
    });
    if (res.data.adjustOrderLine?.__typename == "Order") {
      const { data } = await client.query({
        query: ACTIVE_ORDER,
      });
      const activeItem = addActiveOrdersToCart(data.activeOrder?.lines);

      dispatch(initialCart(activeItem));
      dispatch({
        type: "CART_SIZE",
        payload: activeItem.length,
      });
    }
  };

  const handleMirrorGlossClick = () => {
    if (isAddMirrorGlossClick) {
      //remove from database
      AddMirrorGloss(props.e.quantity, false, props.e.lineId);
      setisAddMirrorGlossClick(false);
    } else {
      //add in the  database
      AddMirrorGloss(props.e.quantity, true, props.e.lineId);
      setisAddMirrorGlossClick(true);
    }
  };

  const closeMirrorModal = (e) => {
    if (mirrorGlossModal) {
      if (!glossRef?.current?.contains(e.target)) {
        setMirrorGlossModal(false);
        glossRef.current.style.display = "none";
      }
    }
  };

  const handlePopupToggle = () => {
    setMirrorGlossModal((prev) => !prev);

    if (mirrorGlossModal === true) {
      glossRef.current.style.display = "none";
    } else {
      glossRef.current.style.display = "flex";
    }
  };

  const shortenText = (text, maxLength) => {
    if (text && text.length > maxLength) {
      return text.substr(0, maxLength) + "...";
    }
    return text;
  };

  return (
    <div className="cart__itemdiv--item" onClick={closeMirrorModal}>
      {props.e.id == "485" ? ( // <div className="shoeImage">
        <Link href={`/${props.e.slug}`}>
          <img
            className="imgM" // src={e.src?.source}
            src={props.e?.src}
            alt=""
            style={{
              padding: "35px",
              backgroundColor: "#EFEEED",
            }}
          />
        </Link> // </div>
      ) : (
        <Link href={`/${props.e.slug}`}>
          <img
            className="img" // src={`assets {
            //   source
            //   preview
            //   height
            //   width
            // }`}
            src={`${process.env.NEXT_PUBLIC_PRODUCTIMAGES}/images/${props.e?.slug}/cover-1.jpg`} // src={e?.src[0]?.source}
            alt=""
            style={{
              width: 350,
            }}
          />
        </Link>
      )}

      <div className="detaildiv">
        {props.e.id == "485" ? (
          <>
            <Link href={`/${props.e?.slug}`}>
              <a
                style={{
                  textDecoration: "none",
                  color: "#000",
                }}
                target="blank"
                className="detaildiv__title2"
              >
                Morf By You
              </a>
            </Link>
            <div className="detaildiv__dec">
              <p>Created by you, using Morf Customiser</p>
            </div>
            <Link href={`/${props.e?.slug}`}>
              <a
                style={{
                  textDecoration: "none",
                }}
                target="blank"
                className="detaildiv__prevlink"
              >
                PREVIEW LINK
              </a>
            </Link>
          </>
        ) : (
          <>
            <Link href={`/${props.e.slug}`}>
              <a
                style={{
                  textDecoration: "none",
                  color: "#000",
                }}
                target="blank"
                className="detaildiv__title"
              >
                {mobileRes ? shortenText(props.e.name, 18) : props.e.name}
              </a>
            </Link>
            <div className="detaildiv__dec">
              <p></p>
              <p className="detaildiv__prevlink"></p>
            </div>
          </>
        )}
        {props.e.modeltype && (
          <p className="detaildiv__other">Model Type : {props.e.modeltype}</p>
        )}
        {props.e.decoration && (
          <p className="detaildiv__other">Decoration : {props.e.decoration}</p>
        )}
        {props.e.customisationId && (
          <p className="detaildiv__other">
            Customisation ID : {props.e.customisationId}
          </p>
        )}
        {props.e.productId && (
          <p className="detaildiv__other">Product ID : {props.e.productId}</p>
        )}
        <p className="detaildiv__mob_price">&#8377; {props.e.price / 100}</p>
        <div className="bottom_Text">
          <button className="size">
            {/* Size&nbsp;&nbsp; */}
            <span>{props.e.size}</span>
          </button>
          <div className="quantity">
            <p className="quantity__title">
              <span>QTY</span>
            </p>
            <svg
              className="quantity__icon"
              width="21"
              height="21"
              viewBox="0 0 21 21"
              onClick={(event) => {
                props.changeLineQuantity(
                  props.e.lineId,
                  "DEC",
                  props.e.quantity
                );
                props.dispatch(decrementCart(props.e.lineId));
              }}
            >
              <g id="_1" data-name="1" transform="translate(-0.444)">
                <circle
                  cx="10.5"
                  cy="10.5"
                  r="10.5"
                  transform="translate(0.444)"
                  fill="#fff"
                  opacity="0.597"
                />
                <path
                  d="M1.152-4.407H8.276v-.939H1.152Z"
                  transform="translate(5.848 15.457)"
                  fill="#fff"
                  stroke="#000"
                  strokeWidth="1"
                />
              </g>
            </svg>
            <p className="quantity__count">
              <span>{props.e.quantity}</span>
            </p>
            <svg
              width="21"
              height="21"
              viewBox="0 0 21 21"
              className="quantity__icon"
              onClick={(event) => {
                props.changeLineQuantity(
                  props.e.lineId,
                  "INC",
                  props.e.quantity
                );
                props.dispatch(incrementCart(props.e.lineId));
              }}
            >
              <g id="_2" data-name="2" transform="translate(0.444)">
                <circle
                  cx="10.5"
                  cy="10.5"
                  r="10.5"
                  transform="translate(-0.444)"
                  fill="#fff"
                  opacity="0.597"
                />
                <path
                  d="M3.862-2.793h.97V-4.641L4.8-5.857l1.386.015H7.851v-.97H6.172l-1.386.031.031-1.448V-9.846h-.97v1.6l.015,1.463L2.245-6.812H.828v.97l3.049-.015L3.862-4.61Z"
                  transform="translate(6.172 16.846)"
                  fill="#fff"
                  stroke="#000"
                  strokeWidth="1"
                />
              </g>
            </svg>
          </div>

          <div className="mirror-gloss">
            {props.e.is_mirror_gloss && (
              <>
                <div
                  // onClick={() =>
                  //   !isMobileBreakPoint && handleMirrorGlossClick()
                  // }
                  className="mirror-gloss_textDiv"
                >
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    onClick={() => handlePopupToggle()}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="17.614"
                      height="17.614"
                      viewBox="0 0 17.614 17.614"
                    >
                      <g
                        id="Group_12047"
                        data-name="Group 12047"
                        transform="translate(-1266.146 -466.146)"
                      >
                        <path
                          id="Path_15266"
                          data-name="Path 15266"
                          d="M211.316,88.158a.658.658,0,1,0-1.316,0v.658a.658.658,0,1,0,1.316,0Z"
                          transform="translate(1064.295 382.187)"
                          fill="#570707"
                          stroke="#570707"
                          strokeWidth="0.5"
                        />
                        <path
                          id="Path_15267"
                          data-name="Path 15267"
                          d="M211.316,175.658a.658.658,0,0,0-1.316,0v5.924a.658.658,0,1,0,1.316,0Z"
                          transform="translate(1064.295 297.978)"
                          fill="#570707"
                          stroke="#570707"
                          strokeWidth="0.5"
                        />
                        <path
                          id="Path_15268"
                          data-name="Path 15268"
                          d="M0,8.557a8.557,8.557,0,1,1,8.557,8.557A8.557,8.557,0,0,1,0,8.557m8.557-7.24a7.24,7.24,0,1,0,7.24,7.24,7.24,7.24,0,0,0-7.24-7.24"
                          transform="translate(1266.396 466.396)"
                          fill="#570707"
                          stroke="#570707"
                          strokeWidth="0.5"
                          fillRule="evenodd"
                        />
                      </g>
                    </svg>
                  </span>

                  <span className="border-bottom-span">
                    <span
                      onClick={() => handleMirrorGlossClick()}
                      className="mirrorGlossText"
                    >
                      {isAddMirrorGlossClick ? "Remove" : "Add"} Mirror Gloss
                    </span>
                  </span>
                </div>

                <div
                  ref={glossRef}
                  // style={{
                  //   display:
                  //     isMobileBreakPoint && mirrorGlossModal ? "flex" : "none",
                  // }}
                  className="mirror-gloss_popup"
                >
                  <img
                    className="mirror-gloss_popup-img"
                    src="/images/cart/mirror-gloss-thumbnail.jpg"
                    alt=""
                  />

                  <div className="mirror-gloss_popup-details">
                    <p>Mirror Gloss* + ₹1,000/-</p>
                    <p>
                      *Hand finished Mirror Gloss shine with Saphir’s Medaille
                      d’Or wax polish.
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="right_side">
        <p className="price">&#8377; {props.e.price / 100}</p>
        <div className="remove">
          <span //  onClick={() => {
            //   changeLineQuantity(e.lineId, "DEC", 1);
            //   dispatch(removeFromCart(e.lineId))
            // }}
            onClick={() => {
              props.setShowPopUp(true);
              props.setRemoveData((prev) => ({
                value1: props.e.lineId,
                value2: "DEC",
                value3: 1,
              }));
            }}
          >
            remove
          </span>
        </div>
      </div>
    </div>
  );
}

const Cart = () => {
  const [hostname, setHostname] = useState("");
  const router = useRouter();
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const dispatch = useDispatch();
  const [showPopUp, setShowPopUp] = useState(false);
  const [cartData, setCartData] = useState([
    { id: 1, name: "Product 1", price: 100 },
    { id: 2, name: "Product 2", price: 200 },
  ]);
  const [removeData, setRemoveData] = useState({
    value1: "",
    value2: "",
    value3: "",
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      setHostname(window?.location?.href);
    }
  }, []);

  useEffect(() => {
    setCartsDetails();
  }, [cartData]);

  const handleCheckout = (e) => {
    router.push("/cart/checkout");
  };

  function setCartsDetails() {
    setTotalItems(cartData.length);
    let totalBill = 0;
    if (cartData.length)
      for (let i = 0; i < cartData.length; i++) {
        totalBill += cartData[i].price / 100;
      }
    setTotalPrice(totalBill);
  }

  const changeLineQuantity = async (lineId, type, quantity) => {
    await client.resetStore();
    if (type == "DEC" && quantity == 1) {
      // delete the orderLine
      const res = await client.mutate({
        mutation: REMOVE_ITEM_FROM_ORDER,
        variables: {
          orderLineId: lineId,
        },
      });
      localStorage.setItem("cartLength", cartData.length - 1);
      dispatch({
        type: "CART_SIZE",
        payload: cartData.length - 1,
      });
    } else {
      const res = await client.mutate({
        mutation: ADJUST_ORDER_LINE,
        variables: {
          orderLineId: lineId,
          quantity: type == "INC" ? quantity + 1 : quantity - 1,
        },
      });
      if (res.data.adjustOrderLine?.__typename == "Order") {
        const { data } = await client.query({
          query: ACTIVE_ORDER,
        });
        const activeItem = addActiveOrdersToCart(data.activeOrder?.lines);

        dispatch(initialCart(activeItem));
        dispatch({
          type: "CART_SIZE",
          payload: activeItem.length,
        });
      }
    }
  };

  const handelRemoveItem = () => {
    changeLineQuantity(removeData.value1, removeData.value2, removeData.value3);
    dispatch(removeFromCart(removeData.value1));
    setShowPopUp(false);
    setRemoveData({ value1: "", value2: "", value3: "" });
  };

  return (
    <>
      <SEO
        title="CART - MORF"
        desc="Morf"
        pageUrl={hostname}
        ogImage="/images/og_img.png"
      />
      <BaseLayout smooth={false} hideFooter>
        <section
          className="container cart"
          style={
            {
              // zIndex: isMobileBreakPoint && mirrorGlossModal === false ? 10 : 100,
            }
          }
        >
          <div className="cart__headingdiv">
            <div className="cart__headingdiv--first">
              <h1 className="heading">Your Cart</h1>
              <p className="quantity">
                {cartData.length > 0 && cartData.length}
                {cartData.length > 0 && (
                  <> {cartData.length <= 1 ? "Item" : "Items"} </>
                )}
              </p>
            </div>
            {cartData.length > 0 && (
              <div className="cart__headingdiv--second">
                <p className="total">Total</p>
                <p className="price">&#8377; {totalPrice}</p>
              </div>
            )}
          </div>

          {cartData.length <= 0 ? (
            <div className="cart__empty">
              <p className="cart__empty--text">
                It appears that your cart is currently empty!
              </p>

              <Link href="/shoes">
                <a className={`common-btn-style cart__empty--startShopping`}>
                  <span>START SHOPPING</span>
                </a>
              </Link>
            </div>
          ) : (
            <>
              {/* <div
              id="progressBarContainer"
              className="cart__progressBarContainer"
            >
              <div
                id="progressBar"
                className="progressBar"
                style={{
                  transform: `scale(${scroll}, 1)`,
                  // opacity: `${scroll}`,
                }}
              />
            </div> */}

              <div id="itemContainer" className="cart__itemdiv">
                {cartData.map((e) => {
                  return (
                    <CartItems
                      key={e.id}
                      dispatch={dispatch}
                      setShowPopUp={setShowPopUp}
                      setRemoveData={setRemoveData}
                      changeLineQuantity={changeLineQuantity}
                      e={e}
                    />
                  );
                })}
              </div>
              <div className="cart__btndiv">
                <Link href="/shoes">
                  <p className="cart__btndiv--csBtn click">Continue shopping</p>
                </Link>
                <Link href="/cart/checkout">
                  <div className="cart__btndiv--ptsBtn click common-btn-style">
                    {" "}
                    <span className="txt">Proceed to checkout</span>
                  </div>
                </Link>
              </div>
              <div className="cart__custom_div">
                <div className="leftNav">
                  <p className="price">&#8377; {totalPrice}</p>

                  <p className="quantity">
                    {cartData.length > 0 && cartData.length}
                    {cartData.length > 0 && (
                      <> {cartData.length <= 1 ? "Item" : "Items"} </>
                    )}
                  </p>
                </div>
                <div className="rightNav">
                  <div onClick={handleCheckout} className="cart__btn">
                    <span className="txt">Checkout</span>
                  </div>
                </div>
              </div>
            </>
          )}
        </section>
        {showPopUp && (
          <RemoveWishList
            handelRemoveItem={handelRemoveItem}
            name="removeCart"
            setShowModal={() => {
              setShowPopUp(false);
            }}
          />
        )}
      </BaseLayout>
    </>
  );
};

export default Cart;
