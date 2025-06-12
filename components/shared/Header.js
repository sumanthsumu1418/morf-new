import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { TimelineMax, Power3 } from "gsap";
import LoginModal from "./LoginModal";
import NavigationModal from "./NavigationModal";
import { initialCart, isLogin, login } from "store/user/action";
import useMediaQuery from "hooks/useMediaQuery";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { addActiveOrdersToCart, isUserAuthenticated } from "uitlity";
import {
  ACTIVE_ORDER,
  AUTHENTICATE_WITH_FACEBOOK,
  AUTHENTICATE_WITH_GOOGLE,
} from "graphql/productsqueries";
import client from "./client";
import SizeChartModal from "./SizeChartModal";
const Header = ({
  setShowSizeModal,
  handleSizeChartClick,
  showSizeModal,
  classes,
}) => {
  const router = useRouter();
  const isLoginPop = useSelector((state) => state.user.isLoginPop);
  const cartSize = useSelector((state) => state.user.cartSize);
  const [activePage, setActivePage] = useState("");
  const session = useSession();
  const dispatch = useDispatch();
  const handleClose = () => {
    setOpen(false);
    dispatch({
      type: "CLOSE_POPUP_LOGIN",
    });
    router.reload();
  };

  useEffect(async () => {
    if (session.status == "authenticated") {
      const isAuth = localStorage.getItem("ISAUTH");
      if (isAuth) {
        try {
          const response = await client.mutate({
            mutation: session.data.idToken
              ? AUTHENTICATE_WITH_GOOGLE
              : AUTHENTICATE_WITH_FACEBOOK,
            variables: {
              token: session.data?.idToken
                ? session.data?.idToken
                : session.data?.accessToken,
            },
          });

          if (response.data?.authenticate?.__typename == "CurrentUser") {
            const {
              data: { activeOrder },
            } = await client.query({
              query: ACTIVE_ORDER,
            });
            const activeCart = addActiveOrdersToCart(activeOrder?.lines);
            dispatch(initialCart(activeCart));

            toast.success("Login Sucessfully");
            localStorage.removeItem("ISAUTH");
            localStorage.setItem("cartLength", activeCart.length);
            dispatch({
              type: "CART_SIZE",
              payload: activeCart.length,
            });
            handleClose();
          }
        } catch (error) {
          toast.error(error.message);
          localStorage.removeItem("ISAUTH");
        }
      }
    }
  }, [session]);

  const [open, setOpen] = useState(false);
  const [form, setForm] = useState("signin");

  const [showNavModal, setShowNavModal] = useState(false);
  const isBreakPoint = useMediaQuery(600);

  useEffect(() => {
    setActivePage(router.pathname);
  }, []);

  function animation() {
    var header = new TimelineMax();

    header.fromTo(
      ".overLay",
      1.4,
      { scaleX: 1, transformOrigin: "right", ease: Power3.easeOut },
      { scaleX: 0 },
      0.5
    );
  }

  useEffect(() => {
    if (showNavModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [showNavModal]);

  useEffect(() => {
    animation();
  }, []);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleNavModalClick = () => setShowNavModal((prev) => !prev);

  const cart = useSelector((state) => state.user.cart);

  return (
    <>
      <header className={` header-container `}>
        <div className="debug">
          This is a demo store. No orders will be fullfilled.
        </div>
        <div className="container">
          <div className="left__content">
            {isBreakPoint && (
              <div className="nav-items__item header__hamDiv">
                <a onClick={handleNavModalClick} className="ham-icon">
                  <img src="/icons/ham.svg" />
                </a>
              </div>
            )}
            <Link href="/customiser">
              <a className={"header__customise"}>Customise</a>
            </Link>

            <Link href="/shop">
              <a
                className={`${
                  activePage === "/shop" ? "activePage" : "header__customise"
                }`}
              >
                shop
              </a>
            </Link>
            {/* {isLoginUser ? (
            <Link href="/wishlist">
              <a
                className={`${
                  activePage === "/shop" ? "activePage" : "header__customise"
                }`}
              >
                wishlist
              </a>
            </Link>
          ) : null} */}
          </div>
          <Link href="/" passHref>
            <a className="logo">
              <img src="/icons/morf.svg" className="morf" alt="morf-logo" />
            </a>
          </Link>

          <div className="nav-items">
            <div className="nav-items__item">
              <p className="nav-items-return">
                *7-10 Days Delivery. Free Shipping & Returns Worldwide
              </p>
            </div>

            <div className="nav-items__item nav-items__Cart">
              <Link href="/cart">
                <a className="cart-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30.964"
                    height="30.861"
                    viewBox="0 0 20.964 20.861"
                  >
                    <g
                      id="Group_900"
                      data-name="Group 900"
                      transform="translate(7949.002 8237.816)"
                    >
                      <path
                        id="Path_788"
                        data-name="Path 788"
                        d="M1314.534,172.689a.949.949,0,0,1-.948-.948V168.9H1307.9v2.845a.948.948,0,0,1-1.9,0V168.9a1.9,1.9,0,0,1,1.9-1.9h5.689a1.9,1.9,0,0,1,1.9,1.9v2.845A.949.949,0,0,1,1314.534,172.689Z"
                        transform="translate(-9250.262 -8404.816)"
                      />
                      <path
                        id="Path_789"
                        data-name="Path 789"
                        d="M1318.068,171H1302.9a1.9,1.9,0,0,0-1.9,1.9v12.327a2.845,2.845,0,0,0,2.845,2.845h13.275a2.844,2.844,0,0,0,2.845-2.845V172.9A1.9,1.9,0,0,0,1318.068,171Zm0,14.223a.949.949,0,0,1-.948.948h-13.275a.949.949,0,0,1-.948-.948V172.9h15.171Z"
                        transform="translate(-9250.002 -8405.023)"
                      />
                    </g>
                  </svg>

                  <span className="cart-text">{cartSize}</span>
                </a>
              </Link>
            </div>

            {session.status == "authenticated" && isUserAuthenticated() ? (
              <div
                style={{ cursor: "pointer" }}
                className="nav-items__item nav-items__User"
              >
                <Link href="/profile" passHref>
                  <a className="user-icon">
                    <img src="/icons/user.svg" />
                  </a>
                </Link>
              </div>
            ) : (
              <div
                style={{ cursor: "pointer" }}
                className="nav-items__item nav-items__User"
                onClick={handleOpen}
              >
                <a className="user-icon">
                  <img src="/icons/user.svg" />
                  {/* <LoginModal /> */}
                  {/* modal to be inserted here  */}
                </a>
              </div>
            )}

            <div
              className="nav-items__item nav-items__hamDiv"
              onClick={handleNavModalClick}
              style={{ cursor: "pointer" }}
            >
              <a className="ham-icon">
                <img src="/icons/ham.svg" />
              </a>
            </div>
          </div>
        </div>
      </header>
      {(open || isLoginPop) && (
        <LoginModal
          open={open || isLoginPop}
          handleClose={handleClose}
          form={form}
          setForm={setForm}
        />
      )}

      <div
        style={{
          transform: showNavModal ? "translateX(0)" : "translateX(100%)",
        }}
        className="navigationModal"
      >
        <NavigationModal
          showNavModal={showNavModal}
          handleNavModalClick={handleNavModalClick}
          setShowNavModal={setShowNavModal}
          open={open}
          handleOpen={handleOpen}
          handleClose={handleClose}
          form={form}
          setForm={setForm}
        />
      </div>
      <div
        style={{
          transform: showSizeModal ? "translateX(0)" : "translateX(100%)",
        }}
        className="navigationModal"
      >
        <SizeChartModal
          showSizeModal={showSizeModal}
          handleSizeChartClick={handleSizeChartClick}
          setShowSizeModal={setShowSizeModal}
        />
      </div>
    </>
  );
};

export default Header;
