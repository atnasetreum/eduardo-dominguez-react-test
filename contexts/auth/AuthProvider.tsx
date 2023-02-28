import { FC, useReducer, ReactNode, useState, useEffect } from "react";
import { AuthContext, authReducer } from "./";
import { UserSession } from "../../ts/interfaces";
import { useRouter } from "next/router";

interface User {
  username: string;
  password: string;
}

const users: User[] = require("../../database/user.json");

export interface AuthState {
  isLoggedIn: boolean;
  user?: UserSession;
}

const AUTH_INITIAL_STATE: AuthState = {
  isLoggedIn: false,
  user: undefined,
};

interface Props {
  children: ReactNode;
}

export const AuthProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, AUTH_INITIAL_STATE);

  const router = useRouter();

  const exitApp = () => {
    dispatch({ type: "[Auth] - Logout" });
    localStorage.removeItem("username");
    if (router.pathname !== "/") {
      window.location.replace("/");
    }
  };

  const validateSession = () => {
    const username = localStorage.getItem("username") || "";

    if (!username) {
      return exitApp();
    }
    dispatch({ type: "[Auth] - Login", payload: { username } });
    if (router.pathname === "/") {
      router.push({
        pathname: "/upax",
        hash: "employees",
      });
    }
  };

  useEffect(() => {
    validateSession();
  }, []);

  const loginUser = async (
    username: string,
    password: string
  ): Promise<{
    userSession: UserSession;
    isLoggedIn: boolean;
  }> => {
    try {
      const user = users.find(
        (user) => user.username === username && user.password === password
      );

      if (!user) {
        throw new Error("User not found");
      }

      localStorage.setItem("username", username);
      dispatch({ type: "[Auth] - Login", payload: { username } });
      return {
        userSession: { username },
        isLoggedIn: true,
      };
    } catch (error) {
      return {
        userSession: {} as UserSession,
        isLoggedIn: false,
      };
    }
  };

  const logoutUser = () => {
    exitApp();
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        loginUser,
        logoutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
