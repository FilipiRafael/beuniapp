"use client";

import { createContext, useState } from "react";

export const AuthContext = createContext<any>({});

export type UserProps = {
  id: string;
  email: string;
  username?: string;
  avatarUrl?: string;
} | null;

export function AuthProvider({ children }: any) {
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [user, setUser] = useState<UserProps>(null);

  return (
    <AuthContext.Provider
      value={{
        isAuth,
        setIsAuth,
        user,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
