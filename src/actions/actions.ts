import {
    FETCH_ASTRONAUT_REQUEST,
    FETCH_ASTRONAUT_SUCCESS,
    FETCH_ASTRONAUT_FAILURE,
  } 
  from "./actionTypes";

  import {
    FetchAstronautRequest,
    FetchAstronautSuccess,
    FetchTodoSuccessPayload,
    FetchAstronautFailure,
    FetchTodoFailurePayload,
  } from "../types/Types";
  
  export const fetchAstronautRequest = (): FetchAstronautRequest => ({
    type: FETCH_ASTRONAUT_REQUEST,
  });
  
  export const fetchAstronautSuccess = (
    payload: FetchTodoSuccessPayload
  ): FetchAstronautSuccess => ({
    type: FETCH_ASTRONAUT_SUCCESS,
    payload,
  });
  
  export const fetchAstronautFailure = (
    payload: FetchTodoFailurePayload
  ): FetchAstronautFailure => ({
    type: FETCH_ASTRONAUT_FAILURE,
    payload,
  });