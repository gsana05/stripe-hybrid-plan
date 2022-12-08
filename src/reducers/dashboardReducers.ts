import {
    SET_PURCHASE_TOKEN_REQUEST_REQUEST,
    SET_PURCHASE_TOKEN_REQUEST_SUCCESS,
    SET_PURCHASE_TOKEN_REQUEST_FAILURE,
    SET_PENDING_PURCHASE_TOKEN_REQUEST,
    SET_PENDING_PURCHASE_TOKEN_REQUEST_SUCCESS,
    SET_PENDING_PURCHASE_TOKEN_REQUEST_FAILURE,
    GET_PENDING_PURCHASE_TOKEN_REQUEST,
    GET_PENDING_PURCHASE_TOKEN_REQUEST_FAILURE,
    GET_PENDING_PURCHASE_TOKEN_REQUEST_SUCCESS
  } from "../actions/actionTypes";
  
  import { PurchasedTokenActions, PurchaseTokenState } from "../types/Types";
  
  const initialState: PurchaseTokenState = {
    paidPending: false,
    unpaidPending: false,
    paidToken: null,
    unpaidPendingAccessToken: null,
    paidError: null,
    unpaidError: null
  };
  // REDUCER: You can think of a reducer as an event listener which handles events based on the received action (event) type.
  
  export default (state = initialState, action: PurchasedTokenActions) => {
    switch (action.type) {
      
      case SET_PURCHASE_TOKEN_REQUEST_REQUEST:
        return {
          ...state,
          paidPending: true,
        };
      case SET_PURCHASE_TOKEN_REQUEST_SUCCESS:
        return {
          ...state,
          pending: false,
          paidToken: action.payload.purchaseToken,
          paidError: null,
        };
      case SET_PURCHASE_TOKEN_REQUEST_FAILURE:
        return {
          ...state,
          paidPending: false,
          token: null,
          paidError: action.payload.error,
        };

      case SET_PENDING_PURCHASE_TOKEN_REQUEST:
        return {
          ...state,
          unpaidPending: true,
        };

      case SET_PENDING_PURCHASE_TOKEN_REQUEST_SUCCESS:
        console.log("PENDING PURCHASE TOKEN ADDED", action.payload);
        return {
          ...state,
          unpaidPending: false,
          unpaidPendingAccessToken: action.payload.pendingPurchaseToken,
          unpaidError: null,
        };
      case SET_PENDING_PURCHASE_TOKEN_REQUEST_FAILURE:
        return {
          ...state,
          unpaidPending: false,
          unpaidPendingAccessToken: null,
          unpaidError: action.payload.error,
        };

      case GET_PENDING_PURCHASE_TOKEN_REQUEST:
        return {
          ...state,
          unpaidPending: true,
        };

      case GET_PENDING_PURCHASE_TOKEN_REQUEST_SUCCESS:
        console.log("PENDING PURCHASE TOKEN ADDED", action.payload);
        return {
          ...state,
          unpaidPending: false,
          unpaidPendingAccessToken: action.payload.pendingPurchaseToken,
          unpaidError: null,
        };
      case GET_PENDING_PURCHASE_TOKEN_REQUEST_FAILURE:
        return {
          ...state,
          unpaidPending: false,
          unpaidPendingAccessToken: null,
          unpaidError: action.payload.error,
        };

      default:
        return {
          ...state,
        };
    }
  };