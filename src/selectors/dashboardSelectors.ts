import { createSelector } from "reselect";

import { AppState } from "../rootReducer/rootReducer";

const getUnpaidPending = (state: AppState) => state.dashboard.unpaidPending

const getUnpaidPendingAccessToken = (state: AppState) => state.dashboard.unpaidPendingAccessToken;

const getUnpaidError = (state: AppState) => state.dashboard.unpaidError;

export const getUnpaidPendingAccessTokenSelector = createSelector(getUnpaidPendingAccessToken, (unpaidPendingAccessToken) => unpaidPendingAccessToken);

export const getUnpaidPendingSelector = createSelector(
  getUnpaidPending,
  (pending) => pending
);

export const getUnpaidErrorSelector = createSelector(getUnpaidError, (error) => error);
