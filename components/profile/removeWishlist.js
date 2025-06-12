import {
  CREATE_WISHLIST,
  DELETE_CUSTOMER_ADDRESS,
} from "graphql/productsqueries";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { removeFromWishlist } from "store/user/action";
import client from "../shared/client";

const RemoveWishList = ({
  showModal,
  setShowModal,
  wishlistId,
  index,
  addressId,
  name,
  handelRemoveItem,
}) => {
  const wishlistData = useSelector((state) => state.user.wishlist);

  const dispatch = useDispatch();

  const handleWishlistRemove = async () => {
    if (index === "ADDRESS BOOK") {
      const res = await client.mutate({
        mutation: DELETE_CUSTOMER_ADDRESS,
        variables: {
          id: addressId,
        },
      });
      if (res.data?.deleteCustomerAddress?.__typename == "Success") {
        dispatch({
          type: "REMOVE_FROM_ADDRESS",
          payload: addressId,
        });
      }
      setShowModal(false);
    } else {
      const wishlistSlug = localStorage.getItem("wishlistData");
      if (wishlistSlug) {
        const wishlistDataRes = JSON.parse(wishlistSlug).filter(
          (item) => item !== wishlistId
        );
        localStorage.setItem("wishlistData", JSON.stringify(wishlistDataRes));

        const response = await client.mutate({
          mutation: CREATE_WISHLIST,
          variables: {
            whislist: wishlistDataRes,
          },
        });

        dispatch({
          type: "REMOVE_FROM_WISHLIST",
          payload: wishlistId,
        });
        dispatch({
          type: "REMOVE_FROM_ACTIVE_WISHLIST",
          payload: wishlistId,
        });

        setShowModal(false);
      }
    }
  };

  return (
    <div className="removeWishlist">
      <div className="removeWishlist__Container">
        <div className="removeWishlist__Container__removeTop">
          <div className="crossButton" onClick={() => setShowModal(false)}>
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
        <div className="removeWishlist__Container__Bottom">
          <div className="removeWishlist__Container__Bottom__text">
            <p className="textHeader">Are you sure, you want to remove?</p>
          </div>
          <div className="resetButtons">
            <button
              onClick={
                name && name == "removeCart"
                  ? handelRemoveItem
                  : handleWishlistRemove
              }
              className="resetButtons__yes  common-btn-style-alt"
            >
              <span>Yes</span>
            </button>
            <button
              onClick={() => setShowModal(false)}
              className="resetButtons__no  common-btn-style-alt"
            >
              <span>No</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RemoveWishList;
