import { useState } from "react";
import BaseLayout from "@/components/layout/BaseLayout";
import RemoveWishList from "@/components/profile/removeWishlist";
import AddressModal from "@/components/profile/addressModal";
import LoaderForComponent from "uitlity/loaderForComponent";
import SEO from "@/components/layout/SEO";
import dynamic from "next/dynamic";
import UpdateAddress from "@/components/profile/updateAddress";
import { useSession } from "next-auth/react";
import router from "next/router";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { login } from "store/user/action";
import { CURRENT_USER_DATA } from "graphql/productsqueries";
import { isUserAuthenticated } from "uitlity";

const ProfileComponent = dynamic(() => import("components/profile"), {
  ssr: false,
});

const Profile = () => {
  const [hostname, setHostname] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [wishlistId, setWishlistId] = useState("");
  const [addressModal, setAddressModal] = useState(false);
  const [modalText, setModalText] = useState("");
  const [pageIndex, setPageIndex] = useState("");
  const [addressId, setAddressId] = useState("");
  const [addressChangeModal, setAddressChangeModal] = useState(false);
  const session = useSession();
  const dispatch = useDispatch();

  useEffect(() => {
    if (typeof window !== "undefined") {
      setHostname(window?.location?.href);
    }
  }, []);
  useEffect(async () => {
    console.log("isUserAuthenticated", isUserAuthenticated());

    if (session.status == "unauthenticated" || !isUserAuthenticated()) {
      toast.error("unauthorized access");
      router.replace("/");
    }
  }, [session]);

  return (
    <>
      <SEO
        title="PROFILE - MORF"
        desc="Morf"
        pageUrl={hostname}
        ogImage="/images/og_img.png"
      />
      <BaseLayout hideFooter>
        {session.status == "authenticated" && isUserAuthenticated() ? (
          <>
            <ProfileComponent
              setShowModal={setShowModal}
              setAddressModal={setAddressModal}
              setModalText={setModalText}
              setWishlistId={setWishlistId}
              setAddressId={setAddressId}
              setPageIndex={setPageIndex}
              addressId={addressId}
              setAddressChangeModal={setAddressChangeModal}
            />
            {showModal && (
              <RemoveWishList
                wishlistId={wishlistId}
                index={pageIndex}
                addressId={addressId}
                setShowModal={setShowModal}
              />
            )}
            {addressModal && (
              <AddressModal
                modalText={modalText}
                setAddressModal={setAddressModal}
              />
            )}
            {addressChangeModal && (
              <UpdateAddress
                addressId={addressId}
                setAddressChangeModal={setAddressChangeModal}
              />
            )}
          </>
        ) : (
          <></>
        )}
        <LoaderForComponent />
      </BaseLayout>
    </>
  );
};

export default Profile;
