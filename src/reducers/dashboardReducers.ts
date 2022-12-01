import {
    SET_PURCHASE_TOKEN_REQUEST_REQUEST,
    SET_PURCHASE_TOKEN_REQUEST_SUCCESS,
    SET_PURCHASE_TOKEN_REQUEST_FAILURE,
  } from "../actions/actionTypes";
  
  import { PurchasedTokenActions, PurchaseTokenState } from "../types/Types";
  
  const initialState: PurchaseTokenState = {
    pending: false,
    token: null,
    error: null,
  };
  // REDUCER: You can think of a reducer as an event listener which handles events based on the received action (event) type.
  
  export default (state = initialState, action: PurchasedTokenActions) => {
    switch (action.type) {
      case SET_PURCHASE_TOKEN_REQUEST_REQUEST:
        return {
          ...state,
          pending: true,
        };
      case SET_PURCHASE_TOKEN_REQUEST_SUCCESS:
        return {
          ...state,
          pending: false,
          token: action.payload.purchaseToken,
          error: null,
        };
      case SET_PURCHASE_TOKEN_REQUEST_FAILURE:
        return {
          ...state,
          pending: false,
          token: null,
          error: action.payload.error,
        };
      default:
        return {
          ...state,
        };
    }
  };