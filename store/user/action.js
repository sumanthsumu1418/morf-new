import { useSelector } from "react-redux";
import { toast } from "react-toastify";

// actions types
export const userActionTypes = {
  UPDATE_NAME: "UPDATE_NAME",
  ADD_TO_CART: "ADD_TO_CART",
  INCREMENT_CART: "INCREMENT_CART",
  DECREMENT_CART: "DECREMENT_CART",
  REMOVE_FROM_CART: "REMOVE_FROM_CART",
  LOGIN: "LOGIN",
  LOGOUT: "LOGOUT",
  ADD_TO_WISHLIST: "ADD_TO_WISHLIST",
  REMOVE_FROM_WISHLIST: "REMOVE_FROM_WISHLIST",
  SET_STATE: "SET_STATE",
  SET_CURRENT_PRODUCT: "SET_CURRENT_PRODUCT",
  CLEAR_WISHLIST: "CLEAR_WISHLIST",
  INITIAL_CART: "INITIAL_CART",
  INITIAL_ORDER_ID: "INITIAL_ORDER_ID",
  IS_LOGIN: "IS_LOGIN",
  CLEAR_CART: "CLEAR_CART",
};

// console.log(userActionTypes.IS_LOGIN,"IS LOGIN")
export const initialOrderId = (activeOrderId) => (dispatch) => {
  return dispatch({
    type: userActionTypes.INITIAL_ORDER_ID,
    payload: activeOrderId,
  });
};
export const isLogin = () => (dispatch) => {
  return dispatch({ type: userActionTypes.IS_LOGIN });
};
export const initialCart = (cart) => (dispatch) => {
  // console.log("1");
  return dispatch({ type: userActionTypes.INITIAL_CART, payload: cart });
};
export const clearWishlist = (state) => (dispatch) => {
  return dispatch({ type: userActionTypes.CLEAR_WISHLIST });
};
export const setState = (state) => (dispatch) => {
  return dispatch({ type: userActionTypes.SET_STATE, payload: state });
};
export const setCurrentProduct = (product) => (dispatch) => {
  return dispatch({
    type: userActionTypes.SET_CURRENT_PRODUCT,
    payload: product,
  });
};
export const updateUserName = () => (dispatch) => {
  return dispatch({ type: userActionTypes.UPDATE_NAME });
};

export const addToCart = (item) => (dispatch) => {
  return dispatch({ type: userActionTypes.ADD_TO_CART, payload: item });
};

export const incrementCart = (id) => (dispatch) => {
  return dispatch({ type: userActionTypes.INCREMENT_CART, payload: id });
};

export const decrementCart = (id) => (dispatch) => {
  return dispatch({ type: userActionTypes.DECREMENT_CART, payload: id });
};

export const removeFromCart = (id) => (dispatch) => {
  return dispatch({ type: userActionTypes.REMOVE_FROM_CART, payload: id });
};

export const login = (data) => (dispatch) => {
  return dispatch({ type: userActionTypes.LOGIN, payload: data });
};
export const addToWishlist = (item, wishlist) => (dispatch) => {
  if (!wishlist.inculdes(item)) {
    //
    const newwishlist = [...wishlist, item];
    localStorage.setItem("wishlist", JSON.stringify(newwishlist));
  }

  return dispatch({ type: userActionTypes.ADD_TO_WISHLIST, payload: item });
};
export const removeFromWishlist = (id) => (dispatch) => {
  return dispatch({ type: userActionTypes.REMOVE_FROM_WISHLIST, payload: id });
};
