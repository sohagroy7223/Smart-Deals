import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../Firebase/Firebase.init";
import { AuthContext } from "./AuthContext";
import { useEffect, useState } from "react";
import Loading from "../Components/Loading/Loading";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const loginUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const loggedUser = { email: currentUser.email };
        fetch("http://localhost:3000/getToken", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(loggedUser),
        })
          .then((res) => res.json())
          .then((data) => {
            // console.log("after get token", data.token);
            localStorage.setItem("token", data.token);
          });
      }
      setLoading(false);
    });
    return () => {
      unSubscribe();
    };
  }, []);

  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();

    return signInWithPopup(auth, provider);
  };

  const updateUserProfile = (updateUser) => {
    return updateProfile(auth.currentUser, updateUser);
  };

  const emailVerification = () => {
    return sendEmailVerification(auth.currentUser);
  };

  const resetPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  const userInfo = {
    createUser,
    loginUser,
    logOut,
    signInWithGoogle,
    updateUserProfile,
    emailVerification,
    setUser,
    resetPassword,
    user,
    loading,
  };

  if (loading) {
    return <Loading></Loading>;
  }

  return <AuthContext value={userInfo}>{children}</AuthContext>;
};

export default AuthProvider;
