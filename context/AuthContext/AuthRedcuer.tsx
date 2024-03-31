import React from "react";
import {
  LOGIN_CALL,
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  REGISTER_CALL,
  REGISTER_SUCCESS,
  REGISTRATION_FAILURE,
} from "./AuthActions";

const AuthRedcuer = (state: AuthState, action: any) => {
  switch (action.type) {
    case LOGIN_CALL:
    case REGISTER_CALL:
      console.log("first");
      return {
        ...state,
        user: null,
        isLoading: true,
        isAuthenticated: false,
      };

    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      return {
        ...state,
        user: action.payload,
        isLoading: false,
        isAuthenticated: true,
      };
    case LOGIN_FAILURE:
    case REGISTRATION_FAILURE:
      return {
        ...state,
        user: null,
        isLoading: false,
        isAuthenticated: false,
      };
    default:
      console.log("dispatched rund")
      return {
        ...state,
        user: null,
        isLoading: false,
        isAuthenticated: false,
      };
  }
};

export default AuthRedcuer;
