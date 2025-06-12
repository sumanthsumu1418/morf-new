import { useEffect, useRef } from "react";
import Link from "next/link";
import {
  FacebookShareButton,
  WhatsappShareButton,
  WhatsappIcon,
  FacebookIcon,
} from "next-share";
import { useSelector } from "react-redux";
import { useSession } from "next-auth/react";

const NavigationModal = ({
  showNavModal,
  handleNavModalClick,
  setShowNavModal,
  open,
  handleOpen,
  handleClose,
  form,
  setForm,
}) => {
  const modalContentRef = useRef(null);
  const session = useSession();

  const isLoginUser = useSelector((state) => state?.user?.isLogin);
  const username = useSelector((state) => state?.user?.userData?.firstName);

  const handleClickOutside = (e) => {
    if (!modalContentRef?.current?.contains(e.target)) {
      setShowNavModal(() => false);
    }
  };

  const handleLoginClick = () => {
    setShowNavModal(false);
    handleOpen();
    setForm("signin");
  };

  const handleSignupClick = () => {
    setShowNavModal(false);
    handleOpen();
    setForm("signup");
  };

  return (
    <div className="navigationModal" onClick={handleClickOutside}>
      <div
        ref={modalContentRef}
        className="navigationModal__content"
        style={{
          transform: showNavModal ? "translateX(0%)" : "translateX(100%)",
        }}
      >
        <div
          className="navigationModal__content--close"
          onClick={handleNavModalClick}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="26.538"
            height="26.538"
            viewBox="0 0 26.538 26.538"
          >
            <g
              id="Group_1410"
              data-name="Group 1410"
              transform="translate(13.269 -11.854) rotate(45)"
            >
              <line
                id="Line_1277"
                data-name="Line 1277"
                x2="35.53"
                transform="translate(0 17.765)"
                fill="none"
                stroke="#000"
                strokeWidth="2"
              />
              <line
                id="Line_1278"
                data-name="Line 1278"
                x2="35.53"
                transform="translate(17.765 0) rotate(90)"
                fill="none"
                stroke="#000"
                strokeWidth="2"
              />
            </g>
          </svg>
        </div>

        <div className="navigationModal__content--items">
          <div className="shopItem">
            <Link href="/shop">
              <a style={{ textDecoration: "none" }} className="shopItem--head">
                Shop
              </a>
            </Link>
            <Link href="/customiser" passHref>
              <a className="underline shopItem--linkOne">Customise</a>
            </Link>
            <Link href="/shoes" passHref>
              <a className="underline shopItem--linkOne">Collection</a>
            </Link>
          </div>

          <div className="shopItem">
            <Link href="/">
              <a style={{ textDecoration: "none" }} className="shopItem--head">
                Morf
              </a>
            </Link>

            <Link href="/" passHref>
              <a className="underline shopItem--linkOne">Home</a>
            </Link>
            <Link href="/about" passHref>
              <a className="underline shopItem--linkOne">About</a>
            </Link>
            <Link href="/blog" passHref>
              <a className="underline shopItem--linkOne">Blogs</a>
            </Link>
            <Link href="/contact" passHref>
              <a className="underline shopItem--linkOne">Contact</a>
            </Link>
          </div>

          <div className="itemThree">
            {session.status == "authenticated" ? (
              <Link href="/profile">
                <a
                  className="underline itemThree--linkOne"
                  style={{ cursor: "pointer" }}
                >
                  {/* {username} */}
                  my account
                </a>
              </Link>
            ) : (
              <>
                <a
                  onClick={handleLoginClick}
                  className="underline itemThree--linkOne"
                  style={{ cursor: "pointer" }}
                >
                  Login
                </a>

                <a
                  onClick={handleSignupClick}
                  className="underline itemThree--linkOne"
                  style={{ cursor: "pointer" }}
                >
                  sign up
                </a>
              </>
            )}
            {/* <>
              <a
                onClick={handleLoginClick}
                className="underline itemThree--linkOne"
                style={{ cursor: "pointer" }}
              >
                Login
              </a>

              <a
                onClick={handleSignupClick}
                className="underline itemThree--linkOne"
                style={{ cursor: "pointer" }}
              >
                sign up
              </a>
            </> */}

            <Link href="/shipping-info?id=3" passHref>
              <a
                className="underline itemThree--linkOne"
                onClick={handleNavModalClick}
              >
                Privacy policy
              </a>
            </Link>
            <Link href="/shipping-info?id=1" passHref>
              <a
                className="underline itemThree--linkOne"
                onClick={handleNavModalClick}
              >
                Shipping info
              </a>
            </Link>
            <Link href="/shipping-info?id=2" passHref>
              <a
                className="underline itemThree--linkOne"
                onClick={handleNavModalClick}
              >
                Returns/exchange
              </a>
            </Link>
            <Link href="/shipping-info?id=4" passHref>
              <a
                className="underline itemThree--linkOne"
                onClick={handleNavModalClick}
              >
                Terms & conditions
              </a>
            </Link>
          </div>

          <div className="socialItems">
            <a
              href="https://www.facebook.com/morfcustomshoes"
              target="blank"
              className="facebook"
            >
              {/* <FacebookShareButton
                url={"https://github.com/Bunlong/next-share"}
                quote={
                  "next-share is a social media share buttons for your next React apps."
                }
                hashtag={"#nextshare"}
              > */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="13.286"
                height="25.588"
                viewBox="0 0 13.286 25.588"
              >
                <g
                  id="Group_311"
                  data-name="Group 311"
                  transform="translate(13.286) rotate(90)"
                >
                  <path
                    id="f"
                    d="M25.586,4.663H13.915V.746L9.364.159v4.5h-2.9c-1.319,0-2.214-.365-2.214-2.255V0H.179A33.246,33.246,0,0,0,0,3.508c0,3.473,2.121,5.85,6.013,5.85H9.368v3.927h4.551V9.359H25.588Z"
                    transform="translate(0)"
                  />
                </g>
              </svg>
              {/* </FacebookShareButton> */}
            </a>

            <a
              href="https://wa.me/918178720162"
              targert="blank"
              className="whatsapp"
            >
              {/* <WhatsappShareButton
                url={"https://github.com/next-share"}
                title={
                  "next-share is a social share buttons for your next React apps."
                }
                separator=":: "
              > */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25.465"
                height="25.587"
                viewBox="0 0 25.465 25.587"
              >
                <g
                  id="whatsapp.46d36d08"
                  transform="translate(25.465) rotate(90)"
                >
                  <path
                    id="Path_8"
                    data-name="Path 8"
                    d="M25.587,25.465l-6.573-1.8a12.678,12.678,0,1,1,6.353-10.987h0a12.7,12.7,0,0,1-1.543,6.06Zm-4.06-7.033.227-.385a10.52,10.52,0,0,0,1.47-5.364h0A10.549,10.549,0,1,0,18.286,21.6l.4-.251,3.887,1.064Z"
                    transform="translate(0 0)"
                  />
                  <path
                    id="Path_9"
                    data-name="Path 9"
                    d="M8.872.038C8.738.118,8.663.329,8.5.646S7.579,2.521,7.473,2.81s-.16.5.159.712,1.031.819,1.24,1,.24.369.08.687A8.645,8.645,0,0,1,7.38,7.76,9.517,9.517,0,0,1,5.188,9.524c-.318.184-.49.02-.646-.135s-.371-.316-.555-.475A2.163,2.163,0,0,0,3.455,8.6a.58.58,0,0,0-.553.027c-.16.079-1.72.712-2.354.976s-.538.519-.538.712-.01.4-.01.607a1.159,1.159,0,0,0,.4.845,3.554,3.554,0,0,0,2.642,1.108,6.152,6.152,0,0,0,3.277-1.295A14.1,14.1,0,0,0,11.1,6.168a17.787,17.787,0,0,0,.673-1.806,4.331,4.331,0,0,0,.128-2A3.266,3.266,0,0,0,10.4.227,2.658,2.658,0,0,0,8.872.038Z"
                    transform="translate(6.829 6.252)"
                    fillRule="evenodd"
                  />
                </g>
              </svg>
              {/* </WhatsappShareButton> */}
            </a>

            <a
              href="https://www.instagram.com/morfcustomshoes/"
              target="blank"
              className="instagram"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  id="Path_924"
                  data-name="Path 924"
                  d="M5559.127,5442.125c3.2,0,3.6,0,4.8.1,3.3.1,4.8,1.7,4.9,4.9.1,1.3.1,1.6.1,4.8s0,3.6-.1,4.8c-.1,3.2-1.7,4.8-4.9,4.9-1.3.1-1.6.1-4.8.1s-3.6,0-4.8-.1c-3.3-.1-4.8-1.7-4.9-4.9-.1-1.3-.1-1.6-.1-4.8s0-3.6.1-4.8c.1-3.2,1.7-4.8,4.9-4.9C5555.527,5442.125,5555.927,5442.125,5559.127,5442.125Zm0-2.2c-3.3,0-3.7,0-4.9.1-4.4.2-6.8,2.6-7,7-.1,1.2-.1,1.6-.1,4.9s0,3.7.1,4.9c.2,4.4,2.6,6.8,7,7,1.2.1,1.6.1,4.9.1s3.7,0,4.9-.1c4.4-.2,6.8-2.6,7-7,.1-1.2.1-1.6.1-4.9s0-3.7-.1-4.9c-.2-4.4-2.6-6.8-7-7C5562.827,5439.925,5562.427,5439.925,5559.127,5439.925Zm0,5.8a6.2,6.2,0,1,0,6.2,6.2A6.231,6.231,0,0,0,5559.127,5445.725Zm0,10.2a4,4,0,1,1,4-4A4.012,4.012,0,0,1,5559.127,5455.925Zm6.4-11.8a1.4,1.4,0,1,0,1.4,1.4A1.367,1.367,0,0,0,5565.527,5444.125Z"
                  transform="translate(-5547.127 -5439.925)"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavigationModal;
