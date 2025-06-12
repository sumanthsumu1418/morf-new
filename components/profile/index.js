import Wishlist from "./wishlist";
import Invoices from "./invoices";
import LoginDetails from "./loginDetails";
import Newsletter from "./newsletter";
import PersonalDetails from "./personalDetails";
import Purchases from "./purchases";
import AddressBook from "./addressBook";
import { useEffect, useState } from "react";
import useMediaQuery from "hooks/useMediaQuery";
import { useDispatch } from "react-redux";
import { login, setState } from "store/user/action";
import { userInitialState } from "store/user/reducer";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { signOut } from "next-auth/react";
import { CURRENT_USER_DATA } from "graphql/productsqueries";
import nookies from "nookies";
import Reclient from "../shared/Reclient";
import { deleteCookie } from "cookies-next";
import client from "../shared/client";
import LogoutPopup from "./logoutPopUp";

const Profile = ({
  setShowModal,
  setAddressModal,
  setModalText,
  setWishlistId,
  setAddressId,
  setPageIndex,
  setAddressChangeModal,
  addressId,
  activeCustomer,
}) => {
  const profileSections = [
    {
      id: 1,
      title: "PURCHASES",
    },
    {
      id: 2,
      title: "INVOICES",
    },
    {
      id: 3,
      title: "WISHLIST",
    },
    {
      id: 4,
      title: "PERSONAL DETAILS",
    },
    {
      id: 5,
      title: "NEWSLETTER",
    },
    {
      id: 6,
      title: "LOGIN DETAILS",
    },
    {
      id: 7,
      title: "ADDRESS BOOK",
    },
    { id: 8, logout: "Log out" },
  ];

  const [index, setIndex] = useState("PURCHASES");
  const isBreakPoint = useMediaQuery(1024);

  const router = useRouter();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.userData);
  const [showModal, setShowLogoutModal] = useState(false);

  const handleLogout = () => {
    toast.success("Logout Success!");
    localStorage.removeItem("VENDURE_AUTH_TOKEN");
    localStorage.removeItem("reduxStore-morf");
    localStorage.removeItem("UserDetails");
    localStorage.removeItem("cartLength");
    deleteCookie("VENDURE_AUTH_TOKEN");
    dispatch(setState(userInitialState));
    signOut({
      callbackUrl: `${window.location.origin}`,
    });
  };
  useEffect(async () => {
    const {
      data: { activeCustomer },
    } = await client.query({
      query: CURRENT_USER_DATA,
    });

    dispatch(login(activeCustomer));
  }, []);

  return (
    <>
      <div className="leftbox"></div>

      <div className="profile container">
        <div className="profileLeft ">
          <div className="profileLeftContainer">
            <div className="profileName">
              <p>Welcome</p>
              <p className="username">{user?.firstName}</p>
            </div>
            <div className="profileSections">
              <div className="profileSectionsContainer">
                {profileSections.map((e) => (
                  <div key={e?.id} className="profileSection">
                    <p
                      style={{
                        color: index === e?.title && "#570707",
                        transform: index === e?.title ? "translateX(0)" : "",
                        borderBottom:
                          isBreakPoint && index === e?.title
                            ? "3px solid #570707"
                            : "",
                      }}
                      onClick={() => {
                        if (addressId && e.title == "PERSONAL DETAILS") {
                          setIndex(e.title);
                        } else {
                          setAddressId(null);
                          setIndex(e.title);
                        }
                      }}
                      // className="profileSection__Name"
                      className={
                        isBreakPoint && index === e?.title
                          ? "profileSection__Names"
                          : "profileSection__Name"
                      }
                    >
                      <span
                        style={{
                          transform: index === e?.title ? "translateX(0)" : "",
                          backgroundColor: index === e?.title ? "#570707" : "",
                        }}
                        className="profileHoverLine"
                      ></span>
                      {e?.title}{" "}
                      <span
                        onClick={() => setShowLogoutModal(true)}
                        className="mob_logout"
                      >
                        {e?.logout}
                      </span>
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div onClick={() => setShowLogoutModal(true)} className="logout">
              <p>LOG OUT</p>
            </div>
          </div>
        </div>

        {showModal && (
          <LogoutPopup
            setShowModal={setShowLogoutModal}
            handelyes={handleLogout}
          />
        )}

        <div className="profileRight ">
          <div className="Right  ">
            {index === "PURCHASES" && <Purchases />}
            {index === "ADDRESS BOOK" && (
              <AddressBook
                setShowModal={setShowModal}
                setAddressId={setAddressId}
                setPageIndex={setPageIndex}
                setAddressChangeModal={setAddressChangeModal}
                setIndex={setIndex}
              />
            )}
            {index === "INVOICES" && <Invoices />}
            {index === "PERSONAL DETAILS" && (
              <PersonalDetails
                addressId={addressId}
                setAddressModal={setAddressModal}
                setModalText={setModalText}
                setAddressId={setAddressId}
                setIndex={setIndex}
              />
            )}
            {index === "LOGIN DETAILS" && (
              <LoginDetails
                setAddressModal={setAddressModal}
                setModalText={setModalText}
              />
            )}
            {index === "NEWSLETTER" && <Newsletter />}
            {index === "WISHLIST" && (
              <Wishlist
                setWishlistId={setWishlistId}
                setShowModal={setShowModal}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
