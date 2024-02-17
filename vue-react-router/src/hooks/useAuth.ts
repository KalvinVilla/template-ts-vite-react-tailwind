import { useCallback, useContext } from "react";
import AuthContext from "../context/AuthProvider";
import { apiFetch } from "../utils/api.ts";
import { Account, AuthStatus } from "../type/auth.ts";

type AuthContextType = {
  auth: Account | null | undefined;
  setAuth: (auth: Account | null | undefined) => void;
};

export const useAuth = () => {
  const { auth, setAuth } = useContext(AuthContext) as AuthContextType;

  let status;

  switch (auth) {
    case null:
      status = AuthStatus.Unauthenticated;
      break;
    case undefined:
      status = AuthStatus.Unknown;
      break;
    default:
      status = AuthStatus.Authenticated;
      break;
  }

  const authenticate = useCallback(() => {
    apiFetch<Account>("auth/me", { method: "GET" })
      .then((data) => {
        const { user } = data;
        if (user) setAuth(user);
      })
      .catch(() => setAuth(null));
  }, []);

  const login = useCallback((username: string, password: string) => {
    return apiFetch<Account>("auth/login", {
      method: "POST",
      json: {
        username,
        password,
      },
    })
      .then(() => {
        authenticate();
        return true;
      })
      .catch(() => {
        setAuth(null);
        return false;
      });
  }, []);

  const logout = useCallback(() => {
    apiFetch<null>("auth/logout", { method: "DELETE" })
      .then(() => {
        setAuth(null);
      })
      .catch(() => setAuth(null));
  }, []);

  return {
    auth,
    status,
    authenticate,
    login,
    logout,
  };
};
