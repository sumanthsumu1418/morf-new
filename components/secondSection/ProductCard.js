import {
  ACTIVE_ORDER,
  ADD_ITEM_TO_ORDER,
  CREATE_WISHLIST,
  GET_ACTIVE_WISHLIST,
} from "graphql/productsqueries";
import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  removeFromCart,
  incrementCart,
  decrementCart,
  addToWishlist,
  setCurrentProduct,
} from "store/user/action";
import client from "../shared/client";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useEffect } from "react";

const ProductCard = ({
  id = "",
  src = "",
  hoverState = "",
  alt = "",
  category = "",
  price = "",
  quantity = 1,
  customClass = "",
  facetValues = [],
  variants = [],
  name = "",
  description = "",
  slug = "",
  customFields = {},
  ...props
}) => {
  // //console.log("Prdocut cart customFields", customFields);
  // //console.log("props Slug", slug);
  const router = useRouter();
  const dispatch = useDispatch();
  const session = useSession();

  const wishlistData = useSelector((state) => state.user.wishlist);

 
  const HandleWislist = async (item) => {
    if (!wishlistData?.includes(item)) {
      const res = await client.mutate({
        mutation: CREATE_WISHLIST,
        variables: {
          whislist: [...wishlistData, item],
        },
      });
      dispatch({
        type: "ADD_ITEM_TO_WISHLIST",
        payload:item,
      });

     
      toast.success("Added to wishlist!");
    } else {
      const res=wishlistData?.filter((it)=>it!==item)
      await client.mutate({
        mutation: CREATE_WISHLIST,
        variables: {
          whislist: res
        },
      });
      dispatch({
        type: "REMOVE_FROM_WISHLIST",
        payload:item,
      });
     
      
      toast.success("Remove from wishlist!");
      
    }
  };

 

  const handleCustomise = () => {
    router.push({
      pathname: `/customiser`,
      query: {
        shoe_design: customFields?.customiser_code,
        // shoe_design:
        //   "1320003000003000003000000000000000000000000000000000000000003000000030000",
        shoe_price: variants[0]?.price / 100,
      },
    });
  };

  // ////console.log(id);
  return (
    <div className={`product-card ${customClass ? customClass : ""}`}>
      <div
        className="product-card-image"
        onClick={() =>
          dispatch(
            setCurrentProduct({
              id,
              src,
              hoverState,
              alt,
              category,
              price,
              quantity,
              name,
              variants,
              slug,
              description,
            })
          )
        }
      >
        <Link href="/shoes/[slug]" as={`/shoes/${slug}`} passHref>
          <a className="product-card-image-container">
            <img
              style={{
                objectFit: "cover !important",
                width: "100% !important",
              }}
              loading="lazy"
              className="activeImg"
              src={`${process.env.NEXT_PUBLIC_S3ASSETS_URL}/images/${slug}/cover-1.jpg`}
              alt={alt}
              // style={{ width: 300, height: 400 }}
            />
            <img
              loading="lazy"
              className="hoverImg"
              src={`${process.env.NEXT_PUBLIC_S3ASSETS_URL}/images/${slug}/cover-2.jpg`}
              alt={alt}
            />
          </a>
        </Link>
        <div
          className="product-card-image-wishlist-icon"
          onClick={() => {
            if (session.status == "authenticated") {
              HandleWislist(slug);
            } else {
              dispatch({
                type: "OPEN_POPUP_LOGIN",
              });
              
              toast.error("please signin to add to wishlist");
            }
          }}
        >
          {/* <img src="/icons/product-wishlist-icon.svg" alt="" /> */}
          {wishlistData?.includes(slug) ? (
            <>
              <svg
                id="Component_60_18"
                data-name="Component 60 – 18"
                xmlns="http://www.w3.org/2000/svg"
                width="19"
                height="16.076"
                viewBox="0 0 19 16.076"
              >
                <path
                  id="Path_814"
                  data-name="Path 814"
                  d="M623.893,128.27c0,.045,0,.089,0,.133-.138,5.284-8.436,10.528-9.5,11.178-1.062-.65-9.36-5.894-9.5-11.178,0-.045,0-.088,0-.133a4.872,4.872,0,0,1,4.973-4.764,4.989,4.989,0,0,1,4.527,2.791,4.989,4.989,0,0,1,4.528-2.791A4.871,4.871,0,0,1,623.893,128.27Z"
                  transform="translate(-604.893 -123.506)"
                  fill={"#d3c5b0"}
                />
              </svg>
            </>
          ) : (
            <>
              <svg
                id="Component_60_18"
                data-name="Component 60 – 18"
                xmlns="http://www.w3.org/2000/svg"
                width="19"
                height="16.076"
                viewBox="0 0 19 16.076"
              >
                <path
                  id="Path_814"
                  data-name="Path 814"
                  d="M623.893,128.27c0,.045,0,.089,0,.133-.138,5.284-8.436,10.528-9.5,11.178-1.062-.65-9.36-5.894-9.5-11.178,0-.045,0-.088,0-.133a4.872,4.872,0,0,1,4.973-4.764,4.989,4.989,0,0,1,4.527,2.791,4.989,4.989,0,0,1,4.528-2.791A4.871,4.871,0,0,1,623.893,128.27Z"
                  transform="translate(-604.893 -123.506)"
                  fill={"#fff"}
                />
              </svg>
            </>
          )}
        </div>
      </div>
      <div className="product-card-footer">
        <div className="product-card-footer-product-info">
          <p className="product-category"> {name} </p>
          <p className="product-price">
            {" "}
            <span style={{ display: "inline" }}>&#8377; </span>{" "}
            {variants[0]?.price / 100}
          </p>
        </div>
        <div className="product-card-footer-hr"> </div>
        <div className="product-buttons">
          {customFields?.customiser_code && (
            <div
              className="add-to-cart common-btn-style-alt"
              onClick={handleCustomise}
            >
              <span className="add_to_cart-btn"> Customise </span>
            </div>
          )}

          <Link href="/shoes/[slug]" as={`/shoes/${slug}`} passHref>
            <div className="add-to-cart common-btn-style-alt">
              <span className="add_to_cart-btn "> Add to cart </span>
            </div>
          </Link>

          {/* <div onClick={handlerRemoveCart} className="add-to-cart">
            <button className="add_to_cart-btn"> Remove From Cart </button>
          </div> */}

          {/* <div onClick={handleIncrement} className="add-to-cart">
            <button className="add_to_cart-btn"> + </button>
          </div>

          <div onClick={handleDecrement} className="add-to-cart">
            <button className="add_to_cart-btn"> - </button>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
