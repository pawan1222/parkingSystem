import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

// Create the context
export const AuthContext = createContext();

// Create a custom hook for easier access
export const useAuth = () => useContext(AuthContext);

// Provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // null when logged out

  // Optional: Load user on refresh (if using cookies/session)
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/user/currentUser`, {
          withCredentials: true,
        });
        console.log("Curr User" , res);
        
        setUser(res.data.user); // assuming res.data.user contains { name, role, etc. }
      } catch (err) {
        setUser(null); // not logged in
      }
    };

    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
