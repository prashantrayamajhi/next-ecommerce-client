import { createContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { NEXT_API_URL } from "@/api/server";
import Axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const router = useRouter();

  if (error) {
    toast.error(error);
  }

  useEffect(() => {
    checkUserLoggedIn();
  }, []);

  // Register a user
  const signup = async ({ name, email, password, setIsLoading }) => {
    const data = { name, email, password };
    try {
      const res = await Axios.post("/api/signup", data);
      if (res.status === 201) {
        router.push("/auth/login");
      }
    } catch (err) {
      setError(err.response.data.err);
      setError(null);
      setIsLoading(false);
    }
  };

  // Login user
  const login = async ({ email, password, setIsLoading }) => {
    const data = { email, password };
    try {
      const res = await Axios.post(`${NEXT_API_URL}/api/login`, data);
      if (res.status === 200) {
        setUser(res.data.data);
        setIsLoading(false);
        router.push("/profile/dashboard");
      }
    } catch (err) {
      setError(err.response.data.err);
      setError(null);
      setIsLoading(false);
    }
  };

  // logout user
  const logout = async () => {
    const res = await Axios.post(`${NEXT_API_URL}/api/logout`);
    if (res.status === 200) {
      setUser(null);
      router.push("/auth/login");
    }
  };

  // check if the user is logged in
  const checkUserLoggedIn = async () => {
    try {
      const res = await Axios.get(`${NEXT_API_URL}/api/user`);
      if (res.status === 200) {
        setUser(res.data.data);
      }
    } catch (err) {
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, error, signup, login, logout }}>
      <ToastContainer />
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
