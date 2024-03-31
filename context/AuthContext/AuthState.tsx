"use client";

import React, { ReactNode, useReducer } from "react";
import { createContext } from "vm";
import AuthRedcuer from "./AuthRedcuer";
import useGetApi from "@/hooks/useGetApi";
import {
  LOGIN_CALL,
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  REGISTER_CALL,
  REGISTER_SUCCESS,
  REGISTRATION_FAILURE,
} from "./AuthActions";
import { AuthContext } from "./AuthContext";

type props = {
  children: ReactNode;
};

export const initialState: AuthState = {
  user: null,
  isLoading: true,
  isAuthenticated: false,
};

const AuthState = ({ children }: props) => {
  const API = useGetApi();
  const [state, dispatch] = useReducer(AuthRedcuer, initialState);

  const login = async (credentials: any) => {
    try {
      dispatch({
        type: LOGIN_CALL,
      });
      const res = await API.post(`auth/login`, JSON.stringify(credentials));

      if (res.status == 200 && res.data.token) {
        localStorage.setItem("notezilla_token", res.data.token);
        dispatch({
          type: LOGIN_SUCCESS,
          payload: res.data.user,
        });
        return true;
      } else {
        dispatch({
          type: LOGIN_FAILURE,
        });
        return false;
      }
    } catch (error) {
      dispatch({
        type: LOGIN_FAILURE,
      });
      return false;
    }
  };

  const register = async (credentials: any) => {
    try {
      dispatch({
        type: REGISTER_CALL,
      });
      const res = await API.post(`auth/register`, JSON.stringify(credentials));

      if (res.status == 200 && res.data.token) {
        localStorage.setItem("notezilla_token", res.data.token);
        dispatch({
          type: REGISTER_SUCCESS,
          payload: res.data.user,
        });
        return true;
      } else {
        dispatch({
          type: REGISTRATION_FAILURE,
        });
        return false;
      }
    } catch (error) {
      dispatch({
        type: REGISTRATION_FAILURE,
      });
      return false;
    }
  };

  const checkUser = async () => {
    try {
      dispatch({
        type: LOGIN_CALL,
      });
      const res = await API.get("auth/validate-user");
      if (res.status == 200) {
        dispatch({
          type: LOGIN_SUCCESS,
          payload: res.data.user,
        });
      } else {
        dispatch({
          type: LOGIN_FAILURE,
        });
      }
    } catch (error) {
      dispatch({
        type: LOGIN_FAILURE,
      });
    }
  };

  const logout = () => {
    localStorage.setItem("notezilla_token", "");
    window.location.reload();
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        checkUser,
        login,
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthState;
