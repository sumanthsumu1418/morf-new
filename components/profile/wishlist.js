import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import WishlistCard from "./WishlistCard";
import Link from "next/link";
import client from "../shared/client";
import {
  GET_ACTIVE_WISHLIST,
  GET_PRODUCT_WISHLIST,
} from "graphql/productsqueries";

const Wishlist = ({ setShowModal, setWishlistId }) => {
  const dispatch = useDispatch();
  const wishlistData = useSelector((state) => state.user.activeWishlist);
  useEffect(async () => {
    //

    const res = await client.query({
      query: GET_ACTIVE_WISHLIST,
    });
    if (
      res.data?.activeCustomer?.customFields?.__typename ==
      "CustomerCustomFields"
    ) {
      dispatch({
        type: "ADD_TO_WISHLIST_DATA",
        payload: res.data?.activeCustomer?.customFields?.wishlist,
      });
      localStorage.setItem(
        "wishlistData",
        JSON.stringify(res.data?.activeCustomer?.customFields?.wishlist)
      );
      const activeWishlistResponse = await client.query({
        query: GET_PRODUCT_WISHLIST,
        variables: {
          option: res.data?.activeCustomer?.customFields?.wishlist,
        },
      });

      if (activeWishlistResponse.data.products?.__typename == "ProductList") {
        dispatch({
          type: "ADD_TO_ACTIVE_WISHLIST",
          payload: activeWishlistResponse.data?.products?.items,
        });
      }
    } else {
      dispatch({
        type: "ADD_TO_WISHLIST",
        payload: [],
      });
    }
  }, []);

  const handleWishlistRemove = (id) => {
    setWishlistId(id);
    setShowModal(true);
  };

  return (
    <div className="wishlist">
      <div className="WishlistsHeader">
        <p className="WishlistHeading">YOUR WISHLIST</p>
        <p className="WishlistSubheading">Manage your wishlist</p>
        <div className="WishlistHeaderDivider"></div>
      </div>
      <div className="WishlistsList">
        {wishlistData.length ? (
          <div className="wishlistItem">
            {wishlistData.map((e) => (
              <div className="wishlistItem--singleContainer" key={e.slug}>
                <WishlistCard
                  handleWishlistRemove={handleWishlistRemove}
                  {...e}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="notFound">
            <div className="notFoundIcon">
              <svg width="57.799" height="51.939" viewBox="0 0 57.799 51.939">
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
              <p>No item found.</p>
              <Link href="/shoes" passHref>
                <a className="startShopping">Start adding item</a>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
