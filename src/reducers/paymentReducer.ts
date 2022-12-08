import {
  SET_PENDING_PURCHASE_TOKEN_REQUEST,
  SET_PENDING_PURCHASE_TOKEN_REQUEST_SUCCESS,
  SET_PENDING_PURCHASE_TOKEN_REQUEST_FAILURE,
} from "../actions/actionTypes";

import { PendingPurchasedTokenActions, PendingPurchaseTokenState } from "../types/Types";

const initialState: PendingPurchaseTokenState = {
  pending: false,
  token: null,
  error: null,
};
// REDUCER: You can think of a reducer as an event listener which handles events based on the received action (event) type.

export default (state = initialState, action: PendingPurchasedTokenActions) => {
  switch (action.type) {
    case SET_PENDING_PURCHASE_TOKEN_REQUEST:
      return {
        ...state,
        pending: true,
      };
    case SET_PENDING_PURCHASE_TOKEN_REQUEST_SUCCESS:
      return {
        ...state,
        pending: false,
        token: action.payload.pendingPurchaseToken,
        error: null,
      };
    case SET_PENDING_PURCHASE_TOKEN_REQUEST_FAILURE:
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