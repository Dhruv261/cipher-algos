import { useEffect } from 'react';
import { createContext, useState } from 'react';

export const UserContext = createContext({
  setUserLogged: () => null,
  setSessionToken: () => null,
});

export const AuthProvider = ({ children }) => {
  const [userLogged, setUserLogged] = useState(false);

  const [sessionToken, setSessionToken] = useState();

  useEffect(() => {
    setSessionToken(sessionStorage.getItem('token'));

    const isTokenPresent = sessionStorage.getItem('token');
    if (isTokenPresent != null) {
      setUserLogged(isTokenPresent); // isTokenPresent has the current token value
    }
  }, [userLogged]);

  const value = {
    userLogged,
    setUserLogged,
    sessionToken,
  };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
