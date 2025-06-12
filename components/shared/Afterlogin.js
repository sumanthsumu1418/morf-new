import { ACTIVE_ORDER, ADD_ITEM_TO_ORDER } from "graphql/productsqueries";
import React from "react";
import { useDispatch } from "react-redux";
import { setState } from "store/user/action";
import { userInitialState } from "store/user/reducer";
import client, { AUTH_TOKEN_KEY } from "./client";
import { toast } from "react-toastify";
import { signOut, useSession } from "next-auth/react";

const Afterlogin = ({ handleClose }) => {
  const session = useSession();
  const dispatch = useDispatch();
  const logout = (e) => {
    signOut();
  };
  const signInApp = async () => {
    // signIn();
    const res2 = await client.mutate({
      mutation: ADD_ITEM_TO_ORDER,
      variables: {
        productVariantId: 58,
        quantity: 1,
      },
    });
    const res = await client.query({
      query: ACTIVE_ORDER,
    });
    console.log(res);
  };
  return (
    <div>
      <div className="secondSec_content_viewMore">
        <p className={`common-btn-style secondSec_content_viewMore_Link`}>
          <span
            onClick={(e) => {
              e.preventDefault();
              signOut();
            }}
          >
            Log Outhhbhbh
          </span>
        </p>
      </div>
    </div>
  );
};

export default Afterlogin;
