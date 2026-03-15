import { createContext, useContext, useState, useEffect, useMemo } from "react";
import {
  signinSet,
  checkAuthRequest,
  loginRequest,
} from "@/services/enroll.service";

type User = {
  id_teacher: number;
  name: string;
  last_name: string;
  last_name2: string;
  email: string;
};
type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (data: { email: string; password: string }) => Promise<void>;
  signin: (data: {
    name: string;
    last_name: string;
    last_name2: string;
    email: string;
    password: string;
  }) => Promise<void>;
  //   logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const res = await checkAuthRequest();

        if (res) {
          setUser(res.teacher);
          setIsAuthenticated(true);
        } else {
           
          setUser(null);
          setIsAuthenticated(false);
        }
      } catch {
        setUser(null);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };
    checkLogin();
  }, []);

  const login = async (data: { email: string; password: string }) => {
    const res = await loginRequest(data);
    console.log('login',res)
 
    setUser(res.teacher);
   
    setIsAuthenticated(true);
  };

  const signin = async (data: {
    name: string;
    last_name: string;
    last_name2: string;
    email: string;
    password: string;
  }) => {
    const res = await signinSet(data);
    console.log(res);
  };
  const value = useMemo(
    () => ({
      user,
      isAuthenticated,
      loading,
      login,
      signin,
      //   logout,
    }),
    [user, isAuthenticated, loading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
