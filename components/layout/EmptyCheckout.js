import React from "react";
import Link from "next/link";

export default function EmptyCheckout(props) {
  if (!props.cart.length) {
    return (

    <div className="cart__empty">
      <p className="cart__empty--text">
        It appears that your cart is currently empty!
      </p>

      <Link href="/shoes">
        <a className={`common-btn-style cart__empty--startShopping`}>
          <span>START SHOPPING</span>
        </a>
      </Link>
    </div>);
  }

  return <div>{props?.children}</div>;
}
