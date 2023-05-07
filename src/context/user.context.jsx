import { useEffect } from 'react';
import { createContext, useState } from 'react';

export const UserContext = createContext({
  setUserLogged: () => null,
  setMoviedata: () => null,
  setSessionToken: () => null,
  setAddPlaylistForm: () => null,
});

export const AuthProvider = ({ children }) => {
  const [userLogged, setUserLogged] = useState(false);
  const [movieData, setMovieData] = useState('');
  const [sessionToken, setSessionToken] = useState();
  const [addPlaylistForm, setAddPlaylistForm] = useState(false);
  const [createPlaylistForm, setCreatePlaylistFrom] = useState(false);


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
    movieData,
    setMovieData,
    sessionToken,
    addPlaylistForm,
    setAddPlaylistForm,
    createPlaylistForm,
    setCreatePlaylistFrom,
  };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
