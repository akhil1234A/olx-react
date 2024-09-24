// import { createContext, useState } from "react";
// import { auth, db } from "../firebase/config"; // Importing auth and db directly

// export const FirebaseContext = createContext(null);

// export const FirebaseProvider = ({ children }) => {
//   const [user, setUser] = useState(null);

//   return (
//     <FirebaseContext.Provider value={{ auth, db, user, setUser }}>
//       {children}
//     </FirebaseContext.Provider>
//   );
// };
import React, { createContext, useState, useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth"; // Import signOut
import { auth, db } from "../firebase/config";

export const FirebaseContext = createContext(null);

export const FirebaseProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe(); // Clean up subscription on unmount
  }, []);

  const logout = async () => {
    try {
      await signOut(auth); // Sign out from Firebase
      setUser(null); // Update user state
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <FirebaseContext.Provider value={{ auth, db, user, setUser, logout }}>
      {children}
    </FirebaseContext.Provider>
  );
};
