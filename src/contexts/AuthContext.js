import React, { useContext, useState, useEffect } from 'react';
import { app } from '../firebase';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

const AuthContext = React.createContext();
const auth = getAuth();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentuser] = useState();

  function signup(auth, email, password) {
    createUserWithEmailAndPassword(auth, email, password)
      .then((UserCredential) => {
        const user = UserCredential.user;
        console.log(user);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentuser(user);
    });
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signup,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
