import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase/fireBase.config";

export const AuthContext = createContext()

const AuthProvider = ({children}) => {


   const  [user, setUser] = useState(null)
   const [loading, setLoading] = useState(false)

const handleSignUp = (email,password)=>{
    return createUserWithEmailAndPassword(auth, email, password);
}

const handleLogIn = (email, password) =>{
    return signInWithEmailAndPassword(auth, email, password);
}

const handleSignOut = () =>{
    return signOut(auth)
}

const provider = new GoogleAuthProvider();
const handleGoogleLogIn = () =>{
    return signInWithPopup(auth, provider)
}

useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); 
      setLoading(false); 
    });

    return () => unsubscribe(); 
  }, []);


    const value={
        user,
        handleSignUp,
        handleLogIn,
        handleSignOut,
        handleGoogleLogIn,
        loading,
        setLoading

    }
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;