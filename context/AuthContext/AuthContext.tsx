"use client";
import { createContext } from "react";
import { initialState } from "./AuthState";

export const AuthContext = createContext<undefined | any>(undefined);
