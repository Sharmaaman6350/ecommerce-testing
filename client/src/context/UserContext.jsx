// import React, { createContext, useContext, useState, useEffect } from "react";

// const UserContext = createContext();

// export const useUser = () => useContext(UserContext);

// export const UserProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [userLoading, setUserLoading] = useState(true); // ✅ loading state

//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     if (storedUser) {
//       setUser(JSON.parse(storedUser));
//     }
//     setUserLoading(false); // ✅ done loading
//   }, []);

//   const login = (userData) => {
//     setUser(userData);
//     localStorage.setItem("user", JSON.stringify(userData));
//   };

//   const logout = () => {
//     setUser(null);
//     localStorage.removeItem("user");
//   };

//   return (
//     <UserContext.Provider value={{ user, login, logout, userLoading }}>
//       {children}
//     </UserContext.Provider>
//   );
// };

import React, { createContext, useContext, useState, useEffect } from "react";
import { getProfile } from "../api.js"; // make sure this API calls /api/profile

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userLoading, setUserLoading] = useState(true);

  // Fetch user profile from API
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setUser(null);
          return;
        }

        const res = await getProfile(); // fetch from /api/profile
        setUser(res.data); // store full user data
        localStorage.setItem("user", JSON.stringify(res.data)); // optional
      } catch (err) {
        console.error("❌ Failed to fetch user profile:", err);
        setUser(null);
      } finally {
        setUserLoading(false);
      }
    };

    fetchUser();
  }, []);

  const login = (userData, token) => {
    setUser(userData);
    if (token) localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  const refreshUser = async () => {
    // optional function to refresh profile anytime
    try {
      const res = await getProfile();
      setUser(res.data);
      localStorage.setItem("user", JSON.stringify(res.data));
    } catch (err) {
      console.error("❌ Failed to refresh user:", err);
    }
  };

  return (
    <UserContext.Provider value={{ user, login, logout, userLoading, refreshUser }}>
      {children}
    </UserContext.Provider>
  );
};
