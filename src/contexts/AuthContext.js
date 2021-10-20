import React, { useContext, useState, useEffect } from 'react'; // eslint-disable-next-line
import { app, auth } from '../firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  getAuth,
} from 'firebase/auth';

const AuthContext = React.createContext();
const fbauth = getAuth();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentuser] = useState();
  //const [loading, setLoading] = useState(true);

  function signup(auth, email, password) {
    return createUserWithEmailAndPassword(auth, email, password).catch(
      (error) => {
        return Promise.reject(error.message);
      }
    );
  }

  function login(auth, email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  useEffect(() => {
    return fbauth.onAuthStateChanged((user) => {
      setCurrentuser(user);
    });
  }, []);

  const value = {
    currentUser,
    signup,
    login,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
