import React, { createContext, useContext, ReactNode } from "react";
import useAuth from "../utils/useAuth";

interface AuthContextType {
  userInfo: Record<string, any> | null;
  csrf: string | null | undefined;
  isLoggedIn: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const { getLoginStateComplete, isLoggedIn, csrf, userInfo } = useAuth();

  if (!getLoginStateComplete) return <div>Loading...</div>; // Optional loading state

  return (
    <AuthContext.Provider
      value={{
        userInfo,
        csrf,
        isLoggedIn,
        isLoading: !getLoginStateComplete,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
