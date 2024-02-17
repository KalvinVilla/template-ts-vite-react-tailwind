import { ReactNode, createContext, useState } from "react";
import { Account } from "../type/auth.ts";

const AuthContext = createContext({});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [auth, setAuth] = useState<Account | null | undefined>(undefined);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
