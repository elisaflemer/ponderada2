'use client'

import { createContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const AuthContext = createContext();
const { Provider } = AuthContext;

const AuthProvider = ({ children }) => {
  const router = useRouter();

  const [authState, setAuthState] = useState({
    token: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log(token);
    if (token) {
      setAuthState({
        token,
      });
    }
  }, []);

  const setUserAuthInfo = (data) => {
    const token = data.token;
    localStorage.setItem("token", token);

    setAuthState({
      token,
    });
  };

  function isUserAuthenticated() {
    return !!authState.token;
  };

  return (
    <Provider
      value={{
        authState,
        setUserAuthInfo: setUserAuthInfo,
        isUserAuthenticated,
        setAuthState
      }}
    >
      {children}
    </Provider>
  );
};

export { AuthContext, AuthProvider };
