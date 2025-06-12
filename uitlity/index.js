import client from "@/components/shared/client";
import { setCookie, getCookie } from "cookies-next";
import {
  IS_ACTIVE_ORDER,
  TRANSITION_ORDER_STATE,
} from "graphql/productsqueries";

export const addActiveOrdersToCart = (lines) => {
  let cartArr = [];

  for (let i = 0; i < lines?.length; i++) {
    if (lines[i]?.productVariant?.id == "485") {
      const customFieldsWithoutParse = lines[i]?.customFields?.customOptions;
      const customFields = customFieldsWithoutParse
        ? JSON.parse(customFieldsWithoutParse)
        : null;
      // const customFields = ;

      let cartObj = {
        id: lines[i]?.productVariant?.id,
        customFields: customFields,
        name: "Custome Product",
        slug: customFields
          ? `customiser?shoe_design=${
              customFields?.customizer_code
            }&shoe_price=${lines[i]?.productVariant?.price / 100}`
          : "customiser",
        lineId: lines[i].id,
        alt: "",
        category: "",
        price: lines[i]?.linePriceWithTax,
        quantity: lines[i]?.quantity,
        is_mirror_gloss: customFields?.is_mirror_gloss,
        src:
          customFields?.images?.length > 0
            ? customFields?.images[0]
            : "https://morf-vendure.kurage.store/assets/preview/15/morf_logo__preview.png",

        variants: [
          {
            id: lines[i]?.productVariant?.id,
            price: lines[i]?.productVariant?.priceWithTax / 100,
            stockLevel: lines[i]?.productVariant?.stockLevel,
            sku: lines[i]?.productVariant?.sku,
            createdAt: lines[i]?.productVariant?.createdAt,
          },
        ],
        size: customFields?.size
          ? customFields?.size
              ?.replace("Standard (E)", " ")
              ?.replace("Wide (EE)", " ")
          : "Uk 5.5 ",
      };
      cartArr.push(cartObj);
    } else {
      let size = "";
      const customFieldsWithoutParse = lines[i]?.customFields?.customOptions;
      const customFields = customFieldsWithoutParse
        ? JSON.parse(customFieldsWithoutParse)
        : null;

      const options = lines[i]?.productVariant?.options;

      if (options[0]?.code == "standard") size = options[1]?.name;
      else if (options[1]?.code == "standard") size = options[0]?.name;
      else if (options[0]?.code == "wide") size = options[1]?.name;
      else size = options[0]?.name;
      let cartObj = {
        id: lines[i]?.productVariant?.product?.id,
        name: lines[i]?.productVariant?.product?.name,
        slug: lines[i]?.productVariant?.product?.slug,
        lineId: lines[i].id,
        customFields: customFields,
        src: lines[i]?.productVariant?.product?.assets[0]?.source,
        hoverState: [
          {
            preview: lines[i]?.productVariant?.product?.assets[0]?.preview,
            height: lines[i]?.productVariant?.product?.assets[0]?.height,
            width: lines[i]?.productVariant?.product?.assets[0]?.width,
          },
        ],
        alt: "",
        category: "",
        is_mirror_gloss: customFields?.is_mirror_gloss,
        price: lines[i]?.linePriceWithTax,
        quantity: lines[i]?.quantity,
        variants: [
          {
            id: lines[i]?.productVariant?.id,
            price: lines[i]?.productVariant?.priceWithTax / 100,
            stockLevel: lines[i]?.productVariant?.stockLevel,
            sku: lines[i]?.productVariant?.sku,
            createdAt: lines[i]?.productVariant?.createdAt,
          },
        ],
        size: size,
        shoesType:
          options[0]?.code == ("standard" || "wide")
            ? options[0]?.name
            : options[1]?.name,
      };
      cartArr.push(cartObj);
    }
  }
  return cartArr;
};
export const getDiscount = (activeOrder) => {
  let currDiscount = 0;
  let DiscountCollection = [];
  activeOrder?.discounts.map((items, index) => {
    currDiscount += Number(items?.amount ? items?.amount / 100 : 0);
    // console.log("xxxyyy",currDiscount)
    DiscountCollection.push({
      code: activeOrder?.couponCodes[index],
      amount: Number(items?.amount ? items?.amount / 100 : 0),
      name: items?.description,
    });
  });
  return {
    discounts: DiscountCollection,
    totalDiscounts: Number(currDiscount),
    subTotal: Number(
      activeOrder?.subTotalWithTax ? activeOrder?.subTotalWithTax / 100 : 0
    ),
    Total: activeOrder?.totalWithTax ? activeOrder?.totalWithTax / 100 : 0,
  };
};

export const isUserAuthenticated = () => {
  const getCookies = getCookie("VENDURE_AUTH_TOKEN");
  return getCookies;
};

export const isActiveCartInOtherState = async () => {
  const response = await client.query({
    query: IS_ACTIVE_ORDER,
  });
  if (
    response?.data?.activeOrder !== null &&
    response?.data?.activeOrder?.state !== "AddingItems"
  ) {
    const res = await client.mutate({
      mutation: TRANSITION_ORDER_STATE,
      variables: {
        state: "AddingItems",
      },
    });
  }
};
