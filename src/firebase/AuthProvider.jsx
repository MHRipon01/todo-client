import {
    GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword, 
  signInWithPopup, 
  signOut,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import app from "./firebase.config";

export const AuthContext = createContext(null);

// eslint-disable-next-line react/prop-types
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);

  const auth = getAuth(app);



  //create user/register
  const createUser = ( email, password) => {
    setLoading(true);

    return createUserWithEmailAndPassword(auth, email, password)
   
  };
  //   const userOnPage = auth.currentUser
  //     console.log(userOnPage);

  //sign in or login

  const signIn = (email, password) => {
    setLoading(true);

    return signInWithEmailAndPassword(auth, email, password);
  };


  const googleProvider = new GoogleAuthProvider()

  const googleSignIn = () => {
    setLoading(true);
    return signInWithPopup(auth , googleProvider)
  };


  //signout or logout
  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log("on auth state change", currentUser);
      setUser(currentUser);
      setLoading(false);

      console.log(user);

    });
    return () => {
      unSubscribe();
    };
  }, []);








  const authInfo = {
    auth,
    user,
    createUser,
    logOut,
    signIn,
    loading,
    googleSignIn,
    // userOnPage,
    
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
