"use client";
import { useRouter } from "next/navigation";
import React, {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import myAxios from "@/components/utils/axios";
import { AxiosError } from "axios";
import { useToast } from "../ui/use-toast";

interface IUser {
  email: string;
  password?: string;
  googleId?: string | null;
}

interface IAuthContext {
  login: (email: string, password: string) => Promise<void>;
  signup: (password: string, email: string) => Promise<void>;
  logout: () => void;
  authLogged: () => void;
  loginuser: any;
  token: any;
  setUser: any;
  loading: boolean;
  selectedJobId: string;
  loginSignUpSwitch: boolean;
  SetLoginSignUpSwitch: (loginSignUpSwitch: boolean) => void;
  setSelectedJobId: (id: string) => void;
}

export const AuthContext = createContext({} as IAuthContext);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const router = useRouter();
  const { toast } = useToast();

  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [loginuser, setUser] = useState<IUser | null>(null);
  const [token, setToken] = useState("");
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [loginSignUpSwitch, SetLoginSignUpSwitch] = useState(true);
  const [selectedJobId, setSelectedJobId] = useState("");

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      const { data } = await myAxios.post("/auth/login", {
        userEmail: email,
        userPassword: password,
      });
      setUserData(data);
      if (data.user.role == "Admin") {
        toast({
          title: "Амжилттай админ эрхээр нэвтрэлээ!",
          duration: 1500,
        });
        router.replace("/admindashboard");
        return;
      }
      if (selectedJobId !== "") {
        router.push("/profile");
        toast({
          title: "Амжилттай нэвтрэлээ!",
          duration: 1500,
        });
        return;
      } else {
        router.push("./");
        toast({
          title: "Амжилттай нэвтрэлээ!",
          duration: 1500,
        });
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        toast({
          title: "Aldaa garlaa",
          variant: "destructive",
          description: `Aldaa = ${error.response?.data.message}`,
        });
        console.log(error);
      }
    } finally {
      setLoading(false);
    }
  };

  const signup = async (email: string, password: string) => {
    try {
      setLoading(true);
      const { data } = await myAxios.post("/auth/signup", {
        email: email,
        password: password,
      });
      toast({
        title: "Амжилттай бүртгүүллээ",
        duration: 1500,
      });
      SetLoginSignUpSwitch(!loginSignUpSwitch);
      setRefresh(!refresh);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
      });
    } finally {
      setLoading(false);
    }
  };

  const setUserData = (data: any) => {
    setUser(data.user);
    setToken(data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    localStorage.setItem("token", JSON.stringify(data.token));
  };

  const authLogged = () => {
    if (localStorage.getItem("token")) {
      const user = localStorage.getItem("user");
      const token = localStorage.getItem("token");

      if (user && token) {
        setUser(JSON.parse(user));
        setToken(JSON.parse(token));
      }
    }
  };

  const logout = () => {
    setIsLoggingOut(true);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    setToken("");
    setSelectedJobId("");
    setTimeout(() => {
      setIsLoggingOut(false);
    }, 1000);
    router.push("/");
  };

  useEffect(() => {
    authLogged();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        login,
        signup,
        logout,
        loginuser,
        token,
        setUser,
        loading,
        SetLoginSignUpSwitch,
        loginSignUpSwitch,
        authLogged,
        setSelectedJobId,
        selectedJobId,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
