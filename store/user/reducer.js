import client from "@/components/shared/client";
import { useDispatch } from "react-redux";
import { userActionTypes } from "./action";
import { GET_ALL_PRODUCTS } from "graphql/productsqueries";

export const userInitialState = {
  cart: [],
  wishlist: [],

  userData: {
    emailAddress: "",
  },
  activeOrderId: -1,
  isLogin: false,
  isLoginPop: false,
  activeWishlist: [],
  cartSize: 0,
  ActiveOrder: null,
};

const getIndex = (array = [], id) => array.findIndex((e) => e.lineId == id);

export default function reducer(state = userInitialState, action) {
  // const dispatch = useDispatch();
  switch (action.type) {
    case userActionTypes.IS_LOGIN:
      return {
        ...state,
        isLogin: true,
      };
    case userActionTypes.UPDATE_NAME:
      return Object.assign({}, state, {
        userName: action.payload,
      });
    case "CART_SIZE": {
      return {
        ...state,
        cartSize: action.payload,
      };
    }

    case "ACTIVE_ORDERS": {
      return {
        ...state,
        ActiveOrder: action.payload,
      };
    }

    case userActionTypes.ADD_TO_CART:
      if (getIndex(state.cart, action.payload.id) != -1) {
        const index = getIndex(state.cart, action.payload.id);
        const newArray = [...state.cart];
        const item = newArray[index];
        newArray[index] = {
          ...item,
          quantity: item.quantity + 1,
        };
        return Object.assign({}, state, {
          ...state,
          cart: newArray,
        });
      }
      return Object.assign({}, state, {
        ...state,
        cart: state.cart.find((e) => e.lineId === action.payload.id)
          ? state.cart
          : [...state.cart, action.payload],
      });

    case "ADD_TO_ACTIVE_WISHLIST": {
      return {
        ...state,
        activeWishlist: [...action.payload],
      };
    }
    case "REMOVE_FROM_ACTIVE_WISHLIST": {
      return {
        ...state,
        activeWishlist: state.activeWishlist.filter(
          (e) => e.slug !== action.payload
        ),
      };
    }

    case userActionTypes.INCREMENT_CART: {
      const index = getIndex(state.cart, action.payload);
      const newArray = [...state.cart];
      const item = newArray[index];
      newArray[index] = {
        ...item,
        quantity: item.quantity + 1,
      };
      return Object.assign({}, state, {
        ...state,
        cart: newArray,
      });
    }

    case userActionTypes.DECREMENT_CART: {
      const index = getIndex(state.cart, action.payload);
      const newArray = [...state.cart];
      const item = newArray[index];
      newArray[index] = {
        ...item,
        quantity: item.quantity >= 1 ? item.quantity - 1 : item.quantity,
      };
      if (newArray[index].quantity <= 0)
        return {
          ...state,
          cart: state.cart.filter((e) => e.lineId !== action.payload),
        };
      return Object.assign({}, state, {
        ...state,
        cart: newArray,
      });
    }

    case "ACTIVE_WISHLIST_SLUG": {
      return {
        ...state,
        activeWishlist: [...action.payload],
      };
    }

    case userActionTypes.REMOVE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter((e) => e.lineId !== action.payload),
      };

    case userActionTypes.LOGIN:
      return Object.assign({}, state, {
        userData: action.payload,
      });

    //wishlist reducers

    case userActionTypes.ADD_TO_WISHLIST: {
      return {
        ...state,
        wishlist: [...action.payload],
      };
    }
    case "ADD_ITEM_TO_WISHLIST": {
      return {
        ...state,
        wishlist: [...state.wishlist, action.payload],
      };
    }

    case userActionTypes.REMOVE_FROM_WISHLIST: {
      return {
        ...state,
        wishlist: state.wishlist.filter((e) => e !== action.payload),
      };
    }
    case userActionTypes.SET_STATE: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case userActionTypes.SET_CURRENT_PRODUCT: {
      return {
        ...state,
        currentProduct: action.payload,
      };
    }
    case userActionTypes.CLEAR_WISHLIST: {
      return {
        ...state,
        wishlist: [],
      };
    }
    case userActionTypes.CLEAR_CART: {
      return {
        ...state,
        cart: [],
      };
    }
    case userActionTypes.INITIAL_CART: {
      return {
        ...state,
        cart: action.payload,
      };
    }
    case userActionTypes.INITIAL_ORDER_ID: {
      return {
        ...state,
        activeOrderId: action.payload,
      };
    }
    case "OPEN_POPUP_LOGIN": {
      return {
        ...state,
        isLoginPop: true,
      };
    }
    case "CLOSE_LOGIN": {
      return {
        ...state,
        isLogin: false,
      };
    }
    case "CLOSE_POPUP_LOGIN": {
      return {
        ...state,
        isLoginPop: false,
      };
    }
    case "REMOVE_FROM_ADDRESS": {
      const address = state.userData?.addresses.filter(
        (item) => item.id !== action.payload
      );
      return {
        ...state,
        userData: {
          ...state.userData,
          addresses: address,
        },
      };
    }
    default:
      return state;
  }
}
