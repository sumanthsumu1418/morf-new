import { useState, useEffect } from "react";

// Components Import
import BaseLayout from "components/layout/BaseLayout";
import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  clearWishlist,
  decrementCart,
  incrementCart,
} from "store/user/action";
import { removeFromWishlist } from "./../../store/user/action";
import { toast } from "react-toastify";

const Wishlist = () => {
  const cartData = useSelector((state) => state.user.wishlist);
  const state = useSelector((state) => state);
  const router = useRouter();
  const [totalPrice, setTotalPrice] = useState(0);
  const [scroll, setScroll] = useState(0);
  const dispatch = useDispatch();

  const handleCheckout = () => {
    for (let i = 0; i < cartData.length; i++) {
      dispatch(addToCart(cartData[i]));
    }
    toast.success("Success!");

    dispatch(clearWishlist());
    router.push("/cart");
  };
  const [totalItems, setTotalItems] = useState(cartData.length || 0);
  useEffect(() => {
    setTotalItems(cartData.length);
    let totalBill = 0;
    if (cartData.length)
      for (let i = 0; i < cartData.length; i++) {
        totalBill += cartData[i].quantity * cartData[i].variants[0].price;
      }
    setTotalPrice(totalBill);
  }, [cartData]);

  function progressBarHandler() {
    const totalScroll = document.getElementById("itemContainer").scrollTop;
    const windowHeight =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    const scroll = `${totalScroll / windowHeight}`;

    setScroll(scroll);
  }

  useEffect(() => {
    if (cartData.length)
      document.getElementById("itemContainer").onscroll = function () {
        progressBarHandler();
      };
  }, []);

  return (
    <BaseLayout smooth={false}>
      <section className="container cart">
        <div className="cart__headingdiv">
          <div className="cart__headingdiv--first">
            <h1 className="heading">Your Wishlist</h1>
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

        {cartData.length <= 0 && (
          <div className="cart__empty">
            <p className="cart__empty--text">
              It appears that your wishlist is currently empty!
            </p>

            <Link href="/">
              <a className={`common-btn-style cart__empty--startShopping`}>
                <span>START SHOPPING</span>
              </a>
            </Link>
          </div>
        )}

        {cartData.length > 0 && (
          <>
            <div
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
            </div>

            <div id="itemContainer" className="cart__itemdiv">
              {cartData.map((e) => {
                return (
                  <div key={e.id} className="cart__itemdiv--item">
                    <img
                      className="img"
                      src={e?.src[0]?.source}
                      alt=""
                      style={{
                        width: 350,
                      }}
                    />
                    <div className="detaildiv">
                      <p className="detaildiv__title">{e.name}</p>
                      {e.modeltype && (
                        <p className="detaildiv__other">
                          Model Type : {e.modeltype}
                        </p>
                      )}
                      {e.decoration && (
                        <p className="detaildiv__other">
                          Decoration : {e.decoration}
                        </p>
                      )}
                      {e.customisationId && (
                        <p className="detaildiv__other">
                          Customisation ID : {e.customisationId}
                        </p>
                      )}
                      {e.productId && (
                        <p className="detaildiv__other">
                          Product ID : {e.productId}
                        </p>
                      )}
                    </div>

                    <p className="size">
                      Size&nbsp;&nbsp; <span>{e.size}</span>
                    </p>

                    <div className="quantity">
                      {/* <p className="quantity__title">Quantity</p> */}
                      <div
                        className="quantity__icon"
                        // width="21"
                        // height="21"
                        // viewBox="0 0 21 21"
                        onClick={(event) => {
                          dispatch(removeFromWishlist(e.id));
                        }}
                      >
                        <p className="size">Delete </p>

                        {/* <g id="_1" data-name="1" transform="translate(-0.444)">
                          <circle
                            cx="10.5"
                            cy="10.5"
                            r="10.5"
                            transform="translate(0.444)"
                            fill="#707070"
                            opacity="0.597"
                          />
                          <path
                            d="M1.152-4.407H8.276v-.939H1.152Z"
                            transform="translate(5.848 15.457)"
                            fill="#fff"
                            stroke="#fff"
                            strokeWidth="1"
                          />
                        </g> */}
                      </div>
                      {/* <p className="quantity__count">{e.quantity}</p>
                      <svg
                        width="21"
                        height="21"
                        viewBox="0 0 21 21"
                        onClick={(event) => {
                          dispatch(addTo(e.id));
                        }}
                      >
                        <g id="_2" data-name="2" transform="translate(0.444)">
                          <circle
                            cx="10.5"
                            cy="10.5"
                            r="10.5"
                            transform="translate(-0.444)"
                            fill="#707070"
                            opacity="0.597"
                          />
                          <path
                            d="M3.862-2.793h.97V-4.641L4.8-5.857l1.386.015H7.851v-.97H6.172l-1.386.031.031-1.448V-9.846h-.97v1.6l.015,1.463L2.245-6.812H.828v.97l3.049-.015L3.862-4.61Z"
                            transform="translate(6.172 16.846)"
                            fill="#fff"
                            stroke="#fff"
                            strokeWidth="1"
                          />
                        </g>
                      </svg> */}
                    </div>

                    <p className="price">
                      &#8377; {e.variants[0].price * e.quantity}
                    </p>
                  </div>
                );
              })}
            </div>
            <div className="cart__btndiv">
              <Link href="/shop">
                <p className="cart__btndiv--csBtn click">Continue shopping</p>
              </Link>
              <div
                onClick={handleCheckout}
                className="cart__btndiv--ptsBtn click"
              >
                <p className="txt">Add to Cart</p>
              </div>
            </div>
          </>
        )}
      </section>
    </BaseLayout>
  );
};

export default Wishlist;
