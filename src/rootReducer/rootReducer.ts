import { combineReducers } from "redux";

import dashboardReducer from "../reducers/dashboardReducers";

// REDUCER: You can think of a reducer as an event listener which handles events based on the received action (event) type.
const rootReducer = combineReducers({
  astronaut: dashboardReducer,
});

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;