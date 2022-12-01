import { createSelector } from "reselect";

import { AppState } from "../rootReducer/rootReducer";

const getPending = (state: AppState) => state.astronaut.pending;

const getAstronauts = (state: AppState) => state.astronaut.token;

const getError = (state: AppState) => state.astronaut.error;

export const getAstronautsSelector = createSelector(getAstronauts, (astronauts) => astronauts);

export const getPendingSelector = createSelector(
  getPending,
  (pending) => pending
);

export const getErrorSelector = createSelector(getError, (error) => error);