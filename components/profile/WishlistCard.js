import { ACTIVE_ORDER, ADD_ITEM_TO_ORDER } from "graphql/productsqueries";
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

const WishlistCard = ({
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
  handleWishlistRemove,
  ...props
}) => {
  // console.log("Prdocut cart props",props);
  // console.log("props Slug", slug);
  const router = useRouter();
  const dispatch = useDispatch();

  const isLogin = useSelector((state) => state.user.isLogin);

  const handleAddtoCart = async () => {
    const res = await client.mutate({
      mutation: ADD_ITEM_TO_ORDER,
      variables: {
        productVariantId: variants[0].id,
        quantity: 1,
      },
    });
    // console.log(res);
    toast.success("Success!");
    dispatch(
      addToCart({
        id,
        src,
        hoverState,
        alt,
        category,
        price,
        quantity,
        name,
        variants,
      })
    );
  };

  const handleCustomise = () => {
    router.push({
      pathname: `/customiser`,
      query: { shoe_design: "226090000010000070211130408161108090000000100" },
    });
  };

  // console.log(id);
  return (
    <div className={`wishlist-card ${customClass ? customClass : ""}`}>
      <div
        className="wishlist-card-image"
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
          <a className="wishlist-card-image-container">
            <img
              style={{
                objectFit: "cover !important",
                width: "100% !important",
              }}
              className="activeImg"
              src={`${process.env.NEXT_PUBLIC_PRODUCTIMAGES}/images/${slug}/cover-1.jpg`}
              alt={alt}
              // style={{ width: 300, height: 400 }}
            />
            <img
              className="hoverImg"
              src={`${process.env.NEXT_PUBLIC_PRODUCTIMAGES}/images/${slug}/cover-2.jpg`}
              alt={alt}
            />
          </a>
        </Link>
      </div>
      <div className="wishlist-card-footer">
        <div className="wishlist-card-footer-product-info">
          <p className="wishlist-category"> {name} </p>
          <p className="wishlist-price">
            {" "}
            <span style={{ display: "inline" }}>&#8377; </span>{" "}
            {variants[0]?.price / 100}{" "}
          </p>
        </div>
        <div className="wishlist-card-footer-hr"> </div>
        <div className="wishlist-buttons">
          {/* <Link href="/customiser" passHr/ef> */}

          {/* </Link> */}
          <Link href="/shoes/[slug]" as={`/shoes/${slug}`} passHref>
            <button className="add-to-cart common-btn-style-alt">
              <span className="add_to_cart-btn "> Add to cart </span>
            </button>
          </Link>

          <button
            onClick={() => {
              handleWishlistRemove(slug);
            }}
            className="remove common-btn-style-alt"
          >
            <span className="add_to_cart-btn">Remove</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default WishlistCard;
