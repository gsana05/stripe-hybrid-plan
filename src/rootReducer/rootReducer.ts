import { combineReducers } from "redux";

import dashboardReducer from "../reducers/dashboardReducers";
import paymentReducer from "../reducers/paymentReducer";

// REDUCER: You can think of a reducer as an event listener which handles events based on the received action (event) type.
const rootReducer = combineReducers({
  payment: paymentReducer,
  dashboard: dashboardReducer,
});

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;