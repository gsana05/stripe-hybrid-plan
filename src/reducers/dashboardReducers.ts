import {
    FETCH_ASTRONAUT_REQUEST,
    FETCH_ASTRONAUT_SUCCESS,
    FETCH_ASTRONAUT_FAILURE,
  } from "../actions/actionTypes";
  
  import { AstronautActions, AstronautState } from "../types/Types";
  
  const initialState: AstronautState = {
    pending: false,
    astronauts: [],
    error: null,
  };
  // REDUCER: You can think of a reducer as an event listener which handles events based on the received action (event) type.
  
  export default (state = initialState, action: AstronautActions) => {
    switch (action.type) {
      case FETCH_ASTRONAUT_REQUEST:
        return {
          ...state,
          pending: true,
        };
      case FETCH_ASTRONAUT_SUCCESS:
        return {
          ...state,
          pending: false,
          astronauts: action.payload.astronauts,
          error: null,
        };
      case FETCH_ASTRONAUT_FAILURE:
        return {
          ...state,
          pending: false,
          astronauts: [],
          error: action.payload.error,
        };
      default:
        return {
          ...state,
        };
    }
  };